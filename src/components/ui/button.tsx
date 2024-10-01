import React, { forwardRef, ReactNode, Ref } from 'react';

interface CarouselButtonProps {
  icon?: JSX.Element; 
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  children?: ReactNode; 
  disabled?: boolean; 
}

// Use forwardRef to allow ref forwarding
const Button = forwardRef<HTMLButtonElement, CarouselButtonProps>(
  ({ icon, onClick, style, className, children, disabled }, ref: Ref<HTMLButtonElement>) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        style={style}
        disabled={disabled} 
        className={className}
        
      >
        {icon}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button'; // Required for React DevTools with forwardRef components

export default Button;
