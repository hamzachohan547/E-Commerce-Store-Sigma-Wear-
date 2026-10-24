import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";

import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import Orders from "./pages/Orders/Orders";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminProducts from "./pages/Admin/AdminProducts";
import AddProduct from "./pages/Admin/AddProduct";
import EditProduct from "./pages/Admin/EditProduct";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* =====================
            Public Routes
        ====================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* =====================
            Protected Routes
        ====================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/order-success/:id"
            element={<OrderSuccess />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />
          <Route element={<AdminRoute />}>

  <Route
    path="/admin"
    element={<AdminDashboard />}
  />

  <Route
    path="/admin/orders"
    element={<AdminOrders />}
  />

 <Route
    path="/admin/products"
    element={<AdminProducts />}
  />
    
      <Route
    path="/admin/products/add"
    element={<AddProduct />}
  />
    
  <Route
    path="/admin/products/edit/:id"
    element={<EditProduct />}
  />
  
</Route>

   

        </Route>

      </Routes>
    </>
  );
}

export default App;