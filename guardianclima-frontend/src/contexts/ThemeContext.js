import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { lightTheme, darkTheme } from '../styles/designSystem';

// Create the theme context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [systemPreference, setSystemPreference] = useState('light');

  // Detect system theme preference
  const detectSystemTheme = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = detectSystemTheme();
    
    setSystemPreference(systemTheme);
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    } else {
      // Use system preference if no saved theme
      setTheme(systemTheme);
    }
  }, [detectSystemTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      const newSystemPreference = e.matches ? 'dark' : 'light';
      setSystemPreference(newSystemPreference);
      
      // Only update theme if user hasn't set a preference
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setTheme(newSystemPreference);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Set data-theme attribute for CSS selectors
    root.setAttribute('data-theme', theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        theme === 'dark' ? '#0a0e1a' : '#FFFFFF'
      );
    }
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  // Set specific theme
  const setSpecificTheme = useCallback((newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
    }
  }, []);

  // Reset to system preference
  const useSystemTheme = useCallback(() => {
    localStorage.removeItem('theme');
    setTheme(systemPreference);
  }, [systemPreference]);

  // Get current theme configuration
  const getThemeConfig = useCallback(() => {
    return theme === 'dark' ? darkTheme : lightTheme;
  }, [theme]);

  // Check if current theme is dark
  const isDarkMode = theme === 'dark';

  // Check if using system preference
  const isUsingSystemTheme = !localStorage.getItem('theme');

  const value = {
    // Current theme state
    theme,
    isDarkMode,
    systemPreference,
    isUsingSystemTheme,
    
    // Theme configuration
    themeConfig: getThemeConfig(),
    
    // Theme actions
    toggleTheme,
    setTheme: setSpecificTheme,
    useSystemTheme,
    
    // Utility functions
    getThemeConfig
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// Higher-order component for theme support
export const withTheme = (Component) => {
  return function ThemedComponent(props) {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
};

// Theme toggle button component
export const ThemeToggle = ({ 
  className = '',
  size = 'md',
  variant = 'default',
  showLabel = false,
  ...props 
}) => {
  const { theme, toggleTheme, isDarkMode } = useTheme();

  const sizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const variants = {
    default: `
      bg-white dark:bg-gray-800
      text-gray-700 dark:text-gray-300
      border border-gray-300 dark:border-gray-600
      hover:bg-gray-50 dark:hover:bg-gray-700
    `,
    ghost: `
      bg-transparent
      text-gray-700 dark:text-gray-300
      hover:bg-gray-100 dark:hover:bg-gray-800
    `,
    primary: `
      bg-primary-600 hover:bg-primary-700
      text-white
    `
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        inline-flex items-center gap-2
        rounded-lg transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-800
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      {...props}
    >
      {/* Sun icon for light mode */}
      {!isDarkMode && (
        <svg 
          className={iconSizes[size]} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
          />
        </svg>
      )}

      {/* Moon icon for dark mode */}
      {isDarkMode && (
        <svg 
          className={iconSizes[size]} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
          />
        </svg>
      )}

      {/* Optional label */}
      {showLabel && (
        <span className="text-sm font-medium">
          {isDarkMode ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};

export default ThemeContext;