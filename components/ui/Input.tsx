import React, { forwardRef } from 'react';

// Define props with TypeScript interface
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

// Use forwardRef to allow ref passing from parent components
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`shadow-sm rounded-md border ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
          } block w-full p-2.5 dark:bg-gray-700 dark:text-white ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

// Add display name for debugging in React DevTools
Input.displayName = 'Input';

export default Input;
