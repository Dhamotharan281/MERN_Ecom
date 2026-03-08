import { IoMdClose } from "react-icons/io";
import React, {useState}  from "react"
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({drawerOpen,toggleCartDrawer}) => {
 const navigate =useNavigate();
  const handleCheckout = ()=>{
toggleCartDrawer()
  navigate("/checkout")
 }

  return (
    <div
      className={`fixed top-0 right-0 w-4/4 sm:w-1/2 md:w-[40rem] p-2 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-[#FF1493] border-b-2 border-b-blue-600">Your Carts Point</h2>
<CartContent/>
      </div>
      {/* checkout butoon */}

      <div className="p-4 bg-white-50 sticky  bottom-0">
        <button onClick={handleCheckout} className="w-full bg-black border-b-8 border-pink-500 text-white px-3 py-3 rounded-lg hover:bg-[#FF1493] hover:text-white">Check Out </button>
        <p>Shipping, taxes, and discount codes calculated at checkout.</p>
      </div>
    </div>
  );
};
export default CartDrawer