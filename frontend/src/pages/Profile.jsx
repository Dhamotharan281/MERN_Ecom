import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { toast } from "sonner";
import MyOrdersPage from "./MyOrdersPage";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">

          {/* Left Section - User Info */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6 shadow-xl transition duration-100 rounded-xl border border-pink-600">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {user?.name || "Loading..."}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {user?.email || "Loading..."}
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Role:</span>
                <span className="font-medium">{user?.role || "USER"}</span>
              </div>
              {user?.fraudScore > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Fraud Score:</span>
                  <span className={`font-medium ${
                    user.fraudScore > 50 ? "text-red-600" : 
                    user.fraudScore > 25 ? "text-yellow-600" : "text-green-600"
                  }`}>
                    {user.fraudScore}
                  </span>
                </div>
              )}
            </div>
            <button 
              onClick={handleLogout}
              className="w-full bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-500 mt-4"
            >
              Logout
            </button>
          </div>

          {/* Right Section: Orders table */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
