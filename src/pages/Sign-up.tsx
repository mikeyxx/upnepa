import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Zap,
  Lock,
  ArrowRight,
  Check,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../features/app/hooks.ts";
import InputField from "../components/ui/Input.tsx";
import Header from "../components/Header.tsx";
import { Link, useNavigate } from "react-router";
import { postData, setTokens } from "../api/api-methods.ts";
import { apiEndpoints } from "../api/api-endpoints.ts";
import { cacheUserStatus } from "../features/services/cache.ts";
import { login } from "../features/slices/auth.ts";

type FormFields =
  | "fullName"
  | "email"
  | "phone"
  | "address"
  | "meterNumber"
  | "password"
  | "confirmPassword";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  meterNumber: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  meterNumber?: string;
  password?: string;
  confirmPassword?: string;
  api?: string;
}

const SignUp = () => {
  const { isThemeDark } = useAppSelector((state) => state.appSettings);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    meterNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleInputChange = (field: FormFields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (Object.keys(errors).length > 0) {
      setErrors({});
    }
  };

  const validateStep = (step: number) => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
      ) {
        newErrors.email = "Invalid email address";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    } else if (step === 2) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.meterNumber.trim())
        newErrors.meterNumber = "Meter number is required";
      else if (!/^\d+$/.test(formData.meterNumber)) {
        newErrors.meterNumber = "Meter number must be numeric";
      }
    } else if (step === 3) {
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Please confirm your password";
      else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep(3)) {
      setIsSubmitting(true);
      try {
        const response = await postData(apiEndpoints.signup, formData);
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
        console.error("Sign Up Failed:", error);
        const errorMessage =
          error?.message || "An unexpected error occurred. Please try again.";
        // Set the error message in the state to be displayed in the UI
        setErrors({ api: errorMessage });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div
            className={`
            flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
            ${
              step <= currentStep
                ? "bg-blue-600 border-blue-600 text-white"
                : isThemeDark
                  ? "border-gray-600 text-gray-400"
                  : "border-gray-300 text-gray-400"
            }
          `}
          >
            {step < currentStep ? (
              <Check className="w-5 h-5" />
            ) : (
              <span className="text-sm font-semibold">{step}</span>
            )}
          </div>
          {step < 3 && (
            <div
              className={`
              w-16 h-0.5 mx-2 transition-all duration-300
              ${step < currentStep ? "bg-blue-600" : isThemeDark ? "bg-gray-600" : "bg-gray-300"}
            `}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

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
            {/* Left Column - Welcome Text */}
            <div className="text-center lg:text-left">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                  isThemeDark
                    ? "bg-blue-900/30 text-blue-300 border border-blue-700/50"
                    : "bg-blue-100 text-blue-700 border border-blue-200"
                }`}
              >
                <Zap className="w-4 h-4" />
                Join thousands of satisfied users
              </div>

              <h1
                className={`text-4xl lg:text-5xl font-bold mb-6 leading-tight ${isThemeDark ? "text-white" : "text-gray-900"}`}
              >
                Create Your
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  UpNepa Account
                </span>
              </h1>

              <p
                className={`text-lg mb-8 ${isThemeDark ? "text-gray-300" : "text-gray-600"}`}
              >
                Say goodbye to long queues and hello to instant electricity
                top-ups. Join the revolution in prepaid meter management.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {[
                  // "Instant meter top-ups from anywhere",
                  // "Smart reminders before your power runs out",
                  "Digital receipts sent to your phone",
                  "Track your monthly electricity spending",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span
                      className={
                        isThemeDark ? "text-gray-300" : "text-gray-700"
                      }
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Sign Up Form */}
            <div
              className={`${
                isThemeDark ? "bg-gray-800/50" : "bg-white/70"
              } backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${
                isThemeDark ? "border-gray-700/50" : "border-white/50"
              }`}
            >
              <StepIndicator />

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
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold mb-2">
                        Personal Information
                      </h2>
                      <p
                        className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Let's start with your basic details
                      </p>
                    </div>

                    <InputField
                      icon={User}
                      label="Full Name"
                      placeholder="John Doe"
                      field="fullName"
                      value={formData.fullName}
                      error={errors.fullName}
                      isThemeDark={isThemeDark}
                      onChange={(value) => handleInputChange("fullName", value)}
                    />

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
                      icon={Phone}
                      label="Phone Number (WhatsApp number (preferably) - We will send your token to this number)"
                      placeholder="080 0000 0000"
                      field="phone"
                      value={formData.phone}
                      error={errors.phone}
                      isThemeDark={isThemeDark}
                      maxLength={11}
                      allowNumbersOnly
                      onChange={(value) => handleInputChange("phone", value)}
                    />

                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Step 2: Address & Meter */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold mb-2">
                        Address & Meter Details
                      </h2>
                      <p
                        className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Help us locate and connect your meter
                      </p>
                    </div>

                    <InputField
                      icon={MapPin}
                      label="Home Address"
                      placeholder="123 Lagos Street, Ikeja"
                      field="address"
                      value={formData.address}
                      error={errors.address}
                      isThemeDark={isThemeDark}
                      onChange={(value) => handleInputChange("address", value)}
                    />

                    <InputField
                      icon={Zap}
                      label="Prepaid Meter Number"
                      placeholder="45678901234"
                      field="meterNumber"
                      value={formData.meterNumber}
                      error={errors.meterNumber}
                      allowNumbersOnly
                      maxLength={11}
                      isThemeDark={isThemeDark}
                      onChange={(value) =>
                        handleInputChange("meterNumber", value)
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
                        type="button"
                        onClick={handleNext}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                      >
                        Continue
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Password */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold mb-2">
                        Secure Your Account
                      </h2>
                      <p
                        className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Create a strong password to protect your account
                      </p>
                    </div>

                    <InputField
                      icon={Lock}
                      label="Password"
                      placeholder="••••••••"
                      field="password"
                      value={formData.password}
                      error={errors.password}
                      isThemeDark={isThemeDark}
                      onChange={(value) => handleInputChange("password", value)}
                      showToggle={true}
                      showPassword={showPassword}
                      onToggleVisibility={() => setShowPassword(!showPassword)}
                    />

                    <InputField
                      icon={Lock}
                      label="Confirm Password"
                      placeholder="••••••••"
                      field="confirmPassword"
                      showToggle={true}
                      value={formData.confirmPassword}
                      error={errors.confirmPassword}
                      isThemeDark={isThemeDark}
                      onChange={(value) =>
                        handleInputChange("confirmPassword", value)
                      }
                      showPassword={showConfirmPassword}
                      onToggleVisibility={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
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
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Create Account
                            <Check className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>

              {/* Login Link */}
              <div className="mt-8 text-center">
                <p
                  className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Sign in
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

export default SignUp;
