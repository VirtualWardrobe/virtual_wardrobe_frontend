"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ConfirmModalProps = {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  message: string;
};

export default function ConfirmModal({
  show,
  onClose,
  onConfirm,
  message,
}: ConfirmModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-8 shadow-lg text-center">
        <p className="text-md font-medium text-gray-800 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm bg-gray-300 hover:bg-gray-200 text-gray-800 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md text-sm bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
