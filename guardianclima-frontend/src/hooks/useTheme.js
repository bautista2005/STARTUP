import { useContext, useMemo, useCallback } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import { designTokens, styleUtils } from '../styles/designSystem';

// Main theme hook (re-export from context for convenience)
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// Hook for getting theme-aware colors
export const useThemeColors = () => {
  const { theme, themeConfig } = useTheme();
  
  const colors = useMemo(() => ({
    // Primary colors
    primary: designTokens.colors.primary,
    
    // Theme-specific colors
    background: themeConfig.colors.background,
    text: themeConfig.colors.text,
    border: themeConfig.colors.border,
    surface: themeConfig.colors.surface,
    
    // Status colors (theme-independent)
    success: designTokens.colors.success,
    warning: designTokens.colors.warning,
    error: designTokens.colors.error,
    
    // Helper function to get color with theme awareness
    get: (colorPath) => styleUtils.getColor(colorPath, theme)
  }), [theme, themeConfig]);
  
  return colors;
};

// Hook for theme-aware styling utilities
export const useThemeStyles = () => {
  const { theme } = useTheme();
  
  const styles = useMemo(() => ({
    // Generate glassmorphism styles
    glass: (intensity = 'medium') => styleUtils.glassmorphism(theme, intensity),
    
    // Generate focus styles
    focus: () => styleUtils.focusStyles(theme),
    
    // Generate button variants
    button: {
      primary: () => styleUtils.buttonVariants.primary(theme),
      secondary: () => styleUtils.buttonVariants.secondary(theme),
      ghost: () => styleUtils.buttonVariants.ghost(theme)
    },
    
    // Generate card styles
    card: {
      base: () => styleUtils.cardStyles.base(theme),
      glass: () => styleUtils.cardStyles.glass(theme)
    },
    
    // Common theme-aware classes
    text: {
      primary: theme === 'dark' ? 'text-white' : 'text-gray-900',
      secondary: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
      muted: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
      inverse: theme === 'dark' ? 'text-gray-900' : 'text-white'
    },
    
    background: {
      primary: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
      secondary: theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50',
      elevated: theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    },
    
    border: {
      primary: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
      secondary: theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
    }
  }), [theme]);
  
  return styles;
};

// Hook for responsive theme utilities
export const useResponsiveTheme = () => {
  const { theme } = useTheme();
  
  const responsive = useMemo(() => ({
    // Generate responsive classes with theme awareness
    text: {
      heading: `text-2xl md:text-3xl lg:text-4xl font-bold ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`,
      subheading: `text-lg md:text-xl lg:text-2xl font-semibold ${
        theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
      }`,
      body: `text-sm md:text-base ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      }`
    },
    
    container: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    
    card: `
      w-full p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl
      ${theme === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
      }
      border shadow-sm hover:shadow-md transition-shadow
    `,
    
    button: `
      px-4 py-2 md:px-6 md:py-3 text-sm md:text-base
      rounded-lg md:rounded-xl font-medium
      transition-all duration-200
    `
  }), [theme]);
  
  return responsive;
};

// Hook for theme-aware animations
export const useThemeAnimations = () => {
  const { theme } = useTheme();
  
  const animations = useMemo(() => ({
    // Fade in animation with theme-aware colors
    fadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 }
    },
    
    // Scale animation for interactive elements
    scale: {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { duration: 0.1 }
    },
    
    // Theme transition animation
    themeTransition: {
      type: 'spring',
      damping: 20,
      stiffness: 100
    },
    
    // Glassmorphism hover effect
    glassHover: {
      whileHover: {
        backdropFilter: 'blur(16px)',
        backgroundColor: theme === 'dark' 
          ? 'rgba(30, 41, 59, 0.8)' 
          : 'rgba(255, 255, 255, 0.9)'
      },
      transition: { duration: 0.2 }
    }
  }), [theme]);
  
  return animations;
};

// Hook for managing theme preferences
export const useThemePreferences = () => {
  const { 
    theme, 
    systemPreference, 
    isUsingSystemTheme,
    setTheme,
    useSystemTheme,
    toggleTheme
  } = useTheme();
  
  const preferences = useMemo(() => ({
    current: theme,
    system: systemPreference,
    isAutomatic: isUsingSystemTheme,
    
    options: [
      { value: 'light', label: 'Light', icon: 'sun' },
      { value: 'dark', label: 'Dark', icon: 'moon' },
      { value: 'system', label: 'System', icon: 'computer' }
    ]
  }), [theme, systemPreference, isUsingSystemTheme]);
  
  // Set theme with preference tracking
  const setWithPreference = useCallback((preference) => {
    if (preference === 'system') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSystemTheme();
    } else {
      setTheme(preference);
    }
  }, [setTheme, useSystemTheme]);

  const actions = useMemo(() => ({
    setLight: () => setTheme('light'),
    setDark: () => setTheme('dark'),
    setSystem: useSystemTheme,
    toggle: toggleTheme,
    setWithPreference
  }), [setTheme, useSystemTheme, toggleTheme, setWithPreference]);
  
  return { preferences, actions };
};

// Hook for theme-aware media queries
export const useThemeMediaQueries = () => {
  const { theme } = useTheme();
  
  const mediaQueries = useMemo(() => ({
    // Check if user prefers reduced motion
    prefersReducedMotion: 
      typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    
    // Check if user prefers high contrast
    prefersHighContrast: 
      typeof window !== 'undefined' && 
      window.matchMedia('(prefers-contrast: high)').matches,
    
    // Check if device supports hover
    canHover: 
      typeof window !== 'undefined' && 
      window.matchMedia('(hover: hover)').matches,
    
    // Current theme preference
    prefersDark: theme === 'dark',
    prefersLight: theme === 'light'
  }), [theme]);
  
  return mediaQueries;
};

// Hook for generating theme-aware CSS custom properties
export const useThemeCSSProperties = () => {
  const { themeConfig } = useTheme();
  
  const cssProperties = useMemo(() => {
    const properties = {};
    
    // Convert theme colors to CSS custom properties
    Object.entries(themeConfig.colors).forEach(([category, colors]) => {
      if (typeof colors === 'object') {
        Object.entries(colors).forEach(([key, value]) => {
          properties[`--color-${category}-${key}`] = value;
        });
      } else {
        properties[`--color-${category}`] = colors;
      }
    });
    
    return properties;
  }, [themeConfig]);
  
  return cssProperties;
};

// Default export with all hooks
export default {
  useTheme,
  useThemeColors,
  useThemeStyles,
  useResponsiveTheme,
  useThemeAnimations,
  useThemePreferences,
  useThemeMediaQueries,
  useThemeCSSProperties
};