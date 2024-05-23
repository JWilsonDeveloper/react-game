import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText?: string;
  maxWidth?: string; // Add this optional prop
}

export function Button({ buttonText, className, maxWidth, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      style={{ maxWidth }} // Set max width using inline styles if provided
      className={clsx(
        'flex justify-center items-center rounded-lg bg-blue-500 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 active:border-2 active:border-red-500 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 whitespace-normal text-center',
        className,
      )}
    >
      {buttonText}
    </button>
  );
}