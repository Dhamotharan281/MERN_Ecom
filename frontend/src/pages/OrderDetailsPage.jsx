// // import React,{useState,useEffect} from 'react'
// // import { useParams } from 'react-router-dom'
// // const OrderDetailsPage = () => {
// //     const {id}=useParams();
// //     const [orderDetails,setOrderDetails]=useState(null);
// //     useEffect(()=>{
// //         const mockOrderDetails={
// //             _id:id,
// //             createdAt:new Date(),
// //             isPaid:true,
// //             isDelivery:false,
// //             paymentMethod:"PayPal",
// //             shippingMethod:"Standard",
// //             shippingAddress:{city:"New York",country:"USA"},
// //             orderItems:[
// //                 {
// //                     productId:"1",
// //                     name:"Jacket",
// //                     price:112,
// //                     quantity:1,
// //                     image:"https://picsum.photos/150?random=1",
// //                 }, {
// //                     productId:"2",
// //                     name:"shirt",
// //                     price:5112,
// //                     quantity:1,
// //                     image:"https://picsum.photos/150?random=4",
// //                 }
// //             ]
// //         };setOrderDetails(mockOrderDetails)
// //     },[id]);
// //   return (
// //     <div>
// //       <div className='max-w-6xl mx-auto p-4 sm:p-6'>
// //         <h2  className='text-2xl md:text-3xl font-bold mb-6'>My Order Details</h2>
// // {
// //     !orderDetails?(
// //         <p>no order fount</p>
// //     ):(
// //         <div className='p-4 sm:p-6 rounded-lg border'>
// // <div className='flex flex-col sm:flex-row justify-between mb-6'>
// // <div>
// //  <h3 >Order Id: #{orderDetails._id}</h3>
// // <p className='text-gray-500'>
// // {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
// //     </div>
// //     <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
// //       <span className={`${orderDetails.isPaid
// // ?"bg-green-200 text-green-800"
// // :"bg-red-100 text-red-800"

// //       }px-4 py-1 rounded-full text-sm font-medium mb-3`}
      
// //       > {orderDetails.isPaid?"Approved":"Pending.."}</span>
// //        <span className={`${orderDetails.isDelivery
// // ?"bg-green-200 text-green-800"
// // :"bg-yellow-100 text-yellow-800"

// //       }px-4 py-1 rounded-full text-sm font-medium mb-3`}
      
// //       > {orderDetails.isDelivery?"Delivered":"Pending.."}</span>
      
// //         </div>

// //         {/* customer , Payment, shipping info */}
// //         <div className='grid grid-cols-1 sm:'>


// //             </div>
// //     </div>


// //  </div>    )
// // }
// //       </div>
// //     </div>
// //   )
// // }

// // export default OrderDetailsPage





















// import React, { useState, useEffect } from "react"
// import { useParams } from "react-router-dom"
// import { Link } from "react-router-dom"

// const OrderDetailsPage = () => {
//   const { id } = useParams()
//   const [orderDetails, setOrderDetails] = useState(null)

//   useEffect(() => {
//     const mockOrderDetails = {
//       _id: id,
//       createdAt: new Date(),
//       isPaid: true,
//       isDelivery: false,
//       paymentMethod: "PayPal",
//       shippingMethod: "Standard",
//       shippingAddress: { city: "New York", country: "USA" },
//       orderItems: [
//         {
//           productId: "1",
//           name: "Jacket",
//           price: 112,
//           quantity: 1,
//           image: "https://picsum.photos/150?random=1",
//         },
//         {
//           productId: "2",
//           name: "shirt",
//           price: 5112,
//           quantity: 1,
//           image: "https://picsum.photos/150?random=4",
//         },
//       ],
//     }

//     setOrderDetails(mockOrderDetails)
//   }, [id])

//   return (
//     <div>
//       <div className="max-w-6xl mx-auto p-4 sm:p-6">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6">
//           My Order Details
//         </h2>

//         {!orderDetails ? (
//           <p>no order fount</p>
//         ) : (
//           <div className="p-4 sm:p-6 rounded-lg border">
//             <div className="flex flex-col sm:flex-row justify-between mb-6">
//               <div>
//                 <h3>Order Id: #{orderDetails._id}</h3>
//                 <p className="text-gray-500">
//                   {new Date(orderDetails.createdAt).toLocaleDateString()}
//                 </p>
//               </div>

//               <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
//                 <span
//                   className={`${
//                     orderDetails.isPaid
//                       ? "bg-green-200 text-green-800"
//                       : "bg-red-100 text-red-800"
//                   } px-4 py-1 rounded-full text-sm font-medium mb-3`}
//                 >
//                   {orderDetails.isPaid ? "Approved" : "Pending.."}
//                 </span>

//                 <span
//                   className={`${
//                     orderDetails.isDelivery
//                       ? "bg-green-200 text-green-800"
//                       : "bg-yellow-100 text-yellow-800"
//                   } px-4 py-1 rounded-full text-sm font-medium mb-3`}
//                 >
//                   {orderDetails.isDelivery ? "Delivered" : "Pending.."}
//                 </span>
//               </div>
//             </div>

//             {/* customer , Payment, shipping info */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">

//                 <div>
// <h4 className="text-lg font-extrabold mb-2">Payment Info</h4>
// <p>Payment Method {orderDetails.paymentMethod}</p>
// <p>Status:{orderDetails.isPaid ?"Paid":"Unpaid"}</p>


//                     </div>
//                     <div>
//      <h4 className="text-lg font-extrabold mb-4">Shipping Info</h4>
//     <p>Shipping Method:{orderDetails.shippingMethod}</p>
//     <p>Address:{" "}{`${orderDetails.shippingAddress.city},${orderDetails.shippingAddress.country}`}</p>
//      </div>
//             </div>


//             {/* Product List */}

//             <div className="overflow-x-auto">
// <h3 className="text-lg font-medium mb-4">Products</h3>

// <table className="min-w-full text-gray-600 mb-6">
//     <thead className="bg-gray-300">
// <tr>
//     <th className="py-2 px-3 text-black">Name</th>
//         <th className="py-2 px-3 text-black">Unit Price</th>

//     <th className="py-2 px-3 text-black" >Quantity</th>
// <th className="py-2 px-3 text-black" >total </th></tr>

//     </thead>
// <tbody>
//    {
//     orderDetails.orderItems.map((item)=>(
//         <tr key={item.productId} className="border-b">
// <td className="py-4 px-4 flex items-center">
// <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg mr-4"/>
// <link to ={`product/${item.productId}`} className="text-pink-600 hover:underline">
// {item.name}

// </link>
// </td>

// <td className="py-2 px-4">${item.price}</td>
// <td className="py-2 px-4">${item.quantity}</td>
// <td className="py-2 px-4">${item.price*item.quantity}</td>

//         </tr>
//     ))
//    } 
// </tbody>
// </table>
//                 </div>

//                 <Link to="my-order" className="text-lg text-white mb-4 border-l-24
// // //                  border-pink-600 bg-black-400 font-extrabold px-3 text-lg p-4 rounded-full">Back to Home 🏠</Link>
//           </div>


//         )}
//       </div>
//     </div>
//   )
// }

// export default OrderDetailsPage

import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

const OrderDetailsPage = () => {
  const { id } = useParams()
  const [orderDetails, setOrderDetails] = useState(null)

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivery: false,
      paymentMethod: "PayPal",
      shippingMethod: "Standard",
      shippingAddress: { city: "New York", country: "USA" },
      orderItems: [
        {
          productId: "1",
          name: "Jacket",
          price: 112,
          quantity: 1,
          image: "https://picsum.photos/150?random=1",
        },
        {
          productId: "2",
          name: "shirt",
          price: 5112,
          quantity: 1,
          image: "https://picsum.photos/150?random=4",
        },
      ],
    }

    setOrderDetails(mockOrderDetails)
  }, [id])

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        My Order Details
      </h2>

      {!orderDetails ? (
        <p>no order found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          {/* Order header */}
          <div className="flex flex-col sm:flex-row justify-between mb-6">
            <div>
              <h3>Order Id: #{orderDetails._id}</h3>
              <p className="text-gray-500">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "bg-green-200 text-green-800"
                    : "bg-red-100 text-red-800"
                } px-4 py-1 rounded-full text-sm font-medium mb-3`}
              >
                {orderDetails.isPaid ? "Approved" : "Pending.."}
              </span>

              <span
                className={`${
                  orderDetails.isDelivery
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                } px-4 py-1 rounded-full text-sm font-medium mb-3`}
              >
                {orderDetails.isDelivery ? "Delivered" : "Pending.."}
              </span>
            </div>
          </div>

          {/* Payment & Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-extrabold mb-2">Payment Info</h4>
              <p>Payment Method: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
            </div>

            <div>
              <h4 className="text-lg font-extrabold mb-4">Shipping Info</h4>
              <p>Shipping Method: {orderDetails.shippingMethod}</p>
              <p>
                Address:{" "}
                {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>

          {/* Product List */}
          <div className="overflow-x-auto">
            <h3 className="text-lg font-medium mb-4">Products</h3>

            <table className="min-w-full text-gray-600 mb-6">
              <thead className="bg-gray-300">
                <tr>
                  <th className="py-2 px-3 text-black">Name</th>
                  <th className="py-2 px-3 text-black">Unit Price</th>
                  <th className="py-2 px-3 text-black">Quantity</th>
                  <th className="py-2 px-3 text-black">Total</th>
                </tr>
              </thead>

              <tbody>
                {orderDetails.orderItems.map(item => (
                  <tr key={item.productId} className="border-b">
                    <td className="py-4 px-4 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg mr-4"
                      />

                      {/* ✅ FIXED */}
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-pink-600 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>

                    <td className="py-2 px-4">${item.price}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">
                      ${item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back button */}
          <Link
            to="/my-orders"
            className="text-lg  mb-4 border-l-24   border-pink-600 bg-black/30 text-underline-white font-extrabold px-3 text-lg text-pink-400 p-4 rounded-full"
          >
            Back to Home 🏠
          </Link>
        </div>
      )}
    </div>
  )
}

export default OrderDetailsPage
