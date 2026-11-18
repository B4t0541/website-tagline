import React from 'react';

interface BrandMarkProps {
  className?: string;
  inverted?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  className = 'w-7 h-7',
  inverted = false,
}) => {
  const darkFill = inverted ? '#E2E8F0' : '#0B2559';
  const brightFill = inverted ? '#38BDF8' : '#0072E5';

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 8H30L23 16H11L4 8Z" fill={brightFill} />
      <path d="M23 16L30 8V40L23 44V16Z" fill={darkFill} />
      <path d="M16 19H23V39L16 32V19Z" fill={brightFill} />
    </svg>
  );
};
