import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white bg-opacity-80">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      <p className="font-bold mt-4 text-gray-700">Loading...</p>
    </div>
  );
}
