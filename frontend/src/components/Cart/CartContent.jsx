
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import React from 'react'

// const CartContent = () => {
//  const cartProducts = [
//   {
//     productId: 1,
//     name: "Jeans",
//     size: "M",
//     price: "₹ 350",
//     quantity: 2,
//     image: "https://picsum.photos/200?random=1",
//     color:"red"
//   },
//   {
//     productId: 2,
//     name: "T-Shirt",
//     size: "L",
//     price: "₹ 250",
//     quantity: 1,
//     image: "https://picsum.photos/200?random=2",
//     color:"pink"
//   },
//   {
//     productId: 3,
//     name: "Shoes",
//     size: "9",
//     price: "₹ 900",
//     quantity: 1,
//     image: "https://picsum.photos/200?random=3",
//     color:"white"
//   },
//   {
//     productId: 4,
//     name: "Jacket",
//     size: "XL",
//     price: "₹ 1200",
//     quantity: 1,
//     image: "https://picsum.photos/200?random=4",
//     color:"green"
//   },
//   {
//     productId: 5,
//     name: "Cap",
//     size: "Free",
//     price: "₹ 150",
//     quantity: 3,
//     image: "https://picsum.photos/200?random=5",
//     color:"red"
//   },
// ];

//   return (
//     <div>
//       { cartProducts.map((product)=>(

//     <div className='flex items-center justify-between py-4 border-b'>
//       <div className='flex items-center '>
//         <img src={product.image} key={product.productId}   className='w-20 h-24 object-cover rounded-xl mr-3 '></img>
//         </div> 
//         <h3>{product.name}</h3><br></br>
//         <p className='text-sm text-blue-600 '> 
//  | Size: {product.size} | color: {product.color}
//         </p>
//         <div className='flex items-center mt-2'>
//           <button className='border rounded border-black-400 px-2 py-1 text-xl font-medium'>-</button>
//          <span className='mx-3'>{product.quantity}</span>
//                    <button className='border rounded border-black px-2 py-1 text-xl font-medium'>+</button>
//           </div>

//           <div>
// <p className="font-medium">
//   {product.price.toLocaleString()}
// </p>
// <button>
// <RiDeleteBin6Fill className="h-5 w-6 mt-3 text-red-500"/>
// </button>
//             </div>
//         </div>
//   ))


//       }
      
//     </div>
//   )
// }

// export default CartContent




import { RiDeleteBin6Fill } from "react-icons/ri";
import React, { useState } from 'react';

const CartContent = () => {
  const [cartProducts, setCartProducts] = useState([
    {
      productId: 1,
      name: "Jeans",
      size: "M",
      price: 350,  // Fixed: number for calculations
      quantity: 2,
      image: "https://picsum.photos/200?random=1",
      color: "red"
    },
    {
      productId: 2,
      name: "T-Shirt",
      size: "L",
      price: 250,
      quantity: 1,
      image: "https://picsum.photos/200?random=2",
      color: "pink"
    },
    {
      productId: 3,
      name: "Shoes",
      size: "9",
      price: 900,
      quantity: 1,
      image: "https://picsum.photos/200?random=3",
      color: "white"
    },
    {
      productId: 4,
      name: "Jacket",
      size: "XL",
      price: 1200,
      quantity: 1,
      image: "https://picsum.photos/200?random=4",
      color: "green"
    },
    {
      productId: 5,
      name: "Cap",
      size: "Free",
      price: 150,
      quantity: 3,
      image: "https://picsum.photos/200?random=5",
      color: "red"
    },
  ]);

  const increaseQuantity = (productId) => {
    setCartProducts(prev => prev.map(item => 
      item.productId === productId 
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const decreaseQuantity = (productId) => {
    setCartProducts(prev => prev.map(item => 
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const removeItem = (productId) => {
    setCartProducts(prev => prev.filter(item => item.productId !== productId));
  };

  const getTotal = () => {
    return cartProducts.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      
      {cartProducts.map((product) => (
        <div key={product.productId} className="flex items-center justify-between py-6 border-b last:border-b-0">
          {/* Image */}
          <div className="flex-shrink-0">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-20 h-24 object-cover rounded-xl"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 px-6">
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Size: <span className="font-medium">{product.size}</span> | 
              Color: <span className="font-medium capitalize">{product.color}</span>
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => decreaseQuantity(product.productId)}
              className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center text-lg hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <span className="font-semibold min-w-[2rem] text-center">{product.quantity}</span>
            <button
              onClick={() => increaseQuantity(product.productId)}
              className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center text-lg hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>

          {/* Price & Delete */}
          <div className="flex flex-col items-end space-y-3 ml-6">
            <p className="text-xl font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
            <button
              onClick={() => removeItem(product.productId)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Remove item"
            >
              <RiDeleteBin6Fill className="h-6 w-6" />
            </button>
          </div>
        </div>
      ))}

      {/* Total & Checkout */}
      {cartProducts.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center text-2xl font-bold">
            <span>Total:</span>
            <span>₹{getTotal().toLocaleString('en-IN')}</span>
          </div>
          <button className="w-full mt-6 bg-black text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartContent;
