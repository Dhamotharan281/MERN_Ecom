import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

const navigate=useNavigate([]);
  useEffect(() => {
    // Simulate fetching orders from API
    const fetchOrders = () => {
      setTimeout(() => {
        const mockOrders = [
          {
            _id: "12345",
            createdAt: new Date("2024-01-15"),
            shippingAddress: {
              city: "New York",
              country: "USA",
              street: "123 Main St",
              zipCode: "10001"
            },
            orderItems: [
              {
                _id: "item1",
                name: "Premium Wireless Headphones",
                image: "https://picsum.photos/500/500?random=1",
                price: 99.99,
                quantity: 1,
                productId: "prod_001"
              }
            ],
            totalPrice: 100,
            isPaid: true,
            isDelivered: false,
            paymentMethod: "Credit Card",
            orderStatus: "Processing"
          },
          {
            _id: "12346",
            createdAt: new Date("2024-01-20"),
            shippingAddress: {
              city: "Los Angeles",
              country: "USA",
              street: "456 Oak Ave",
              zipCode: "90001"
            },
            orderItems: [
              {
                _id: "item2",
                name: "Smart Watch Series 5",
                image: "https://picsum.photos/500/500?random=2",
                price: 249.99,
                quantity: 1,
                productId: "prod_002"
              },
              {
                _id: "item3",
                name: "Screen Protector",
                image: "https://picsum.photos/500/500?random=3",
                price: 15.99,
                quantity: 2,
                productId: "prod_003"
              }
            ],
            totalPrice: 281.97,
            isPaid: true,
            isDelivered: true,
            paymentMethod: "PayPal",
            orderStatus: "Delivered"
          },
          
        ];
        
        setOrders(mockOrders);
        setLoading(false);
      }, 1000); // Simulate 1 second delay
    };

    fetchOrders();
  }, []);
const   handleRowClick=(orderId)=>{
navigate(`/order/${orderId}`)
}
  return (
    <div >
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
  <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
  <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
    <table className="min-w-[900px] min-w-full text-left text-gray-500 border border-pink-600">
      <thead className="bg-gray-100 text-xs uppercase text-gray-700">
        <tr>
          <th className="py-2 px-4 sm:py-3">Image</th>
          <th className="py-2 px-4 sm:py-3">Order ID</th>
          <th className="py-2 px-4 sm:py-3">Created</th>
          <th className="py-2 px-4 sm:py-3">Shipping Address</th>
          <th className="py-2 px-4 sm:py-3">Items</th>
          <th className="py-2 px-4 sm:py-3">Price</th>
          <th className="py-2 px-4 sm:py-3">Status</th>
        </tr>
      </thead>
      <tbody>
    {orders.length > 0 ? (
      orders.map((order) => (
        <tr
          key={order._id} 
          onClick={()=>handleRowClick(order._id)}
          className="border-b hover:border-gray-500 cursor-pointer"
        >
          <td className="py-2 px-2 sm:py-4 sm:px-4">
            <img
              src={order.orderItems[0].image}
              alt={order.orderItems[0].name}
              className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
            />
          </td>

          <td className="py-2 px-2 sm:py-4 sm:px-4">
            {/* {order.orderItems[0].name} */}
            #{order._id}
          </td>

          <td className="py-2 px-2 sm:py-4 sm:px-4">
            {new Date(order.createdAt).toLocaleDateString()}
            {new Date(order.createdAt).toLocaleTimeString()}
          </td>
          <td className="py-2 px-2 sm:py-4 sm:px-4">
            {/* ₹{order.totalPrice} */}
  {order.shippingAddress
  ?`${order.shippingAddress.city},${order.shippingAddress.country} `:"n/a"}
          </td>

          <td className="py-2 px-2 sm:py-4 sm:px-4  font-medium text-gray-800 whitespace-nowrap">
            {/* {order.isDelivered ? "Delivered" : "Pending"} */}
            {order.orderItems.length}
          </td>
          <td className='py-2 px-2 sm:py-4 font-medium text-gray-800 whitespace-nowrap'> 

            ₹{order.totalPrice}
          </td>
          <td className='py-2 px-2 sm:px-4'>
<span className={`${order.isPaid ? "bg-green-800 text-white ":"bg-red-800 text-white"} px-2 py-2 rounded-2xl text-xs sm:text-sm font-medium`}>
  {order.isPaid ? "Paid":"Pending."}
   </span>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td
          colSpan={7}
          className="py-4 px-4 text-center text-gray-500
         
          "
        >
     you have no orders ..
        </td>
      </tr>
    )}
  </tbody>

    </table>
  </div>
</div>

      
    </div>
  )
}

export default MyOrdersPage
