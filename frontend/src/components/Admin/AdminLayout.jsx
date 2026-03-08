import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="flex md:hidden p-4 bg-slate-900 text-white justify-between items-center z-30">
        <div className="flex items-center gap-3 font-extrabold">
          <button
            onClick={toggleSidebar}
            className="text-pink-500"
          >
            <FaBars size={22} />
          </button>

          <h1>
            <span className="text-pink-700">AD</span>min Dashboard
          </h1>
        </div>

        {/* LOGO */}
        <img
          src={logo}
          alt="logo"
          className="h-10 w-auto rounded-xl border-r-4 border-pink-600"
        />
      </div>

      {/* ================= OVERLAY (MOBILE ONLY) ================= */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden "
          onClick={toggleSidebar}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          bg-gray-900 w-64 min-h-screen shadow text-white border-r-4 outline-2 outline-white rounded  border-pink-500
          absolute md:relative z-20
          transform transition-transform duration-500
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <AdminSidebar />
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;
