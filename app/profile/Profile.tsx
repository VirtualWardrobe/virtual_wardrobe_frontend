"use client";

import {
  ExclamationTriangleIcon,
  CheckBadgeIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import VirtualTryOnHistory from "../components/VirtualTryOnHistory";
import { useUser } from "../context/UserContext";

export default function Profile() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl text-gray-700">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="px-4 sm:px-0">
        <h3 className="text-2xl font-semibold text-gray-900">Profile</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          View your profile information here.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-300">
        <dl className="divide-y divide-gray-300">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Profile Picture
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="flex items-center">
                <Image
                  src={
                    user.profile_pic
                      ? user.profile_pic
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile picture"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <span className="ml-4 text-sm/6 text-gray-500">
                  {user.profile_pic ? "Uploaded" : "No profile picture"}
                </span>
                {!user.profile_pic && (
                  <Link href="/upload-profile-pic">
                    <button className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">
                      Upload Now
                    </button>
                  </Link>
                )}
              </div>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Name</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Phone Number
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.phone_number ? (
                user.phone_number
              ) : (
                <div>
                  <ExclamationTriangleIcon className="inline-block h-5 w-5 text-yellow-500" />
                  <span className="ml-2 text-sm/6 text-gray-500">
                    Not provided
                  </span>
                </div>
              )}
            </dd>
          </div>
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
                <Link href={"/verify-email"}>
                  <button className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">
                    Verify Now
                  </button>
                </Link>
              )}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Phone Verified
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.is_phone_verified ? (
                <CheckBadgeIcon className="inline-block h-5 w-5 text-green-500" />
              ) : (
                <ExclamationTriangleIcon className="inline-block h-5 w-5 text-yellow-500" />
              )}
              <span className="ml-2 text-sm/6 text-gray-500">
                {user.is_phone_verified ? "Verified" : "Verification pending"}
              </span>
              {!user.is_phone_verified && (
                <Link href={"/verify-phone"}>
                  <button className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">
                    Verify Now
                  </button>
                </Link>
              )}
            </dd>
          </div>
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
              {!user.is_google_verified && (
                <Link href={"/verify-google"}>
                  <button className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">
                    Verify Now
                  </button>
                </Link>
              )}
            </dd>
          </div>
          <VirtualTryOnHistory />
        </dl>
      </div>
    </div>
  );
}
