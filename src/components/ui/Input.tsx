import React from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  icon: React.ElementType;
  label: string;
  type?: string;
  placeholder?: string;
  field: string;
  showToggle?: boolean;
  showPassword?: boolean;
  value: string;
  error?: string;
  maxLength?: number;
  allowNumbersOnly?: boolean;
  isThemeDark: boolean;
  onChange: (value: string) => void;
  onToggleVisibility?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  icon: Icon,
  label,
  type = "text",
  placeholder,
  showToggle = false,
  showPassword = false,
  value,
  error,
  maxLength,
  allowNumbersOnly = false,
  isThemeDark,
  onChange,
  onToggleVisibility,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // If the prop is true, only allow numbers
    if (allowNumbersOnly) {
      // Regex to check if the string is empty or contains only digits (0-9)
      const isNumeric = /^[0-9]*$/.test(newValue);
      if (isNumeric) {
        onChange(newValue); // Update state only if valid
      }
    } else {
      onChange(newValue); // Otherwise, allow any character
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon
            className={`h-5 w-5 ${isThemeDark ? "text-gray-400" : "text-gray-500"}`}
          />
        </div>
        <input
          type={showToggle ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={handleInputChange}
          className={`
          w-full pl-10 pr-12 py-4 text-base rounded-xl border-2 transition-all duration-200
          ${
            isThemeDark
              ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-gray-800"
              : "bg-white/70 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white"
          }
          focus:outline-none focus:ring-4 focus:ring-blue-500/20
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
        `}
        />
        {showToggle && onToggleVisibility && (
          <button
            type="button"
            onClick={onToggleVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff
                className={`h-5 w-5 ${isThemeDark ? "text-gray-400" : "text-gray-500"}`}
              />
            ) : (
              <Eye
                className={`h-5 w-5 ${isThemeDark ? "text-gray-400" : "text-gray-500"}`}
              />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
