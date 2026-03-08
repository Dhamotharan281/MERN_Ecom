import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import ProductDetails from "./components/Products/ProductDetails";
import Login from "./pages/Login";
import CollectionPage from "./pages/CollectionPage";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Checkout from "./components/Cart/Checkout.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.jsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.jsx";
import MyOrdersPage from "./pages/MyOrdersPage.jsx";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import AdminProducts from "./components/Admin/AdminProducts.jsx";
import AdminOrders from "./components/Admin/AdminOrders.jsx";
import AdminUsers from "./components/Admin/AdminUsers.jsx";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Toaster position="top-right" richColors />

          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="collections/:collection" element={<CollectionPage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="order/:id" element={<OrderDetailsPage />} />
              <Route path="my-orders" element={<MyOrdersPage />} />
            </Route>
            
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
