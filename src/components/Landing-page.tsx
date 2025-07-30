import { Clock, Receipt, CreditCard, Zap } from "lucide-react";
import nepaApp from "../assets/images/nepaapp.jpeg";
import { useAppSelector } from "../features/app/hooks.ts";
import { Link } from "react-router";
import Header from "./Header.tsx";

const UpNepaLanding = () => {
  const { isThemeDark } = useAppSelector((state) => state.appSettings);

  return (
    <>
      <Header />
      <div
        className={`min-h-screen transition-colors duration-300 pt-20 ${
          isThemeDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            You Deserve A Stress Free <br />
            <span className="text-blue-600">Prepaid Meter Top-Up</span>
          </h1>

          <p
            className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${
              isThemeDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Skip the queues, avoid the hassle. Top up your electricity meter
            from anywhere, anytime.
          </p>

          <Link
            to="/signup"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Try UpNepa App
          </Link>

          {/* Mobile App Screenshots Placeholder */}
          <div className="mt-16 flex justify-center items-center">
            <div
              className={`${
                isThemeDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-lg p-6 max-w-4xl w-full`}
            >
              <img src={nepaApp} alt="" className="w-full" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          className={`${isThemeDark ? "bg-gray-800" : "bg-white"} py-20`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get your Prepaid Token Delivered Straight to <br />
                Your Mobile Device.
              </h2>
            </div>

            <div className="mb-16">
              <div className="flex items-center justify-center mb-8">
                <Clock className="text-blue-600 mr-3" size={32} />
                <h3 className="text-2xl font-bold">Bye Bye To Long Queues</h3>
              </div>
              <p
                className={`text-center text-lg max-w-3xl mx-auto ${
                  isThemeDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                We believe your time is very important and should not be spent
                shuffling between banks queues, photocopying receipts, and
                waiting on Remita to work.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">No Queues</h4>
                  <p
                    className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Skip long bank lines and vendor queues
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    Prepaid Receipt sent to Mail/Whatsapp
                  </h4>
                  <p
                    className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Get instant digital receipts delivered to you
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    Bye to forgetting your meter number
                  </h4>
                  <p
                    className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Save and manage all your meter details
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    Track your monthly electricity spend
                  </h4>
                  <p
                    className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Monitor and analyze your power consumption
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    Smart Prepaid Reminders every Friday and Public Holidays
                  </h4>
                  <p
                    className={`text-sm ${isThemeDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Never run out of power unexpectedly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How It Works
            </h2>
            <p
              className={`text-lg ${isThemeDark ? "text-gray-300" : "text-gray-600"}`}
            >
              Simple steps to top up your electricity meter
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isThemeDark ? "bg-blue-900" : "bg-blue-100"
                }`}
              >
                <CreditCard className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Amount</h3>
              <p className={isThemeDark ? "text-gray-400" : "text-gray-600"}>
                Choose from quick amounts or enter a custom value
              </p>
            </div>

            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isThemeDark ? "bg-blue-900" : "bg-blue-100"
                }`}
              >
                <Zap className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Make Payment</h3>
              <p className={isThemeDark ? "text-gray-400" : "text-gray-600"}>
                Complete your payment with your bank app or online
              </p>
            </div>

            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isThemeDark ? "bg-blue-900" : "bg-blue-100"
                }`}
              >
                <Receipt className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Token</h3>
              <p className={isThemeDark ? "text-gray-400" : "text-gray-600"}>
                Receive your prepaid token on your device
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className={`${isThemeDark ? "bg-blue-900" : "bg-blue-600"} py-20 text-white`}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Go Stress-Free?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of users who have ditched the queues for convenient
              electricity top-ups
            </p>
            <Link
              to="/signup"
              className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Try UpNepa App
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`${isThemeDark ? "bg-gray-800" : "bg-gray-900"} text-white py-12`}
        >
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-4">UpNepa</div>
            <p className="text-gray-400 mb-6">
              Making electricity top-ups simple and stress-free
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default UpNepaLanding;
