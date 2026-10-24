import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../services/api";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const searchFromUrl = searchParams.get("search") || "";
  const categoryFromUrl = searchParams.get("category") || "all";

  const [search, setSearch] = useState(searchFromUrl);

  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get("http://localhost:5000/api/products/products")

        setProducts(response.data.products || []);
      } catch (error) {
        console.error(error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ==========================================
  // SEARCH INPUT
  // ==========================================

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    const newParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }

    setSearchParams(newParams);
  };

  // ==========================================
  // CATEGORY FILTER
  // ==========================================

  const handleCategory = (category) => {
    const newParams = new URLSearchParams(searchParams);

    if (category === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", category);
    }

    setSearchParams(newParams);
  };

  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  const filteredProducts = products.filter((product) => {
    const productName = product.name?.toLowerCase() || "";

    const productCategory =
      product.category?.toLowerCase() || "";

    const searchText = search.trim().toLowerCase();

    // Search
    const matchesSearch =
      productName.includes(searchText);

    // Category
    let matchesCategory = true;

    if (categoryFromUrl === "new") {
      matchesCategory = product.featured === true;
    } else if (categoryFromUrl === "best-seller") {
      matchesCategory = product.bestSeller === true;
    } else if (categoryFromUrl !== "all") {
      matchesCategory =
        productCategory ===
        categoryFromUrl.toLowerCase();
    }

    return matchesSearch && matchesCategory;
  });

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-lg">
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
        <p className="text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="mb-10 text-center">

        <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
          Sigma Wears
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          All Products
        </h1>

      </div>

      {/* =====================================
          SEARCH
      ====================================== */}

      <div className="mx-auto mb-8 max-w-xl">

        <div className="relative">

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search products..."
            className="w-full rounded-full border border-gray-300 py-3 pl-5 pr-12 outline-none transition focus:border-black"
          />

          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-lg">
            🔍
          </span>

        </div>

      </div>

      {/* =====================================
          CATEGORY FILTERS
      ====================================== */}

      <div className="mb-10 flex flex-wrap justify-center gap-3">

        <button
          onClick={() => handleCategory("all")}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
            categoryFromUrl === "all"
              ? "border-black bg-black text-white"
              : "border-gray-300 hover:border-black"
          }`}
        >
          All
        </button>

        <button
          onClick={() => handleCategory("t-shirts")}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
            categoryFromUrl === "t-shirts"
              ? "border-black bg-black text-white"
              : "border-gray-300 hover:border-black"
          }`}
        >
          T-Shirts
        </button>

        <button
          onClick={() => handleCategory("hoodies")}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
            categoryFromUrl === "hoodies"
              ? "border-black bg-black text-white"
              : "border-gray-300 hover:border-black"
          }`}
        >
          Hoodies
        </button>

        <button
          onClick={() => handleCategory("jeans")}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
            categoryFromUrl === "jeans"
              ? "border-black bg-black text-white"
              : "border-gray-300 hover:border-black"
          }`}
        >
          Jeans
        </button>

        <button
          onClick={() => handleCategory("jackets")}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
            categoryFromUrl === "jackets"
              ? "border-black bg-black text-white"
              : "border-gray-300 hover:border-black"
          }`}
        >
          Jackets
        </button>

        <button
          onClick={() => handleCategory("new")}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
            categoryFromUrl === "new"
              ? "border-black bg-black text-white"
              : "border-gray-300 hover:border-black"
          }`}
        >
          New Releases
        </button>

        <button
          onClick={() => handleCategory("best-seller")}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
            categoryFromUrl === "best-seller"
              ? "border-black bg-black text-white"
              : "border-gray-300 hover:border-black"
          }`}
        >
          Best Sellers
        </button>

      </div>

      {/* =====================================
          RESULT COUNT
      ====================================== */}

      <div className="mb-6">

        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-black">
            {filteredProducts.length}
          </span>{" "}
          product
          {filteredProducts.length !== 1 && "s"}
        </p>

      </div>

      {/* =====================================
          PRODUCTS
      ====================================== */}

      {filteredProducts.length === 0 ? (

        <div className="py-20 text-center">

          <h2 className="text-2xl font-semibold">
            No products found
          </h2>

          <p className="mt-2 text-gray-500">
            Try another search or category.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setSearchParams({});
            }}
            className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-medium text-white"
          >
            Clear Filters
          </button>

        </div>

      ) : (

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>

      )}

    </section>
  );
}

export default Products;