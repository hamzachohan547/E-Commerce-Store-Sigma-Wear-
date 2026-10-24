import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../../services/api";
import { useCart } from "../../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        const data = response.data.product;

        setProduct(data);

        if (data.sizes?.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        if (data.colors?.length > 0) {
          setSelectedColor(data.colors[0]);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);

    alert("Product added to cart!");
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <p className="text-red-500">
          {error || "Product not found"}
        </p>

        <Link
          to="/products"
          className="rounded-full bg-black px-6 py-3 text-white"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">

      <div className="grid gap-12 md:grid-cols-2">

        {/* Image */}
        <div className="aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Information */}
        <div className="flex flex-col justify-center">

          <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
            {product.category}
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            {product.name}
          </h1>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-2xl font-semibold">
              Rs. {product.price.toLocaleString()}
            </span>

            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through">
                Rs. {product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          <p className="mt-6 leading-7 text-gray-600">
            {product.description}
          </p>

          {/* Size */}
          {product.sizes?.length > 0 && (
            <div className="mt-8">

              <h3 className="mb-3 font-semibold">
                Select Size
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-5 py-3 ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

            </div>
          )}

          {/* Color */}
          {product.colors?.length > 0 && (
            <div className="mt-6">

              <h3 className="mb-3 font-semibold">
                Select Color
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`border px-5 py-3 ${
                      selectedColor === color
                        ? "border-black bg-black text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>

            </div>
          )}

          {/* Stock */}
          <p className="mt-6 text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600">
                In Stock
              </span>
            ) : (
              <span className="text-red-500">
                Out of Stock
              </span>
            )}
          </p>

          {/* Add Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="mt-8 w-full rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Add To Cart
          </button>

          <Link
            to="/products"
            className="mt-4 text-center text-sm underline"
          >
            ← Continue Shopping
          </Link>

        </div>
      </div>

    </section>
  );
}

export default ProductDetails;