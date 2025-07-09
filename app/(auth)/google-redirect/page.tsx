"use client";

import { useEffect, useState, useRef, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useUser } from "@/app/context/UserContext";

export default function GoogleRedirectPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { fetchUserData } = useUser();

  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [restorePending, setRestorePending] = useState(false);
  const [restoreEmail, setRestoreEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const hasHandled = useRef(false);

  useEffect(() => {
    if (hasHandled.current) return;

    const url = new URL(window.location.href);
    const success = url.searchParams.get("success");
    const token = url.searchParams.get("access_token");
    const email = url.searchParams.get("email");

    if (success === "true" && token) {
      hasHandled.current = true;
      login(token);
      fetchUserData();
      router.push("/");
    } else if (success === "false" && email) {
      hasHandled.current = true;
      setRestoreEmail(email);
      setIsRestoreModalOpen(true);
    } else {
      hasHandled.current = true;
      setErrorMessage("Google login failed.");
    }
  }, [login, fetchUserData, router]);

  const handleRestoreAccount = async () => {
    setRestorePending(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/restore-account/google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: restoreEmail }),
        }
      );

      const data = await res.json();
      if (data.success) {
        login(data.data.access_token);
        await fetchUserData();
        router.push("/");
      } else {
        setIsRestoreModalOpen(false);
        setErrorMessage(data.detail || "Failed to restore account.");
      }
    } catch (error) {
      console.error("Error restoring account:", error);
      setIsRestoreModalOpen(false);
      setErrorMessage("An error occurred while restoring your account.");
    } finally {
      setRestorePending(false);
    }
  };

  const handleCloseModal = () => {
    setIsRestoreModalOpen(false);
    router.push("/login");
  };

  const handleCloseError = () => {
    setErrorMessage("");
    router.push("/login");
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg font-semibold text-gray-700">
            {restorePending
              ? "Restoring your account..."
              : "Completing your login..."}
          </div>
          <div className="text-gray-500">
            Please wait while we redirect you.
          </div>
        </div>
      </div>

      {/* Restore Modal */}
      <Transition appear show={isRestoreModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsRestoreModalOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Restore Deleted Account
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      This account is scheduled for deletion. Do you want to
                      restore it?
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 cursor-pointer"
                      onClick={handleRestoreAccount}
                      disabled={restorePending}
                    >
                      {restorePending ? "Restoring..." : "Restore"}
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Optional Error Modal */}
      {errorMessage && (
        <Transition appear show={!!errorMessage} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={handleCloseError}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-red-600"
                    >
                      Login Error
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-700">{errorMessage}</p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 cursor-pointer"
                        onClick={handleCloseError}
                      >
                        Close
                      </button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
}
