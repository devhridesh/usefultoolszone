import React from 'react';

export default function Button({ children, onClick, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium rounded-xl transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}