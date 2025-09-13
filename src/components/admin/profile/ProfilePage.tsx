"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Loader2, User, Mail, Shield, LogOut, Edit } from "lucide-react";
import { toast } from "react-toastify";


interface Admin {
  name: string;
  email: string;
  role: string;
}
export default function ProfilePage() {
  const [admin, setAdmin] = useState<Admin>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("admintoken");

    if (!token) {
      router.replace("/admin/auth/login");
      return;
    }

    const fetchAdmin = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/all`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (res.status === 401 || res.status === 403) {
          Cookies.remove("admintoken");
          router.replace("/admin/auth/login");
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch admin");

        const data = await res.json();
        setAdmin(data.admin);
      } catch {
        console.error("Error fetching admin info:");
        toast.error("Session expired. Please log in again.");
        Cookies.remove("admintoken");
        router.replace("/admin/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("admintoken");
    toast.success("Logged out successfully");
    router.replace("/admin/auth/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-500 w-10 h-10 mx-auto mb-3" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage your account and settings
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Profile Sidebar */}
            <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-400 mb-4">
                  <User className="w-10 h-10" />
                </div>
                <h2 className="text-xl font-semibold">
                  {admin?.name || "Admin User"}
                </h2>
                <p className="text-blue-100 mt-1">
                  {admin?.role || "Administrator"}
                </p>
              </div>

              <nav className="mt-8">
                <button className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg bg-blue-700 bg-opacity-25">
                  <User className="w-5 h-5 mr-3" />
                  Profile Information
                </button>
                <button className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mt-2 hover:bg-blue-700 hover:bg-opacity-25 transition-colors">
                  <Edit className="w-5 h-5 mr-3" />
                  Edit Profile
                </button>
                <button className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mt-2 hover:bg-blue-700 hover:bg-opacity-25 transition-colors">
                  <Shield className="w-5 h-5 mr-3" />
                  Security
                </button>
              </nav>
            </div>

            {/* Profile Content */}
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Profile Details
                </h2>
                <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
              </div>

              {admin ? (
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-500">
                        Full Name
                      </h3>
                      <p className="text-lg text-gray-900">{admin.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-500">
                        Email Address
                      </h3>
                      <p className="text-lg text-gray-900">{admin.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-500">
                        Role
                      </h3>
                      <p className="text-lg text-gray-900">
                        {admin.role || "Administrator"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center w-full py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition duration-200"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No profile data found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Last Login
            </h3>
            <p className="text-gray-500 text-sm">Yesterday at 4:32 PM</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Account Status
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
