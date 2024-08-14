import React, { useEffect } from 'react';

const feelingColorMap = {
  1: ["#00204a", "#9896f1", "#00bbf0"],
  2: ["#ff6f3c", "#5c5470", "#ffc93c"],
  3: ["#4b0082", "#d8bfd8", "#8ed2c9"]
};

const AnimatedBackground = ({ feeling }) => {
  useEffect(() => {
    const [a, b, c] = feelingColorMap[feeling];
    document.documentElement.style.setProperty("--color-a", a);
    document.documentElement.style.setProperty("--color-b", b);
    document.documentElement.style.setProperty("--color-c", c);
  }, [feeling]);
  
  return <div className="animated-background"></div>;
};

export default AnimatedBackground;
