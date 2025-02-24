import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'text-text-primary rounded-full px-6 py-3 text-base font-medium enabled:transition',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' &&
          'bg-btn-primary enabled:hover:bg-btn-primary-hover',
        variant === 'secondary' &&
          'border-text-primary bg-btn-secondary enabled:hover:bg-btn-secondary-hover enabled:hover:border-background border-2'
      )}
      {...props}
    >
      {children}
    </button>
  );
}
