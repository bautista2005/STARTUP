import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui';

const Navigation = ({ 
  user,
  currentView,
  onNavigate,
  onLogout,
  className = ''
}) => {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'main', label: 'Dashboard', requiresAuth: true },
    { id: 'pricing', label: 'Pricing', requiresAuth: false },
    { id: 'landing', label: 'Home', requiresAuth: false }
  ];

  const filteredItems = navigationItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && user)
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav 
      className={`
        sticky top-0 z-40 backdrop-blur-md border-b
        ${theme === 'dark' 
          ? 'bg-gray-900/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
        }
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('landing')}
              className={`
                text-xl font-bold tracking-tight
                ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                hover:text-primary-500 transition-colors duration-200
              `}
            >
              GuardianClima
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-lg
                  transition-all duration-200
                  ${currentView === item.id
                    ? `${theme === 'dark' 
                        ? 'text-primary-400 bg-primary-900/50' 
                        : 'text-primary-600 bg-primary-50'
                      }`
                    : `${theme === 'dark' 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* User Info */}
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Welcome, <span className="font-medium">{user.username}</span>
                </div>
                
                {/* Plan Badge */}
                {user.plan && (
                  <span 
                    className={`
                      px-2 py-1 text-xs font-medium rounded-full
                      ${user.plan === 'premium' || user.plan === 'pro'
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                      }
                    `}
                  >
                    {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                  </span>
                )}

                {/* Logout Button */}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => onNavigate('auth')}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className={`
                p-2 rounded-lg
                ${theme === 'dark' 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
                transition-colors duration-200
              `}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={`
                md:hidden border-t
                ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
              `}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-4 space-y-2">
                {/* Navigation Items */}
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      w-full text-left px-3 py-2 text-sm font-medium rounded-lg
                      transition-all duration-200
                      ${currentView === item.id
                        ? `${theme === 'dark' 
                            ? 'text-primary-400 bg-primary-900/50' 
                            : 'text-primary-600 bg-primary-50'
                          }`
                        : `${theme === 'dark' 
                            ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          }`
                      }
                    `}
                  >
                    {item.label}
                  </button>
                ))}

                {/* User Actions */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  {user ? (
                    <div className="space-y-3">
                      <div className={`px-3 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Welcome, <span className="font-medium">{user.username}</span>
                        {user.plan && (
                          <span 
                            className={`
                              ml-2 px-2 py-1 text-xs font-medium rounded-full
                              ${user.plan === 'premium' || user.plan === 'pro'
                                ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                              }
                            `}
                          >
                            {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                          </span>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          onLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full"
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => {
                        onNavigate('auth');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;