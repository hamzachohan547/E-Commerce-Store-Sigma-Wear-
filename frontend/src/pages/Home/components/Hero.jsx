function Hero() {
  return (
    <section className="relative flex min-h-[75vh] items-center overflow-hidden bg-neutral-100">
      
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2">

        {/* Content */}
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
            New Collection 2026
          </p>

          <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Elevate Your
            <span className="block">Everyday Style.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-gray-600">
            Discover premium clothing designed for comfort,
            confidence and modern style.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-gray-800">
              Shop Collection
            </button>

            <button className="rounded-full border border-black px-8 py-4 text-sm font-semibold transition hover:bg-black hover:text-white">
              Explore New Arrivals
            </button>
          </div>
        </div>

        <img src="/public/Images/hero.jpg" alt="Hero" className="h-full w-full object-cover" />
        <div className="flex justify-center">
          {/* <div className="flex h-[500px] w-full max-w-md items-center justify-center bg-gray-200">
            <span className="text-gray-400">
              Hero Image
            </span>
          </div> */}
        </div>

      </div>
    </section>
  );
}

export default Hero;