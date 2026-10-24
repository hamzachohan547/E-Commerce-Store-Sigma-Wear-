import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

  // New image selected by admin
  const [imageFile, setImageFile] = useState(null);

  // Preview of newly selected image
  const [imagePreview, setImagePreview] = useState("");

  // ==========================================
  // GET PRODUCT
  // ==========================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        const product = response.data.product;

        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price ?? "",
          oldPrice: product.oldPrice ?? "",
          category: product.category || "",
          image: product.image || "",
          sizes: product.sizes?.join(", ") || "",
          colors: product.colors?.join(", ") || "",
          stock: product.stock ?? "",
          featured: product.featured || false,
          bestSeller: product.bestSeller || false,
        });
      } catch (error) {
        console.error("Fetch Product Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
      return;
    }

    // Check image type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // Maximum 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setError("");

    setImageFile(file);

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // ==========================================
  // UPDATE PRODUCT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const token = localStorage.getItem("sigma-token");

      // ==========================================
      // IMAGE UPLOAD
      // ==========================================

      let imageUrl = formData.image;

      // Only upload if admin selected a new image
      if (imageFile) {
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

        imageUrl = uploadResponse.data.imageUrl;
      }

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

        // Keep old image if no new image selected
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
      // UPDATE PRODUCT
      // ==========================================

      await api.put(
        `/products/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product updated successfully!");

      navigate("/admin/products");
    } catch (error) {
      console.error("Update Product Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update product."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500">
          Loading product...
        </p>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error && !formData.name) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">
            {error}
          </p>

          <button
            onClick={() =>
              navigate("/admin/products")
            }
            className="mt-4 rounded-full bg-black px-6 py-3 text-white"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            Sigma Wears
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Edit Product
          </h1>

          <p className="mt-2 text-gray-500">
            Update your product information.
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

          {/* Name */}

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              required
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* IMAGE */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-medium">
              Product Image
            </label>

            {/* Current / New Image */}

            <div className="mb-4 flex flex-wrap gap-6">

              {/* Current Image */}

              {formData.image && !imagePreview && (
                <div>
                  <p className="mb-2 text-xs font-medium text-gray-500">
                    Current Image
                  </p>

                  <div className="h-48 w-48 overflow-hidden rounded-xl border border-gray-200">
                    <img
                      src={formData.image}
                      alt={formData.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* New Image Preview */}

              {imagePreview && (
                <div>
                  <p className="mb-2 text-xs font-medium text-green-600">
                    New Image
                  </p>

                  <div className="h-48 w-48 overflow-hidden rounded-xl border border-green-300">
                    <img
                      src={imagePreview}
                      alt="New Product Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

            </div>

            {/* File Input */}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-3 text-sm"
            />

            <p className="mt-2 text-xs text-gray-500">
              Select a new image only if you want to replace the current image.
              Maximum size: 5MB.
            </p>

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
              min="0"
              required
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Options */}

          <div className="mt-8 space-y-4 border-t pt-6">

            <label className="flex items-center gap-3">

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

            <label className="flex items-center gap-3">

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
              disabled={saving}
              className="rounded-full bg-black px-8 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Uploading & Updating..."
                : "Update Product"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/products")
              }
              className="rounded-full border border-black px-8 py-3 font-medium hover:bg-black hover:text-white"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </section>
  );
}

export default EditProduct;