"use client";

import * as React from "react";

export function BlueprintGrid() {
  const [opacity, setOpacity] = React.useState(0.08);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const fadeStartPoint = 100; // Start fading when scrolled 100px
      const fadeEndPoint = 400; // Completely faded by 400px
      
      if (scrollPosition <= fadeStartPoint) {
        setOpacity(0.08); // Initial subtle opacity
      } else if (scrollPosition >= fadeEndPoint) {
        setOpacity(0);
      } else {
        const fadeRange = fadeEndPoint - fadeStartPoint;
        const currentPosition = scrollPosition - fadeStartPoint;
        const newOpacity = 0.08 * (1 - (currentPosition / fadeRange));
        setOpacity(newOpacity);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed inset-0 -z-50 h-full w-full transition-opacity duration-300"
      style={{ opacity }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
} 