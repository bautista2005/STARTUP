import React from 'react';
import { motion } from 'framer-motion';

const Spinner = ({ 
  size = 'md', 
  variant = 'default',
  className = '',
  label = 'Loading...',
  showLabel = false,
  ...props 
}) => {
  // Size configurations
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
    '2xl': 'w-16 h-16'
  };

  // Variant styles
  const variants = {
    default: 'text-primary-600',
    white: 'text-white',
    gray: 'text-gray-500',
    success: 'text-success-600',
    warning: 'text-warning-600',
    error: 'text-error-600'
  };

  const spinnerClasses = `
    ${sizes[size]}
    ${variants[variant]}
    ${className}
  `.trim();

  return (
    <div className="inline-flex flex-col items-center gap-2" {...props}>
      {/* Spinner */}
      <motion.div
        className={`${spinnerClasses} animate-spin`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <svg fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </motion.div>

      {/* Label */}
      {showLabel && (
        <motion.span
          className={`text-sm ${variants[variant]} select-none`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
};

// Dots spinner variant
export const DotsSpinner = ({ 
  size = 'md', 
  variant = 'default',
  className = '',
  ...props 
}) => {
  const dotSizes = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  };

  const variants = {
    default: 'bg-primary-600',
    white: 'bg-white',
    gray: 'bg-gray-500',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    error: 'bg-error-600'
  };

  const dotClass = `${dotSizes[size]} ${variants[variant]} rounded-full`;

  return (
    <div className={`inline-flex items-center space-x-1 ${className}`} {...props}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={dotClass}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2
          }}
        />
      ))}
    </div>
  );
};

// Pulse spinner variant
export const PulseSpinner = ({ 
  size = 'md', 
  variant = 'default',
  className = '',
  ...props 
}) => {
  const sizes = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };

  const variants = {
    default: 'bg-primary-400',
    white: 'bg-white',
    gray: 'bg-gray-400',
    success: 'bg-success-400',
    warning: 'bg-warning-400',
    error: 'bg-error-400'
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`} {...props}>
      {[0, 1].map((index) => (
        <motion.div
          key={index}
          className={`absolute inset-0 rounded-full ${variants[variant]}`}
          animate={{
            scale: [0, 1],
            opacity: [1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 1
          }}
        />
      ))}
    </div>
  );
};

// Loading overlay component
export const LoadingOverlay = ({ 
  isLoading = false,
  children,
  spinnerSize = 'lg',
  spinnerVariant = 'default',
  message = 'Loading...',
  showMessage = true,
  backdrop = true,
  className = ''
}) => {
  if (!isLoading) return children;

  return (
    <div className={`relative ${className}`}>
      {children}
      <motion.div
        className={`
          absolute inset-0 z-50
          flex flex-col items-center justify-center
          ${backdrop ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm' : ''}
        `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Spinner 
          size={spinnerSize} 
          variant={spinnerVariant}
          showLabel={showMessage}
          label={message}
        />
      </motion.div>
    </div>
  );
};

// Skeleton loader component
export const Skeleton = ({ 
  width = 'w-full',
  height = 'h-4',
  rounded = 'rounded',
  className = '',
  ...props 
}) => {
  return (
    <motion.div
      className={`
        ${width} ${height} ${rounded}
        bg-gray-200 dark:bg-gray-700
        animate-pulse
        ${className}
      `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      {...props}
    />
  );
};

// Content skeleton variants
export const CardSkeleton = ({ className = '' }) => (
  <div className={`p-6 space-y-4 ${className}`}>
    <Skeleton height="h-6" width="w-3/4" />
    <Skeleton height="h-4" width="w-full" />
    <Skeleton height="h-4" width="w-5/6" />
    <div className="flex space-x-2 pt-2">
      <Skeleton height="h-8" width="w-16" rounded="rounded-lg" />
      <Skeleton height="h-8" width="w-20" rounded="rounded-lg" />
    </div>
  </div>
);

export const ListSkeleton = ({ items = 3, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center space-x-3">
        <Skeleton height="h-10" width="w-10" rounded="rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton height="h-4" width="w-1/2" />
          <Skeleton height="h-3" width="w-3/4" />
        </div>
      </div>
    ))}
  </div>
);

// Button spinner for loading buttons
export const ButtonSpinner = ({ size = 'sm', className = '' }) => (
  <motion.div
    className={`${size === 'xs' ? 'w-3 h-3' : 'w-4 h-4'} ${className}`}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  >
    <svg fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </motion.div>
);

export default Spinner;