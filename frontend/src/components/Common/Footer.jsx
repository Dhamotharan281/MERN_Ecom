








import { IoCallSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import React from "react";
import { SiGmail } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";
import { FaMeta } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
     <footer className="bg-gray-50 border-t border-gray-200 pt-14 pb-6 mt-16 border-t border-black">
      
      {/* TOP FOOTER */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Our Newsletter ✉️
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            Be the first to hear about new products, exclusive events, and online offers.
          </p>
          <p className="font-medium text-sm text-black mb-5">
            Sign up and get 10% off your first order.
          </p>

          <form className="flex shadow-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black transition-all"
              required
            />
            <button className="bg-black text-white px-5 text-sm rounded-r-md hover:bg-gray-800 transition-all">
              Subscribe 🚀
            </button>
          </form>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Shop</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><Link to="/mens" className="hover:text-black">Men's Wear 👔</Link></li>
            <li><Link to="/womens" className="hover:text-black">Women's Wear 👗</Link></li>
            <li><Link to="/gadgets" className="hover:text-black">Gadgets 📱</Link></li>
            <li><Link to="/groceries" className="hover:text-black">Groceries 🥦</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Support</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><Link to="/about" className="hover:text-black">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-black">Contact</Link></li>
            <li><Link to="/faqs" className="hover:text-black">FAQs</Link></li>
            <li><Link to="/features" className="hover:text-black">Features</Link></li>
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Follow Us</h3>
          <div className="flex items-center gap-4 mb-5 text-gray-700 text-lg">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-black"><FaMeta /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-black"><RiInstagramFill /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-black"><BsTwitterX /></a>
            <a href="mailto:support@gmail.com" className="hover:text-black"><SiGmail /></a>
          </div>

          <p className="flex items-center text-sm text-gray-600">
            <IoCallSharp className="mr-2" /> 333-345-2143
          </p>
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="container mx-auto border-t border-gray-200 mt-10 pt-5 px-6 text-center text-sm text-gray-600">
        ©️ 2026 <span className="font-semibold text-black">Cartspoint</span>. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
