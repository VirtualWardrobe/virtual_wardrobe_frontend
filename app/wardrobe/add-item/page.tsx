"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import SuccessModal from "@/app/components/SuccessModal";
import ErrorModal from "@/app/components/ErrorModal";

export default function AddItem() {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setShowErrorModal(false);

    if (!category) {
      setError("Please select a category before submitting.");
      setShowErrorModal(true);
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token missing.");
      }

      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wardrobe-items`
      );

      if (category)
        url.searchParams.append("item_category", category.toUpperCase());
      if (type) url.searchParams.append("item_type", type.toUpperCase());
      if (brand) url.searchParams.append("item_brand", brand);
      if (size) url.searchParams.append("item_size", size.toUpperCase());
      if (color) url.searchParams.append("item_color", color.toUpperCase());

      const body = new FormData();
      if (image) {
        body.append("image", image);
      }

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      const data = await res.json();

      if (data.success) {
        setShowSuccessModal(true);
      } else {
        throw new Error(data.detail || "Failed to add item");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add item");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    router.push("/wardrobe");
  };

  return (
    <ProtectedRoute>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center min-h-screen px-4 mt-16 sm:mt-24 lg:mt-0"
      >
        <div className="space-y-8 max-w-2xl w-full">
          <div className="pb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">
              Add Item
            </h2>
            <p className="text-gray-600 text-sm">
              Add details about the item you want to add to your wardrobe.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-base font-medium text-gray-800 mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full appearance-none px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer bg-no-repeat bg-[right_1rem_center] bg-[length:1rem_1rem]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg fill='gray' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.043l3.71-3.812a.75.75 0 111.08 1.04l-4.24 4.365a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                  }}
                >
                  <option value="" hidden>
                    Select Category
                  </option>
                  {[
                    "SHIRT",
                    "T_SHIRT",
                    "BLOUSE",
                    "SWEATER",
                    "HOODIE",
                    "POLO",
                    "TANK_TOP",
                    "PANT",
                    "JEANS",
                    "SHORTS",
                    "SKIRT",
                    "LEGGINGS",
                    "SWEATPANTS",
                    "TROUSERS",
                    "JACKET",
                    "COAT",
                    "BLAZER",
                    "CARDIGAN",
                    "VEST",
                    "SUIT",
                    "TUXEDO",
                    "INNERWEAR",
                    "PAJAMAS",
                    "ROBE",
                    "SOCKS",
                    "UNDERWEAR",
                    "SPORTSWEAR",
                    "SWIMWEAR",
                    "ATHLETIC_TOP",
                    "ATHLETIC_BOTTOM",
                  ].map((item) => (
                    <option key={item} value={item}>
                      {item
                        .replace(/_/g, " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="type"
                  className="block text-base font-medium text-gray-800 mb-2"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="block w-full appearance-none px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer bg-no-repeat bg-[right_1rem_center] bg-[length:1rem_1rem]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg fill='gray' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.043l3.71-3.812a.75.75 0 111.08 1.04l-4.24 4.365a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                  }}
                >
                  <option value="" hidden>
                    Select Type
                  </option>
                  {[
                    "CASUAL",
                    "FORMAL",
                    "SPORTS",
                    "ETHNIC",
                    "PARTY",
                    "BEACH",
                  ].map((item) => (
                    <option key={item} value={item}>
                      {item
                        .replace(/_/g, " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="brand"
                  className="block text-base font-medium text-gray-800 mb-2"
                >
                  Brand
                </label>
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  placeholder="Ex: Nike, Adidas, etc."
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="size"
                  className="block text-base font-medium text-gray-800 mb-2"
                >
                  Size
                </label>
                <select
                  id="size"
                  name="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="block w-full appearance-none px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer bg-no-repeat bg-[right_1rem_center] bg-[length:1rem_1rem]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg fill='gray' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.043l3.71-3.812a.75.75 0 111.08 1.04l-4.24 4.365a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                  }}
                >
                  <option value="" hidden>
                    Select Size
                  </option>
                  {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="color"
                  className="block text-base font-medium text-gray-800 mb-2"
                >
                  Color
                </label>
                <select
                  id="color"
                  name="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="block w-full appearance-none px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer bg-no-repeat bg-[right_1rem_center] bg-[length:1rem_1rem]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg fill='gray' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.043l3.71-3.812a.75.75 0 111.08 1.04l-4.24 4.365a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                  }}
                >
                  <option value="" hidden>
                    Select Color
                  </option>
                  {[
                    "BLACK",
                    "WHITE",
                    "GRAY",
                    "RED",
                    "BLUE",
                    "YELLOW",
                    "GREEN",
                    "NAVY",
                    "PURPLE",
                    "BROWN",
                    "BEIGE",
                    "TAN",
                    "KHAKI",
                    "PINK",
                    "MAROON",
                    "OLIVE",
                    "BURGUNDY",
                    "CREAM",
                    "CHARCOAL",
                    "DENIM",
                    "MULTICOLOR",
                  ].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="image"
                  className="block text-base font-medium text-gray-800 mb-2"
                >
                  Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200 transition cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => router.push("/wardrobe")}
                className="w-full sm:w-auto flex-1 bg-gray-300 text-gray-800 text-base font-medium py-2 px-5 rounded-md shadow hover:bg-gray-400 focus:ring-2 focus:ring-gray-300 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto flex-1 bg-indigo-600 text-white text-base font-medium py-2 px-5 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <SuccessModal
        show={showSuccessModal}
        onClose={handleModalClose}
        message="Item added successfully!"
      />

      <ErrorModal
        show={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={error}
      />
    </ProtectedRoute>
  );
}
