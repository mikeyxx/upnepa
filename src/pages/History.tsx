import {
  Search,
  Filter,
  Calendar,
  Clock,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "../features/app/hooks.ts";
import Header from "../components/Header.tsx";
import { useNavigate } from "react-router";
import { useFetchTransactionHistory } from "../hooks/useFetchTransactionHistory.ts";
import type { TransactionHistory } from "./Dashboard.tsx";
import moment from "moment-timezone";
import { getDateRangeFromFilter } from "../utils/getDateRange.ts";

const History = () => {
  const { isThemeDark } = useAppSelector((state) => state.appSettings);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const { startDate, endDate } = getDateRangeFromFilter(dateFilter);

  const { data: recentTransactions } = useFetchTransactionHistory({
    startDate,
    endDate,
    reference: searchTerm,
  });

  // Filter transactions based on search and filters
  const filteredTransactions = recentTransactions?.filter(
    (transaction: TransactionHistory) =>
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleGoBack = () => {
    navigate("/dashboard");
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
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoBack}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  isThemeDark
                    ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50"
                    : "bg-white/70 hover:bg-white/90 border border-white/50"
                } backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105`}
              >
                <ArrowLeft
                  className={`w-5 h-5 ${isThemeDark ? "text-white" : "text-gray-900"}`}
                />
              </button>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Transaction History
                  </span>
                </h1>
                <p
                  className={`text-lg ${isThemeDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  View and manage all your electricity top-up transactions
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div
            className={`${
              isThemeDark ? "bg-gray-800/50" : "bg-white/70"
            } backdrop-blur-xl rounded-3xl p-6 shadow-2xl border ${
              isThemeDark ? "border-gray-700/50" : "border-white/50"
            } mb-8`}
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isThemeDark ? "text-gray-400" : "text-gray-500"}`}
                />
                <input
                  type="text"
                  placeholder="Search by reference, amount, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                    isThemeDark
                      ? "bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400"
                      : "bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200`}
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isThemeDark
                    ? "bg-gray-700/50 hover:bg-gray-600/50 text-white border border-gray-600/50"
                    : "bg-gray-100/50 hover:bg-gray-200/50 text-gray-900 border border-gray-300/50"
                }`}
              >
                <Filter className="w-5 h-5" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-300/20">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  {/* Date Filter */}
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${isThemeDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Date Range
                    </label>
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        isThemeDark
                          ? "bg-gray-700/50 border-gray-600/50 text-white"
                          : "bg-white/50 border-gray-300/50 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200`}
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Transaction List */}
          <div
            className={`${
              isThemeDark ? "bg-gray-800/50" : "bg-white/70"
            } backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${
              isThemeDark ? "border-gray-700/50" : "border-white/50"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">All Transactions</h2>
              <span
                className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {filteredTransactions?.length} transaction
                {filteredTransactions?.length !== 1 ? "s" : ""} found
              </span>
            </div>

            {filteredTransactions?.length === 0 ? (
              <div className="text-center py-12">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    isThemeDark ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <Search
                    className={`w-8 h-8 ${isThemeDark ? "text-gray-400" : "text-gray-500"}`}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  No transactions found
                </h3>
                <p
                  className={`${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTransactions?.map(
                  (transaction: TransactionHistory) => (
                    <div
                      key={transaction.id}
                      className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                        isThemeDark
                          ? "bg-gray-700/30 border-gray-600/50 hover:bg-gray-700/50"
                          : "bg-gray-50/50 border-gray-200/50 hover:bg-white/70"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              isThemeDark ? "bg-blue-500/20" : "bg-blue-100"
                            }`}
                          >
                            <Calendar
                              className={`w-6 h-6 ${isThemeDark ? "text-blue-400" : "text-blue-600"}`}
                            />
                          </div>
                          <div>
                            <h3
                              className={`font-semibold text-lg ${isThemeDark ? "text-white" : "text-gray-900"}`}
                            >
                              Electricity Top-up
                            </h3>
                            <p
                              className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                            >
                              Ref: {transaction.reference}
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                              <div className="flex items-center gap-1">
                                <Calendar
                                  className={`w-4 h-4 ${isThemeDark ? "text-gray-400" : "text-gray-500"}`}
                                />
                                <span
                                  className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-500"}`}
                                >
                                  {formatDate(
                                    transaction.created_at.slice(0, 10),
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock
                                  className={`w-4 h-4 ${isThemeDark ? "text-gray-400" : "text-gray-500"}`}
                                />
                                <span
                                  className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-500"}`}
                                >
                                  {moment
                                    .utc(transaction.created_at)
                                    .tz("Africa/Lagos")
                                    .format("hh:mm A")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-bold text-xl ${isThemeDark ? "text-white" : "text-gray-900"}`}
                          >
                            ₦{Number(transaction.amount).toLocaleString()}
                          </p>
                          <p
                            className={`text-xs mt-1 ${isThemeDark ? "text-gray-400" : "text-gray-500"}`}
                          >
                            Meter: {transaction.meter_number}
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
