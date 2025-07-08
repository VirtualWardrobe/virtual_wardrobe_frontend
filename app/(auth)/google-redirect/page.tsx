"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useUser } from "@/app/context/UserContext";

export default function GoogleRedirectPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { fetchUserData } = useUser();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("access_token");

    if (token) {
      login(token);
      fetchUserData();
      router.push("/");
    } else {
      alert("Login failed. Token not found.");
      router.push("/login");
    }
  }, [login, router, fetchUserData]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-lg font-semibold text-gray-700">
          Completing your login...
        </div>
        <div className="text-gray-500">Please wait while we redirect you.</div>
      </div>
    </div>
  );
}
