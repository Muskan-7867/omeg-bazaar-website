import { FaLock, FaUserAlt } from "react-icons/fa";
import PasswordHint from "./PasswordHint";
import { Dispatch, SetStateAction } from "react";
import  Link  from "next/link";

type LoginFormProps = {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  errorMessage: string | null;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
  showPasswordHint: boolean;
  setShowPasswordHint: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  onForgotPassword: () => void;
};
const LoginForm = ({
  handleLogin,
  password,
  setPassword,
  errorMessage,
  setErrorMessage,
  showPasswordHint,
  setShowPasswordHint,
  isLoading,
  onForgotPassword
}: LoginFormProps) => {
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setErrorMessage(null);
    setShowPasswordHint(newPassword.length > 0);
  };

  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col items-center">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4">
        <FaUserAlt className="text-gray-500 text-3xl" />
      </div>
      <h3 className="text-primary text-2xl font-semibold mb-8">WELCOME</h3>

      {/* Error messages */}
      {errorMessage && (
        <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleLogin} className="w-full space-y-4">
        {/* Email field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaUserAlt className="text-gray-400" />
          </div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full pl-10 text-xs pr-4 py-2 border-b-2 border-primary focus:outline-none focus:border-primary"
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
            className={`w-full pl-10 text-xs pr-4 py-2 border-b-2 ${
              errorMessage ? "border-red-500" : "border-primary"
            } focus:outline-none focus:border-primary`}
            required
            onChange={handlePasswordChange}
            onFocus={() => setShowPasswordHint(true)}
            onBlur={() =>
              setShowPasswordHint(errorMessage !== null || password.length > 0)
            }
          />
        </div>

        {/* Password requirements hint - shows when relevant */}
        {(showPasswordHint || errorMessage) && (
          <PasswordHint password={password} errorMessage={errorMessage} />
        )}
        <p className="text-sm text-right mt-2">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-primary hover:underline focus:outline-none"
          >
            Forgot password?
          </button>
        </p>
        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center disabled:opacity-70"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Login"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
