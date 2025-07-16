export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white px-10 py-8 rounded-2xl shadow-xl text-center w-full max-w-sm mx-4">
        {/* Spinner */}
        <div className="relative w-14 h-14 mx-auto mb-5">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-300 opacity-30" />
          <div className="w-full h-full border-4 border-t-indigo-600 border-indigo-200 rounded-full animate-spin" />
        </div>

        {/* Text */}
        <p className="text-gray-800 text-lg font-semibold">
          Virtual Try-on is running...
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Please wait while we generate your result.
        </p>
      </div>
    </div>
  );
}
