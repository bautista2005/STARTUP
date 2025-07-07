import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { ThemeToggle } from '../../contexts/ThemeContext';
import LoadingOverlay from './LoadingOverlay';

const AppLayout = ({ 
  children, 
  currentView,
  user,
  isLoading = false,
  showThemeToggle = true,
  showNavigation = true,
  className = '',
  ...props 
}) => {
  const { theme } = useTheme();

  // Layout configuration based on current view
  const layoutConfig = {
    landing: {
      showContainer: false,
      showPadding: false,
      maxWidth: 'none'
    },
    auth: {
      showContainer: true,
      showPadding: true,
      maxWidth: '1200px'
    },
    personalization: {
      showContainer: true,
      showPadding: true,
      maxWidth: '1200px'
    },
    main: {
      showContainer: true,
      showPadding: true,
      maxWidth: '1200px'
    },
    pricing: {
      showContainer: true,
      showPadding: true,
      maxWidth: '1200px'
    }
  };

  const config = layoutConfig[currentView] || layoutConfig.auth;

  // Container styles based on view
  const containerStyle = {
    width: '100%',
    margin: '0 auto',
    padding: config.showPadding ? '0 2rem' : '0',
    maxWidth: config.maxWidth,
  };

  // Don't show loading overlay for main view weather searches
  const shouldShowLoading = isLoading && currentView !== 'main';

  return (
    <LoadingOverlay isLoading={shouldShowLoading}>
      <div 
        className={`
          min-h-screen transition-colors duration-300
          ${theme === 'dark' 
            ? 'bg-gray-900 text-white' 
            : 'bg-gray-50 text-gray-900'
          }
          ${className}
        `}
        {...props}
      >
        {/* Theme Toggle - Fixed Position */}
        {showThemeToggle && (
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle 
              variant="ghost" 
              size="md"
              className={`
                backdrop-blur-md border
                ${theme === 'dark' 
                  ? 'bg-gray-800/80 border-gray-700' 
                  : 'bg-white/80 border-gray-200'
                }
                shadow-lg hover:shadow-xl
              `}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className="relative">
          {/* Content Container */}
          {config.showContainer ? (
            <div style={containerStyle}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Background Elements for Aesthetic */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          {/* Gradient Orbs */}
          <div 
            className={`
              absolute -top-40 -right-40 w-80 h-80 rounded-full
              ${theme === 'dark' 
                ? 'bg-gradient-to-br from-primary-500/10 to-purple-500/10' 
                : 'bg-gradient-to-br from-primary-100/50 to-purple-100/50'
              }
              blur-3xl
            `} 
          />
          <div 
            className={`
              absolute -bottom-40 -left-40 w-80 h-80 rounded-full
              ${theme === 'dark' 
                ? 'bg-gradient-to-tr from-success-500/10 to-blue-500/10' 
                : 'bg-gradient-to-tr from-success-100/50 to-blue-100/50'
              }
              blur-3xl
            `} 
          />
        </div>
      </div>
    </LoadingOverlay>
  );
};

// Layout variants for different sections
export const AuthLayout = (props) => (
  <AppLayout {...props} showNavigation={false} />
);

export const MainLayout = (props) => (
  <AppLayout {...props} showNavigation={true} />
);

export const LandingLayout = (props) => (
  <AppLayout {...props} showNavigation={false} showThemeToggle={false} />
);

export default AppLayout;