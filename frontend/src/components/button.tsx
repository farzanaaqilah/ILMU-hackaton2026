import React, { type ButtonHTMLAttributes } from 'react';
import styles from './button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${styles.animated_retro_btn} ${className}`.trim()}
      {...props}
    >
      <div className={styles.animated_retro_btn_inner}>
        <span className={styles.animated_retro_btn_content}>
          {children}
        </span>
      </div>
    </button>
  );
};

export default Button;
