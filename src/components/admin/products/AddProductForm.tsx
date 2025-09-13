"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fields } from "@/components/user/products/data";
import ProductCategory from "@/components/user/products/ProductCategory";
import UploadProdImage from "@/components/user/products/UploadProdImage";
import { createProduct } from "@/lib/services/api/fetchers";

const AddProductForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read category from URL
  const categoryFromUrl = searchParams.get("category") || "";

  const [category, setCategory] = useState(categoryFromUrl);
  const [disabled, setDisabled] = useState(false);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productVideos, setProductVideos] = useState<File[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    features: "",
    price: "",
    slug: "",
    originalPrice: "",
    category: categoryFromUrl,
    deliveryCharges: ""
  });

  // Keep category in sync with formData & URL
  useEffect(() => {
    setFormData((prev) => ({ ...prev, category }));
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.replace(`?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const getInputType = (label: string): string => {
    const lower = label.toLowerCase();
    if (lower.includes("price")) return "number";
    return "text";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const parsedValue =
      name.toLowerCase().includes("price") || name === "deliveryCharges"
        ? parseFloat(value)
        : value;

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  useEffect(() => {
    setDisabled(productImages.length >= 10);
  }, [productImages]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("features", formData.features);
      data.append("originalPrice", formData.originalPrice.toString());
      data.append("price", formData.price.toString());
      data.append("slug", formData.slug);
      if (formData.category && formData.category !== "all") {
        data.append("category", formData.category);
      }

      data.append("deliveryCharges", formData.deliveryCharges.toString());

      // Attach files
      productImages.forEach((file) => data.append("images", file));
      productVideos.forEach((file) => data.append("videos", file));

      const response = await createProduct(data);
      console.log(response);
      setSubmitSuccess(true);

      // Reset form
      setFormData({
        name: "",
        description: "",
        features: "",
        price: "",
        originalPrice: "",
        category: "",
        slug: "",
        deliveryCharges: ""
      });
      setProductImages([]);
      setProductVideos([]);

      setTimeout(() => {
        router.push("/admin/products");
      }, 2000);
    } catch (err) {
      console.error("Failed to add product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center  mt-2 ">
      <h1 className="text-3xl font-bold font-serif text-primary ">
        Create Product
      </h1>

      <div className="w-full max-w-7xl bg-white  p-6">
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          {submitSuccess && (
            <div className="bg-green-100 text-green-700 p-2 rounded">
              ✅ Product added successfully!
            </div>
          )}

          {/* Dynamic Input Fields */}
          {fields.map((field, index) => {
            if (field.name === "price") {
              const priceField = field;
              const originalPriceField = fields.find(
                (f) => f.name === "originalPrice"
              );

              return (
                <div key={index} className="flex flex-col gap-1">
                  <div className="flex gap-4">
                    {/* Price Input */}
                    <div className="flex flex-col flex-1">
                      <label className="text-sm font-medium text-gray-800">
                        {priceField.label}
                      </label>
                      <input
                        type={getInputType(priceField.label)}
                        name={priceField.name}
                        placeholder={priceField.placeholder}
                        onChange={handleChange}
                        className="py-2 border-b-2 border-primary focus:outline-none"
                        value={
                          formData[priceField.name as keyof typeof formData] ??
                          ""
                        }
                      />
                    </div>

                    {/* Original Price Input */}
                    {originalPriceField && (
                      <div className="flex flex-col flex-1">
                        <label className="text-sm font-medium text-gray-800">
                          {originalPriceField.label}
                        </label>
                        <input
                          type={getInputType(originalPriceField.label)}
                          name={originalPriceField.name}
                          placeholder={originalPriceField.placeholder}
                          onChange={handleChange}
                          className="py-2 border-b-2 border-primary focus:outline-none"
                          value={
                            formData[
                              originalPriceField.name as keyof typeof formData
                            ] ?? ""
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            if (field.name === "originalPrice") return null;

            return (
              <div key={index} className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-800">
                  {field.label}
                </label>

                {field.label === "Category" ? (
                  <ProductCategory category={category} setCategory={setCategory} />
                ) : (
                  <input
                    type={getInputType(field.label)}
                    name={field.name}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                    className="py-2 border-b-2 border-primary focus:outline-none"
                    value={formData[field.name as keyof typeof formData] ?? ""}
                  />
                )}
              </div>
            );
          })}

          {/* Image Upload Field */}
          <UploadProdImage
            productImages={productImages}
            setProductImages={setProductImages}
            disabled={disabled}
          />

          {/* Video Upload Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800">
              Upload Product Videos
            </label>
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={(e) =>
                setProductVideos(Array.from(e.target.files || []))
              }
              className="py-2 border-b-2 border-primary focus:outline-none"
            />
            {productVideos.length > 0 && (
              <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                {productVideos.map((video, i) => (
                  <li key={i}>{video.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition disabled:opacity-50"
          >
            {isSubmitting ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
