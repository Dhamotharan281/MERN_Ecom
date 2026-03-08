import React from "react";
import { MdOutlineAdminPanelSettings, MdDashboard, MdShoppingCart, MdPeople } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: MdDashboard, label: "Dashboard" },
    { path: "/admin/products", icon: FaBoxOpen, label: "Products" },
    { path: "/admin/orders", icon: MdShoppingCart, label: "Orders" },
    { path: "/admin/users", icon: MdPeople, label: "Users" },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <Link
          to="/admin"
          className="flex items-center gap-2 text-2xl font-extrabold text-white hover:text-pink-500 transition"
        >
          <span className="text-pink-700">CA</span>
          rts point
          <MdOutlineAdminPanelSettings className="text-pink-500 text-3xl" />
        </Link>
        <div className="border-t-4 border-white flex justify-center rounded">
          <img
            src={logo}
            alt="logo"
            className="hidden sm:hidden md:block md:outline-2 md-outline-white w-22 h-22 object-contain rounded-b-4xl border-b-4 border-pink-600 my-6"
          />
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-pink-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="text-xl" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-8 border-t border-gray-700">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition"
        >
          <span>← Back to Store</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
