function Trending() {
  return (
    <section className="bg-black py-20 text-white">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-10 md:grid-cols-2">

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
              Trending Now
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-6xl">
              Built For Your
              <span className="block">Everyday.</span>
            </h2>

            <p className="mt-6 max-w-lg leading-7 text-gray-400">
              Discover pieces that combine contemporary design,
              premium materials and everyday comfort.
            </p>

            <button className="mt-8 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-gray-200">
              Explore Collection
            </button>
          </div>

          <div className="aspect-square bg-neutral-800">
            <div className="flex h-full items-center justify-center text-gray-500">
              Collection Image
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Trending;