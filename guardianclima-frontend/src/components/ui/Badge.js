import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '',
  icon: Icon,
  dot = false,
  closable = false,
  onClose,
  ...props 
}) => {
  // Base styles
  const baseStyles = `
    inline-flex items-center gap-1
    font-medium rounded-full
    transition-all duration-200
    ${closable ? 'pr-1' : ''}
  `;

  // Variant styles
  const variants = {
    default: `
      bg-gray-100 dark:bg-gray-800
      text-gray-800 dark:text-gray-200
      border border-gray-200 dark:border-gray-700
    `,
    primary: `
      bg-primary-100 dark:bg-primary-900
      text-primary-800 dark:text-primary-200
      border border-primary-200 dark:border-primary-800
    `,
    secondary: `
      bg-blue-100 dark:bg-blue-900
      text-blue-800 dark:text-blue-200
      border border-blue-200 dark:border-blue-800
    `,
    success: `
      bg-success-100 dark:bg-success-900
      text-success-800 dark:text-success-200
      border border-success-200 dark:border-success-800
    `,
    warning: `
      bg-warning-100 dark:bg-warning-900
      text-warning-800 dark:text-warning-200
      border border-warning-200 dark:border-warning-800
    `,
    error: `
      bg-error-100 dark:bg-error-900
      text-error-800 dark:text-error-200
      border border-error-200 dark:border-error-800
    `,
    outline: `
      bg-transparent
      text-gray-700 dark:text-gray-300
      border border-gray-300 dark:border-gray-600
    `,
    solid: `
      bg-gray-800 dark:bg-gray-200
      text-white dark:text-gray-800
      border border-transparent
    `,
    solidPrimary: `
      bg-primary-600 dark:bg-primary-500
      text-white dark:text-white
      border border-transparent
    `,
    solidSuccess: `
      bg-success-600 dark:bg-success-500
      text-white dark:text-white
      border border-transparent
    `,
    solidWarning: `
      bg-warning-600 dark:bg-warning-500
      text-white dark:text-white
      border border-transparent
    `,
    solidError: `
      bg-error-600 dark:bg-error-500
      text-white dark:text-white
      border border-transparent
    `,
    glass: `
      backdrop-blur-md
      bg-white/20 dark:bg-gray-800/20
      text-gray-900 dark:text-white
      border border-white/30 dark:border-gray-700/30
    `
  };

  // Size styles
  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-sm'
  };

  // Icon sizes
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-4 h-4'
  };

  // Dot sizes
  const dotSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5'
  };

  // Combine classes
  const badgeClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <motion.span
      className={badgeClasses}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Status dot */}
      {dot && (
        <span 
          className={`
            ${dotSizes[size]} 
            rounded-full 
            ${variant === 'success' || variant === 'solidSuccess' ? 'bg-success-500' : ''}
            ${variant === 'warning' || variant === 'solidWarning' ? 'bg-warning-500' : ''}
            ${variant === 'error' || variant === 'solidError' ? 'bg-error-500' : ''}
            ${variant === 'primary' || variant === 'solidPrimary' ? 'bg-primary-500' : ''}
            ${(!variant.includes('success') && !variant.includes('warning') && !variant.includes('error') && !variant.includes('primary')) ? 'bg-gray-500' : ''}
          `}
        />
      )}

      {/* Icon */}
      {Icon && (
        <Icon className={iconSizes[size]} />
      )}

      {/* Content */}
      <span>{children}</span>

      {/* Close button */}
      {closable && (
        <button
          onClick={onClose}
          className="
            ml-1 -mr-1 p-0.5 rounded-full
            hover:bg-black/10 dark:hover:bg-white/10
            transition-colors duration-200
            focus:outline-none focus:ring-1 focus:ring-current
          "
          aria-label="Remove badge"
        >
          <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </motion.span>
  );
};

// Notification badge for showing counts
export const NotificationBadge = ({ 
  count, 
  max = 99, 
  show = true,
  className = '',
  ...props 
}) => {
  if (!show || count <= 0) return null;

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <motion.span
      className={`
        absolute -top-1 -right-1
        inline-flex items-center justify-center
        px-1.5 py-0.5 text-xs font-bold
        text-white bg-error-500
        rounded-full min-w-[1.25rem] h-5
        transform translate-x-1/2 -translate-y-1/2
        ${className}
      `}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: 'spring', damping: 15 }}
      {...props}
    >
      {displayCount}
    </motion.span>
  );
};

// Status badges with predefined variants
export const StatusBadge = ({ status, ...props }) => {
  const statusConfig = {
    online: { variant: 'solidSuccess', children: 'Online', dot: true },
    offline: { variant: 'outline', children: 'Offline', dot: true },
    away: { variant: 'solidWarning', children: 'Away', dot: true },
    busy: { variant: 'solidError', children: 'Busy', dot: true },
    active: { variant: 'solidSuccess', children: 'Active' },
    inactive: { variant: 'outline', children: 'Inactive' },
    pending: { variant: 'solidWarning', children: 'Pending' },
    approved: { variant: 'solidSuccess', children: 'Approved' },
    rejected: { variant: 'solidError', children: 'Rejected' },
    draft: { variant: 'outline', children: 'Draft' },
    published: { variant: 'solidPrimary', children: 'Published' }
  };

  const config = statusConfig[status] || { variant: 'default', children: status };

  return <Badge {...config} {...props} />;
};

// Plan badges
export const PlanBadge = ({ plan, ...props }) => {
  const planConfig = {
    free: { variant: 'outline', children: 'Free' },
    premium: { variant: 'solidPrimary', children: 'Premium' },
    pro: { variant: 'solidSuccess', children: 'Pro' },
    enterprise: { variant: 'solid', children: 'Enterprise' }
  };

  const config = planConfig[plan?.toLowerCase()] || { variant: 'default', children: plan };

  return <Badge {...config} {...props} />;
};

export default Badge;