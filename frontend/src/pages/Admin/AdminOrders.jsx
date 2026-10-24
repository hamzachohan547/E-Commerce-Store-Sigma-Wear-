import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Fetch All Orders
  // ==========================================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("sigma-token");

      const response = await api.get(
        "/orders/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data.orders);

    } catch (error) {
      console.error("Admin Orders Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Load Orders
  // ==========================================

  useEffect(() => {
    fetchOrders();
  }, []);

  // ==========================================
  // Update Status
  // ==========================================

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("sigma-token");

      const response = await api.put(
        `/orders/${orderId}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Status Updated:",
        response.data
      );

      // Update UI immediately
      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: status,
              }
            : order
        )
      );

      alert("Order status updated successfully!");

    } catch (error) {
      console.error(
        "Update Status Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update status."
      );
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500">
          Loading orders...
        </p>
      </section>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (error) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="text-red-500">
            {error}
          </p>

          <button
            onClick={fetchOrders}
            className="mt-4 rounded-full bg-black px-6 py-2 text-white"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">

      {/* =====================================
          Heading
      ====================================== */}

      <div className="mb-10">

        <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
          Sigma Wears
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Admin Orders
        </h1>

        <p className="mt-2 text-gray-500">
          Manage customer orders and update their status.
        </p>

      </div>

      {/* =====================================
          No Orders
      ====================================== */}

      {orders.length === 0 ? (

        <div className="border p-10 text-center">

          <h2 className="text-2xl font-semibold">
            No Orders Found
          </h2>

          <p className="mt-2 text-gray-500">
            There are no customer orders yet.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="border bg-white p-6 shadow-sm"
            >

              {/* =====================================
                  Order Header
              ====================================== */}

              <div className="flex flex-col justify-between gap-5 border-b pb-5 md:flex-row">

                <div>

                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Order ID
                  </p>

                  <p className="mt-1 break-all font-medium">
                    {order._id}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Date
                  </p>

                  <p className="mt-1 font-medium">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

              </div>

              {/* =====================================
                  Customer Information
              ====================================== */}

              <div className="mt-6 grid gap-5 md:grid-cols-3">

                <div>
                  <p className="text-sm text-gray-500">
                    Customer
                  </p>

                  <p className="mt-1 font-medium">
                    {order.user?.name || "Unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="mt-1 font-medium">
                    {order.user?.email || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Total
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    Rs.{" "}
                    {order.totalAmount.toLocaleString()}
                  </p>
                </div>

              </div>

              {/* =====================================
                  Products
              ====================================== */}

              <div className="mt-6 border-t pt-6">

                <h3 className="mb-4 font-semibold">
                  Products
                </h3>

                <div className="space-y-4">

                  {order.items.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="flex gap-4"
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-16 object-cover"
                        />

                        <div className="flex-1">

                          <p className="font-medium">
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

                        <p className="font-medium">
                          Rs.{" "}
                          {(
                            item.price *
                            item.quantity
                          ).toLocaleString()}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* =====================================
                  Shipping Address
              ====================================== */}

              <div className="mt-6 border-t pt-6">

                <h3 className="mb-3 font-semibold">
                  Shipping Address
                </h3>

                <p className="text-sm text-gray-600">
                  {order.shippingAddress.fullName}
                </p>

                <p className="text-sm text-gray-600">
                  {order.shippingAddress.phone}
                </p>

                <p className="text-sm text-gray-600">
                  {order.shippingAddress.address}
                </p>

                <p className="text-sm text-gray-600">
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode}
                </p>

              </div>

              {/* =====================================
                  Status
              ====================================== */}

              <div className="mt-6 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Order Status
                  </p>

                  <span className="mt-1 inline-block rounded-full bg-gray-100 px-4 py-1 text-sm font-medium">
                    {order.status}
                  </span>

                </div>

                <div className="flex flex-col gap-3 sm:flex-row">

                 <select
  value={order.selectedStatus || order.status}
  onChange={(e) =>
    setOrders((previousOrders) =>
      previousOrders.map(
        (currentOrder) =>
          currentOrder._id === order._id
            ? {
                ...currentOrder,
                selectedStatus: e.target.value,
              }
            : currentOrder
      )
    )
  }
  className="border border-gray-300 px-4 py-3 outline-none focus:border-black"
>
  <option value="Pending">
    Pending
  </option>

  <option value="Processing">
    Processing
  </option>

  <option value="Shipped">
    Shipped
  </option>

  <option value="Delivered">
    Delivered
  </option>

  <option value="Cancelled">
    Cancelled
  </option>
</select>

                  <button
                    onClick={() =>
                      updateStatus(
                        order._id,
                        order.selectedStatus ||
                          order.status
                      )
                    }
                    className="rounded-full bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
                  >
                    Update Status
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default AdminOrders;