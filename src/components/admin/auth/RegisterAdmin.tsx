"use client"
import { adminRegister } from "@/lib/services/api/fetchers";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
   password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useRouter();

  // const roles = [
  //   { value: "admin", label: "Admin" },
  //   { value: "user", label: "User" }
  // ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
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
      const response = await adminRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      setTimeout(() => {
        navigate.push("/admin/auth/login");
      }, 1000);

      setError(response.message || "Registration failed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex  items-center justify-center p-4 ">
      <div className=" lg:w-[45rem] w-full max-w-[40rem] space-y-6">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-light text-gray-800">
            Admin Registration
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Please enter your details
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-4 sm:p-8 "
        >
          <div className="space-y-4">
            <div className="space-y-1 ">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 pl-3"
              >
                 Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border text-sm border-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 pl-3"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-sm border border-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* <div className="space-y-1">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 pl-3"
              >
                Role
              </label>
              <select
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select role</option>
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 pl-3"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 text-sm border border-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register Now"}
          </button>

          <div className="text-center text-sm text-gray-600 pt-2">
            Already have an account?{" "}
            <Link
              href="/admin/auth/login"
              className="text-blue-300 hover:underline font-medium"
            >
              Sign in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmin;
