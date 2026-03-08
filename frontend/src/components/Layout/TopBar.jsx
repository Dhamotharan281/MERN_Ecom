import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { PiYoutubeLogoDuotone } from "react-icons/pi";
import { BsTwitterX } from "react-icons/bs";

const TopBar = () => {
  return (
    <>
      <div className="bg-black text-white">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          {/* Social Icons */}
          <div className='hidden md:flex items-center space-x-3 p-2'>
            <a href="#" className='hover:text-gray-300 transition-colors p-1 rounded-sm hover:bg-white hover:bg-opacity-10'>
              <FaFacebook className='h-5 w-5'/>
            </a> 
            <a href="#" className='hover:text-gray-300 transition-colors p-1 rounded-sm hover:bg-white hover:bg-opacity-10'>
              <CiInstagram className='h-5 w-5' />
            </a> 
            <a href="#" className='hover:text-gray-300 transition-colors p-1 rounded-sm hover:bg-white hover:bg-opacity-10'>
              <PiYoutubeLogoDuotone className='h-5 w-5'/>
            </a> 
            <a href="#" className='hover:text-gray-300 transition-colors p-1 rounded-sm hover:bg-white hover:bg-opacity-10'>
              <BsTwitterX className='h-5 w-5'/>
            </a> 
          </div>

          {/* Promo Text */}
          <div className='text-xs md:text-sm text-shadow-blue-300 flex-grow text-center px-4'>
            Style Meets Savings - Shop Smart. Live Better.
          </div>

          {/* Phone Number */}
          <div className='hidden sm:block text-xs md:text-sm'>
            <a href="tel:+911234568908" className='hover:text-gray-300 transition-colors'>
              +91 (1234) 568908
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
