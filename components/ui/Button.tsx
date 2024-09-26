import React from 'react';

export default function Button({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`px-4 py-2 rounded-xl text-base leading-7 font-semibold hover:opacity-50 cursor-pointer ${
        className ?? 'bg-main'
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
