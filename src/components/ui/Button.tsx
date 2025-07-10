import React from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  className = '',
  ...props
}) => {
  const baseClasses = "font-medium rounded-full flex items-center justify-center transition-all duration-300 relative";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-blue-200/50 hover:from-blue-700 hover:to-blue-600",
    secondary: "bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-lg hover:shadow-amber-200/50 hover:from-amber-600 hover:to-amber-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    text: "text-blue-600 hover:bg-blue-50"
  };
  
  const sizeClasses = {
    sm: "text-sm px-4 py-2 gap-1.5",
    md: "text-base px-6 py-2.5 gap-2",
    lg: "text-lg px-8 py-3 gap-2.5"
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  const loadingAnimation = loading ? "opacity-70 cursor-not-allowed" : "";
  
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${loadingAnimation} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
      <span className={loading ? "opacity-0" : "flex items-center gap-2"}>
        {icon && <span>{icon}</span>}
        {children}
      </span>
    </motion.button>
  );
};

export default Button;
