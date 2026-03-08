import React, { useState } from "react";
import logo from "../assets/logo.png";
import login from "../assets/login.webp";
import { Link, useNavigate } from "react-router-dom";
import register from "../assets/register.webp";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await registerUser({ name, email, password });
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      
      {/* ================= LEFT SIDE ================= */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-50 p-6 ">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border">
          
           <h2 className="text-center text-xl font-extrabold mb-2 text-gray-600">
            CartsPoint..
          </h2>

          <h1 className="text-center text-2xl font-bold mb-4">
            Hey there! 👋
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Enter your Name, Email and Password to Register.
          </p>

          <form onSubmit={handleSubmit}>
             {/* Name */}
            <div className="mb-4">
              <label className="block text-base font-semibold mb-2">Name</label>
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your Nice Name!"
              />
            </div>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-base font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your email address"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-base font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded mt-3 hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-black">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE IMAGE ================= */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={register}
          alt="Login Visual"
          className="w-full h-[750px] object-fit rounded-2xl p-5 shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Register;
