import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';

const Input = forwardRef(({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  error = false,
  errorMessage = '',
  helperText = '',
  label = '',
  required = false,
  className = '',
  size = 'md',
  variant = 'default',
  icon: Icon,
  iconPosition = 'left',
  showPasswordToggle = false,
  ...props 
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Base styles
  const baseStyles = `
    block w-full transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    placeholder:text-gray-400 dark:placeholder:text-gray-500
  `;

  // Variant styles
  const variants = {
    default: `
      bg-white dark:bg-gray-800
      border border-gray-300 dark:border-gray-600
      text-gray-900 dark:text-white
      focus:border-primary-500 focus:ring-primary-500
      ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}
    `,
    filled: `
      bg-gray-100 dark:bg-gray-700
      border border-transparent
      text-gray-900 dark:text-white
      focus:bg-white dark:focus:bg-gray-800
      focus:border-primary-500 focus:ring-primary-500
      ${error ? 'bg-error-50 dark:bg-error-950 focus:border-error-500 focus:ring-error-500' : ''}
    `,
    glass: `
      backdrop-blur-md
      bg-white/20 dark:bg-gray-800/20
      border border-white/30 dark:border-gray-700/30
      text-gray-900 dark:text-white
      focus:bg-white/30 dark:focus:bg-gray-800/30
      focus:border-primary-500 focus:ring-primary-500
      ${error ? 'border-error-500/50 focus:border-error-500 focus:ring-error-500' : ''}
    `
  };

  // Size styles
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-2.5 text-sm rounded-xl',
    lg: 'px-5 py-3 text-base rounded-xl'
  };

  // Icon padding adjustments
  const iconPadding = {
    left: Icon ? (size === 'sm' ? 'pl-10' : size === 'lg' ? 'pl-12' : 'pl-11') : '',
    right: (Icon || (type === 'password' && showPasswordToggle)) ? 
      (size === 'sm' ? 'pr-10' : size === 'lg' ? 'pr-12' : 'pr-11') : ''
  };

  // Combine classes
  const inputClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${iconPadding.left}
    ${iconPadding.right}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Icon size based on input size
  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  // Icon position styles
  const iconPositionStyles = {
    left: size === 'sm' ? 'left-3' : size === 'lg' ? 'left-4' : 'left-3.5',
    right: size === 'sm' ? 'right-3' : size === 'lg' ? 'right-4' : 'right-3.5'
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <motion.label 
          className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
            error ? 'text-error-600 dark:text-error-400' : 
            focused ? 'text-primary-600 dark:text-primary-400' :
            'text-gray-700 dark:text-gray-300'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </motion.label>
      )}

      {/* Input container */}
      <div className="relative">
        {/* Left icon */}
        {Icon && iconPosition === 'left' && (
          <div className={`absolute ${iconPositionStyles.left} top-1/2 -translate-y-1/2 pointer-events-none`}>
            <Icon className={`${iconSize} transition-colors duration-200 ${
              error ? 'text-error-500' :
              focused ? 'text-primary-500' :
              'text-gray-400 dark:text-gray-500'
            }`} />
          </div>
        )}

        {/* Input field */}
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          className={inputClasses}
          {...props}
        />

        {/* Right icon or password toggle */}
        {((Icon && iconPosition === 'right') || (type === 'password' && showPasswordToggle)) && (
          <div className={`absolute ${iconPositionStyles.right} top-1/2 -translate-y-1/2`}>
            {type === 'password' && showPasswordToggle ? (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={`${iconSize} transition-colors duration-200 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300`}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            ) : (
              Icon && iconPosition === 'right' && (
                <Icon className={`${iconSize} transition-colors duration-200 pointer-events-none ${
                  error ? 'text-error-500' :
                  focused ? 'text-primary-500' :
                  'text-gray-400 dark:text-gray-500'
                }`} />
              )
            )}
          </div>
        )}

        {/* Focus ring animation */}
        {focused && (
          <motion.div
            className={`absolute inset-0 rounded-xl border-2 pointer-events-none ${
              error ? 'border-error-500' : 'border-primary-500'
            }`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>

      {/* Helper text or error message */}
      {(helperText || errorMessage) && (
        <motion.div
          className={`mt-2 text-sm ${
            error ? 'text-error-600 dark:text-error-400' : 'text-gray-600 dark:text-gray-400'
          }`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error ? errorMessage : helperText}
        </motion.div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// Specialized input variants
export const TextInput = (props) => <Input type="text" {...props} />;
export const EmailInput = (props) => <Input type="email" {...props} />;
export const PasswordInput = (props) => <Input type="password" showPasswordToggle {...props} />;
export const SearchInput = (props) => <Input type="search" {...props} />;
export const NumberInput = (props) => <Input type="number" {...props} />;

export default Input;