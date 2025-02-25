import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

function Spinner() {
  return (
    <svg
      className="text-text-primary mr-3 -ml-1 size-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'text-text-primary inline-flex items-center rounded-full px-6 py-3 text-base leading-6 font-medium',
        'enabled:transition enabled:duration-150 enabled:ease-in-out',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' &&
          'bg-btn-primary enabled:hover:bg-btn-primary-hover',
        variant === 'secondary' &&
          'border-text-primary bg-btn-secondary enabled:hover:bg-btn-secondary-hover enabled:hover:border-background border-2'
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
