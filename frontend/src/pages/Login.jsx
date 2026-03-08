import React, { useState } from "react";
import logo from "../assets/logo.png";
import login from "../assets/login.webp";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      await loginUser({ email, password });
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border">
          
          <h2 className="text-center text-xl font-extrabold mb-2 text-gray-600">
            CartsPoint..
          </h2>

          <h1 className="text-center text-2xl font-bold mb-4">
            Hey there! 👋
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Enter your username and password to Login.
          </p>

          <form onSubmit={handleSubmit}>
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
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-black">
              Register
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2">
        <img
          src={login}
          alt="Login Visual"
          className="w-full h-[750px] object-fit rounded-2xl p-5 shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Login;









































// import React, { useState } from "react";
// import logo from "../assets/logo.png";
// import {Link } from "react-router-dom";
// import login from "../assets/login.webp";
// const Login = () => {
//   const [email, setEmail] = useState("");       // string
//   const [password, setPassword] = useState(""); // string

//   const handleSubmit = (e) => {
//     e.preventDefault(); // stop page reload

//     if (!email || !password) {
//       alert("Please enter email and password");
//       return;
//     }

//     console.log("Email:", email);
//     console.log("Password:", password);

//     // 👉 Here you will call API later
//   };

//   return (
//     <div className="w-full md:w-1/2 flex  justify-center items-center p-8 md:p-12">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white p-8 rounded-lg border shadow-2xl"
//       >
//         <div className="flex justify-center mb-6">
//           <img
//             src={logo}
//             alt="Logo"
//             className=" block  md:hidden w-20 h-18 rounded-2xl shadow"
//           />
//         </div>

//         <h1 className="text-center mb-6 text-xl font-semibold">
//         {"{    ✨ Hi There! 👋 }"}
//         </h1>

    

//         {/* Email */}
//         <div className="mb-4">
//           <label className="block text-md font-bold mb-2">Email 👤: </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="Enter Email Address"
//           />
//         </div>

//         {/* Password */}
//         <div className="mb-4">
//           <label className="block text-md font-bold mb-2">Password 🔑:</label>
//           <input
//             type="password"   // FIXED
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="Enter Password"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-black text-white py-2 rounded mt-4 hover:bg-gray-800 transition"
//         >
//           🔐 Login
//         </button>
//         <p className="py-3 text-gray-600 text-center text-sm">Don't have an account?
//           <Link to="/register" className="text-black font-extrabold"> Register Us</Link>
//            </p>
//       </form>
//       <div className="hidden md:block w-1/2 bg-gray-800">
//       <div className="">
// <img src={login} className="h-[650px] w-full"/>
//       </div>

//       </div>



//     </div>
//   );
// };

// export default Login;
