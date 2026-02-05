"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kaaym-backend1.onrender.com';

// Helper function to get CSRF token from cookies
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1];
  
  return cookieValue || null;
}

export default function Dashboard() {
  const router = useRouter();

  // Auth & role states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
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

  // Check authentication & admin role
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 0. Fetch CSRF token first
        const csrfRes = await fetch(`${API_URL}/api/csrf/`, {
          method: "GET",
          credentials: "include",
        });
        console.log("CSRF token fetch status:", csrfRes.status);

        // 1. Check if user is logged in
        const authRes = await fetch(`${API_URL}/api/check-auth/`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        console.log("check-auth status:", authRes.status);

        if (!authRes.ok) {
          console.log("Not authenticated - redirecting to login");
          router.replace("/login");
          return;
        }

        const authData = await authRes.json();
        console.log("check-auth response:", authData);

        // Check if authenticated is true and user exists
        if (!authData.authenticated || !authData.user) {
          console.log("No user in response → redirecting to login");
          router.replace("/login");
          return;
        }

        setIsAuthenticated(true);
        console.log("User is logged in:", authData.user);

        // 2. Check admin privileges from the user data
        if (authData.user.is_staff) {
          setIsAdmin(true);
        } else {
          setError("Access denied. Admin privileges required.");
          setTimeout(() => router.replace("/"), 2000);
        }
      } catch (err) {
        console.error("Auth check error:", err);
        router.replace("/login");
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  // Form submission
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
          // Only use the first image (since backend expects single image field)
          formData.append("image", images[0]);
        }
      } else {
        if (!file) throw new Error("File is required for resources");
        formData.append("file", file);
      }

      // Log form data being sent for debugging
      console.log("📤 Sending form data to /api/items/");
      console.log("  - Title:", title);
      console.log("  - Type:", type);
      console.log("  - Description:", description);
      if (type === "product") {
        console.log("  - Price:", price);
        console.log("  - Currency:", currency);
        console.log("  - Stock:", stock);
        console.log("  - Image file:", images?.[0]?.name || "None");
      } else {
        console.log("  - File:", file?.name || "None");
      }

      // Get CSRF token from cookie
      const csrfToken = getCookie('csrftoken');
      console.log('CSRF token for item creation:', csrfToken ? 'Found ✓' : 'Missing ⚠️');

      const headers: HeadersInit = {};
      
      // Add CSRF token to headers if available
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken;
      }

      const response = await fetch(`${API_URL}/api/items/`, {
        method: "POST",
        headers: headers,
        body: formData,
        credentials: "include",
      });

      console.log("POST /api/items/ response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errData: any = {};
        
        if (contentType && contentType.includes('application/json')) {
          errData = await response.json();
        } else {
          const text = await response.text();
          console.error("Response body:", text);
          throw new Error(`HTTP ${response.status}: ${text || 'Failed to create item'}`);
        }
        
        console.error("Error response:", errData);
        throw new Error(errData.detail || JSON.stringify(errData) || "Failed to create item");
      }

      const result = await response.json();
      console.log("✅ Item created successfully:", result);
      console.log("✅ Item ID:", result.id);
      console.log("✅ Item is_active:", result.is_active);
      console.log("✅ Item will now appear in Events page");

      setSuccess("Item successfully added! It will appear in the Events page immediately.");
      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setStock("");
      setImages(null);
      setFile(null);
      
      // Reset file inputs
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach((input: any) => {
        input.value = '';
      });
    } catch (err: any) {
      setFormError(err.message || "Failed to add item");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  // Loading / error / access denied states
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-medium text-purple-800 animate-pulse">
          Checking access...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">{error}</div>
          <p className="text-gray-600">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-red-600">Access denied. Admin only.</div>
      </div>
    );
  }

  // Main dashboard UI
  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mb-10">Manage KAAYM products and resources</p>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center">
            {success}
          </div>
        )}

        {formError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
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
                <span>Product (t-shirts, Bibles, umbrellas, hymnbooks, skirts, stickers, pens)</span>
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
                <span>Resource (reports, flyers, posters, announcements, photos)</span>
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
                    disabled={uploading}
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
                    disabled={uploading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <input
                  type="file"
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
                <p className="mt-1 text-xs text-gray-500">
                  Upload 1 image (JPG, PNG)
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
                disabled={uploading}
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