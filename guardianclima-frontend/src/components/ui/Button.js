import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  className = '', 
  onClick,
  type = 'button',
  icon: Icon,
  ...props 
}) => {
  // Base styles
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    relative overflow-hidden
  `;

  // Variant styles
  const variants = {
    primary: `
      bg-gradient-to-r from-primary-600 to-primary-700
      hover:from-primary-700 hover:to-primary-800
      text-white shadow-md hover:shadow-lg
      focus:ring-primary-500 focus:ring-offset-2
      border border-transparent
    `,
    secondary: `
      bg-white dark:bg-gray-800
      text-primary-600 dark:text-primary-400
      border border-primary-200 dark:border-primary-700
      hover:bg-primary-50 dark:hover:bg-primary-950
      shadow-sm hover:shadow-md
      focus:ring-primary-500 focus:ring-offset-2
    `,
    outline: `
      bg-transparent
      text-gray-700 dark:text-gray-300
      border border-gray-300 dark:border-gray-600
      hover:bg-gray-50 dark:hover:bg-gray-800
      focus:ring-gray-500 focus:ring-offset-2
    `,
    ghost: `
      bg-transparent
      text-gray-700 dark:text-gray-300
      hover:bg-gray-100 dark:hover:bg-gray-800
      focus:ring-gray-500 focus:ring-offset-2
      border border-transparent
    `,
    danger: `
      bg-gradient-to-r from-error-600 to-error-700
      hover:from-error-700 hover:to-error-800
      text-white shadow-md hover:shadow-lg
      focus:ring-error-500 focus:ring-offset-2
      border border-transparent
    `,
    success: `
      bg-gradient-to-r from-success-600 to-success-700
      hover:from-success-700 hover:to-success-800
      text-white shadow-md hover:shadow-lg
      focus:ring-success-500 focus:ring-offset-2
      border border-transparent
    `,
    glass: `
      backdrop-blur-md bg-white/20 dark:bg-gray-800/20
      text-gray-900 dark:text-white
      border border-white/30 dark:border-gray-700/30
      hover:bg-white/30 dark:hover:bg-gray-800/30
      shadow-glass-card hover:shadow-xl
      focus:ring-primary-500 focus:ring-offset-2
    `
  };

  // Size styles
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs rounded-md',
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-2.5 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-xl',
    xl: 'px-8 py-4 text-lg rounded-2xl'
  };

  // Combine classes
  const buttonClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={disabled || loading ? {} : { scale: 1.02 }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      transition={{ duration: 0.1 }}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Content */}
      <div className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {Icon && <Icon className="w-4 h-4" />}
        {children}
      </div>
      
      {/* Shine effect for primary buttons */}
      {variant === 'primary' && !disabled && !loading && (
        <motion.div
          className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.button>
  );
};

// Button variants for common use cases
export const PrimaryButton = (props) => <Button variant="primary" {...props} />;
export const SecondaryButton = (props) => <Button variant="secondary" {...props} />;
export const OutlineButton = (props) => <Button variant="outline" {...props} />;
export const GhostButton = (props) => <Button variant="ghost" {...props} />;
export const DangerButton = (props) => <Button variant="danger" {...props} />;
export const SuccessButton = (props) => <Button variant="success" {...props} />;
export const GlassButton = (props) => <Button variant="glass" {...props} />;

export default Button;