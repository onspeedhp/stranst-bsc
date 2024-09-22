import React from 'react';

export default function Button({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`px-4 py-2 rounded-xl text-base leading-7 font-semibold hover:opacity-50 cursor-pointer ${className ?? 'bg-main'}`}
    >
      {children}
    </div>
  );
}
