import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  if (cart.length === 0) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="mt-3 text-gray-500">
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/products"
          className="mt-6 rounded-full bg-black px-8 py-4 text-white"
        >
          Start Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">

      <h1 className="mb-10 text-4xl font-bold">
        Shopping Cart
      </h1>

      <div className="grid gap-10 lg:grid-cols-3">

        {/* Cart Items */}
        <div className="space-y-6 lg:col-span-2">

          {cart.map((item) => (
            <div
              key={`${item._id}-${item.size}-${item.color}`}
              className="flex gap-5 border-b pb-6"
            >

              {/* Image */}
              <div className="h-32 w-24 flex-shrink-0 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col">

                <div className="flex justify-between gap-4">

                  <div>
                    <h2 className="font-semibold">
                      {item.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Size: {item.size}
                    </p>

                    <p className="text-sm text-gray-500">
                      Color: {item.color}
                    </p>
                  </div>

                  <p className="font-semibold">
                    Rs.{" "}
                    {(item.price * item.quantity).toLocaleString()}
                  </p>

                </div>

                {/* Quantity */}
                <div className="mt-auto flex items-center gap-4">

                  <div className="flex items-center border">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          item.size,
                          item.color,
                          item.quantity - 1
                        )
                      }
                      className="px-4 py-2"
                    >
                      −
                    </button>

                    <span className="px-4">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          item.size,
                          item.color,
                          item.quantity + 1
                        )
                      }
                      className="px-4 py-2"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(
                        item._id,
                        item.size,
                        item.color
                      )
                    }
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Summary */}
        <div className="h-fit border p-6">

          <h2 className="text-xl font-semibold">
            Order Summary
          </h2>

          <div className="mt-6 flex justify-between border-b pb-4">
            <span>Subtotal</span>

            <span>
              Rs. {cartTotal.toLocaleString()}
            </span>
          </div>

          <div className="mt-4 flex justify-between text-lg font-bold">
            <span>Total</span>

            <span>
              Rs. {cartTotal.toLocaleString()}
            </span>
          </div>

          <Link
           to="/checkout"
           className="mt-8 block w-full rounded-full bg-black py-4 text-center font-semibold text-white hover:bg-gray-800"
          >
           Proceed to Checkout
        </Link>

        </div>

      </div>

    </section>
  );
}

export default Cart;