import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";
import { apiEndpoints } from "./api-endpoints";
import CONFIG from "../utils/config.ts";

const AUTH_TOKEN_KEY = "authToken";

// --- TOKEN MANAGEMENT FUNCTIONS ---
export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const setTokens = (authToken: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY, authToken);
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

// --- NAVIGATION ---
const navigateToLogin = () => {
  window.location.href = "/login";
};

// --- AXIOS INSTANCE ---
const baseURL = CONFIG.BASE_URL;

export interface CustomAxiosInstance
  extends Omit<AxiosInstance, "get" | "post" | "put" | "delete" | "patch"> {
  // Add the call signature to match axios instance's ability to be called directly
  <T = any>(config: AxiosRequestConfig): Promise<T>;

  // Include existing method definitions
  get<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any, D = any, R = T>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  put<T = any, D = any, R = T>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  patch<T = any, D = any, R = T>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  delete<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

// Create the axios instance with the custom type
export const axiosInstance = axios.create({
  baseURL,
  timeout: 30000, // 30 seconds
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
}) as CustomAxiosInstance;

// --- TOKEN REFRESH LOGIC ---
let isRefreshing = false; // Flag to prevent multiple refresh calls
// Queue for requests that failed due to 401 while token was being refreshed
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token); // Resolve with the new token for retrying the request
    }
  });
  failedQueue = [];
};

// --- REQUEST INTERCEPTOR ---
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (!isRefreshing) {
      const authToken = getAuthToken();
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
    }

    const isFormData = config.data instanceof FormData;
    if (
      !isFormData &&
      !config.headers["Content-Type"] &&
      typeof config.data === "object" &&
      config.data !== null
    ) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("Axios Request Interceptor Error:", error);
    return Promise.reject(error);
  },
);

// --- RESPONSE INTERCEPTOR ---
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Define endpoints that should not trigger a token refresh
    const noRefreshEndpoints = [
      apiEndpoints.login,
      apiEndpoints.signup, // It's good practice to add sign-up as well
      apiEndpoints.verifyEmail,
      apiEndpoints.resetPassword,
    ];

    // Handle 401 Unauthorized errors (token expired or invalid)
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !noRefreshEndpoints.includes(originalRequest.url || "")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(async (newAccessToken) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("Attempting to refresh token...");
        const refreshResponse = await axios.post(
          apiEndpoints.refresh_token,
          {},
          { withCredentials: true },
        );

        const { accessToken: newAccessToken } = refreshResponse.data;

        if (!newAccessToken) {
          throw new Error(
            "New access token not received from refresh endpoint.",
          );
        }
        setTokens(newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        processQueue(null, newAccessToken);
        console.log("Token refreshed successfully.");
        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        console.error(
          "Refresh token failed:",
          refreshError.response?.data || refreshError.message,
        );
        processQueue(refreshError, null);
        removeToken();
        window.alert("Your session has expired. Please log in again.");
        navigateToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    console.error(
      "Axios Interceptor Error:",
      error.response?.data || error.message,
    );

    return Promise.reject(error.response?.data || error);
  },
);

// --- API Service Functions (remain the same) ---

export const getData = async <TResponse = any>(
  url: string,
  params?: Record<string, any>,
): Promise<TResponse> => {
  // `await axiosInstance.get` will yield TResponse (the data) due to the interceptor
  const responseData: TResponse = await axiosInstance.get<TResponse>(url, {
    params,
  });
  return responseData;
};

export const postData = async <TResponse = any, TRequest = any>(
  url: string,
  reqBody: TRequest,
): Promise<TResponse> => {
  // `await axiosInstance.post` will yield TResponse (the data) due to the interceptor
  const responseData: TResponse = await axiosInstance.post<TResponse>(
    url,
    reqBody,
  );
  return responseData;
};

export const postFormData = async <TResponse = any>(
  url: string,
  formData: FormData, // Explicitly type as FormData
  config?: AxiosRequestConfig, // Allow passing custom config like onUploadProgress
): Promise<TResponse> => {
  // When sending FormData, do NOT manually set 'Content-Type' header here.
  // Axios handles it correctly. The request interceptor also avoids setting Content-Type for FormData.
  return await axiosInstance.post<TResponse>(url, formData, {
    ...config, // Spread any custom config passed
    // headers are handled by interceptor or Axios for FormData
  });
};

export const patchData = async <TResponse = any, TRequest = any>(
  url: string,
  reqBody: TRequest,
): Promise<TResponse> => {
  // `await axiosInstance.patch` will yield TResponse (the data) due to the interceptor
  const responseData: TResponse = await axiosInstance.patch<TResponse>(
    url,
    reqBody,
  );
  return responseData;
};

/**
 * Specifically for PATCH requests with FormData (e.g., file uploads).
 * Axios will automatically set the correct 'Content-Type: multipart/form-data' with boundary.
 */
export const patchFormData = async <TResponse = any>(
  url: string,
  formData: FormData, // Explicitly type as FormData
  config?: AxiosRequestConfig, // Allow passing custom config like onUploadProgress
): Promise<TResponse> => {
  // When sending FormData, do NOT manually set 'Content-Type' header here.
  // Axios handles it correctly. The request interceptor also avoids setting Content-Type for FormData.
  return await axiosInstance.patch<TResponse>(url, formData, {
    ...config, // Spread any custom config passed
    // headers are handled by interceptor or Axios for FormData
  });
};

export const deleteData = async <TResponse = any>(
  url: string,
): Promise<TResponse> => {
  // `await axiosInstance.delete` will yield TResponse (the data) due to the interceptor
  const responseData: TResponse = await axiosInstance.delete<TResponse>(url);
  return responseData;
};
