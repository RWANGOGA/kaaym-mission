// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../lib/firebase"; // adjust path to your firebase file
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// ← Added exactly here as requested
console.log("Firebase API Key from env:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Admin check state
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [type, setType] = useState<"product" | "resource">("product");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [currency] = useState("UGX");
  const [stock, setStock] = useState<number | "">("");
  const [images, setImages] = useState<FileList | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  // Check admin role
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    const checkAdmin = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data()?.role === "admin") {
          setIsAdmin(true);
        } else {
          setError("You do not have admin access.");
        }
      } catch (err: any) {
        setError("Error checking permissions: " + err.message);
      } finally {
        setChecking(false);
      }
    };

    checkAdmin();
  }, [user, authLoading, router]);

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSuccess("");
    setUploading(true);

    try {
      let imageUrls: string[] = [];
      let fileUrl = "";
      let fileName = "";

      // Upload images (products)
      if (type === "product" && images && images.length > 0) {
        for (const img of images) {
          const imgRef = ref(storage, `items/images/${Date.now()}_${img.name}`);
          await uploadBytes(imgRef, img);
          const url = await getDownloadURL(imgRef);
          imageUrls.push(url);
        }
      }

      // Upload file (resources)
      if (type === "resource" && file) {
        const fileRef = ref(storage, `items/files/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        fileUrl = await getDownloadURL(fileRef);
        fileName = file.name;
      }

      // Prepare data for Firestore
      const itemData: any = {
        title: title.trim(),
        description: description.trim(),
        type: type === "product" ? "product" : "resource",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true,
      };

      if (type === "product") {
        if (!price) throw new Error("Price is required for products");
        itemData.price = Number(price);
        itemData.currency = currency;
        if (stock !== "") itemData.stock = Number(stock);
        if (imageUrls.length > 0) itemData.imageUrls = imageUrls;
      } else {
        if (!file) throw new Error("File is required for resources");
        if (!fileUrl) throw new Error("File upload failed");
        itemData.fileUrl = fileUrl;
        itemData.fileName = fileName;
      }

      // Save to Firestore
      await addDoc(collection(db, "items"), itemData);

      setSuccess("Item successfully added!");
      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setStock("");
      setImages(null);
      setFile(null);
    } catch (err: any) {
      setFormError(err.message || "Failed to add item");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (authLoading || checking) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  if (!isAdmin) {
    return <div className="p-8">Access denied. Admin only.</div>;
  }

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mb-10">Manage KAAYM products and resources</p>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {formError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
          {/* Item Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What are you adding?
            </label>
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="product"
                  checked={type === "product"}
                  onChange={() => setType("product")}
                  className="w-5 h-5 text-purple-600"
                />
                <span>Product (t-shirts, Bibles, umbrellas, hymnbooks, skirts, stickers, pens…)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="resource"
                  checked={type === "resource"}
                  onChange={() => setType("resource")}
                  className="w-5 h-5 text-purple-600"
                />
                <span>Resource (reports, flyers, posters, announcements, photos…)</span>
              </label>
            </div>
          </div>

          {/* Common fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="e.g. Kaaym Mission T-Shirt Black OR 2025 Annual Report"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Detailed description..."
              required
            />
          </div>

          {/* Product-specific fields */}
          {type === "product" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (UGX) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="35000"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock quantity (optional)
                  </label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value ? Number(e.target.value) : "")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="45"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setImages(e.target.files)}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-50 file:text-purple-700
                    hover:file:bg-purple-100"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Upload 1 or more images (JPG, PNG)
                </p>
              </div>
            </>
          )}

          {/* Resource-specific fields */}
          {type === "resource" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload File (PDF for reports, JPG/PNG/PDF for flyers/posters) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".pdf,image/jpeg,image/png"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-purple-50 file:text-purple-700
                  hover:file:bg-purple-100"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Reports → PDF • Flyers/Posters → image or PDF
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors
              ${uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-700 hover:bg-purple-800"}`}
          >
            {uploading ? "Uploading and saving..." : "Add Item to Database"}
          </button>
        </form>
      </div>
    </div>
  );
}