"use client";

import { useState, useEffect } from "react";
import {
  ExclamationTriangleIcon,
  CheckBadgeIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import VirtualTryOnHistory from "../components/VirtualTryOnHistory";
import ProfilePicUploadModal from "../components/ProfilePicUploadModal";
import PhoneNumberModal from "../components/PhoneNumberModal";
import { useUser } from "../context/UserContext";
import ErrorModal from "../components/ErrorModal";
import ConfirmModal from "../components/ConfirmModal";
import SuccessModal from "../components/SuccessModal";

export default function Profile() {
  const { user, fetchUserData } = useUser();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const deleteProfilePic = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user?delete_profile_pic=true`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: new FormData(),
      }
    );
    const data = await res.json();
    if (data.success) {
      fetchUserData();
    } else {
      setErrorMessage("Failed to remove profile picture.");
      setIsErrorModalOpen(true);
    }
  };

  const deletePhoneNumber = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user?delete_phone_number=true&delete_profile_pic=false`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: new FormData(),
      }
    );
    const data = await res.json();
    if (data.success) {
      fetchUserData();
    } else {
      setErrorMessage("Failed to remove phone number.");
      setIsErrorModalOpen(true);
    }
  };

  useEffect(() => {
    fetchUserData();
    window.scrollTo(0, 0);
  }, [fetchUserData]);

  const deleteAccount = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem("token");
        setIsSuccessModalOpen(true);
      } else {
        console.error("Account deletion failed:", JSON.stringify(data));
        setErrorMessage("Failed to delete account. Please try again.");
        setIsErrorModalOpen(true);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setErrorMessage("Something went wrong. Please try again later.");
      setIsErrorModalOpen(true);
    }
  };

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl text-gray-700">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="mt-16 w-full">
      <div className="px-4 sm:px-0">
        <h3 className="text-3xl font-semibold text-gray-900">Profile</h3>
        <p className="mt-1 max-w-2xl text-base text-gray-500">
          View your profile information here.
        </p>
      </div>

      <div className="mt-6 border-t border-gray-300">
        <dl className="divide-y divide-gray-300">
          {/* Profile Picture */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="flex items-center text-sm/6 font-medium text-gray-900">
              Profile Picture
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Image
                  src={
                    user.profile_pic
                      ? user.profile_pic
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile picture"
                  width={90}
                  height={90}
                  className="object-cover"
                />
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="text-sm/6 text-gray-500">
                    {user.profile_pic ? "Uploaded" : "No profile picture"}
                  </span>
                  {user.profile_pic ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
                      >
                        Update
                      </button>
                      <button
                        onClick={deleteProfilePic}
                        className="rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsUploadModalOpen(true)}
                      className="rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
                    >
                      Upload Now
                    </button>
                  )}
                </div>
              </div>
            </dd>
          </div>

          {/* Name */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Name</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.name}
            </dd>
          </div>

          {/* Email */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.email}
            </dd>
          </div>

          {/* Phone Number */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Phone Number
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.phone_number ? (
                <div className="flex items-center">
                  <span>{user.phone_number}</span>
                  <div className="ml-6 flex gap-3">
                    <button
                      onClick={() => setIsPhoneModalOpen(true)}
                      className="rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500 cursor-pointer"
                    >
                      Update
                    </button>
                    <button
                      onClick={deletePhoneNumber}
                      className="rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-500 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <ExclamationTriangleIcon className="inline-block h-5 w-5 text-yellow-500" />
                  <span className="ml-2 text-gray-500">Not provided</span>
                  <button
                    onClick={() => setIsPhoneModalOpen(true)}
                    className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 cursor-pointer"
                  >
                    Add Now
                  </button>
                </div>
              )}
            </dd>
          </div>

          {/* Email Verified */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Email Verified
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.is_email_verified ? (
                <CheckBadgeIcon className="inline-block h-5 w-5 text-green-500" />
              ) : (
                <ExclamationTriangleIcon className="inline-block h-5 w-5 text-yellow-500" />
              )}
              <span className="ml-2 text-sm/6 text-gray-500">
                {user.is_email_verified ? "Verified" : "Verification pending"}
              </span>
              {!user.is_email_verified && (
                <Link href="/verify-email">
                  <button className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500">
                    Verify Now
                  </button>
                </Link>
              )}
            </dd>
          </div>

          {/* Google Verified */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Google Verified
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.is_google_verified ? (
                <CheckBadgeIcon className="inline-block h-5 w-5 text-green-500" />
              ) : (
                <ExclamationTriangleIcon className="inline-block h-5 w-5 text-yellow-500" />
              )}
              <span className="ml-2 text-sm/6 text-gray-500">
                {user.is_google_verified ? "Verified" : "Verification pending"}
              </span>
            </dd>
          </div>

          {/* Delete Account */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Delete Account
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p className="text-sm/6 text-red-600">
                This action is irreversible. Please proceed with caution.
              </p>
              <button
                onClick={() => setIsConfirmModalOpen(true)}
                className="mt-2 rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-500 cursor-pointer"
              >
                Delete Account
              </button>
            </dd>
          </div>

          <VirtualTryOnHistory />
        </dl>
      </div>

      {/* Modals */}
      <ConfirmModal
        show={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={async () => {
          await deleteAccount();
          setIsConfirmModalOpen(false);
        }}
        message="Are you sure you want to delete your account? This action cannot be undone."
      />

      <SuccessModal
        show={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          window.location.href = "/";
        }}
        message="Your account has been scheduled for deletion and will be permanently deleted within 30 days."
      />

      <ErrorModal
        show={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={errorMessage}
      />

      <ProfilePicUploadModal
        show={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={() => fetchUserData()}
      />

      <PhoneNumberModal
        show={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        onSuccess={() => fetchUserData()}
      />
    </div>
  );
}
