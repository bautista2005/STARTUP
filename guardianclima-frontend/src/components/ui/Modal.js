import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ 
  isOpen = false, 
  onClose, 
  children, 
  title = '', 
  size = 'md',
  className = '',
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  ...props 
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Size configurations
  const sizes = {
    xs: 'max-w-sm',
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && closeOnEscape && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, closeOnEscape, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement;
      
      // Focus the modal
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore focus to the previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
      
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose?.();
    }
  };

  // Handle focus trap
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements?.length) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
          />

          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'modal-title' : undefined}
              tabIndex={-1}
              onKeyDown={handleKeyDown}
              className={`
                relative w-full ${sizes[size]} 
                bg-white dark:bg-gray-800
                rounded-2xl shadow-2xl
                max-h-[90vh] overflow-hidden
                ${className}
              `.trim().replace(/\s+/g, ' ')}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, type: 'spring', damping: 20 }}
              {...props}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  {title && (
                    <h2 
                      id="modal-title"
                      className="text-xl font-semibold text-gray-900 dark:text-white"
                    >
                      {title}
                    </h2>
                  )}
                  
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="
                        p-1 rounded-lg text-gray-400 hover:text-gray-600 
                        dark:text-gray-500 dark:hover:text-gray-300
                        hover:bg-gray-100 dark:hover:bg-gray-700
                        transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-primary-500
                      "
                      aria-label="Close modal"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Modal content components
export const ModalHeader = ({ children, className = '', ...props }) => (
  <div 
    className={`p-6 border-b border-gray-200 dark:border-gray-700 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const ModalBody = ({ children, className = '', ...props }) => (
  <div 
    className={`p-6 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const ModalFooter = ({ children, className = '', ...props }) => (
  <div 
    className={`p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Confirmation modal variant
export const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger'
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" title={title}>
      <ModalBody>
        <p className="text-gray-600 dark:text-gray-400">
          {message}
        </p>
      </ModalBody>
      <ModalFooter>
        <button
          onClick={onClose}
          className="
            px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300
            bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600
            rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700
            focus:outline-none focus:ring-2 focus:ring-primary-500
            transition-colors duration-200
          "
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          className={`
            px-4 py-2 text-sm font-medium text-white rounded-lg
            focus:outline-none focus:ring-2 focus:ring-offset-2
            transition-colors duration-200
            ${variant === 'danger' 
              ? 'bg-error-600 hover:bg-error-700 focus:ring-error-500' 
              : 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500'
            }
          `}
        >
          {confirmText}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default Modal;