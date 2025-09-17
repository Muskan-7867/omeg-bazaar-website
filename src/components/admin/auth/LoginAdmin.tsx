"use client"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { adminLogin } from "@/lib/services/api/fetchers";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginAdmin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value
    }));
  };

  useEffect(() => {
  const token = Cookies.get("admintoken");
  if (token) {
    navigate.push("/admin/dashboard");
  }
}, [navigate]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await adminLogin({
        email: formData.email,
        password: formData.password
      });
      if (response.token) {
        Cookies.set("admintoken", response.token);
      }
      await queryClient.invalidateQueries({ queryKey: ["admin-login"] });
      setTimeout(() => {
        navigate.push("/admin/dashboard");
      }, 1000);

      setError(response.message || "Login failed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "loginfailed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center  min-h-screen  px-4 py-8">
      <div className="lg:w-[30rem] w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800">
            Admin Login
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Welcome back to your dashboard
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6 bg-white p-6 sm:p-8 "
        >
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm  border border-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm  border border-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-xs sm:text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 sm:py-3 px-4 bg-primary hover:bg-primary-dark text-white text-sm sm:text-base font-medium rounded-full transition duration-200 shadow-md hover:shadow-lg"
          >
            {loading ? "Login..." : "Login Now"}
          </button>

          <div className="text-center text-xs sm:text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/admin/auth/register"
              className="text-blue-300 hover:underline font-medium"
            >
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
