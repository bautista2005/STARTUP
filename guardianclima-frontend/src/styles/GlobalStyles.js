import React from 'react';

// Componente que inyecta estilos globales en la aplicación.
export const GlobalStyles = () => (
  <style>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(10px); }
    }
    .fade-in {
      animation: fadeIn 0.5s ease-in-out;
    }
    .fade-out {
      animation: fadeOut 0.5s ease-in-out forwards;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border: none;
      border-radius: 0.75rem;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s ease-in-out;
    }
    .btn-primary {
      color: white;
      background: linear-gradient(to right, #6d28d9, #4f46e5);
    }
    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);
    }
    .btn-secondary {
      color: #1f2937;
      background-color: white;
      border: 1px solid #d1d5db;
    }
    .btn-secondary:hover:not(:disabled) {
      background-color: #f9fafb;
      border-color: #9ca3af;
    }
    .btn-gradient {
      width: 100%;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: linear-gradient(to right, #ec4899, #8b5cf6);
    }
    .btn-gradient:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
    }
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    .logout-btn {
        background: none;
        border: 1px solid #d1d5db;
        color: #4b5563;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        padding: 0.5rem 1rem;
        border-radius: 0.75rem;
        font-weight: 600;
        transition: all 0.2s ease-in-out;
    }
    .logout-btn:hover {
        background-color: #fee2e2;
        border-color: #fca5a5;
        color: #b91c1c;
    }
    .select-style {
        width: 100%;
        padding: 0.75rem;
        font-size: 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.75rem;
        backgroundColor: 'white';
        marginTop: 0.5rem;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 0.5rem center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
    }
  `}</style>
);