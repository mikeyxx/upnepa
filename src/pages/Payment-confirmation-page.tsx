import { Clock, MessageCircle, Zap } from "lucide-react";
import { useAppSelector } from "../features/app/hooks.ts";
import { useNavigate } from "react-router";

const PaymentConfirmationPage = () => {
  const { isThemeDark } = useAppSelector((state) => state.appSettings);
  const { totalPayable, unit } = useAppSelector(
    (state) => state.totalAmountPayable,
  );
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const paymentDetails = {
    totalAmount: totalPayable,
    kwhUnits: unit,
    meterNumber: user?.meter_number,
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
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
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Success Icon and Title */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <Clock className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-yellow-800" />
            </div>
          </div>

          <h1
            className={`text-3xl lg:text-4xl font-bold mb-4 ${
              isThemeDark ? "text-white" : "text-gray-900"
            }`}
          >
            Payment Confirmation
          </h1>
          <p
            className={`text-lg ${
              isThemeDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Your electricity recharge is being processed
          </p>
        </div>

        {/* Payment Summary Card */}
        <div
          className={`${
            isThemeDark ? "bg-gray-800/50" : "bg-white/70"
          } backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${
            isThemeDark ? "border-gray-700/50" : "border-white/50"
          } mb-8`}
        >
          <div className="text-center mb-6">
            <div
              className={`text-sm font-medium mb-2 ${
                isThemeDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Amount Paid
            </div>
            <div
              className={`text-4xl font-bold mb-2 ${
                isThemeDark ? "text-white" : "text-gray-900"
              }`}
            >
              ₦{paymentDetails.totalAmount?.toLocaleString()}
            </div>
            <div
              className={`text-lg ${
                isThemeDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              For {paymentDetails.kwhUnits} kWh units
            </div>
          </div>

          <div
            className={`border-t pt-6 ${
              isThemeDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center">
              <span
                className={`text-sm font-medium ${
                  isThemeDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Meter Number
              </span>
              <span
                className={`font-bold ${
                  isThemeDark ? "text-white" : "text-gray-900"
                }`}
              >
                {paymentDetails.meterNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Processing Status */}
        <div
          className={`${
            isThemeDark ? "bg-gray-800/50" : "bg-white/70"
          } backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${
            isThemeDark ? "border-gray-700/50" : "border-white/50"
          } mb-8`}
        >
          <h2
            className={`text-2xl font-bold mb-6 ${
              isThemeDark ? "text-white" : "text-gray-900"
            }`}
          >
            What happens next?
          </h2>

          <div className="space-y-6">
            {/* Token Generation */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3
                  className={`font-semibold mb-2 ${
                    isThemeDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Payment Verification
                </h3>
                <p
                  className={`text-sm ${
                    isThemeDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  We're confirming your payment and will generate your prepaid
                  token within 1 hour
                </p>
              </div>
            </div>

            {/* Token Delivery */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3
                  className={`font-semibold mb-2 ${
                    isThemeDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Token Delivery
                </h3>
                <p
                  className={`text-sm ${
                    isThemeDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  You'll receive your token via WhatsApp once payment is
                  confirmed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Method */}
        <div
          className={`${
            isThemeDark ? "bg-gray-800/50" : "bg-white/70"
          } backdrop-blur-xl rounded-3xl p-6 shadow-2xl border ${
            isThemeDark ? "border-gray-700/50" : "border-white/50"
          } mb-8`}
        >
          <h3
            className={`font-semibold mb-4 text-center ${
              isThemeDark ? "text-white" : "text-gray-900"
            }`}
          >
            You'll receive your token via:
          </h3>

          <div className="flex justify-center">
            <div className="flex flex-col items-center p-4 rounded-2xl bg-green-50 border border-green-200">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-green-700">WhatsApp</span>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-orange-800 mb-2">
                Important Notice
              </h3>
              <div className="text-orange-700 space-y-1">
                <p>
                  Your payment is being verified. Token generation typically
                  takes up to 1 hour.
                </p>
                <p>
                  If you don't receive your token within 2 hours, please contact
                  our support team.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleBackToDashboard}
            className="w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
