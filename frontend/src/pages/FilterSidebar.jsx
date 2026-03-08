// // import React, { useEffect } from 'react'
// // import useSearchParams from "react-router-dom"
// // import {useState} from 'react'
// // const FilterSidebar = () => {
// //   const [filter,setFilters]=useState({
// //     castegory:"",
// //     gender:"",
// //     color:"",
// //     size:[],
// //     material:[],
// //     brand:[],
// //     minPrice:0,
// //     maxPrice:100000,
// //   });
// //   const [priceRange,setPrice]=useState(0,100000)
// //   const [searchParams,setSearchParams] = useSearchParams();
// //   const categories =["Top Wear","Bottom Wear"];
// //   const colors=[
// //     "Red",
// //     "Blue",
// //     "Green",
// //     "yellow",
// //     "Gray",
// //     "deepPink"
// //   ];
// //   const genders=["Male","Female"];
// //   const matierials=["cotton","linen","jeans","silk","ballon fit","denim","tracks"];
// //   const sizes=["xs","sm","md","l","xl","xxl"];
// //   const brands=["MD","OTTO","MAX","TURTLE","LEVIS","POLO","URBAN"];
// //   useEffect({
// //     const params=Object.fromEntries([...searchParams]);
// //     setFilters({
// //       castegory:params.category || "",
// //       gender:params.gender || "",
// //       color:params.color || "",
// //       size :params.size ? params.size.split(",") :[]
// //           matierial :params.matierial ? params.matierial.split(",") :[]
// //               brand :params.brand ? params.brand.split(",") :[]
// //     })
// //   })
// //   return (
// //     <div className='p-4'>
// //       <h3 className='text-xl font-medium text-gray-800 font-extrabold mb-4'> Filter</h3>
    
// //     {/* filter category */}
// //     <div className='mb-6'>
// // <label className='block text-gray-700 font-medium mb-2'>Category</label>
// // {categories.map((category)=>{
// //   <div key={category} className='flex items-center mb-2'> 
// //   <input type="radio" name="category" className='mr-2 h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-600'/>
// //   <span className='text-gray-500'>{category}</span>
  
// //   </div>
// // })

// // }
// //     </div>

// // {/* gendet */}
// //       <div className='mb-6'>
// // <label className='block text-gray-700 font-medium mb-2'>Category</label>
// // {genders.map((gender)=>{
// //   <div key={gender} className='flex items-center mb-2'> 
// //   <input type="radio" name="gender" className='mr-2 h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-600'/>
// //   <span className='text-gray-500'>{gender}</span>
  
// //   </div>
// // })

// // }
// //     </div>
// //     {/* color */}
// //     <div className='mb-6' >
// // <label className='flex flex-wrap font-medium mb-2'> Color</label>
// // <div className='flex flex-wrap gap-2'>
// // {colors.map((color)=>(
// //   <button key={color} name="color" className='w-8 h-8 rounded-4xl border-gray-400  cursor-pointer transition hover:scale-105' style={{backgroundColor:color.toLowerCase()}}> </button>
// // ))}
// // </div>
// //     </div>
// //     {/* size */}
// //     <div className='mb-6'>
// // <label className=''>

// // </label>
// //     </div>
// //     </div>
// //   )
// // }

// // export default FilterSidebar





// // import React, { useEffect } from 'react'
// // import useSearchParams from "react-router-dom"
// // import {useState} from 'react'
// // const FilterSidebar = () => {
// //   const [filter,setFilters]=useState({
// //     castegory:"",
// //     gender:"",
// //     color:"",
// //     size:[],
// //     material:[],
// //     brand:[],
// //     minPrice:0,
// //     maxPrice:100000,
// //   });
// //   const [priceRange,setPrice]=useState(0,100000)
// //   const [searchParams,setSearchParams] = useSearchParams();
// //   const categories =["Top Wear","Bottom Wear"];
// //   const colors=[
// //     "Red",
// //     "Blue",
// //     "Green",
// //     "yellow",
// //     "Gray",
// //     "deepPink"
// //   ];
// //   const genders=["Male","Female"];
// //   const matierials=["cotton","linen","jeans","silk","ballon fit","denim","tracks"];
// //   const sizes=["xs","sm","md","l","xl","xxl"];
// //   const brands=["MD","OTTO","MAX","TURTLE","LEVIS","POLO","URBAN"];
// //   useEffect({
// //     const params=Object.fromEntries([...searchParams]);
// //     setFilters({
// //       castegory:params.category || "",
// //       gender:params.gender || "",
// //       color:params.color || "",
// //       size :params.size ? params.size.split(",") :[]
// //           matierial :params.matierial ? params.matierial.split(",") :[]
// //               brand :params.brand ? params.brand.split(",") :[]
// //     })
// //   })
// //   return (
// //     <div className='p-4'>
// //       <h3 className='text-xl font-medium text-gray-800 font-extrabold mb-4'> Filter</h3>
    
// //     {/* filter category */}
// //     <div className='mb-6'>
// // <label className='block text-gray-700 font-medium mb-2'>Category</label>
// // {categories.map((category)=>{
// //   <div key={category} className='flex items-center mb-2'> 
// //   <input type="radio" name="category" className='mr-2 h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-600'/>
// //   <span className='text-gray-500'>{category}</span>
  
// //   </div>
// // })

// // }
// //     </div>

// // {/* gendet */}
// //       <div className='mb-6'>
// // <label className='block text-gray-700 font-medium mb-2'>Category</label>
// // {genders.map((gender)=>{
// //   <div key={gender} className='flex items-center mb-2'> 
// //   <input type="radio" name="gender" className='mr-2 h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-600'/>
// //   <span className='text-gray-500'>{gender}</span>
  
// //   </div>
// // })

// // }
// //     </div>
// //     {/* color */}
// //     <div className='mb-6' >
// // <label className='flex flex-wrap font-medium mb-2'> Color</label>
// // <div className='flex flex-wrap gap-2'>
// // {colors.map((color)=>(
// //   <button key={color} name="color" className='w-8 h-8 rounded-4xl border-gray-400  cursor-pointer transition hover:scale-105' style={{backgroundColor:color.toLowerCase()}}> </button>
// // ))}
// // </div>
// //     </div>
// //     {/* size */}
// //     <div className='mb-6'>
// // <label className=''>

// // </label>
// //     </div>
// //     </div>
// //   )
// // }

// // export default FilterSidebar




// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";

// const FilterSidebar = () => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [filters, setFilters] = useState({
//     category: "",
//     gender: "",
//     color: "",
//     size: [],
//     material: [],
//     brand: [],
//     minPrice: 0,
//     maxPrice: 100000,
//   });

//   const categories = ["Top Wear", "Bottom Wear"];
//   const colors = ["Red", "Blue", "Green", "Yellow", "Gray", "DeepPink"];
//   const genders = ["Male", "Female"];
//   const materials = ["cotton", "linen", "jeans", "silk", "denim", "tracks"];
//   const sizes = ["xs", "sm", "md", "l", "xl", "xxl"];
//   const brands = ["MD", "OTTO", "MAX", "TURTLE", "LEVIS", "POLO", "URBAN"];

//   // Load filters from URL
//   useEffect(() => {
//     const params = Object.fromEntries([...searchParams]);

//     setFilters({
//       category: params.category || "",
//       gender: params.gender || "",
//       color: params.color || "",
//       size: params.size ? params.size.split(",") : [],
//       material: params.material ? params.material.split(",") : [],
//       brand: params.brand ? params.brand.split(",") : [],
//       minPrice: params.minPrice ? Number(params.minPrice) : 0,
//       maxPrice: params.maxPrice ? Number(params.maxPrice) : 100000,
//     });
//   }, [searchParams]);

//   // Update URL when filters change
//   const updateURL = (newFilters) => {
//     const params = {};

//     if (newFilters.category) params.category = newFilters.category;
//     if (newFilters.gender) params.gender = newFilters.gender;
//     if (newFilters.color) params.color = newFilters.color;
//     if (newFilters.size.length) params.size = newFilters.size.join(",");
//     if (newFilters.material.length)
//       params.material = newFilters.material.join(",");
//     if (newFilters.brand.length) params.brand = newFilters.brand.join(",");
//     params.minPrice = newFilters.minPrice;
//     params.maxPrice = newFilters.maxPrice;

//     setSearchParams(params);
//   };

//   const handlePriceChange = (type, value) => {
//   const val = Number(value);
//   let newMin = filters.minPrice;
//   let newMax = filters.maxPrice;

//   if (type === "minPrice") newMin = val;
//   if (type === "maxPrice") newMax = val;

//   // Auto adjust instead of blocking
//   if (newMin > newMax) {
//     if (type === "minPrice") newMax = newMin;
//     else newMin = newMax;
//   }

//   const newFilters = { ...filters, minPrice: newMin, maxPrice: newMax };

//   setFilters(newFilters);
//   updateURL(newFilters);
// };


//   const handleRadioChange = (type, value) => {
//     const newFilters = { ...filters, [type]: value };
//     setFilters(newFilters);
//     updateURL(newFilters);
//   };

//   const handleCheckboxChange = (type, value) => {
//     const updated = filters[type].includes(value)
//       ? filters[type].filter((v) => v !== value)
//       : [...filters[type], value];

//     const newFilters = { ...filters, [type]: updated };
//     setFilters(newFilters);
//     updateURL(newFilters);
//   };

//   return (
//  <div className="max-h-[calc(100vh-10px)] border-r-8 rounded-2xl shadow-2xl border-pink-700 bg-white overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white scroll-smooth">  
//   <h2 className="text-xl font-bold mb-4">Filter</h2>

//       {/* Category */}
//       <div className="mb-6">
//         <label className="block font-medium mb-2">Category</label>
//         {categories.map((category) => (
//           <div key={category} className="flex items-center mb-2">
//             <input
//               type="radio"
//               name="category"
//               checked={filters.category === category}
//               onChange={() => handleRadioChange("category", category)}
//               className="mr-2"
//             />
//             <span>{category}</span>
//           </div>
//         ))}
//       </div>

//       {/* Gender */}
//       <div className="mb-6">
//         <label className="block font-medium mb-2">Gender</label>
//         {genders.map((gender) => (
//           <div key={gender} className="flex items-center mb-2">
//             <input
//               type="radio"
//               name="gender"
//               checked={filters.gender === gender}
//               onChange={() => handleRadioChange("gender", gender)}
//               className="mr-2"
//             />
//             <span>{gender}</span>
//           </div>
//         ))}
//       </div>

//       {/* Colors */}
//       <div className="mb-6">
//         <label className="block font-medium mb-2">Color</label>
//         <div className="flex flex-wrap gap-2">
//           {colors.map((color) => (
//             <button
//               key={color}
//               onClick={() => handleRadioChange("color", color)}
//               className={`w-8 h-8 rounded-full border-2 ${
//                 filters.color === color ? "border-black" : "border-gray-300"
//               }`}
//               style={{ backgroundColor: color.toLowerCase() }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Sizes */}
//       <div className="mb-6">
//         <label className="block font-medium mb-2">Size</label>
//         {sizes.map((size) => (
//           <div key={size} className="flex items-center mb-2">
//             <input
//               type="checkbox"
//               checked={filters.size.includes(size)}
//               onChange={() => handleCheckboxChange("size", size)}
//               className="mr-2"
//             />
//             <span>{size.toUpperCase()}</span>
//           </div>
//         ))}
//       </div>

//       {/* Brands */}
//       <div className="mb-6">
//         <label className="block font-medium mb-2">Brand</label>
//         {brands.map((brand) => (
//           <div key={brand} className="flex items-center mb-2">
//             <input
//               type="checkbox"
//               checked={filters.brand.includes(brand)}
//               onChange={() => handleCheckboxChange("brand", brand)}
//               className="mr-2"
//             />
//             <span>{brand}</span>
//           </div>
//         ))}
//       </div>
//       {/* Price Range */}
// <div className="mb-6">
//   <label className="block font-medium mb-2">Price Range</label>

//   <div className="flex justify-between text-sm mb-2">
//     <span>₹{filters.minPrice}</span>
//     <span>₹{filters.maxPrice}</span>
//   </div>

//   {/* Min Price */}
//   <input
//     type="range"
//     min="0"
//     max="100000"
//     step="500"
//     value={filters.minPrice}
//     onChange={(e) => handlePriceChange("minPrice", e.target.value)}
//     className="w-full mb-2"
//   />

//   {/* Max Price */}
//   <input
//     type="range"
//     min="0"
//     max="100000"
//     step="500"
//     value={filters.maxPrice}
//     onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
//     className="w-full"
//   />
// </div>

//     </div>
//   );
// };

// export default FilterSidebar;
















































import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100000,
  });

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = ["Red", "Blue", "Green", "Yellow", "Gray", "DeepPink"];
  const genders = ["Male", "Female"];
  const materials = ["cotton", "linen", "jeans", "silk", "denim", "tracks"];
  const sizes = ["xs", "sm", "md", "l", "xl", "xxl"];
  const brands = ["MD", "OTTO", "MAX", "TURTLE", "LEVIS", "POLO", "URBAN"];

  // Load filters from URL
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Math.max(0, params.minPrice ? Number(params.minPrice) : 0),
      maxPrice: Math.min(100000, params.maxPrice ? Number(params.maxPrice) : 100000),
    });
  }, [searchParams]);

  // Update URL when filters change
  const updateURL = useCallback((newFilters) => {
    const params = {};

    if (newFilters.category) params.category = newFilters.category;
    if (newFilters.gender) params.gender = newFilters.gender;
    if (newFilters.color) params.color = newFilters.color;
    if (newFilters.size.length) params.size = newFilters.size.join(",");
    if (newFilters.material.length)
      params.material = newFilters.material.join(",");
    if (newFilters.brand.length) params.brand = newFilters.brand.join(",");
    params.minPrice = newFilters.minPrice.toString();
    params.maxPrice = newFilters.maxPrice.toString();

    setSearchParams(params);
  }, [setSearchParams]);

  const handlePriceChange = useCallback((type, value) => {
    const val = Math.max(0, Math.min(100000, Number(value)));
    let newMin = filters.minPrice;
    let newMax = filters.maxPrice;

    if (type === "minPrice") {
      newMin = val;
      if (newMin > newMax) newMax = newMin;
    }
    if (type === "maxPrice") {
      newMax = val;
      if (newMin > newMax) newMin = newMax;
    }

    const newFilters = { ...filters, minPrice: newMin, maxPrice: newMax };

    setFilters(newFilters);
    updateURL(newFilters);
  }, [filters.minPrice, filters.maxPrice, filters, updateURL]);

  const handleRadioChange = useCallback((type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    updateURL(newFilters);
  }, [filters, updateURL]);

  const handleCheckboxChange = useCallback((type, value) => {
    const updated = filters[type].includes(value)
      ? filters[type].filter((v) => v !== value)
      : [...filters[type], value];

    const newFilters = { ...filters, [type]: updated };
    setFilters(newFilters);
    updateURL(newFilters);
  }, [filters, updateURL]);

  return (
    <div className="max-h-[calc(100vh-10px)] border-r-8 rounded-2xl shadow-2xl border-pink-700 bg-white overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white scroll-smooth"> 
      <h2 className="text-xl font-bold mb-4">Filter</h2>

      {/* Category */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="radio"
              name="category"
              checked={filters.category === category}
              onChange={() => handleRadioChange("category", category)}
              className="mr-2 w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500"
            />
            <span>{category}</span>
          </div>
        ))}
      </div>

      {/* Gender */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-2">
            <input
              type="radio"
              name="gender"
              checked={filters.gender === gender}
              onChange={() => handleRadioChange("gender", gender)}
              className="mr-2 w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500"
            />
            <span>{gender}</span>
          </div>
        ))}
      </div>

      {/* Colors */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleRadioChange("color", color)}
              className={`w-10 h-10 rounded-full border-4 transition-all duration-200 hover:scale-110 shadow-md ${
                filters.color === color 
                  ? "border-black shadow-lg transform scale-110" 
                  : "border-gray-300 hover:border-gray-400"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filters.size.includes(size)}
              onChange={() => handleCheckboxChange("size", size)}
              className="mr-2 w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
            />
            <span className="font-semibold">{size.toUpperCase()}</span>
          </div>
        ))}
      </div>

      {/* Materials */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filters.material.includes(material)}
              onChange={() => handleCheckboxChange("material", material)}
              className="mr-2 w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
            />
            <span className="capitalize">{material}</span>
          </div>
        ))}
      </div>

      {/* Brands */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filters.brand.includes(brand)}
              onChange={() => handleCheckboxChange("brand", brand)}
              className="mr-2 w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
            />
            <span>{brand}</span>
          </div>
        ))}
      </div>
      
      {/* Price Range - FIXED */}
      <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200">
        <label className="block font-semibold mb-3 text-lg">Price Range</label>

        <div className="flex justify-between text-lg font-bold mb-4 px-2">
          <span>₹{filters.minPrice.toLocaleString()}</span>
          <span>₹{filters.maxPrice.toLocaleString()}</span>
        </div>

        <div className="space-y-3">
          {/* Min Price Slider */}
          <div>
            <span className="text-sm text-gray-600 block mb-1">Min Price</span>
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={filters.minPrice}
              onChange={(e) => handlePriceChange("minPrice", e.target.value)}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-600 shadow-sm hover:shadow-md transition-all duration-200"
              style={{
                background: `linear-gradient(to right, #f472b6 ${((filters.minPrice - 0) / 100000) * 100}%, #e5e7eb ${((filters.minPrice - 0) / 100000) * 100}%)`
              }}
            />
          </div>

          {/* Max Price Slider */}
          <div>
            <span className="text-sm text-gray-600 block mb-1">Max Price</span>
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 shadow-sm hover:shadow-md transition-all duration-200"
              style={{
                background: `linear-gradient(to right, #f472b6 ${((filters.maxPrice - 0) / 100000) * 100}%, #e5e7eb ${((filters.maxPrice - 0) / 100000) * 100}%)`
              }}
            />
          </div>
        </div>

        <div className="mt-3 text-center text-sm p-4 text-gray-600 mb-5">
          Range: ₹{filters.minPrice.toLocaleString()} - ₹{filters.maxPrice.toLocaleString()}
        </div>
        <br></br><br></br> <br></br><br></br>
      </div>

    </div>
  );
};

export default FilterSidebar;






// 1. User clicks "M" checkbox
//    → handleCheckboxChange("size", "M") called
//    → filters.size becomes ["M"]
//    → URL becomes ?size=M

// 2. User clicks "LEVIS" checkbox  
//    → handleCheckboxChange("brand", "LEVIS") called
//    → filters.brand becomes ["LEVIS"]
//    → URL becomes ?size=M&brand=LEVIS

// 3. useEffect sees URL change
//    → Reads ?size=M&brand=LEVIS
//    → Updates filters state to match
//    → UI shows both checkboxes as checked

// 4. Parent component uses filters state
//    → Makes API call: /api/products?size=M&brand=LEVIS
//    → Shows filtered products