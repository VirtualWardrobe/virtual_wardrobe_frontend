"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Loader from "../components/Loader";
import SuccessModal from "../components/SuccessModal";
import ConfirmModal from "../components/ConfirmModal";
import ErrorModal from "../components/ErrorModal";

interface WardrobeItem {
  id: string;
  user_id: string;
  category: string;
  type: string;
  brand: string;
  size: string;
  color: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  filters: {
    [key: string]: string[];
  };
}

export default function WardrobeItems({ filters }: Props) {
  const [products, setProducts] = useState<WardrobeItem[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmItemId, setConfirmItemId] = useState<string | null>(null);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (message: string) => {
    setErrorMessage(message);
    setShowErrorModal(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wardrobe-items`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setProducts(data.data.items);
        } else {
          showError(`Failed to fetch items: ${data.detail}`);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        showError(
          "An error occurred while fetching items. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts().catch((err) => {
      console.error("Fetch error:", err);
      showError("Something went wrong while loading your wardrobe.");
    });
  }, []);

  const matchesFilters = (item: WardrobeItem) => {
    const categoryFilters = filters.category ?? [];
    const typeFilters = filters.type ?? [];
    const colorFilters = filters.color ?? [];
    const sizeFilters = filters.size ?? [];

    const categoryMatch =
      categoryFilters.length === 0 ||
      (item.category && categoryFilters.includes(item.category.toLowerCase()));

    const typeMatch =
      typeFilters.length === 0 ||
      (item.type && typeFilters.includes(item.type.toLowerCase()));

    const colorMatch =
      colorFilters.length === 0 ||
      (item.color && colorFilters.includes(item.color.toLowerCase()));

    const sizeMatch =
      sizeFilters.length === 0 ||
      (item.size && sizeFilters.includes(item.size.toUpperCase()));

    return categoryMatch && typeMatch && colorMatch && sizeMatch;
  };

  const filteredProducts = products.filter(matchesFilters);

  const handleDelete = async () => {
    if (!confirmItemId) return;

    try {
      setLoadingId(confirmItemId);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wardrobe-items/${confirmItemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setProducts((prev) => prev.filter((item) => item.id !== confirmItemId));
        setSuccessMessage(data.message || "Item deleted successfully!");
        setShowSuccessModal(true);
      } else {
        throw new Error(data.detail || "Failed to delete item");
      }
    } catch (error) {
      console.error("Delete error:", error);
      showError(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setLoadingId(null);
      setConfirmItemId(null);
    }
  };

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("en-GB", {
      dateStyle: "medium",
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-4">
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-8">
          You have no wardrobe items.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative border p-2 rounded-lg shadow-sm"
            >
              <Image
                alt={`Image of a ${product.category.toLowerCase()} from ${
                  product.brand
                }`}
                src={
                  product.image_url
                    ? product.image_url
                    : "https://dummyimage.com/300x600/cccccc/000000&text=No+Image+Uploaded"
                }
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:h-80"
                width={200}
                height={200}
              />
              <h3 className="text-lg font-semibold text-gray-800 mt-2">
                {product.brand} {capitalize(product.category)}
              </h3>

              {product.type && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Type:</span>{" "}
                  {capitalize(product.type)}
                </p>
              )}

              {product.color && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Color:</span>{" "}
                  {capitalize(product.color)}
                </p>
              )}

              {product.size && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Size:</span>{" "}
                  {product.size.toUpperCase()}
                </p>
              )}

              <p className="text-sm text-gray-600">
                <span className="font-medium">Added:</span>{" "}
                {formatDate(product.created_at)}
              </p>

              <button
                onClick={() => setConfirmItemId(product.id)}
                disabled={loadingId === product.id}
                className={`mt-3 text-sm px-3 py-1.5 rounded-md font-semibold shadow-sm cursor-pointer ${
                  loadingId === product.id
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-500"
                }`}
              >
                {loadingId === product.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />

      {/* Error Modal */}
      <ErrorModal
        show={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={errorMessage}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        show={Boolean(confirmItemId)}
        onClose={() => setConfirmItemId(null)}
        onConfirm={() => handleDelete()}
        message="Are you sure you want to delete this item?"
      />
    </div>
  );
}
