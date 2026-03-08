// import React,{useState} from 'react'
// import logo from "../../assets/logo.png"
// import { Link } from 'react-router-dom'
// import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
// import SearchBar from './SearchBar';
// import CartDrawer from '../Layout/CartDrawer';
// import { IoMdClose } from "react-icons/io";

// const Navbar = () => {
//    const [drawerOpen, setDrawerOpen] = useState(false);
// const[navDrawerOpen,setNavDrawerOpen]=useState(false);
// const toggleNavDrawer=()=>{
//   setNavDrawerOpen(!navDrawerOpen);
// }
//   const toggleCartDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };
//   return (
//     <div className='bg-[#fafafa]'>
//       <div className='container mx-auto flex items-center justify-between px-4 py-4'>

//         {/* Left logo */}
//         <img 
//           src={logo} 
//           alt="Website Logo" 
//           className="h-14"
//         />

//         {/* Center - links */}
//         <div className='hidden md:flex space-x-6'>
//           <Link to="/" className="text-[#1F2937] hover:text-[#1d3e6d] text-sm font-medium">MEN</Link>
//           <Link to="/" className="text-[#1F2937] hover:text-[#1d3e6d] text-sm font-medium">WOMEN</Link>
//           <Link to="/" className="text-[#1F2937] hover:text-[#1d3e6d] text-sm font-medium">TOP WEAR</Link>
//           <Link to="/" className="text-[#1F2937] hover:text-[#1d3e6d] text-sm font-medium">BOTTOM WEAR</Link>
//         </div>

//         {/* Right — Icons */}
//         <div className="flex items-center space-x-4">

//           <Link to="/profile" className="hover:text-black">
//             <HiOutlineUser className="h-6 w-6 text-gray-700" />
//           </Link>

//           <button onClick={toggleCartDrawer} className="relative hover:text-black">
//             <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
//             <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
//               1
//             </span>
//           </button>
// {/* search bar */}
// <div className='overflow-hidden'>
// <SearchBar/>
// </div>

//           <button  onClick ={toggleNavDrawer} className="md:hidden">
//             <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
//           </button>

//         </div>

//       </div>
//       <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

//       <div className={`fixed top:0 left:0 bg-grey-100 color:black h-full w:3/4 sm:w-1/3 md:w-2/4h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
//           navDrawerOpen ? "translate-x-0" : "-translate-x-full"} `}>

//       </div>
// <div className="flex justify-end p-4">
//           <button onClick={toggleNavDrawer}>
//             <IoMdClose className="h-6 w-6 text-gray-600" />
//           </button>
//         </div>

//                 <div className="p-4">
//           <h2 className="text-xl font-semibold mb-4">Menu</h2>
//           <nav className='space-y-4'>
//             <Link
//               to="#"
//               onClick={toggleNavDrawer}
//               className="block text-gray-600 hover:text-black"
//             >
//               Men 🕺
//             </Link>
//             <Link
//               to="#"
//               onClick={toggleNavDrawer}
//               className="block text-gray-600 hover:text-black"
//             >
//               Women 💃
//             </Link>
//              <Link
//               to="#"
//               onClick={toggleNavDrawer}
//               className="block text-gray-600 hover:text-black"
//             >
//               Top Wear 👔
//             </Link>
//              <Link
//               to="#"
//               onClick={toggleNavDrawer}
//               className="block text-gray-600 hover:text-black"
//             >
//               Bottom Wear 👖
//             </Link>
//           </nav>
//         </div>
//       </div>

      
 
//   )
// }

// export default Navbar




import { RiAdminFill } from "react-icons/ri";
import React, { useState } from 'react';
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io"; // Import the close icon
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  // Toggle functions
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);

  return (
    <div className="bg-[#fafafa]">
      {/* Top Navbar */}
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Left - Logo */}
        <img src={logo} alt="Website Logo" className="h-14" />

        {/* Center - Links (hidden on mobile) */}
        <div className="hidden md:flex space-x-6">
          <Link to="Collections/all" className="text-[#1F2937] hover:text-[#1d3e6d] text-sm font-medium">MEN</Link>
          <Link to="/" className="text-[#1F2937] hover:text-[#1d3e6d] text-sm font-medium">WOMEN</Link>
          <Link to="/" className="text-[#1F2937] hover:text-[#1d3e6d] text-sm font-medium">TOP WEAR</Link>
          <Link to="/" className="text-[#1F2937] hover:text-[#1d3e6d] text-sm font-medium">BOTTOM WEAR</Link>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center space-x-4">

          {/* Admin */}
<Link
  to="/admin"
  className="block bg-white text-pink-600 rounded px-3 mx-1
             border-l-6 border-pink-600 outline-2 outline-pink-300
             flex items-center justify-center
             hover:bg-pink-600 hover:text-white
             transition hover:border-l-6 hover:border-white hover:outline-slate-900 hover:outline-2"
>
  <RiAdminFill className="h-8 w-6" />
</Link>


         {/* Profile */}
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>     

          {/* Cart */}
          <button onClick={toggleCartDrawer} className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
              1
            </span>
          </button>

          {/* Search Bar */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={toggleNavDrawer}>
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Drawer */}
      <div className={`fixed top-0 left-0 h-full w-3/4 sm:w-1/3 md:w-2/4 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        navDrawerOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Drawer Menu Links */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menus Point.</h2>
          <nav className="space-y-2 gap-3">
         <Link to="Collections/all"   onClick={toggleNavDrawer} className="block text-gray-600  hover:text-black">
              MEN
            </Link>
            <Link to="/" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
              WOMEN
            </Link>
            <Link to="/" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
              TOP WEAR
            </Link>
            <Link to="/" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
              BOTTOM WEAR
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
