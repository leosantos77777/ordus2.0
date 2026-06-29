import React from 'react';

export default function Logo({ 
  className = "h-[44px] sm:h-[56px] w-auto", 
  id, 
  variant = 'light-bg'
}: { 
  className?: string; 
  id?: string; 
  variant?: 'light-bg' | 'dark-bg';
}) {
  const logoSrc = variant === 'dark-bg' 
    ? "/ordus-logo-white-text.png" 
    : "/ordus-logo-dark-text.png";

  return (
    <img
      src={logoSrc}
      alt="Órdus Engenharia"
      className={`${className} object-contain`}
      id={id || "ordus-logo-img"}
    />
  );
}

