import React from "react";

const Hero = () => {
  
  return (
    <div className="pt-32 px-6 md:pt-40 md:px-15 max-w-screen-xl mx-auto">
      {/* Title Section */}
      <div className="text-white bg-blue-300/40 backdrop-blur-xl px-4 py-2 rounded-full text-sm md:text-xl  shadow-lg max-w-fit mb-6 outfit">
        Where Elegance Meets Comfort
      </div>
      <p className="text-3xl px-2 md:px-0 md:text-5xl text-white md:max-w-3xl mt-6 font-bold leading-tight tracking-wide playfair">
        Experience the Perfect Blend of Elegance, Comfort, and Style
      </p>
      <p className="text-sm px-4 md:px-0 text-white md:max-w-4xl mt-4 md:text-lg font-medium leading-relaxed outfit">
        Indulge in extraordinary luxury and comfort at the world's premier destinations. Begin your adventure now.
      </p>
    </div>
  );
};

export default Hero;