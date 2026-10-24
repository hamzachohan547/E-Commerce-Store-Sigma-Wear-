import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="group">

      <Link to={`/products/${product._id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">

          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {product.featured && (
            <span className="absolute left-3 top-3 bg-black px-3 py-1 text-xs font-medium text-white">
              FEATURED
            </span>
          )}

        </div>
      </Link>

      <div className="pt-4">

        <Link
          to={`/products/${product._id}`}
          className="font-medium hover:underline"
        >
          {product.name}
        </Link>

        <p className="mt-2 font-semibold">
          Rs. {product.price.toLocaleString()}
        </p>

        {product.oldPrice && (
          <p className="text-sm text-gray-400 line-through">
            Rs. {product.oldPrice.toLocaleString()}
          </p>
        )}

      </div>

    </div>
  );
}

export default ProductCard;