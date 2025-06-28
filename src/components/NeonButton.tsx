import React from 'react';

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95';
  
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-green-600 to-green-500 text-white
      border-2 border-green-400
      shadow-[0_0_20px_rgba(34,197,94,0.3)]
      hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]
      hover:from-green-500 hover:to-green-400
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    `,
    secondary: `
      bg-transparent text-green-400
      border-2 border-green-400
      shadow-[0_0_15px_rgba(34,197,94,0.2)]
      hover:bg-green-400 hover:text-[#383933]
      hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    `,
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default NeonButton;