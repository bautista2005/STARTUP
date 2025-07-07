import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  variant = 'default', 
  hover = true, 
  className = '', 
  padding = 'md',
  onClick,
  ...props 
}) => {
  // Base styles
  const baseStyles = `
    relative overflow-hidden
    transition-all duration-300
    ${onClick ? 'cursor-pointer' : ''}
  `;

  // Variant styles
  const variants = {
    default: `
      bg-white dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      rounded-2xl shadow-md
      ${hover ? 'hover:shadow-lg' : ''}
    `,
    elevated: `
      bg-white dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      rounded-2xl shadow-lg
      ${hover ? 'hover:shadow-xl' : ''}
    `,
    glass: `
      backdrop-blur-md
      bg-white/80 dark:bg-gray-800/60
      border border-white/20 dark:border-gray-700/30
      rounded-2xl shadow-glass-card
      ${hover ? 'hover:shadow-xl hover:bg-white/90 dark:hover:bg-gray-800/70' : ''}
    `,
    gradient: `
      bg-gradient-to-br from-primary-50 to-primary-100
      dark:from-primary-950 dark:to-primary-900
      border border-primary-200 dark:border-primary-800
      rounded-2xl shadow-md
      ${hover ? 'hover:shadow-lg' : ''}
    `,
    outline: `
      bg-transparent
      border-2 border-gray-200 dark:border-gray-700
      rounded-2xl
      ${hover ? 'hover:border-primary-300 dark:hover:border-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800/50' : ''}
    `,
    weather: `
      bg-gradient-to-br from-blue-50 to-indigo-100
      dark:from-blue-950 dark:to-indigo-900
      border border-blue-200 dark:border-blue-800
      rounded-2xl shadow-md
      ${hover ? 'hover:shadow-lg' : ''}
    `,
    pricing: `
      bg-white dark:bg-gray-800
      border-2 border-gray-200 dark:border-gray-700
      rounded-2xl shadow-lg
      relative
      ${hover ? 'hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600' : ''}
    `,
    feature: `
      bg-gradient-to-br from-white to-gray-50
      dark:from-gray-800 dark:to-gray-900
      border border-gray-200 dark:border-gray-700
      rounded-2xl shadow-sm
      ${hover ? 'hover:shadow-md' : ''}
    `
  };

  // Padding styles
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  // Combine classes
  const cardClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${paddings[padding]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const MotionCard = motion.div;

  return (
    <MotionCard
      className={cardClasses}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{}}
      {...props}
    >
      {children}
    </MotionCard>
  );
};

// Card Header component
export const CardHeader = ({ children, className = '', ...props }) => (
  <div 
    className={`mb-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Card Title component
export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 
    className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}
    {...props}
  >
    {children}
  </h3>
);

// Card Description component
export const CardDescription = ({ children, className = '', ...props }) => (
  <p 
    className={`text-sm text-gray-600 dark:text-gray-400 ${className}`}
    {...props}
  >
    {children}
  </p>
);

// Card Content component
export const CardContent = ({ children, className = '', ...props }) => (
  <div 
    className={`${className}`}
    {...props}
  >
    {children}
  </div>
);

// Card Footer component
export const CardFooter = ({ children, className = '', ...props }) => (
  <div 
    className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Specialized card variants
export const WeatherCard = (props) => <Card variant="weather" {...props} />;
export const PricingCard = (props) => <Card variant="pricing" {...props} />;
export const FeatureCard = (props) => <Card variant="feature" {...props} />;
export const GlassCard = (props) => <Card variant="glass" {...props} />;
export const GradientCard = (props) => <Card variant="gradient" {...props} />;

export default Card;