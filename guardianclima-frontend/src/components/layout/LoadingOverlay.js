import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { Spinner } from '../ui';

const LoadingOverlay = ({ 
  isLoading = false,
  children,
  message = 'Loading...',
  showMessage = true,
  spinnerSize = 'lg',
  backdrop = true,
  className = ''
}) => {
  const { theme } = useTheme();

  return (
    <div className={`relative ${className}`}>
      {children}
      
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className={`
              fixed inset-0 z-50
              flex flex-col items-center justify-center
              ${backdrop 
                ? `backdrop-blur-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-900/80' 
                      : 'bg-white/80'
                  }` 
                : ''
              }
            `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Loading Content */}
            <div className="flex flex-col items-center gap-4 p-8">
              {/* Spinner */}
              <Spinner 
                size={spinnerSize}
                variant={theme === 'dark' ? 'white' : 'default'}
              />
              
              {/* Message */}
              {showMessage && (
                <motion.p
                  className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {message}
                </motion.p>
              )}
            </div>

            {/* Animated Background Pattern */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`
                    absolute w-32 h-32 rounded-full
                    ${theme === 'dark' 
                      ? 'bg-primary-500/5' 
                      : 'bg-primary-500/10'
                    }
                  `}
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${20 + i * 20}%`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Specialized loading overlays
export const PageLoadingOverlay = (props) => (
  <LoadingOverlay 
    message="Loading page..."
    spinnerSize="xl"
    {...props}
  />
);

export const ApiLoadingOverlay = (props) => (
  <LoadingOverlay 
    message="Processing request..."
    spinnerSize="lg"
    {...props}
  />
);

export const AuthLoadingOverlay = (props) => (
  <LoadingOverlay 
    message="Authenticating..."
    spinnerSize="lg"
    {...props}
  />
);

export default LoadingOverlay;