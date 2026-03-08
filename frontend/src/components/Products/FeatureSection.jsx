import React from "react";
import { HiShoppingBag, HiShieldCheck, HiTruck, HiRefresh } from "react-icons/hi";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-[#ffffff] text-black ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">

        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <div className="p-4 bg-white text-pink-600 rounded-full mb-4">
            <HiShoppingBag className="text-2xl" />
          </div>
          <h4 className="tracking-tight font-semibold mb-2">
            FREE INTERNATIONAL SHIPPING
          </h4>
          <p className="text-sm tracking-tight">
            On all orders over $100.00
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <div className="p-4 bg-white text-pink-600 rounded-full mb-4">
            <HiShieldCheck className="text-2xl" />
          </div>
          <h4 className="tracking-tight font-semibold mb-2">
            SECURE PAYMENTS
          </h4>
          <p className="text-sm tracking-tight">
            100% secure payment protection
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <div className="p-4 bg-white text-pink-600 rounded-full mb-4">
            <HiTruck className="text-2xl" />
          </div>
          <h4 className="tracking-tight font-semibold mb-2">
            FAST DELIVERY
          </h4>
          <p className="text-sm tracking-tight">
            Get your order in 2–4 business days
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-center">
          <div className="p-4 bg-white text-pink-600 rounded-full mb-4">
            <HiRefresh className="text-2xl" />
          </div>
          <h4 className="tracking-tight font-semibold mb-2">
            EASY RETURNS
          </h4>
          <p className="text-sm tracking-tight">
            Hassle-free 7 day return policy
          </p>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
