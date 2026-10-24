import axios from "axios";
import ProductCard from "../../../components/ProductCard/ProductCard";
const product = await axios.get("http://localhost:5000/api/products/products").then((res) => res.data.products);



function BestSellers() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">

      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
          Customer Favorites
        </p>

        <h2 className="mt-2 text-3xl font-bold md:text-4xl">
          Best Sellers
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {product.map((product, index) =>{
          return index < 4 && (
            <ProductCard
              key={index}
              product={product}
            />
          )})}
         
      </div>

    </section>
  );
}

export default BestSellers;