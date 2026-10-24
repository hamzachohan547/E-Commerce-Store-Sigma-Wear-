import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/products");

      setProducts(response.data.products);
    } catch (error) {
      console.error("Fetch Products Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("sigma-token");

      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) => product._id !== id
        )
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Delete Product Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500">
          Loading products...
        </p>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>

          <button
            onClick={fetchProducts}
            className="mt-4 rounded-full bg-black px-6 py-3 text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 px-6 py-10">

      <div className="mx-auto max-w-7xl">

        {/* =====================================
            HEADER
        ====================================== */}

        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Sigma Wears
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Products
            </h1>

            <p className="mt-2 text-gray-500">
              Manage all your store products.
            </p>
          </div>

          <Link
            to="/admin/products/add"
            className="rounded-full bg-black px-6 py-3 text-center font-medium text-white transition hover:bg-gray-800"
          >
            + Add Product
          </Link>

        </div>

        {/* =====================================
            PRODUCT COUNT
        ====================================== */}

        <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Total Products
          </p>

          <p className="mt-1 text-3xl font-bold">
            {products.length}
          </p>

        </div>

        {/* =====================================
            NO PRODUCTS
        ====================================== */}

        {products.length === 0 ? (

          <div className="rounded-xl bg-white p-10 text-center shadow-sm">

            <h2 className="text-2xl font-semibold">
              No Products Found
            </h2>

            <p className="mt-2 text-gray-500">
              Start by adding your first product.
            </p>

            <Link
              to="/admin/products/add"
              className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-white"
            >
              Add Product
            </Link>

          </div>

        ) : (

          /* =====================================
             PRODUCTS TABLE
          ====================================== */

          <div className="overflow-x-auto rounded-xl bg-white shadow-sm">

            <table className="w-full min-w-[900px]">

              <thead className="border-b bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Price
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Stock
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Featured
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {products.map((product) => (

                  <tr
                    key={product._id}
                    className="border-b last:border-b-0"
                  >

                    {/* Product */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-16 w-14 rounded-lg object-cover"
                        />

                        <div>

                          <p className="font-semibold">
                            {product.name}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {product._id}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Category */}
                    <td className="px-6 py-5 text-sm">
                      {product.category}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-5 font-medium">
                      Rs.{" "}
                      {product.price.toLocaleString()}
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-5">

                      <span
                        className={
                          product.stock === 0
                            ? "font-medium text-red-600"
                            : "font-medium text-gray-700"
                        }
                      >
                        {product.stock}
                      </span>

                    </td>

                    {/* Featured */}
                    <td className="px-6 py-5">

                      {product.featured ? (
                        <span className="rounded-full bg-black px-3 py-1 text-xs text-white">
                          Yes
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                          No
                        </span>
                      )}

                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <Link
                          to={`/admin/products/edit/${product._id}`}
                          className="rounded-full border border-black px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(product._id)
                          }
                          className="rounded-full border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </section>
  );
}

export default AdminProducts;