import { User, MapPin, Hash, Zap, ArrowRight, Eye } from "lucide-react";
import { useAppSelector } from "../features/app/hooks.ts";
import Header from "../components/Header.tsx";
import { useNavigate } from "react-router";
import { useFetchTransactionHistory } from "../hooks/useFetchTransactionHistory.ts";
import moment from "moment";

export interface TransactionHistory {
  id: string;
  user_id: string;
  amount: string;
  unit: string;
  reference: string;
  meter_number: string;
  created_at: string;
}

const Dashboard = () => {
  const { isThemeDark } = useAppSelector((state) => state.appSettings);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const { data: recentTransactions, isLoading } = useFetchTransactionHistory(
    {},
  );

  const handleRecharge = () => {
    navigate("/recharge");
  };

  const handleViewAllTransactions = () => {
    navigate("/history");
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
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Power at your fingertips
              </span>
            </h1>
            <p
              className={`text-lg ${isThemeDark ? "text-gray-300" : "text-gray-600"}`}
            >
              Recharge your prepaid meter instantly, no queues required
            </p>
          </div>

          {/* Meter Information Section */}
          <div
            className={`${
              isThemeDark ? "bg-gray-800/50" : "bg-white/70 text-gray-900"
            } backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${
              isThemeDark ? "border-gray-700/50" : "border-white/50"
            } mb-8`}
          >
            <h2 className="text-2xl font-bold mb-6">Your Meter Information</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isThemeDark ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <User
                    className={`w-5 h-5 ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                  />
                </div>
                <div>
                  <span
                    className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Account Holder:
                  </span>
                  <span
                    className={`ml-2 font-semibold ${isThemeDark ? "text-white" : "text-gray-900"}`}
                  >
                    {user?.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isThemeDark ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <MapPin
                    className={`w-5 h-5 ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                  />
                </div>
                <div>
                  <span
                    className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Address:
                  </span>
                  <span
                    className={`ml-2 font-semibold ${isThemeDark ? "text-white" : "text-gray-900"}`}
                  >
                    {user?.address}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isThemeDark ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <Hash
                    className={`w-5 h-5 ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                  />
                </div>
                <div>
                  <span
                    className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Meter Number:
                  </span>
                  <span
                    className={`ml-2 font-semibold ${isThemeDark ? "text-white" : "text-gray-900"}`}
                  >
                    {user?.meter_number}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recharge Section */}
          <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-2">Ready to recharge?</h3>
              <p className="text-lg mb-8 opacity-90">
                Load electricity credit in seconds with our seamless process
              </p>

              <button
                onClick={handleRecharge}
                className={`bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-xl transform hover:scale-[1.02] hover:bg-gray-50 cursor-pointer`}
              >
                Recharge Your Prepaid Meter
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Recent Transactions Section */}
          {isLoading ? (
            // Skeleton Loader for Recent Transactions
            <div
              className={`${
                isThemeDark ? "bg-gray-800/50" : "bg-white/70"
              } backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${
                isThemeDark ? "border-gray-700/50" : "border-white/50"
              } animate-pulse`}
            >
              <div className={`h-7 bg-gray-600/50 rounded w-1/3 mb-6`}></div>
              <div className="space-y-4 mb-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-4 rounded-xl border ${
                      isThemeDark
                        ? "bg-gray-700/30 border-gray-600/50"
                        : "bg-gray-50/50 border-gray-200/50"
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`w-12 h-12 rounded-full ${isThemeDark ? "bg-gray-600" : "bg-gray-200"}`}
                      ></div>
                      <div className="w-full space-y-2">
                        <div
                          className={`h-4 rounded w-1/2 ${isThemeDark ? "bg-gray-600" : "bg-gray-200"}`}
                        ></div>
                        <div
                          className={`h-3 rounded w-1/3 ${isThemeDark ? "bg-gray-600" : "bg-gray-200"}`}
                        ></div>
                      </div>
                    </div>
                    <div
                      className={`h-6 rounded w-16 ${isThemeDark ? "bg-gray-600" : "bg-gray-200"}`}
                    ></div>
                  </div>
                ))}
              </div>
              <div
                className={`h-12 w-full rounded-xl border-2 border-dashed ${isThemeDark ? "border-gray-600" : "border-gray-300"}`}
              ></div>
            </div>
          ) : (
            recentTransactions?.length > 0 && (
              // Actual Recent Transactions
              <div
                className={`${
                  isThemeDark ? "bg-gray-800/50" : "bg-white/70"
                } backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${
                  isThemeDark ? "border-gray-700/50" : "border-white/50"
                }`}
              >
                <h2
                  className={`text-2xl font-bold mb-6 ${isThemeDark ? "text-gray-100" : "text-gray-700"}`}
                >
                  Recent Transactions
                </h2>
                <div className="space-y-4 mb-6">
                  {recentTransactions
                    ?.slice(0, 3)
                    ?.map((transaction: TransactionHistory) => (
                      <div
                        key={transaction.id}
                        className={`flex items-center justify-between p-4 rounded-xl border ${
                          isThemeDark
                            ? "bg-gray-700/30 border-gray-600/50"
                            : "bg-gray-50/50 border-gray-200/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              isThemeDark
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            <Zap className="w-6 h-6" />
                          </div>
                          <div>
                            <p
                              className={`font-semibold ${isThemeDark ? "text-white" : "text-gray-900"}`}
                            >
                              ₦{Number(transaction.amount).toLocaleString()}
                            </p>
                            <span
                              className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-500"}`}
                            >
                              {moment(transaction.created_at).format(
                                "MMM DD, YYYY",
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-bold text-lg ${isThemeDark ? "text-white" : "text-gray-900"}`}
                          >
                            {transaction.unit} kWh
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                <button
                  onClick={handleViewAllTransactions}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 border-2 border-dashed cursor-pointer ${
                    isThemeDark
                      ? "border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white hover:bg-gray-700/20"
                      : "border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Eye className="w-5 h-5" />
                  View all transactions
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
