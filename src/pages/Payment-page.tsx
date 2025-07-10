import { useState } from "react";
import { ArrowLeft, CreditCard, Copy, Clock, CheckCircle } from "lucide-react";
import { useAppSelector } from "../features/app/hooks.ts";
import Header from "../components/Header.tsx";
import { useNavigate } from "react-router";
import { postData } from "../api/api-methods.ts";
import { apiEndpoints } from "../api/api-endpoints.ts";
import Button from "../components/ui/Button.tsx";

const PaymentPage = () => {
  const { isThemeDark } = useAppSelector((state) => state.appSettings);
  const { totalPayable, unit } = useAppSelector(
    (state) => state.totalAmountPayable,
  );
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [copiedField, setCopiedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log({ user });

  // Payment details
  const paymentDetails = {
    totalAmount: totalPayable,
    kwhUnits: unit,
    accountNumber: "5329499488",
    accountName: "Greylabs",
    bankName: "MoniePoint",
  };

  const handleCopy = (text: string, field: any) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleBack = () => {
    navigate("/recharge");
  };

  // userId, amount, unit, meter_number

  const handleTransferComplete = async () => {
    setIsLoading(true);
    const payload = {
      amount: totalPayable,
      unit: unit,
      meter_number: user?.meter_number,
      userId: user?.userId,
    };

    try {
      const response = await postData(apiEndpoints.save_transaction, payload);
      console.log(response);
      if (response.success) {
        navigate("/payment-confirmation");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
          {/* Header with Back Button and Payment Badge */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isThemeDark
                  ? "text-gray-300 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg border border-blue-200">
              <CreditCard className="w-4 h-4" />
              <span className="font-semibold">Payment</span>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Complete Your Payment
            </h1>
            <p
              className={`text-lg ${isThemeDark ? "text-gray-300" : "text-gray-600"}`}
            >
              Transfer the exact amount to complete your recharge
            </p>
          </div>

          {/* Total Amount Card */}
          <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-xl font-semibold mb-2 opacity-90">
                Total Amount
              </h2>
              <div className="text-5xl font-bold mb-2">
                ₦{paymentDetails?.totalAmount?.toLocaleString()}
              </div>
              <p className="text-lg opacity-90">
                For {paymentDetails.kwhUnits} kWh units
              </p>
            </div>
          </div>

          {/* Transfer Details Card */}
          <div
            className={`${
              isThemeDark ? "bg-gray-800/50" : "bg-white/70"
            } backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${
              isThemeDark ? "border-gray-700/50" : "border-white/50"
            } mb-6`}
          >
            <h2 className="text-2xl font-bold mb-6">
              Transfer to this account
            </h2>

            <div className="space-y-6">
              {/* Account Number */}
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Account Number
                  </p>
                  <p
                    className={`text-xl font-bold ${isThemeDark ? "text-white" : "text-gray-900"}`}
                  >
                    {paymentDetails.accountNumber}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleCopy(paymentDetails.accountNumber, "accountNumber")
                  }
                  className={`p-2 rounded-lg transition-colors ${
                    copiedField === "accountNumber"
                      ? "bg-green-100 text-green-600"
                      : isThemeDark
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {copiedField === "accountNumber" ? (
                    <CheckCircle className="w-5 h-5 cursor-pointer" />
                  ) : (
                    <Copy className="w-5 h-5 cursor-pointer" />
                  )}
                </button>
              </div>

              {/* Account Name */}
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Account Name
                  </p>
                  <p
                    className={`text-xl font-bold ${isThemeDark ? "text-white" : "text-gray-900"}`}
                  >
                    {paymentDetails.accountName}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleCopy(paymentDetails.accountName, "accountName")
                  }
                  className={`p-2 rounded-lg transition-colors ${
                    copiedField === "accountName"
                      ? "bg-green-100 text-green-600"
                      : isThemeDark
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {copiedField === "accountName" ? (
                    <CheckCircle className="w-5 h-5 cursor-pointer" />
                  ) : (
                    <Copy className="w-5 h-5 cursor-pointer" />
                  )}
                </button>
              </div>

              {/* Bank Name */}
              <div>
                <p
                  className={`text-sm font-medium ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Bank
                </p>
                <p
                  className={`text-xl font-bold ${isThemeDark ? "text-white" : "text-gray-900"}`}
                >
                  {paymentDetails.bankName}
                </p>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-orange-800 mb-2">
                  Important
                </h3>
                <div className="text-orange-700 space-y-1">
                  <p>
                    Transfer the exact amount:{" "}
                    <span className="font-bold">
                      ₦{paymentDetails?.totalAmount?.toLocaleString()}
                    </span>
                  </p>
                  <p>
                    Include your meter number in the narration for faster
                    processing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Button */}
          <Button
            onClick={handleTransferComplete}
            disabled={isLoading}
            className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-4 cursor-pointer
             `}
            loading={isLoading}
          >
            I've Transferred the Money
          </Button>

          {/* Footer Text */}
          <p
            className={`text-center text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Click only after completing the transfer
          </p>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
