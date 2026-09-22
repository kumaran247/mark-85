import React from 'react';

const Badge = ({ children, variant = 'primary', className = '' }) => {
  const baseStyle = "px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider inline-flex items-center gap-1.5";
  const variants = {
    primary: "bg-coop-500/10 text-coop-400 border border-coop-500/20",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    info: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
