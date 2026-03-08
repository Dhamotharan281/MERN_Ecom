// import React from 'react'
// import heroImg from "../../assets/rabbit-hero.webp"
// import {Link} from "react-router-dom"
// const Hero = () => {
//   return (
//     <>
//       <section className='relative'>
// <img src={heroImg} className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'/>
// <div className='absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center'>
// <h1 className='text-4xl md:text-9xl font-bold tracking-tighter mb-6'>
//     VACATION <br></br> READY
// </h1>
// <p className='text-sm tracking-tight md:text-lg mb-6'>
// Explore our vactaion-ready outfits with fast Worldwide Shipping.
// </p>
// <Link to="#" className="bg-white text-gray-950 px-6 rounded-sm text-lg">Shop Now</Link>
// </div>
//       </section>
//     </>
//   )
// }

// export default Hero


import React from "react";
// import heroImg from "../../assets/rabbit-hero.webp";
import heroImg from "../../assets/heros.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="Vacation Ready"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 
      bg-black/40 flex flex-col items-center justify-center
       text-white text-center px-4">
        <h1 className="text-4xl md:text-7xl 
        lg:text-9xl font-bold tracking-tighter mb-6 text-black">
          VACATION <br />
          READY
        </h1>

        <p className="text-sm md:text-lg mb-6 max-w-xl text-grey-200">
          Explore our vacation-ready outfits with fast worldwide shipping.
        </p>

        <Link
          to="#"
          className="bg-white text-black px-6 py-2 rounded-sm text-lg font-medium hover:bg-gray-200 transition"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
