import React, { type ButtonHTMLAttributes } from 'react';
import styles from './button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'dark' | 'danger';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon,
  className = '',
  ...props
}) => {
  const variantClass = styles[`btn_${variant}`] || styles.btn_primary;

  return (
    <button
      className={`${styles.btn} ${variantClass} ${className}`.trim()}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;
