import { Link } from "react-router-dom";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import React, { useRef } from "react";

const NewArrivals = ({ products = [] }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 400;

    if (container) {
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Use products from props, or fallback to empty array
  const displayProducts = products && products.length > 0 ? products : [];

  return (
    <section className="py-10 px-4">
      <div className="container mx-auto text-center mb-20 relative">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-50px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            className="p-3 rounded-lg border bg-white shadow-md hover:shadow-lg transition"
          >
            <HiArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 rounded-lg border bg-white shadow-md hover:shadow-lg transition"
          >
            <HiArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Products */}
      <div
        ref={scrollRef}
        className="container mx-auto overflow-x-auto scrollbar-hide pb-8 scroll-smooth"
      >
        <div className="flex space-x-6">
          {displayProducts.map((product) => (
            <div
              key={product._id}
              className="min-w-[280px] flex-shrink-0 relative group cursor-pointer"
            >
              <img
                src={product.images[0]?.url}
                alt={product.images[0]?.altText || product.name}
                className="w-full h-[450px] object-cover rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                <Link to={`/product/${product._id}`} className="block">
                  <h4 className="font-semibold text-xl text-white mb-1">{product.name}</h4>
                  <p className="text-2xl font-bold text-white">${product.price}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
