import React from 'react';

// Componente que inyecta estilos globales en la aplicación.
export const GlobalStyles = () => (
  <style>{`
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow-x: hidden; /* Prevent horizontal scroll */
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    * {
      box-sizing: border-box;
    }
    
    /* Smooth scrolling */
    html {
      scroll-behavior: auto;
    }
    
    /* Responsive breakpoints */
    @media (max-width: 1024px) {
      .main-grid {
        grid-template-columns: 1fr !important;
        gap: 1.5rem !important;
      }
      .history-sidebar {
        position: static !important;
        width: 100% !important;
      }
    }
    
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column !important;
        gap: 1rem !important;
        text-align: center !important;
      }
      .search-section {
        flex-direction: column !important;
        gap: 1rem !important;
      }
      .search-section button {
        width: 100% !important;
      }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(10px); }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    .fade-in {
      animation: fadeIn 0.5s ease-in-out;
    }
    .fade-out {
      animation: fadeOut 0.5s ease-in-out forwards;
    }
    .slide-in {
      animation: slideIn 0.3s ease-in-out;
    }
    .pulse {
      animation: pulse 2s infinite;
    }
    
    /* Enhanced Button Styles */
    .btn {
      padding: 0.875rem 1.75rem;
      font-size: 1rem;
      border: none;
      border-radius: 1rem;
      cursor: pointer;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      text-decoration: none;
      position: relative;
      overflow: hidden;
    }
    
    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: '100%';
      height: '100%';
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    }
    
    .btn:hover::before {
      left: 100%;
    }
    
    .btn-primary {
      color: white;
      background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
      box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.2);
    }
    .btn-primary:hover:not(:disabled) {
      box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 10px 10px -5px rgba(59, 130, 246, 0.3);
    }
    
    .btn-secondary {
      color: #1E293B;
      background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
      border: 2px solid #E2E8F0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .btn-secondary:hover:not(:disabled) {
      background: linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%);
      border-color: #CBD5E1;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .btn-gradient {
      width: 100%;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      background: linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%);
      box-shadow: 0 10px 15px -3px rgba(236, 72, 153, 0.3), 0 4px 6px -2px rgba(139, 92, 246, 0.2);
    }
    .btn-gradient:hover:not(:disabled) {
      box-shadow: 0 20px 25px -5px rgba(236, 72, 153, 0.4), 0 10px 10px -5px rgba(139, 92, 246, 0.3);
    }
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    
    /* Enhanced Logout Button */
    .logout-btn {
        background: linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%);
        border: 2px solid #FECACA;
        color: #DC2626;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        padding: 0.75rem 1.25rem;
        border-radius: 1rem;
        font-weight: 600;
        box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.1);
    }
    .logout-btn:hover {
        background: linear-gradient(135deg, #FEE2E2 0%, #FCA5A5 100%);
        border-color: #F87171;
        color: #B91C1C;
        box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.2);
    }
    
    /* Enhanced Select Styles */
    .select-style {
        width: 100%;
        padding: 1rem 1.5rem;
        font-size: 1rem;
        border: 2px solid #E2E8F0;
        border-radius: 1rem;
        background-color: #F8FAFC;
        margin-top: 0.5rem;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 1rem center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
        cursor: pointer;
    }
    
    .select-style:focus {
        outline: none;
        border-color: #3B82F6;
        background-color: #FFFFFF;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .select-style:hover {
        border-color: #CBD5E1;
        background-color: #F1F5F9;
    }
    
    /* Loading States */
    .loading {
      opacity: 0.7;
      pointer-events: none;
    }
    
    .loading-spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Card Hover Effects */
    .card-hover {
    }
    
    .card-hover:hover {
    }
    
    /* Animated Gradient Border Hover Effect */
    .card-hover-gradient {
      position: relative;
      border-radius: 1.5rem;
      background: white;
      transition: all 0.3s ease;
    }
    
    .card-hover-gradient::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 1.5rem;
      padding: 2px;
      background: linear-gradient(90deg, #3B82F6, #6366F1, #8B5CF6, #EC4899, #3B82F6);
      background-size: 300% 100%;
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .card-hover-gradient:hover::before {
      opacity: 1;
      animation: gradientShift 4s ease infinite;
    }
    
    .card-hover-gradient:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
    
    /* Focus States */
    *:focus {
      outline: 2px solid #3B82F6;
      outline-offset: 2px;
    }
    
    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: #F1F5F9;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #CBD5E1;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #94A3B8;
    }
    
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `}</style>
);