import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [checkoutId, setCheckoutId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", shippingAddress);
    setCheckoutId(1);
  };

  const handlePaymentSuccess = async (details) => {
    try {
      setLoading(true);
      
      const itemsPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const taxPrice = itemsPrice * 0.18;
      const shippingPrice = itemsPrice > 500 ? 0 : 50;
      const totalPrice = itemsPrice + taxPrice + shippingPrice;

      const orderData = {
        orderItems: cart.items.map(item => ({
          product: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          image: item.product.images[0]?.url,
          price: item.price,
          size: item.size,
          color: item.color,
        })),
        shippingAddress,
        paymentMethod: "PayPal",
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      };

      const { data } = await API.post("/orders", orderData);
      
      await API.put(`/orders/${data.data._id}/pay`, {
        id: details.orderID,
        status: "COMPLETED",
        update_time: details.create_time,
        email_address: details.payer.email_address,
      });

      toast.success("Order placed successfully!");
      clearCart();
      navigate("/order-confirmation", { state: { order: data.data } });
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error(error.response?.data?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-10 tracking-tighter">

      {/* LEFT SIDE */}
      <div className="bg-white rounded-2xl p-6">
        <h2 className="text-2xl uppercase">Checkout</h2>

        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>

          <div className="mb-4">
            <label className="block text-gray-800">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          <h3 className="text-xl mb-4">Delivery</h3>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, address: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, city: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, country: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, phone: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full text-xl bg-pink-600 text-white font-extrabold py-5 rounded"
              >
                Continue to Payment →
              </button>
            ) : (
              <div>
                <h2 className="text-lg text-white mb-4 border-l-24 border-blue-800 bg-blue-400 font-extrabold px-3 text-lg p-4 rounded-full">
                  🅿️ayPal vibes 💳
                </h2>
                <PaypalButton 
                  amount={cart.totalPrice} 
                  onError={(err) => alert("Payment failed. Try Again.")} 
                  onSuccess={handlePaymentSuccess} 
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* RIGHT SIDE — ORDER SUMMARY */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>

        <div className="border-t py-4 mb-4">
          {cart.items.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b"
            >
              <div className="flex items-start">
                <img
                  src={item.product.images[0]?.url}
                  alt={item.product.name}
                  className="w-20 h-24 object-cover mr-4"
                />

                <div>
                  <h3 className="text-md">{item.product.name}</h3>
                  <p className="text-gray-500">Size: {item.size}</p>
                  <p className="text-gray-500">Color: {item.color}</p>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>Sub Total</span>
          <span>${cart.totalPrice?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-lg">
          <h3>Shipping</h3>
          <h3>{cart.totalPrice > 500 ? "Free" : "$50"}</h3>
        </div>

        <div className="flex justify-between items-center text-lg">
          <h3>Total</h3>
          <h3>${(cart.totalPrice * 1.18 + (cart.totalPrice > 500 ? 0 : 50)).toFixed(2)}</h3>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
