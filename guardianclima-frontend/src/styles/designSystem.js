// Modern Design System for GuardianClima
// Comprehensive design tokens for consistent theming and styling

export const designTokens = {
  // Color system with semantic naming
  colors: {
    primary: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
      950: '#172554'
    },
    neutral: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
      950: '#020617'
    },
    success: {
      50: '#ECFDF5',
      100: '#D1FAE5',
      200: '#A7F3D0',
      300: '#6EE7B7',
      400: '#34D399',
      500: '#10B981',
      600: '#059669',
      700: '#047857',
      800: '#065F46',
      900: '#064E3B'
    },
    warning: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F'
    },
    error: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C',
      800: '#991B1B',
      900: '#7F1D1D'
    }
  },

  // Typography system
  typography: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    },
    fontWeight: {
      thin: '100',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2'
    }
  },

  // Spacing system
  spacing: {
    px: '1px',
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem'
  },

  // Border radius system
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },

  // Shadow system with glassmorphism
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    glassmorphic: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    glassCard: '0 4px 16px rgba(31, 38, 135, 0.15)'
  },

  // Animation and transitions
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
};

// Theme configurations
export const lightTheme = {
  colors: {
    background: {
      primary: designTokens.colors.neutral[50],
      secondary: designTokens.colors.neutral[100],
      elevated: '#FFFFFF',
      overlay: 'rgba(255, 255, 255, 0.95)'
    },
    text: {
      primary: designTokens.colors.neutral[900],
      secondary: designTokens.colors.neutral[600],
      muted: designTokens.colors.neutral[500],
      inverse: '#FFFFFF'
    },
    border: {
      primary: designTokens.colors.neutral[200],
      secondary: designTokens.colors.neutral[300],
      focus: designTokens.colors.primary[500]
    },
    surface: {
      glass: 'rgba(255, 255, 255, 0.8)',
      glassHover: 'rgba(255, 255, 255, 0.9)',
      glassBorder: 'rgba(255, 255, 255, 0.3)'
    }
  }
};

export const darkTheme = {
  colors: {
    background: {
      primary: designTokens.colors.neutral[900],
      secondary: designTokens.colors.neutral[800],
      elevated: designTokens.colors.neutral[800],
      overlay: 'rgba(15, 23, 42, 0.95)'
    },
    text: {
      primary: designTokens.colors.neutral[50],
      secondary: designTokens.colors.neutral[300],
      muted: designTokens.colors.neutral[400],
      inverse: designTokens.colors.neutral[900]
    },
    border: {
      primary: designTokens.colors.neutral[700],
      secondary: designTokens.colors.neutral[600],
      focus: designTokens.colors.primary[400]
    },
    surface: {
      glass: 'rgba(30, 41, 59, 0.6)',
      glassHover: 'rgba(30, 41, 59, 0.8)',
      glassBorder: 'rgba(100, 116, 139, 0.3)'
    }
  }
};

// Utility functions for consistent styling
export const styleUtils = {
  // Get color value with theme support
  getColor: (colorPath, theme = 'light') => {
    const themeConfig = theme === 'dark' ? darkTheme : lightTheme;
    const pathParts = colorPath.split('.');
    
    let result = themeConfig.colors;
    for (const part of pathParts) {
      result = result?.[part];
      if (!result) break;
    }
    
    return result || colorPath;
  },

  // Generate glassmorphism styles
  glassmorphism: (theme = 'light', intensity = 'medium') => {
    const themeConfig = theme === 'dark' ? darkTheme : lightTheme;
    const intensityMap = {
      light: { backdrop: 'backdrop-blur-sm', opacity: '0.6' },
      medium: { backdrop: 'backdrop-blur-md', opacity: '0.8' },
      heavy: { backdrop: 'backdrop-blur-lg', opacity: '0.9' }
    };
    
    const config = intensityMap[intensity] || intensityMap.medium;
    
    return {
      backgroundColor: themeConfig.colors.surface.glass,
      backdropFilter: config.backdrop,
      border: `1px solid ${themeConfig.colors.surface.glassBorder}`,
      borderRadius: designTokens.borderRadius['2xl'],
      boxShadow: designTokens.shadows.glassCard
    };
  },

  // Generate responsive breakpoint classes
  responsive: {
    sm: 'sm:',
    md: 'md:',
    lg: 'lg:',
    xl: 'xl:',
    '2xl': '2xl:'
  },

  // Generate focus styles
  focusStyles: (theme = 'light') => {
    const themeConfig = theme === 'dark' ? darkTheme : lightTheme;
    return {
      outline: 'none',
      ringWidth: '2px',
      ringColor: themeConfig.colors.border.focus,
      ringOpacity: '0.5'
    };
  },

  // Generate button variants
  buttonVariants: {
    primary: (theme = 'light') => ({
      base: `
        bg-primary-600 hover:bg-primary-700 focus:bg-primary-700
        text-white font-medium
        px-6 py-3 rounded-xl
        transition-all duration-200
        shadow-md hover:shadow-lg
        focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${theme === 'dark' ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}
      `
    }),
    secondary: (theme = 'light') => {
      const themeConfig = theme === 'dark' ? darkTheme : lightTheme;
      return {
        base: `
          bg-transparent hover:bg-primary-50 dark:hover:bg-primary-950
          text-primary-600 dark:text-primary-400
          border border-primary-200 dark:border-primary-800
          font-medium px-6 py-3 rounded-xl
          transition-all duration-200
          focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          ${theme === 'dark' ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}
        `
      };
    },
    ghost: (theme = 'light') => ({
      base: `
        bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800
        text-gray-700 dark:text-gray-300
        font-medium px-6 py-3 rounded-xl
        transition-all duration-200
        focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
        ${theme === 'dark' ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}
      `
    })
  },

  // Generate card styles
  cardStyles: {
    base: (theme = 'light') => {
      const themeConfig = theme === 'dark' ? darkTheme : lightTheme;
      return `
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        rounded-2xl shadow-md
        transition-all duration-200
        hover:shadow-lg hover:scale-[1.02]
      `;
    },
    glass: (theme = 'light') => {
      const glass = styleUtils.glassmorphism(theme);
      return `
        backdrop-blur-md
        border border-white/20 dark:border-gray-700/30
        rounded-2xl shadow-glass-card
        transition-all duration-200
        hover:shadow-xl hover:scale-[1.02]
      `;
    }
  }
};

// Export commonly used class combinations
export const commonClasses = {
  // Layout
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-12 lg:py-16',
  
  // Typography
  heading1: 'text-4xl lg:text-5xl font-bold tracking-tight',
  heading2: 'text-3xl lg:text-4xl font-bold tracking-tight',
  heading3: 'text-2xl lg:text-3xl font-semibold',
  body: 'text-base leading-relaxed',
  caption: 'text-sm text-gray-600 dark:text-gray-400',
  
  // Interactive
  button: 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
  input: 'block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary-500 focus:ring-primary-500',
  
  // Animation
  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in',
  
  // States
  loading: 'animate-pulse',
  disabled: 'opacity-50 cursor-not-allowed',
  
  // Glassmorphism
  glass: 'backdrop-blur-md bg-white/80 dark:bg-gray-800/60 border border-white/20 dark:border-gray-700/30',
  glassCard: 'backdrop-blur-md bg-white/80 dark:bg-gray-800/60 border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-glass-card'
};

export default {
  designTokens,
  lightTheme,
  darkTheme,
  styleUtils,
  commonClasses
};