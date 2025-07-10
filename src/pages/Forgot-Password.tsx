import React, { useState } from "react";
import {
  Mail,
  Lock,
  ArrowRight,
  Shield,
  Clock,
  Smartphone,
  CheckCircle,
} from "lucide-react";
import Header from "../components/Header.tsx";
import InputField from "../components/ui/Input.tsx";
import { useAppSelector } from "../features/app/hooks.ts";
import { postData } from "../api/api-methods.ts";
import { apiEndpoints } from "../api/api-endpoints.ts";
import { useNavigate } from "react-router";

type FormFields = "email" | "newPassword" | "confirmPassword";

interface FormData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ForgotPassword = () => {
  const { isThemeDark } = useAppSelector((state) => state.appSettings);
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: email, 2: passwords
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: FormFields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateEmail = () => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswords = () => {
    const newErrors: FormErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateEmail()) {
      setIsVerifying(true);
      try {
        await postData(apiEndpoints.verifyEmail, { email: formData.email });
        setCurrentStep(2);
      } catch (error: any) {
        setErrors({
          email:
            error.response?.data?.message ||
            "Failed to verify email. Please try again.",
        });
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validatePasswords()) {
      setIsSubmitting(true);
      try {
        await postData(apiEndpoints.resetPassword, {
          email: formData.email,
          newPassword: formData.newPassword,
        });

        alert(
          "Password reset successful! You will be redirected to the login page.",
        );
        navigate("/login");
      } catch (error: any) {
        setErrors({
          newPassword:
            error.response?.data?.message ||
            "Failed to reset password. Please try again.",
        });
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
            {/* Left Column - Reset Password Text */}
            <div className="text-center lg:text-left">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                  isThemeDark
                    ? "bg-blue-900/30 text-blue-300 border border-blue-700/50"
                    : "bg-blue-100 text-blue-700 border border-blue-200"
                }`}
              >
                <Shield className="w-4 h-4" />
                Secure password reset
              </div>

              <h1
                className={`text-4xl lg:text-5xl font-bold mb-6 leading-tight ${isThemeDark ? "text-white" : "text-gray-900"}`}
              >
                Reset Your
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Password
                </span>
              </h1>

              <p
                className={`text-lg mb-8 ${isThemeDark ? "text-gray-300" : "text-gray-600"}`}
              >
                {currentStep === 1
                  ? "Enter your email address and we'll help you reset your password securely."
                  : "Your email has been verified. Now create a new strong password for your account."}
              </p>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                {[
                  { icon: Shield, text: "Secure verification process" },
                  { icon: Clock, text: "Quick password reset" },
                  { icon: Smartphone, text: "Access from any device" },
                  { icon: CheckCircle, text: "Encrypted and protected" },
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

            {/* Right Column - Reset Password Form */}
            <div
              className={`${
                isThemeDark ? "bg-gray-800/50" : "bg-white/70"
              } backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${
                isThemeDark ? "border-gray-700/50" : "border-white/50"
              }`}
            >
              <div className="text-center mb-8">
                <h2
                  className={`text-2xl font-bold mb-2 ${isThemeDark ? "text-white" : "text-gray-900"}`}
                >
                  {currentStep === 1
                    ? "Forgot Password?"
                    : "Create New Password"}
                </h2>
                <p
                  className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  {currentStep === 1
                    ? "Enter your registered email address"
                    : "Enter your new password below"}
                </p>
              </div>

              {/* Step 1: Email Verification */}
              {currentStep === 1 && (
                <form onSubmit={handleEmailSubmit} className="space-y-6">
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

                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isVerifying ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Verifying Email...
                      </>
                    ) : (
                      <>
                        Verify Email
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Step 2: New Password */}
              {currentStep === 2 && (
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  {/* Email confirmation */}
                  <div
                    className={`p-4 rounded-xl border ${
                      isThemeDark
                        ? "bg-green-900/20 border-green-700/50 text-green-300"
                        : "bg-green-50 border-green-200 text-green-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Email verified: {formData.email}
                      </span>
                    </div>
                  </div>

                  <InputField
                    icon={Lock}
                    label="New Password"
                    placeholder="••••••••"
                    field="newPassword"
                    showToggle={true}
                    value={formData.newPassword}
                    error={errors.newPassword}
                    isThemeDark={isThemeDark}
                    showPassword={showNewPassword}
                    onToggleVisibility={() =>
                      setShowNewPassword((prev) => !prev)
                    }
                    onChange={(value) =>
                      handleInputChange("newPassword", value)
                    }
                  />

                  <InputField
                    icon={Lock}
                    label="Confirm New Password"
                    placeholder="••••••••"
                    field="confirmPassword"
                    showToggle={true}
                    value={formData.confirmPassword}
                    error={errors.confirmPassword}
                    isThemeDark={isThemeDark}
                    showPassword={showConfirmPassword}
                    onToggleVisibility={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    onChange={(value) =>
                      handleInputChange("confirmPassword", value)
                    }
                  />

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                        isThemeDark
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      }`}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Resetting Password...
                        </>
                      ) : (
                        <>
                          Reset Password
                          <CheckCircle className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Back to Login Link */}
              <div className="mt-8 text-center">
                <p
                  className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Remember your password?{" "}
                  <a
                    href="/login"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Back to Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
