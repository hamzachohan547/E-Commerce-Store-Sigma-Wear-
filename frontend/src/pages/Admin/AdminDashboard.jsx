import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            Sigma Wears
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your store from here.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {/* Products */}
          <Link
            to="/admin/products"
            className="group rounded-2xl bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-black text-2xl text-white">
              📦
            </div>

            <h2 className="text-2xl font-semibold">
              Products
            </h2>

            <p className="mt-2 text-gray-500">
              Add, edit and delete products.
            </p>

            <p className="mt-5 font-medium group-hover:underline">
              Manage Products →
            </p>
          </Link>

          {/* Orders */}
          <Link
            to="/admin/orders"
            className="group rounded-2xl bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-black text-2xl text-white">
              🛒
            </div>

            <h2 className="text-2xl font-semibold">
              Orders
            </h2>

            <p className="mt-2 text-gray-500">
              View orders and update order status.
            </p>

            <p className="mt-5 font-medium group-hover:underline">
              Manage Orders →
            </p>
          </Link>

          {/* Store */}
          <Link
            to="/"
            className="group rounded-2xl bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-black text-2xl text-white">
              🏪
            </div>

            <h2 className="text-2xl font-semibold">
              Visit Store
            </h2>

            <p className="mt-2 text-gray-500">
              Go back to the Sigma Wears store.
            </p>

            <p className="mt-5 font-medium group-hover:underline">
              Visit Store →
            </p>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;