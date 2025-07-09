"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    } else {
      setAuthorized(true);
    }

    setLoading(false);
  }, [router]);

  if (loading || !authorized) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
        <p className="text-xl text-gray-700 mt-4">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
