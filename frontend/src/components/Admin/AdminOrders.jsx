import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import { toast } from "sonner";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setOrders(data.data);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await API.put(`/orders/${orderId}/status`, { orderStatus: status });
      toast.success("Order status updated");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update order");
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4">Order ID</th>
              <th className="text-left py-3 px-4">Customer</th>
              <th className="text-left py-3 px-4">Items</th>
              <th className="text-left py-3 px-4">Total</th>
              <th className="text-left py-3 px-4">Payment</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-mono text-sm">
                  {order._id.slice(-8)}
                </td>
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium">{order.user?.name}</p>
                    <p className="text-sm text-gray-500">{order.user?.email}</p>
                  </div>
                </td>
                <td className="py-3 px-4">{order.orderItems.length}</td>
                <td className="py-3 px-4 font-bold">${order.totalPrice.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      order.isPaid
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Unpaid"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <select
                    value={order.orderStatus}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:underline text-sm">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
