import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "",
    image: "",
    sizes: "",
    colors: "",
    stock: "",
    featured: false,
    bestSeller: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==========================================
  // HANDLE IMAGE
  // ==========================================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setImageFile(null);
      setImagePreview("");
      return;
    }

    // Check image type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // Check image size - 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setError("");
    setImageFile(file);

    // Preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // ==========================================
  // CREATE PRODUCT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("sigma-token");

      // ==========================================
      // CHECK IMAGE
      // ==========================================

      if (!imageFile) {
        setError("Please select a product image.");
        setLoading(false);
        return;
      }

      // ==========================================
      // UPLOAD IMAGE TO CLOUDINARY
      // ==========================================

      const imageFormData = new FormData();

      imageFormData.append("image", imageFile);

      const uploadResponse = await api.post(
        "/products/upload-image",
        imageFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const imageUrl = uploadResponse.data.imageUrl;

      // ==========================================
      // PRODUCT DATA
      // ==========================================

      const productData = {
        name: formData.name.trim(),

        description: formData.description.trim(),

        price: Number(formData.price),

        oldPrice:
          formData.oldPrice === ""
            ? null
            : Number(formData.oldPrice),

        category: formData.category.trim(),

        image: imageUrl,

        sizes: formData.sizes
          .split(",")
          .map((size) => size.trim())
          .filter(Boolean),

        colors: formData.colors
          .split(",")
          .map((color) => color.trim())
          .filter(Boolean),

        stock: Number(formData.stock),

        featured: formData.featured,

        bestSeller: formData.bestSeller,
      };

      // ==========================================
      // CREATE PRODUCT
      // ==========================================

      await api.post("/addProduct", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product added successfully!");

      navigate("/admin/products");
    } catch (error) {
      console.error("Add Product Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to add product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            Sigma Wears
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Add Product
          </h1>

          <p className="mt-2 text-gray-500">
            Add a new product to your store.
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-sm md:p-8"
        >

          {/* Error */}

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Product Name */}

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Oversized Black T-Shirt"
              required
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Description */}

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product description..."
              rows="5"
              required
              className="w-full resize-none border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Price */}

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="2500"
                min="0"
                required
                className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Old Price
              </label>

              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="3000"
                min="0"
                className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

          </div>

          {/* Category */}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. T-Shirts"
              required
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Image Upload */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-medium">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-3 text-sm"
            />

            <p className="mt-2 text-xs text-gray-500">
              JPG, PNG, WEBP etc. Maximum size: 5MB
            </p>

            {/* Image Preview */}

            {imagePreview && (
              <div className="mt-5">

                <p className="mb-2 text-sm font-medium">
                  Image Preview
                </p>

                <div className="h-56 w-56 overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={imagePreview}
                    alt="Product Preview"
                    className="h-full w-full object-cover"
                  />
                </div>

              </div>
            )}

          </div>

          {/* Sizes */}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">
              Sizes
            </label>

            <input
              type="text"
              name="sizes"
              value={formData.sizes}
              onChange={handleChange}
              placeholder="S, M, L, XL"
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />

            <p className="mt-2 text-xs text-gray-500">
              Separate sizes with commas.
            </p>
          </div>

          {/* Colors */}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">
              Colors
            </label>

            <input
              type="text"
              name="colors"
              value={formData.colors}
              onChange={handleChange}
              placeholder="Black, White, Gray"
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />

            <p className="mt-2 text-xs text-gray-500">
              Separate colors with commas.
            </p>
          </div>

          {/* Stock */}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="20"
              min="0"
              required
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Checkboxes */}

          <div className="mt-8 space-y-4 border-t pt-6">

            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4"
              />

              <span className="text-sm font-medium">
                Featured Product
              </span>

            </label>

            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                name="bestSeller"
                checked={formData.bestSeller}
                onChange={handleChange}
                className="h-4 w-4"
              />

              <span className="text-sm font-medium">
                Best Seller
              </span>

            </label>

          </div>

          {/* Buttons */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-full bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Uploading & Adding..."
                : "Add Product"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="rounded-full border border-black px-8 py-3 font-medium transition hover:bg-black hover:text-white"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </section>
  );
}

export default AddProduct;