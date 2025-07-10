import { useAppDispatch, useAppSelector } from "../features/app/hooks.ts";
import { useEffect } from "react";
import { setTheme } from "../features/slices/app-settings.ts";
import { Zap, HelpCircle, Home } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router";
import { removeToken } from "../api/api-methods.ts";
import { logout } from "../features/slices/auth.ts";

const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isThemeDark } = useAppSelector((state) => state.appSettings);
  const { isFirstTime } = useAppSelector((state) => state.appSettings);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  // Check system preference and set initial theme
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    dispatch(setTheme(mediaQuery.matches));

    const handleChange = (e: MediaQueryListEvent) =>
      dispatch(setTheme(e.matches));
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleLogout = async () => {
    dispatch(logout());
    removeToken();
    navigate("/login");
  };

  const handleContactSupport = () => {
    navigate("/contact-support");
  };

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  const routesInclude = ["/landing-page", "/login", "/signup"];

  return (
    <header
      className={`${isThemeDark ? "bg-gray-800" : "bg-white"} shadow-sm fixed top-0 z-50 w-full transition-colors duration-200`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-blue-600">UpNepa</div>
        </div>
        <div className="flex items-center space-x-3">
          {isAuthenticated &&
            (location.pathname === "/contact-support" ? (
              <button
                onClick={handleGoHome}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  isThemeDark
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                title="Go Home"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Home</span>
              </button>
            ) : (
              <button
                onClick={handleContactSupport}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  isThemeDark
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                title="Contact Support"
              >
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Support</span>
              </button>
            ))}
          {/*<button*/}
          {/*  onClick={() => dispatch(toggleTheme())}*/}
          {/*  className={`px-4 py-2 rounded-lg cursor-pointer ${*/}
          {/*    isThemeDark*/}
          {/*      ? "bg-gray-700 hover:bg-gray-600"*/}
          {/*      : "bg-gray-700 hover:bg-gray-200"*/}
          {/*  } transition-colors`}*/}
          {/*>*/}
          {/*  {isThemeDark ? "🌙" : "☀️"}*/}
          {/*</button>*/}
          {location.pathname === "/landing-page" && isFirstTime && (
            <Link
              to="/signup"
              className={`${isThemeDark ? "text-gray-100" : "text-gray-600"}`}
            >
              Sign Up
            </Link>
          )}
          {!routesInclude.includes(location.pathname) && (
            <button
              className={`${isThemeDark ? "signup-btn-dark" : "signup-btn"} cursor-pointer`}
              onClick={handleLogout}
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
