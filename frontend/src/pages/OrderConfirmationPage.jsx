// import React from 'react'

// const checkout={
// _id:"123",
//     createdAt:new Date(),
//     checkoutItems:[
//         {
//             productId:"1",
//             name:"denim",
//             color:"black",
//             size:"M",
//             price:333,
//             quantity:1,
//             image:"http://picsum.photos/150?random=1",
//         },
//          {
//             productId:"2",
//             name:"Jeans",
//             color:"white",
//             size:"M",
//             price:2000,
//             quantity:1,
//             image:"http://picsum.photos/150?random=3",
//         },
//     ],
//  shippingAddress:{
//     address:"12 fashion street",
//     city:"Chennai",
//     country:"India",
//  }   
// }
// const OrderConfirmationPage = () => {
//   const calculateEstimatedDelivery =(createdAt)=>{
//     const orderDate = new Date(createdAt);
//     orderDate.setDate(orderDate.getDate() + 10) //add 10 days 
//     return orderDate.toLocaleDateString();
//   };
//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white">
//       <h1 className="text-4xl font-bold text-center text-pink-700 mb-8">
//         Thank You for Your Order!
//       </h1>

//       {checkout && (
//         <div className="p-6 rounded-lg border">
//           <div className="flex justify-between mb-20">
//             {/* Order Id and Date */}
//             <div>
//               <h2 className="text-xl font-semibold">
//                 Order ID: {checkout._id}
//               </h2>
//               <h3 className='text-black'>Order Date:- {new Date(checkout.createdAt).toLocaleString()}</h3>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Estimated delivery */}
//       <div>
//         <p className='text-black text-sm'>Estimated Delivery..
//         {calculateEstimatedDelivery(checkout.createdAt)}</p>
//       </div>
//       {/*  orderred items */}
//       <div className='mb-20'>
// {checkout.checkoutItems.map((item)=>(
// <div key={item.productId} className='flex items-center mb-4'> 
// <img src={item} alt={item.name} className='w-16 h-16 object-cover rounded-md mr-4'/>
// <div>
//   <h3 className='text-md font-extrabold'>{item.name}</h3>
// <p className='text-sm text-shadow-gray-600'>{item.color} | {item.size}</p>
  
//   </div>
//   <div className='ml-auto text-right'>
//     <p className='text-md'>{item.price}</p>
//         <p className='text-md text-gray-600'>{item.quantity}</p>
  

//     </div>

// </div>

// ))}
//       </div>
//       {/* payment and delivery  */}
// <div><h3 className='text-lg font-semibold mb-4'>Payment</h3>
// <p className='text-gray-700'>Paypal</p>
// {/* Delivery info */}
// <div>
//   <h4 className='text-lg font-extrabold mb-2' >Delivery</h4>
//   <p className='text-gray-600'>{checkout.shippingAddress.address}</p>
//   <p className='text-gray-700'> {checkout.shippingAddress.city},{" "}
//  {checkout.shippingAddress.country}

//   </p>
// </div>
// </div>

//     </div>
//   );
// };

// export default OrderConfirmationPage




import React from "react";

const checkout = {
  _id: "123",
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: "1",
      name: "Denim",
      color: "Black",
      size: "M",
      price: 333,
      quantity: 1,
      image: "https://picsum.photos/150?random=1",
    },
    {
      productId: "2",
      name: "Jeans",
      color: "White",
      size: "M",
      price: 2000,
      quantity: 1,
      image: "https://picsum.photos/150?random=3",
    },
  ],
  shippingAddress: {
    address: "12 Fashion Street",
    city: "Chennai",
    country: "India",
  },
};

const OrderConfirmationPage = () => {
  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  const totalPrice = checkout.checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-pink-700 mb-8">
        Thank You for Your Order!
      </h1>

      {/* Order Info */}
      <div className="p-6 rounded-lg border mb-6">
        <h2 className="text-xl font-semibold">
          Order ID: {checkout._id}
        </h2>
        <p className="text-gray-600">
          Order Date: {new Date(checkout.createdAt).toLocaleString()}
        </p>
        <p className="text-sm text-gray-700 mt-2">
          Estimated Delivery:{" "}
          <span className="font-semibold">
            {calculateEstimatedDelivery(checkout.createdAt)}
          </span>
        </p>
      </div>

      {/* Ordered Items */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Ordered Items</h3>

        {checkout.checkoutItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-center border-b py-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md mr-4"
            />

            <div>
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-600">
                {item.color} | Size {item.size}
              </p>
            </div>

            <div className="ml-auto text-right">
              <p className="font-semibold">₹{item.price}</p>
              <p className="text-sm text-gray-600">
                Qty: {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Payment */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
        <p className="text-gray-700">PayPal</p>
      </div>

      {/* Delivery Address */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
        <p className="text-gray-700">{checkout.shippingAddress.address}</p>
        <p className="text-gray-700">
          {checkout.shippingAddress.city},{" "}
          {checkout.shippingAddress.country}
        </p>
      </div>

      {/* Total */}
      <div className="border-t pt-4 text-right">
        <p className="text-xl font-bold">
          Total: ₹{totalPrice}
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
