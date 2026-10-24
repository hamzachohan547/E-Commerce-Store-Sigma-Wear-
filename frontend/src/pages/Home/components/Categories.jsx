import axios from "axios";
import { Link } from "react-router-dom";

const categories = await axios.get("http://localhost:5000/api/products/products").then((res) => res.data.products);

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">

      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
          Explore
        </p>

        <h2 className="mt-2 text-3xl font-bold md:text-4xl">
          Shop By Category
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((category,index) => {
            return index < 4 && (
          <Link
            key={index}
            to={`/products?category=${category.name.toLowerCase()}`}
            className="group overflow-hidden"
          >
            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <h3 className="mt-4 text-center text-lg font-semibold">
              {category.name}
            </h3>
          </Link>
       ) })}
      </div>

    </section>
  );
}

export default Categories;