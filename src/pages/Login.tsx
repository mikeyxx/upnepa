import React, { useState } from "react";
import {
  Mail,
  Lock,
  Zap,
  ArrowRight,
  Shield,
  Clock,
  Smartphone,
} from "lucide-react";
import { useAppSelector } from "../features/app/hooks.ts";
import InputField from "../components/ui/Input.tsx";
import Header from "../components/Header.tsx";
import { Link, useNavigate } from "react-router";
import { postData, setTokens } from "../api/api-methods.ts";
import { apiEndpoints } from "../api/api-endpoints.ts";
import { useAppDispatch } from "../features/app/hooks.ts";
import { login } from "../features/slices/auth.ts";
import { cacheUserStatus } from "../features/services/cache.ts";

type FormFields = "email" | "password";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  api?: string;
}

const Login = () => {
  const { isThemeDark } = useAppSelector((state) => state.appSettings);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useAppDispatch();

  const handleInputChange = (field: FormFields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (Object.keys(errors).length > 0) {
      setErrors({});
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      const payload = {
        ...formData,
        rememberMe: rememberMe,
      };
      try {
        const response = await postData(apiEndpoints.login, payload);
        if (response.success) {
          setTokens(response.accessToken);
          cacheUserStatus(response.user.isFirstTimeLogin);
          dispatch(
            login({
              token: response.accessToken,
              user: response.user,
            }),
          );
          navigate("/dashboard");
        }
      } catch (error: any) {
        console.error("Login failed:", error);
        const errorMessage =
          error?.message || "An unexpected error occurred. Please try again.";
        // Set the error message in the state to be displayed in the UI
        setErrors({ api: errorMessage });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <Header />
      <div
        className={`min-h-screen transition-all duration-500 pt-20 ${
          isThemeDark
            ? "bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900"
            : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
        }`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse ${
              isThemeDark ? "bg-blue-500" : "bg-blue-400"
            }`}
          ></div>
          <div
            className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse delay-1000 ${
              isThemeDark ? "bg-indigo-500" : "bg-indigo-400"
            }`}
          ></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center lg:mt-16">
            {/* Left Column - Welcome Back Text */}
            <div className="text-center lg:text-left">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                  isThemeDark
                    ? "bg-blue-900/30 text-blue-300 border border-blue-700/50"
                    : "bg-blue-100 text-blue-700 border border-blue-200"
                }`}
              >
                <Zap className="w-4 h-4" />
                Welcome back to UpNepa
              </div>

              <h1
                className={`text-4xl lg:text-5xl font-bold mb-6 leading-tight ${isThemeDark ? "text-white" : "text-gray-900"}`}
              >
                Sign in to
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Your Account
                </span>
              </h1>

              <p
                className={`text-lg mb-8 ${isThemeDark ? "text-gray-300" : "text-gray-600"}`}
              >
                Access your dashboard and manage your electricity top-ups with
                ease. Your power, your control.
              </p>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                {[
                  { icon: Clock, text: "Quick access to your meter balance" },
                  { icon: Smartphone, text: "Mobile-friendly dashboard" },
                  { icon: Shield, text: "Secure and encrypted transactions" },
                  { icon: Zap, text: "Instant power top-ups anytime" },
                ].map(({ icon: Icon, text }, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3 h-3 text-white" />
                    </div>
                    <span
                      className={
                        isThemeDark ? "text-gray-300" : "text-gray-700"
                      }
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Login Form */}
            <div
              className={`${
                isThemeDark ? "bg-gray-800/50" : "bg-white/70"
              } backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${
                isThemeDark ? "border-gray-700/50" : "border-white/50"
              }`}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                <p
                  className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Enter your credentials to access your account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.api && (
                  <div
                    className={`p-4 text-center text-sm rounded-xl border ${
                      isThemeDark
                        ? "bg-red-900/20 border-red-700/50 text-red-300"
                        : "bg-red-100 border-red-200 text-red-700"
                    }`}
                    role="alert"
                  >
                    {errors.api}
                  </div>
                )}
                <InputField
                  icon={Mail}
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  field="email"
                  value={formData.email}
                  error={errors.email}
                  isThemeDark={isThemeDark}
                  onChange={(value) => handleInputChange("email", value)}
                />

                <InputField
                  icon={Lock}
                  label="Password"
                  placeholder="••••••••"
                  field="password"
                  showToggle={true}
                  value={formData.password}
                  error={errors.password}
                  isThemeDark={isThemeDark}
                  showPassword={showPassword}
                  onToggleVisibility={() => setShowPassword((prev) => !prev)}
                  onChange={(value) => handleInputChange("password", value)}
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span
                      className={`text-sm ${isThemeDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p
                  className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
