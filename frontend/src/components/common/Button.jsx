import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-md";
  const variants = {
    primary: "bg-gradient-to-r from-coop-600 to-coop-500 hover:from-coop-500 hover:to-coop-400 text-white shadow-coop-500/20 hover:shadow-coop-500/30",
    secondary: "bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20",
    outline: "border border-coop-500 text-coop-400 hover:bg-coop-500/10",
    glass: "glassmorphism hover:bg-white/10 text-white"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
