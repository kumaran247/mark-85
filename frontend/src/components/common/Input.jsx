import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-coop-500 focus:ring-1 focus:ring-coop-500 transition-all duration-200 ${
          error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-400 mt-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
