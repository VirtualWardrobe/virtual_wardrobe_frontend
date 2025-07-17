"use client";

import { useRef, useState } from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ProfilePicUploadModal({
  show,
  onClose,
  onSuccess,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_pic", file);

    try {
      setUploading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user?delete_profile_pic=false`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (data.success) {
        setError("");
        onSuccess();
        onClose();
      } else {
        setError("Failed to upload. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again later.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setError("");
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="rounded-lg bg-white p-6 shadow-lg w-[90%] max-w-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Upload Profile Picture
        </h2>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200 transition cursor-pointer"
        />
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 disabled:opacity-60 cursor-pointer"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
