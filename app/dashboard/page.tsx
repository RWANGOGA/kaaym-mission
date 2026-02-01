"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  // --- Admin & Auth states ---
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Form states ---
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

  // --- Check login and admin status ---
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8001/api/check-auth/", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();

        if (!data.is_authenticated) {
          router.replace("/login");
          return;
        }

        if (!data.is_admin) {
          setError("Access denied. Admin only.");
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      } catch (err: any) {
        router.replace("/login");
      } finally {
        setChecking(false);
      }
    };

    checkLoggedIn();
  }, [router]);

  // --- Form submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSuccess("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("type", type);

      if (type === "product") {
        if (!price) throw new Error("Price is required for products");
        formData.append("price", price.toString());
        formData.append("currency", currency);
        if (stock !== "") formData.append("stock", stock.toString());

        if (images && images.length > 0) {
          for (const img of images) formData.append("images", img);
        }
      } else {
        if (!file) throw new Error("File is required for resources");
        formData.append("file", file);
      }

      const response = await fetch("http://127.0.0.1:8001/api/items/", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Failed to create item");
      }

      const result = await response.json();
      console.log("Item created:", result);

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

  if (checking) return <div className="p-8 text-center">Checking access...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!isAdmin) return <div className="p-8">Access denied. Admin only.</div>;

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
          {/* Type selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">What are you adding?</label>
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
                <span>Product (t-shirts, Bibles, umbrellas, hymnbooks, etc.)</span>
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
                <span>Resource (reports, flyers, posters, photos)</span>
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
              placeholder="Item title"
              required
              disabled={uploading}
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
              disabled={uploading}
            />
          </div>

          {/* Product-specific */}
          {type === "product" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (UGX) *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="35000"
                    min="0"
                    required
                    disabled={uploading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock (optional)</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value ? Number(e.target.value) : "")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="45"
                    min="0"
                    disabled={uploading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
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
                  disabled={uploading}
                />
                <p className="mt-1 text-xs text-gray-500">Upload 1 or more images (JPG, PNG)</p>
              </div>
            </>
          )}

          {/* Resource-specific */}
          {type === "resource" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload File *</label>
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
                disabled={uploading}
              />
              <p className="mt-1 text-xs text-gray-500">Reports → PDF • Flyers/Posters → image or PDF</p>
            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
              uploading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800"
            }`}
          >
            {uploading ? "Uploading..." : "Add Item to Database"}
          </button>
        </form>
      </div>
    </div>
  );
}
