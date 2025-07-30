import { useState } from "react";
import {
  Hash,
  MapPin,
  Plus,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAppSelector } from "../features/app/hooks.ts";
import Header from "../components/Header.tsx";
import { useNavigate } from "react-router";
import { getElectricityBreakdown } from "../utils/calculate-remita-charge.ts";
import { useAppDispatch } from "../features/app/hooks.ts";
import { setTotalPayable } from "../features/slices/transaction.ts";

const Recharge = () => {
  const { isThemeDark } = useAppSelector((state) => state.appSettings);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showCalculationDetails, setShowCalculationDetails] = useState(false);

  // Predefined amounts
  const predefinedAmounts = [5000, 10000, 15000, 20000];

  const SERVICE_FEE_PERCENTAGE = 0.05; // 5%
  const FLAT_SERVICE_FEE = 500;

  const handleAmountSelect = (amount: number | null) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    setShowCalculationDetails(true);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    if (value && parseFloat(value) > 0) {
      setShowCalculationDetails(true);
    } else {
      setShowCalculationDetails(false);
    }
  };

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const getSelectedAmount = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

  const isValidAmount = () => {
    const amount = getSelectedAmount();
    return amount > 0;
  };

  const calculateBreakdown = () => {
    const totalAmount = getSelectedAmount();
    if (totalAmount <= 0) return null;

    const electricityData = getElectricityBreakdown(totalAmount);

    // Apply flat or percentage service fee
    const serviceFee =
      totalAmount < 10000
        ? FLAT_SERVICE_FEE
        : electricityData.totalCost * SERVICE_FEE_PERCENTAGE;

    return {
      electricityCost: Math.max(0, totalAmount),
      remitaFee: electricityData.remitaFee,
      vat: electricityData.vat,
      serviceFee: Number(serviceFee.toFixed(2)),
      unitsToReceive: Math.max(0, electricityData.units),
      totalPayable: Number((electricityData.totalCost + serviceFee).toFixed(2)),
    };
  };

  const breakdown = calculateBreakdown();

  const handleProceedToPayment = () => {
    if (breakdown) {
      dispatch(
        setTotalPayable({
          totalPayable: Number(breakdown.totalPayable),
          unit: Number(breakdown.unitsToReceive),
        }),
      );
      navigate("/payment");
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
          {/* Header with Back Button */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleGoBack}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isThemeDark
                  ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50"
                  : "bg-white/70 hover:bg-white/90 border border-white/50"
              } backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              <ArrowLeft
                className={`w-5 h-5 ${isThemeDark ? "text-white" : "text-gray-900"}`}
              />
            </button>
            <div className="text-left">
              <h1
                className={`text-2xl sm:text-2xl lg:text-4xl font-bold mb-2 ${isThemeDark ? "text-white" : "text-gray-700"}`}
              >
                Recharge Meter
              </h1>
              <p
                className={`text-base sm:text-lg ${isThemeDark ? "text-gray-300" : "text-gray-600"}`}
              >
                Choose an amount to recharge
              </p>
            </div>
          </div>

          {/* Meter Information Section */}
          <div
            className={`${
              isThemeDark ? "bg-gray-800/50" : "bg-white/70"
            } backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${
              isThemeDark ? "border-gray-700/50" : "border-white/50"
            } mb-8`}
          >
            <h2
              className={`text-2xl font-bold mb-2 ${isThemeDark ? "text-gray-100" : "text-gray-600"}`}
            >
              Meter Information
            </h2>
            <p
              className={`text-sm mb-6 ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Your registered prepaid meter
            </p>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Hash
                    className={`w-5 h-5 ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                  />
                  <span
                    className={`font-medium ${isThemeDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Meter Number
                  </span>
                </div>
                <span
                  className={`font-semibold text-sm sm:text-base ${isThemeDark ? "text-white" : "text-gray-900"}`}
                >
                  {user?.meter_number}
                </span>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <MapPin
                    className={`w-5 h-5 ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                  />
                  <span
                    className={`font-medium ${isThemeDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Address
                  </span>
                </div>
                <span
                  className={`font-semibold text-sm sm:text-base text-right ${isThemeDark ? "text-white" : "text-gray-900"}`}
                >
                  {user?.address}
                </span>
              </div>
            </div>
          </div>

          {/* Enter Amount Section */}
          <div
            className={`${
              isThemeDark ? "bg-gray-800/50" : "bg-white/70"
            } backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${
              isThemeDark ? "border-gray-700/50" : "border-white/50"
            } mb-8`}
          >
            <h2
              className={`text-2xl font-bold mb-2 ${isThemeDark ? "text-gray-100" : "text-gray-600"}`}
            >
              Enter Amount
            </h2>
            <p
              className={`text-sm mb-6 ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
            >
              How much would you like to recharge?
            </p>

            {/* Custom Amount Input */}
            <div className="mb-6">
              <label
                className={`block text-sm font-semibold mb-2 ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Amount (₦)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Plus
                    className={`h-5 w-5 ${isThemeDark ? "text-gray-400" : "text-gray-500"}`}
                  />
                </div>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className={`
                w-full pl-12 pr-4 py-4 text-base rounded-xl border-2 transition-all duration-200
                ${
                  isThemeDark
                    ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-gray-800"
                    : "bg-white/70 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white"
                }
                focus:outline-none focus:ring-4 focus:ring-blue-500/20
              `}
                />
              </div>
            </div>

            {/* Predefined Amount Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className={`
                py-4 px-6 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 border-2
                ${
                  selectedAmount === amount
                    ? "bg-blue-600 border-blue-600 shadow-lg"
                    : isThemeDark
                      ? "text-gray-200 hover:border-gray-500 hover:bg-gray-700"
                      : "text-gray-700 hover:border-gray-300 hover:bg-gray-100"
                }
                transform hover:scale-[1.02] active:scale-[0.98]
              `}
                >
                  ₦{amount.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Calculation Details Section */}
            {showCalculationDetails && breakdown && (
              <div className="mb-8 animate-in slide-in-from-top-4 duration-300">
                <button
                  onClick={() =>
                    setShowCalculationDetails(!showCalculationDetails)
                  }
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                    isThemeDark
                      ? "bg-gray-700/50 border-gray-600 hover:bg-gray-700"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`font-semibold ${isThemeDark ? "text-white" : "text-gray-900"}`}
                  >
                    Calculation Details
                  </span>
                  {showCalculationDetails ? (
                    <ChevronUp
                      className={`w-5 h-5 ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                    />
                  ) : (
                    <ChevronDown
                      className={`w-5 h-5 ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                    />
                  )}
                </button>

                {showCalculationDetails && (
                  <div
                    className={`mt-4 p-6 rounded-xl border-2 ${
                      isThemeDark
                        ? "bg-gray-800/30 border-gray-700"
                        : "bg-white/50 border-gray-200"
                    } animate-in slide-in-from-top-2 duration-200`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span
                          className={`${isThemeDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Electricity Cost
                        </span>
                        <span
                          className={`font-semibold ${isThemeDark ? "text-white" : "text-gray-900"}`}
                        >
                          ₦{breakdown.electricityCost.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`${isThemeDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          VAT (6.98%)
                        </span>
                        <span className="font-semibold text-red-500">
                          -₦{breakdown.vat.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`${isThemeDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Remita Fee
                        </span>
                        <span className="font-semibold text-red-500">
                          -₦{breakdown.remitaFee.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`${isThemeDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Service Fee{" "}
                          <small>
                            (
                            {(selectedAmount || parseFloat(customAmount) || 0) <
                            10000
                              ? "Flat rate of ₦500"
                              : "5%"}
                            )
                          </small>
                        </span>
                        <span className="font-semibold text-red-500">
                          -₦{breakdown.serviceFee.toLocaleString()}
                        </span>
                      </div>

                      <div
                        className={`h-px bg-gradient-to-r ${
                          isThemeDark
                            ? "from-gray-700 to-gray-600"
                            : "from-gray-200 to-gray-300"
                        } my-4`}
                      ></div>

                      <div className="flex items-center justify-between text-lg">
                        <span
                          className={`font-semibold ${isThemeDark ? "text-white" : "text-gray-900"}`}
                        >
                          Units to Receive
                        </span>
                        <span
                          className={`font-bold ${isThemeDark ? "text-white" : "text-gray-900"}`}
                        >
                          {breakdown.unitsToReceive.toFixed(2)} kWh
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-lg">
                        <span
                          className={`font-semibold ${isThemeDark ? "text-white" : "text-gray-900"}`}
                        >
                          Total Payable
                        </span>
                        <span
                          className={`font-bold text-2xl ${isThemeDark ? "text-white" : "text-gray-900"}`}
                        >
                          ₦{breakdown.totalPayable.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Proceed to Payment Button */}
            <button
              onClick={handleProceedToPayment}
              disabled={!isValidAmount()}
              className={`
            w-full py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            ${
              isValidAmount()
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                : isThemeDark
                  ? "text-gray-200"
                  : "text-gray-900"
            }
          `}
            >
              Proceed to Payment
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Selected Amount Display */}
            {isValidAmount() && (
              <div className="mt-4 text-center">
                <p
                  className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Amount to recharge:
                  <span className="font-semibold text-blue-600 ml-1">
                    ₦{getSelectedAmount().toLocaleString()}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recharge;
