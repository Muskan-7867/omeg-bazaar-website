"use client";
import Lottie from "lottie-react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import LoginAnimation from "../../../../public/animations/animation.json";
import { useEffect, useState } from "react";

import Link from "next/link";

import PasswordHint from "./login/PasswordHint";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/services/api/authServices";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  console.log(userId, registrationSuccess);
  const router = useRouter();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(null);
    setError(null);
    setShowPasswordHint(newPassword.length > 0);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=])[A-Za-z\d@$!%*?&#^+=]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPasswordError(null);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password doesn't meet requirements");
      setShowPasswordHint(true);
      setIsLoading(false);
      return;
    }

    const userData = { username, email, password };
    try {
      const data = await registerUser(userData);
      if (data && data.userId) {
        setUserId(data.userId);
        setRegistrationSuccess(true);
        router.push(
          `/verifyuser?userId=${data.userId}&email=${encodeURIComponent(email)}`
        );
      }
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] lg:border border-gray-300 flex flex-col md:flex-row rounded-lg overflow-hidden">
        {/* Left side - Animation */}
        <div className="hidden md:block md:w-1/2 p-8 lg:flex items-center justify-center">
          <div className="text-black text-center">
            <h2 className="text-3xl font-light mb-4 tracking-wide  drop-shadow-xs">
              Welcome to <span >Omeg Bazaar!</span>
            </h2>
            <p className="mb-6 text-sm  leading-relaxed max-w-md mx-auto">
              Create your account and continue your journey with us.
            </p>
            <div className="w-62 h-54 rounded-md flex justify-center items-center mx-auto">
              <Lottie animationData={LoginAnimation} loop={true} />
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full  flex items-center justify-center mb-4">
            <FaUserAlt className="text-gray-500 text-3xl" />
          </div>
          <h3 className="text-gray-800  text-2xl font-semibold mb-8">WELCOME</h3>

          {error && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="w-full space-y-4">
            {/* Username field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUserAlt className="text-gray-400" />
              </div>
              <input
                name="username"
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-2 text-xs border-b-2 border-gray-500 focus:outline-none focus:border-primary"
                required
                minLength={3}
              />
            </div>

            {/* Email field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUserAlt className="text-gray-400" />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full pl-10  text-xs pr-4 py-2 border-b-2 border-gray-500 focus:outline-none focus:border-primary"
                required
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                className={`w-full pl-10 pr-4 text-xs py-2 border-b-2 ${
                  passwordError ? "border-red-500" : "border-gray-500"
                } focus:outline-none focus:border-primary`}
                required
                onChange={handlePasswordChange}
                onFocus={() => setShowPasswordHint(true)}
                onBlur={() =>
                  setShowPasswordHint(
                    passwordError !== null || password.length > 0
                  )
                }
              />
            </div>

            {(showPasswordHint || passwordError) && (
              <PasswordHint password={password} errorMessage={passwordError} />
            )}

            {/* Confirm Password field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className={`w-full pl-10 pr-4 text-xs py-2 border-b-2 ${
                  passwordError ? "border-red-500" : "border-gray-500"
                } focus:outline-none focus:border-primary`}
                required
                onChange={() => {
                  setPasswordError(null);
                  setError(null);
                }}
              />
            </div>

            {passwordError && (
              <div className="text-red-500 text-sm -mt-2">{passwordError}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-800 hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-70"
            >
              {isLoading ? "Processing..." : "Register"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-gray-700 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
