import React from 'react';

const CosmicGlowButton = ({ children, color = 'hsl(265, 90%, 65%)', speed = '7s', className = '', ...props }) => {
  return (
    <button 
      className={`relative px-6 py-3.5 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer group overflow-hidden ${className}`}
      style={{
        background: 'rgba(10, 5, 20, 0.8)',
        border: '1px solid rgba(139, 92, 246, 0.4)',
        boxShadow: `0 0 15px ${color}44, inset 0 0 8px ${color}22`
      }}
      {...props}
    >
      {/* Glow aura */}
      <div 
        className="absolute inset-0 opacity-40 blur-md transition-opacity duration-300 group-hover:opacity-75"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`
        }}
      />
      {/* Content wrapper */}
      <span className="relative z-10 flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider">
        {children}
      </span>
    </button>
  );
};

export default CosmicGlowButton;
