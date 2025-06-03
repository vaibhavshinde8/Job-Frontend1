import React from 'react';
import './HandAnimation.css'; // Create a separate CSS file or use Tailwind/CSS-in-JS if needed

const HandAnimation = () => {
    console.log("Hello");
  return (
    <div className="hand-container absolute w-full h-[650px] ">
  <div className="hand">
    <div className="finger"></div>
    <div className="finger"></div>
    <div className="finger"></div>
    <div className="finger"></div>
    <div className="palm"></div>
    <div className="thumb"></div>
  </div>
</div>

  );
};

export default HandAnimation;
