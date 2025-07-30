import {
  createBrowserRouter,
  Navigate,
  useLocation,
  useSearchParams,
} from "react-router";
import { useAppSelector } from "./features/app/hooks.ts";
import Login from "./pages/Login.tsx";
import LandingPage from "./components/Landing-page.tsx";
import SignUp from "./pages/Sign-up.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Recharge from "./pages/Recharge.tsx";
import History from "./pages/History.tsx";
import React from "react";
import { getUserStatus } from "./features/services/cache.ts";
import PaymentPage from "./pages/Payment-page.tsx";
import PaymentConfirmationPage from "./pages/Payment-confirmation-page.tsx";
import ForgotPassword from "./pages/Forgot-Password.tsx";
import ContactSupport from "./pages/Contact-support.tsx";

const LoadingSpinner = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, status } = useAppSelector((state) => state.auth);
  const isFirstTimeLogin = getUserStatus();
  const location = useLocation();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Store current path as redirect parameter when redirecting to auth pages
  const currentPath = location.pathname;
  // const authPages = ["/login", "/signup", "/forgot-password", "/landing-page"];

  if (isFirstTimeLogin) {
    return (
      <Navigate
        to={`/landing-page?redirect=${encodeURIComponent(currentPath)}`}
        replace
      />
    );
  }

  return (
    <Navigate
      to={`/login?redirect=${encodeURIComponent(currentPath)}`}
      replace
    />
  );
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, status, isFirstTimeLogin } = useAppSelector(
    (state) => state.auth,
  );
  const [searchParams] = useSearchParams();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (isAuthenticated && !isFirstTimeLogin) {
    const redirectPath = searchParams.get("redirect");
    const targetPath =
      redirectPath && redirectPath !== "/" ? redirectPath : "/dashboard";
    return <Navigate to={targetPath} replace />;
  }

  return <>{children}</>;
};

const RootRoute = () => {
  const { isAuthenticated, status, isFirstTimeLogin } = useAppSelector(
    (state) => state.auth,
  );

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    const isFirstTime = getUserStatus();
    if (isFirstTime) {
      return <Navigate to="/landing-page" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  if (isFirstTimeLogin) {
    return <Navigate to="/landing-page" replace />;
  }

  // Default to dashboard for root path
  return <Navigate to="/dashboard" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    path: "/landing-page",
    element: (
      <PublicRoute>
        <LandingPage />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recharge",
    element: (
      <ProtectedRoute>
        <Recharge />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment",
    element: (
      <ProtectedRoute>
        <PaymentPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment-confirmation",
    element: (
      <ProtectedRoute>
        <PaymentConfirmationPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/history",
    element: (
      <ProtectedRoute>
        <History />
      </ProtectedRoute>
    ),
  },
  {
    path: "/contact-support",
    element: (
      <ProtectedRoute>
        <ContactSupport />
      </ProtectedRoute>
    ),
  },
]);
