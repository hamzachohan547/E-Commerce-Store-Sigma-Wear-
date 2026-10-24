import { useEffect, useState } from "react";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Orders() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(
          "/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Orders Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load orders."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (loading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500">
          Loading your orders...
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">

      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
          Sigma Wears
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          My Orders
        </h1>
      </div>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="py-20 text-center">

          <h2 className="text-2xl font-semibold">
            No Orders Yet
          </h2>

          <p className="mt-3 text-gray-500">
            You haven't placed any orders yet.
          </p>

        </div>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-6"
            >

              {/* Order Header */}
              <div className="flex flex-col justify-between gap-3 border-b pb-5 sm:flex-row">

                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <p className="font-medium">
                    #{order._id}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Status
                  </p>

                  <span className="inline-block rounded-full bg-gray-100 px-4 py-1 text-sm font-medium">
                    {order.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Total
                  </p>

                  <p className="font-bold">
                    Rs. {order.totalAmount.toLocaleString()}
                  </p>
                </div>

              </div>

              {/* Order Items */}
              <div className="mt-6 space-y-5">

                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-20 object-cover"
                    />

                    <div className="flex-1">

                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

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

                      <p className="mt-1 font-medium">
                        Rs.{" "}
                        {(
                          item.price * item.quantity
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

              {/* Shipping */}
              <div className="mt-6 border-t pt-5">

                <h3 className="font-semibold">
                  Delivery Address
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {order.shippingAddress.fullName}
                  <br />
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode}
                  <br />
                  {order.shippingAddress.phone}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}

export default Orders;