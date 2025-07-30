import React, { useEffect, useState } from "react";
import { useAppSelector } from "../features/app/hooks.ts";
import {
  Clock,
  Send,
  HelpCircle,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Header from "../components/Header.tsx";
import { postData } from "../api/api-methods.ts";
import { apiEndpoints } from "../api/api-endpoints.ts";

type SuccessStatus = "success" | "error" | null;

const ContactSupport = () => {
  const { isThemeDark } = useAppSelector((state) => state.appSettings);
  const { user } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    priority: "medium",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SuccessStatus>(null);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await postData(apiEndpoints.contact_support, formData);

      if (response?.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          category: "",
          priority: "medium",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const supportCategories = [
    { value: "", label: "Select a category" },
    { value: "technical", label: "Technical Issue" },
    { value: "billing", label: "Billing & Payments" },
    { value: "account", label: "Account Management" },
    { value: "feature", label: "Feature Request" },
    { value: "bug", label: "Bug Report" },
    { value: "other", label: "Other" },
  ];

  const priorityLevels = [
    { value: "low", label: "Low - General inquiry" },
    { value: "medium", label: "Medium - Standard issue" },
    { value: "high", label: "High - Urgent issue" },
    { value: "critical", label: "Critical - Service down" },
  ];

  const baseClasses = {
    container: `min-h-screen pt-20 pb-10 px-4 transition-colors duration-200 ${
      isThemeDark ? "bg-gray-900" : "bg-gray-50"
    }`,
    card: `rounded-xl shadow-lg transition-colors duration-200 ${
      isThemeDark ? "bg-gray-800" : "bg-white"
    }`,
    text: {
      primary: isThemeDark ? "text-white" : "text-gray-900",
      secondary: isThemeDark ? "text-gray-300" : "text-gray-600",
      muted: isThemeDark ? "text-gray-400" : "text-gray-500",
    },
    input: `w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
      isThemeDark
        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`,
    button: {
      primary: `px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
        isThemeDark
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`,
      secondary: `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
        isThemeDark
          ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
      }`,
    },
  };

  return (
    <>
      <Header />
      <div className={baseClasses.container}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1
              className={`text-4xl font-bold mb-4 ${baseClasses.text.primary}`}
            >
              Contact Support
            </h1>
            <p
              className={`text-lg max-w-2xl mx-auto ${baseClasses.text.secondary}`}
            >
              Need help? We're here to assist you. Fill out the form below.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Methods */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Contact Options */}
              {/*<div className={baseClasses.card + " p-6"}>*/}
              {/*  <h2*/}
              {/*    className={`text-xl font-semibold mb-4 ${baseClasses.text.primary}`}*/}
              {/*  >*/}
              {/*    Quick Contact*/}
              {/*  </h2>*/}
              {/*  <div className="space-y-4">*/}
              {/*    <a*/}
              {/*      href="mailto:support@upnepa.com"*/}
              {/*      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${*/}
              {/*        isThemeDark ? "hover:bg-gray-700" : "hover:bg-gray-50"*/}
              {/*      }`}*/}
              {/*    >*/}
              {/*      <Mail className="w-5 h-5 text-blue-600" />*/}
              {/*      <div>*/}
              {/*        <p className={`font-medium ${baseClasses.text.primary}`}>*/}
              {/*          Email*/}
              {/*        </p>*/}
              {/*        <p className={`text-sm ${baseClasses.text.muted}`}>*/}
              {/*          support@upnepa.com*/}
              {/*        </p>*/}
              {/*      </div>*/}
              {/*    </a>*/}
              {/*    <a*/}
              {/*      href="tel:+2341234567890"*/}
              {/*      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${*/}
              {/*        isThemeDark ? "hover:bg-gray-700" : "hover:bg-gray-50"*/}
              {/*      }`}*/}
              {/*    >*/}
              {/*      <Phone className="w-5 h-5 text-green-600" />*/}
              {/*      <div>*/}
              {/*        <p className={`font-medium ${baseClasses.text.primary}`}>*/}
              {/*          Phone*/}
              {/*        </p>*/}
              {/*        <p className={`text-sm ${baseClasses.text.muted}`}>*/}
              {/*          +234 123 456 7890*/}
              {/*        </p>*/}
              {/*      </div>*/}
              {/*    </a>*/}
              {/*    <button*/}
              {/*      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${*/}
              {/*        isThemeDark ? "hover:bg-gray-700" : "hover:bg-gray-50"*/}
              {/*      }`}*/}
              {/*    >*/}
              {/*      <MessageCircle className="w-5 h-5 text-purple-600" />*/}
              {/*      <div className="text-left">*/}
              {/*        <p className={`font-medium ${baseClasses.text.primary}`}>*/}
              {/*          Live Chat*/}
              {/*        </p>*/}
              {/*        <p className={`text-sm ${baseClasses.text.muted}`}>*/}
              {/*          Chat with us now*/}
              {/*        </p>*/}
              {/*      </div>*/}
              {/*    </button>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/* Support Hours */}
              <div className={baseClasses.card + " p-6"}>
                <h2
                  className={`text-xl font-semibold mb-4 flex items-center ${baseClasses.text.primary}`}
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Support Hours
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={baseClasses.text.secondary}>
                      Monday - Friday
                    </span>
                    <span className={baseClasses.text.primary}>
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={baseClasses.text.secondary}>Saturday</span>
                    <span className={baseClasses.text.primary}>
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={baseClasses.text.secondary}>Sunday</span>
                    <span className={baseClasses.text.primary}>Closed</span>
                  </div>
                </div>
                <p className={`text-sm mt-4 ${baseClasses.text.muted}`}>
                  All times are in West Africa Time (WAT)
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className={baseClasses.card + " p-8"}>
                <h2
                  className={`text-2xl font-semibold mb-6 ${baseClasses.text.primary}`}
                >
                  Send us a Message
                </h2>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800">
                      Thank you! Your message has been sent successfully. We'll
                      get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-800">
                      Sorry, there was an error sending your message. Please try
                      again or contact us directly.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${baseClasses.text.primary}`}
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={baseClasses.input}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${baseClasses.text.primary}`}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={baseClasses.input}
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${baseClasses.text.primary}`}
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={baseClasses.input}
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  {/* Category and Priority */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${baseClasses.text.primary}`}
                      >
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className={baseClasses.input}
                      >
                        {supportCategories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${baseClasses.text.primary}`}
                      >
                        Priority Level
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className={baseClasses.input}
                      >
                        {priorityLevels.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${baseClasses.text.primary}`}
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className={baseClasses.input}
                      placeholder="Please describe your issue or question in detail..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-between">
                    <p className={`text-sm ${baseClasses.text.muted}`}>
                      * Required fields
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`${baseClasses.button.primary} flex items-center space-x-2 ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className={baseClasses.card + " p-8 mt-8"}>
            <h2
              className={`text-2xl font-semibold mb-6 ${baseClasses.text.primary}`}
            >
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className={`font-medium mb-2 ${baseClasses.text.primary}`}>
                  How long does it take to get a response?
                </h3>
                <p className={`text-sm ${baseClasses.text.secondary}`}>
                  We typically respond within 24 hours during business days.
                  Critical issues are prioritized and addressed faster.
                </p>
              </div>
              <div>
                <h3 className={`font-medium mb-2 ${baseClasses.text.primary}`}>
                  What information should I include?
                </h3>
                <p className={`text-sm ${baseClasses.text.secondary}`}>
                  Include as much detail as possible: error messages, steps to
                  reproduce, and your account information.
                </p>
              </div>
              {/*<div>*/}
              {/*  <h3 className={`font-medium mb-2 ${baseClasses.text.primary}`}>*/}
              {/*    Can I track my support request?*/}
              {/*  </h3>*/}
              {/*  <p className={`text-sm ${baseClasses.text.secondary}`}>*/}
              {/*    Yes! You'll receive a confirmation email with a ticket number*/}
              {/*    that you can use to track your request status.*/}
              {/*  </p>*/}
              {/*</div>*/}
              {/*<div>*/}
              {/*  <h3 className={`font-medium mb-2 ${baseClasses.text.primary}`}>*/}
              {/*    Do you offer phone support?*/}
              {/*  </h3>*/}
              {/*  <p className={`text-sm ${baseClasses.text.secondary}`}>*/}
              {/*    Phone support is available during business hours for urgent*/}
              {/*    issues. Check our support hours above.*/}
              {/*  </p>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSupport;
