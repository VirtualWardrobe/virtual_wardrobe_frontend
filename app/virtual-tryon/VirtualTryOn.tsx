"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import ErrorModal from "../components/ErrorModal";
import ConfirmModal from "../components/ConfirmModal";
import SuccessModal from "../components/SuccessModal";
import Link from "next/link";

interface TryOnResult {
  id: string | number;
  human_image_url: string;
  garment_image_url: string;
  result_image_url: string;
  created_at: string;
}

export default function VirtualTryOn() {
  const [results, setResults] = useState<TryOnResult[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedTryOnId, setSelectedTryOnId] = useState<
    string | number | null
  >(null);

  const [modals, setModals] = useState({
    error: false,
    success: false,
    confirm: false,
  });

  // Helpers for modals
  const handleModalError = (message: string) => {
    setErrorMessage(message);
    setModals((prev) => ({ ...prev, error: true }));
  };

  const handleModalSuccess = (message: string) => {
    setSuccessMessage(message);
    setModals((prev) => ({ ...prev, success: true }));
  };

  const closeAllModals = () => {
    setModals({ error: false, success: false, confirm: false });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/virtual-tryon`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok && data.success) {
          setResults(data.data.items);
        } else {
          throw new Error(data.detail || "Something went wrong.");
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load try-on history.";
        handleModalError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData().catch(console.error);
  }, []);

  const handleDeleteClick = (id: string | number) => {
    setSelectedTryOnId(id);
    setModals((prev) => ({ ...prev, confirm: true }));
  };

  const handleConfirmDelete = async () => {
    if (!selectedTryOnId) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/virtual-tryon/${selectedTryOnId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setResults((prev) =>
          prev.filter((item) => item.id !== selectedTryOnId)
        );
        handleModalSuccess("Try-on entry deleted successfully.");
      } else {
        throw new Error(data.detail || "Failed to delete try-on entry.");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error deleting try-on entry.";
      handleModalError(message);
    } finally {
      setModals((prev) => ({ ...prev, confirm: false }));
      setSelectedTryOnId(null);
    }
  };

  if (loading) return <Loader />;

  if (results.length === 0) {
    return (
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm/6 font-medium text-gray-900">Virtual Try-on</dt>
        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
          No virtual try-ons available.
        </dd>
        <ErrorModal
          show={modals.error}
          onClose={closeAllModals}
          message={errorMessage}
        />
      </div>
    );
  }

  return (
    <div className="mt-16 px-4 sm:px-0">
      <div className="flex flex-col gap-y-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="w-full">
          <h3 className="text-3xl font-semibold text-gray-900">
            Virtual Try-on
          </h3>
          <p className="mt-1 max-w-2xl text-base text-gray-500 mb-2">
            Here are the clothes you have tried virtually.
          </p>
        </div>
        <Link href={"/virtual-tryon/new"} className="w-full sm:w-auto mb-8">
          <button className="w-full sm:w-auto rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 cursor-pointer">
            Conduct New Try-on
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {results.map((result) => (
          <div
            key={result.id}
            className="flex flex-col justify-between rounded-md bg-white p-4 shadow-md h-full"
          >
            <div className="grid grid-cols-3 gap-4">
              {/* Human & Garment Images */}
              <div className="col-span-1 flex flex-col gap-6">
                {[
                  { src: result.human_image_url, label: "Original" },
                  { src: result.garment_image_url, label: "Garment" },
                ].map(({ src, label }) => (
                  <div key={label} className="flex flex-col items-center">
                    <div className="w-full overflow-hidden rounded bg-gray-100">
                      <Image
                        src={src}
                        alt={label}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{label}</p>
                  </div>
                ))}
              </div>

              {/* Result Image */}
              <div className="col-span-2 flex flex-col items-center">
                <div className="w-full flex-1 overflow-hidden rounded bg-gray-100">
                  <Image
                    src={result.result_image_url}
                    alt="Result"
                    width={600}
                    height={600}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">Result</p>
              </div>
            </div>

            {/* Bottom: Delete + Timestamp */}
            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
              <button
                onClick={() => handleDeleteClick(result.id)}
                className="mt-2 rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-500 cursor-pointer"
              >
                Delete
              </button>
              <span>
                Tried on:{" "}
                {new Date(result.created_at).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <ConfirmModal
        show={modals.confirm}
        onClose={closeAllModals}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this try-on entry?"
      />

      <SuccessModal
        show={modals.success}
        onClose={closeAllModals}
        message={successMessage}
      />

      <ErrorModal
        show={modals.error}
        onClose={closeAllModals}
        message={errorMessage}
      />
    </div>
  );
}
