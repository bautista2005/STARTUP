import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { Card, Button } from '../ui';

const Sidebar = ({ 
  historial = [],
  onHistoryItemClick,
  isCollapsed = false,
  onToggleCollapse,
  className = ''
}) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter history based on search query
  const filteredHistory = historial.filter(item =>
    item.ciudad?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.descripcion?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  // Get temperature color based on value
  const getTemperatureColor = (temp) => {
    if (temp < 10) return 'text-blue-500';
    if (temp < 20) return 'text-cyan-500';
    if (temp < 30) return 'text-green-500';
    if (temp < 35) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <motion.div
      className={`
        relative h-full flex flex-col
        ${isCollapsed ? 'w-16' : 'w-80'}
        transition-all duration-300
        ${className}
      `}
      initial={false}
      animate={{ width: isCollapsed ? 64 : 320 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sidebar Header */}
      <div className={`
        flex items-center justify-between p-4 border-b
        ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
      `}>
        {!isCollapsed && (
          <h3 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Search History
          </h3>
        )}
        
        <button
          onClick={onToggleCollapse}
          className={`
            p-2 rounded-lg transition-colors duration-200
            ${theme === 'dark' 
              ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }
          `}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${
              isCollapsed ? 'rotate-180' : ''
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Sidebar Content */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            className="flex-1 flex flex-col overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Search Bar */}
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`
                    w-full pl-10 pr-4 py-2 text-sm rounded-lg border
                    ${theme === 'dark' 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-primary-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary-500'
                    }
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50
                    transition-colors duration-200
                  `}
                />
                <svg 
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {filteredHistory.length > 0 ? (
                <div className="space-y-2">
                  {filteredHistory.map((item, index) => (
                    <motion.div
                      key={`${item.ciudad}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Card
                        variant="outline"
                        padding="sm"
                        hover={true}
                        onClick={() => onHistoryItemClick?.(item)}
                        className="cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-sm font-medium truncate ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              {item.ciudad}
                            </h4>
                            <p className={`text-xs truncate ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {item.descripcion}
                            </p>
                            <p className={`text-xs ${
                              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                              {formatDate(item.fecha)}
                            </p>
                          </div>
                          
                          <div className="ml-3 text-right">
                            <div className={`text-lg font-bold ${getTemperatureColor(item.temperatura)}`}>
                              {Math.round(item.temperatura)}°
                            </div>
                          </div>
                        </div>

                        {/* Hover indicator */}
                        <div className={`
                          absolute inset-x-0 bottom-0 h-0.5 bg-primary-500 
                          transform scale-x-0 group-hover:scale-x-100
                          transition-transform duration-200 origin-left
                        `} />
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg 
                    className={`w-12 h-12 mb-4 ${
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {searchQuery ? 'No matches found' : 'No search history yet'}
                  </p>
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery('')}
                      className="mt-2"
                    >
                      Clear search
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed State */}
      {isCollapsed && (
        <div className="flex-1 flex flex-col items-center justify-start pt-4">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <svg 
              className={`w-6 h-6 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          {historial.length > 0 && (
            <div className={`mt-2 text-xs text-center ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {historial.length}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;