import React from 'react';

export default function Logo({ 
  className = "h-[44px] sm:h-[56px] w-auto", 
  id, 
  withLabel 
}: { 
  className?: string; 
  id?: string; 
  withLabel?: boolean; 
}) {
  return (
    <img
      src="/ordus-logo-oficial.png"
      alt="Órdus Engenharia"
      className={`${className} object-contain`}
      id={id || "ordus-logo-img"}
      referrerPolicy="no-referrer"
    />
  );
}

