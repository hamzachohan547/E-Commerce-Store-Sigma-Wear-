import axios from "axios";
import ProductCard from "../../../components/ProductCard/ProductCard";
const products = await axios.get("http://localhost:5000/api/products/products").then((res) => res.data.products);


function NewReleases() {
  return (
    <section className="bg-gray-50 py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10 text-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 text-center">
              Fresh Arrivals
            </p>

            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-center">
              New Releases
            </h2>
          </div>

          <a
            href="/products"
            className="hidden text-sm font-semibold underline md:block"
          >
            View All
          </a>
        </div>
           <a
            href="/products"
            className="hidden text-sm font-semibold underline md:block text-right"
          >
            View All
          </a>


        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {products.map((product, index) => {
            return index < 4 && (
            <ProductCard
              key={index}
              product={product}
            />
          )}
          )}
        </div>

      </div>

    </section>
  );
}

export default NewReleases;