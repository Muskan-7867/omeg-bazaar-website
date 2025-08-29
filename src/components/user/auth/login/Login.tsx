"use client"
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import LoginAnimation from "../../../../../public/animations/animation.json"


import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import LoginForm from "./LoginForm";

import ForgotPassword from "./ForgotPassword";
import useCurrentUserStore from "@/store/User/user.store";
import { forgotPassword, loginUser } from "@/services/authServices";
import ScreenHandler from "@/components/wrappers/ScreenHandler";
import SuccessMessage from "@/components/common/SuccessMessage";
import { useRouter } from "next/navigation";

const Login = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggined } = useCurrentUserStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const navigate = useRouter();
  const queryClient = useQueryClient();
  const { reFetch } = useCurrentUserStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const validatePassword = (password: string) => {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=])[A-Za-z\d@$!%*?&#^+=]{8,}$/;
      return passwordRegex.test(password);
    };

    try {
      const formData = new FormData(e.currentTarget);
      const userData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string
      };

      if (!validatePassword(userData.password)) {
        setErrorMessage("Invalid password format");
        setShowPasswordHint(true);
        return;
      }

      const data = await loginUser(userData);
      if (data.token) {
        Cookies.set("authToken", data.token, { expires: 7 });
      }

      reFetch();
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      await queryClient.refetchQueries({ queryKey: ["currentUser"] });

      setSuccessMessage("Login successful! Redirecting...");
      setErrorMessage(null);

      let redirectPath = "/";
      const loginFrom = sessionStorage.getItem("loginFrom");
      const prevPath = sessionStorage.getItem("prevPath");

      if (loginFrom === "dashboard") {
        redirectPath = "/";
      } else if (prevPath) {
        redirectPath = prevPath;
      }

      sessionStorage.removeItem("loginFrom");
      sessionStorage.removeItem("prevPath");

      navigate.push(redirectPath);
    } catch {
      console.error("Login error:");
      setErrorMessage("Login failed. Please try again.");
      setShowPasswordHint(true);
    } finally {
      setIsLoading(false);
    }
  };

const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const data = await forgotPassword(forgotPasswordEmail);
    setForgotPasswordStatus({
      success: true,
      message: data.message || "Password reset email sent successfully"
    });
  } catch (error) {
    setForgotPasswordStatus({
      success: false,
      message: error instanceof Error ? error.message : "An error occurred. Please try again."
    });
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    if (isLoggined) {
      const prevPath = sessionStorage.getItem("prevPath");
      navigate.push(prevPath || "/");
    }
  }, [isLoggined, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScreenHandler>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] bg-white flex flex-col md:flex-row relative rounded-lg overflow-hidden">
          {successMessage && <SuccessMessage successMessage={successMessage} />}

          {/* Left panel with Lottie animation */}
          <div className="hidden md:block md:w-1/2 bg-red-50 p-8 lg:flex items-center justify-center">
            <div className="text-black text-center">
              <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
              <p className="mb-6">
                Login to access your account and continue your journey with us.
              </p>
              <div className="w-62 h-54 rounded-md flex justify-center items-center mx-auto">
                <Lottie animationData={LoginAnimation} loop={true} />
              </div>
            </div>
          </div>

          {/* Right panel with login form */}

          {!showForgotPassword ? (
            <LoginForm
              handleLogin={handleLogin}
              password={password}
              setPassword={setPassword}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              showPasswordHint={showPasswordHint}
              setShowPasswordHint={setShowPasswordHint}
              isLoading={isLoading}
              onForgotPassword={() => setShowForgotPassword(true)}
            />
          ) : (
            <ForgotPassword
              forgotPasswordStatus={forgotPasswordStatus}
              setShowForgotPassword={setShowForgotPassword}
              forgotPasswordEmail={forgotPasswordEmail}
              setForgotPasswordEmail={setForgotPasswordEmail}
              handleForgotPassword={handleForgotPassword}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </ScreenHandler>
  );
};

export default Login;
