import { useQuery } from "@tanstack/react-query";
import { apiEndpoints } from "../api/api-endpoints.ts";
import { getData } from "../api/api-methods.ts";
type FilterType = "today" | "week" | "month" | "all";

type Params = {
  startDate?: string;
  endDate?: string;
  reference?: string;
  meter_number?: string;
  filter?: FilterType; // purely frontend use
};

const fetchHistory = async (params: Params = {}) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v != null && v !== ""),
  );
  const query = new URLSearchParams(
    cleanParams as Record<string, string>,
  ).toString();
  const endpoint = `${apiEndpoints.get_transaction_history}?${query}`;
  const response = await getData(endpoint);
  return response.data;
};

export const useFetchTransactionHistory = (params: Params = {}) => {
  return useQuery({
    queryKey: ["transactionHistory", params],
    queryFn: () => fetchHistory(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
