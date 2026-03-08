import React from "react";
import logo from "../src/assets/logo.png"; // your logo image

const ScrollTopLogo = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth but fast; remove for instant jump
    });
  };

  return (
    <div 
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-28 h-28 flex items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25 bg-gradient-to-br from-white/80 to-gray-100/80 backdrop-blur-sm border border-white/50 rounded-2xl"
    >
      {/* Rotating Text Ring - Slower, cleaner "CARTS POINT" repeat */}
      <div className="absolute w-24 h-24 animate-spin-slow rounded-full border-2 border-gray-300/70 group-hover:border-blue-400/80 flex items-center justify-center">
        <p className="text-[9px] font-medium tracking-[2px] text-gray-600 absolute uppercase rotate-0">
          CARTS POINT • CARTS POINT •
        </p>
      </div>

      {/* Centered Logo */}
      <div className="relative w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center border-2 border-gray-200/50 group-hover:border-blue-300 hover:shadow-blue-300/50 transition-all duration-300">
        <img 
          src={logo} 
          alt="Carts Point" 
          className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-200" 
        />
      </div>
    </div>
  );
};

export default ScrollTopLogo;
