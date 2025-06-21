import React from 'react';
import '../Styles/AnimatedBackground.css';

export const AnimatedBackground = () => {
  return (
    <div className="animated-background">
      <div className="floating-shapes">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`shape shape-${(i % 4) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      <div className="gradient-overlay"></div>
    </div>
  );
};