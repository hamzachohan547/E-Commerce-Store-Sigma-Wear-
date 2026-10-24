import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

function Checkout() {
  const navigate = useNavigate();

  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==============================
  // Handle Input Changes
  // ==============================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==============================
  // Place Order
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Get JWT token
      const token = localStorage.getItem("sigma-token");

      if (!token) {
        setError("Please login before placing an order.");
        setLoading(false);
        return;
      }

      // Prepare order data
      const orderData = {
        items: cart,

        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },

        paymentMethod: "COD",
      };

      console.log("Sending Order:", orderData);

      // Send order to backend
      const response = await api.post(
        "/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order Response:", response.data);

      // Clear cart after successful order
      clearCart();

      // Show success message
      alert("🎉 Order placed successfully!");

      // Go to home
      navigate("/");

    } catch (error) {
      console.error("Order Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Empty Cart
  // ==============================

  if (cart.length === 0) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6">

        <h1 className="text-3xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="mt-3 text-gray-500">
          Add some products before checkout.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="mt-6 rounded-full bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800"
        >
          Continue Shopping
        </button>

      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">

      {/* ==============================
          Page Heading
      ============================== */}

      <div className="mb-10">

        <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
          Sigma Wears
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Checkout
        </h1>

        <p className="mt-2 text-gray-500">
          Complete your information to place your order.
        </p>

      </div>

      <div className="grid gap-10 lg:grid-cols-3">

        {/* ==================================
            Checkout Form
        ================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 lg:col-span-2"
        >

          <div className="border p-6">

            <h2 className="mb-6 text-2xl font-semibold">
              Shipping Information
            </h2>

            <div className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="03XX-XXXXXXX"
                  required
                  className="w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              {/* Address */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Complete Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number, street, area..."
                  rows="4"
                  required
                  className="w-full resize-none border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              {/* City + Postal Code */}
              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Rawalpindi"
                    required
                    className="w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Postal Code
                  </label>

                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="46000"
                    required
                    className="w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

              </div>

            </div>

          </div>

          {/* ==================================
              Payment Method
          ================================== */}

          <div className="border p-6">

            <h2 className="mb-5 text-2xl font-semibold">
              Payment Method
            </h2>

            <label className="flex cursor-pointer items-center gap-4 border border-black p-4">

              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                defaultChecked
              />

              <div>
                <p className="font-semibold">
                  Cash on Delivery
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Pay when your order is delivered.
                </p>
              </div>

            </label>

          </div>

          {/* ==================================
              Error Message
          ================================== */}

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* ==================================
              Place Order Button
          ================================== */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-black py-4 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>

        </form>

        {/* ==================================
            Order Summary
        ================================== */}

        <div className="h-fit border p-6">

          <h2 className="text-xl font-semibold">
            Order Summary
          </h2>

          {/* Products */}
          <div className="mt-6 space-y-5">

            {cart.map((item) => (
              <div
                key={`${item._id}-${item.size}-${item.color}`}
                className="flex gap-4"
              >

                {/* Image */}
                <div className="h-20 w-16 flex-shrink-0 overflow-hidden bg-gray-100">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />

                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">

                  <p className="truncate font-medium">
                    {item.name}
                  </p>

                  {item.size && (
                    <p className="text-sm text-gray-500">
                      Size: {item.size}
                    </p>
                  )}

                  {item.color && (
                    <p className="text-sm text-gray-500">
                      Color: {item.color}
                    </p>
                  )}

                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                </div>

                {/* Price */}
                <p className="whitespace-nowrap font-medium">
                  Rs.{" "}
                  {(item.price * item.quantity).toLocaleString()}
                </p>

              </div>
            ))}

          </div>

          {/* Price Details */}
          <div className="mt-6 border-t pt-5">

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Subtotal
              </span>

              <span>
                Rs. {cartTotal.toLocaleString()}
              </span>
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <span className="text-gray-600">
                Delivery
              </span>

              <span className="text-green-600">
                Free
              </span>
            </div>

            <div className="mt-5 flex justify-between border-t pt-5 text-lg font-bold">
              <span>
                Total
              </span>

              <span>
                Rs. {cartTotal.toLocaleString()}
              </span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Checkout;