"use client";
import useCurrentUser from "../../../hooks/useCurrentUser";
import UserAddress from "./components/UserAddress";
import { useState } from "react";

import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Profile = () => {
  const router = useRouter();
  const { currentUserFromStore, allocateCurrentUser } = useCurrentUser();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isDeleting] = useState(false);

  const handleEdit = () => {
    router.push("/profile/edit");
  };

  const handleDeleteAccount = () => {
    if (!password) {
      toast.error("Please enter your password to confirm account deletion");
      return;
    }

    // Clear user data immediately
    Cookies.remove("authToken");
    allocateCurrentUser(null);

    // Show success message
    toast.success("Account removed successfully");

    // Close modal and reset state
    setShowDeleteModal(false);
    setPassword("");

    // Navigate to login after a short delay
    setTimeout(() => {
      router.push("/auth/login", { replace: true });
    }, 1000);
  };
  if (!currentUserFromStore) return null;
  return (
    <div className="w-full max-w-6xl mx-auto mt-26 p-4 relative">
      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Delete Account
            </h3>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete your account? This action cannot
              be undone. All your data will be permanently removed.
            </p>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter your password to confirm
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your password"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setPassword("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className={`px-4 py-2 rounded-md text-white ${
                  isDeleting ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl overflow-hidden">
        <div className="grid md:grid-cols-3 gap-8 p-6">
          {/* User Info - Left Side */}
          <div className="md:col-span-1 flex flex-col items-center text-center space-y-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200">
              <Image
                src="/images/user.png"
                alt="User"
                height={50}
                width={50}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-medium text-primary">
                {currentUserFromStore.username}
              </h2>
              <p className="text-gray-600 text-sm">
                {currentUserFromStore.email}
              </p>
              <p className="text-gray-700">{currentUserFromStore.contact}</p>
            </div>

            <div className="w-full space-y-3 pt-2">
              <button
                onClick={handleEdit}
                className="w-full bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
              <button
                onClick={() => router.push("/profile/orders")}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  />
                </svg>
                My Orders
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-100 hover:bg-red-100 transition flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete Account
              </button>
            </div>
          </div>

          {/* Address Card - Right Side */}
          <div className="md:col-span-2 border-l md:border-l-gray-200 md:pl-8">
            <UserAddress currentUserFromStore={currentUserFromStore} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
