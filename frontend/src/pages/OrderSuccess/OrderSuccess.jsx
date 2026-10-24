import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <section className="flex min-h-[75vh] items-center justify-center px-6">
      <div className="w-full max-w-lg text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-3xl text-white">
          ✓
        </div>

        <h1 className="mt-6 text-4xl font-bold">
          Order Placed Successfully!
        </h1>

        <p className="mt-4 text-gray-500">
          Thank you for shopping with Sigma Wears.
          Your order has been received and is being processed.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Link
            to="/orders"
            className="rounded-full bg-black px-8 py-3 font-semibold text-white hover:bg-gray-800"
          >
            View My Orders
          </Link>

          <Link
            to="/products"
            className="rounded-full border border-black px-8 py-3 font-semibold hover:bg-black hover:text-white"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </section>
  );
}

export default OrderSuccess;