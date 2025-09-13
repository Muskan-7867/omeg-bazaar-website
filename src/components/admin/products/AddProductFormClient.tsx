"use client";
import React, { useState, useEffect } from "react";
import { createProduct } from "@/lib/services/api/fetchers";
import { useRouter, useSearchParams } from "next/navigation";
import { fields } from "@/components/user/products/data";
import ProductCategory from "@/components/user/products/ProductCategory";
import UploadProdImage from "@/components/user/products/UploadProdImage";

export const AddProductFormClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // category comes from search params
  const category = searchParams.get("category") || "";

  const [productImages, setProductImages] = useState<File[]>([]);
  const [productVideos, setProductVideos] = useState<File[]>([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(productImages.length >= 10);
  }, [productImages]);

  // ---------------- Server Action ----------------
  async function handleForm(data: FormData) {
    try {
      // Append category explicitly if present
      if (category && category !== "all") {
        data.append("category", category);
      }

      const res = await createProduct(data);
      console.log("Product created:", res);

      // After successful creation, redirect
      router.push("/admin/products");
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  }

  // Handle category update by modifying search params
  const handleCategoryChange = (newCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col items-center mt-2">
      <h1 className="text-3xl font-bold font-serif text-primary">
        Create Product
      </h1>

      <div className="w-full max-w-7xl bg-white p-6">
        {/* Server form */}
        <form className="flex flex-col gap-4" action={handleForm}>
          {fields.map((field, index) => {
            if (field.name === "price") {
              const originalPriceField = fields.find(
                (f) => f.name === "originalPrice"
              );
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col flex-1">
                    <label>{field.label}</label>
                    <input
                      type="number"
                      name={field.name}
                      placeholder={field.placeholder}
                    />
                  </div>
                  {originalPriceField && (
                    <div className="flex flex-col flex-1">
                      <label>{originalPriceField.label}</label>
                      <input
                        type="number"
                        name={originalPriceField.name}
                        placeholder={originalPriceField.placeholder}
                      />
                    </div>
                  )}
                </div>
              );
            }

            if (field.name === "originalPrice") return null;

            return (
              <div key={index} className="flex flex-col gap-1">
                <label>{field.label}</label>
                {field.label === "Category" ? (
                  <ProductCategory
                    category={category}
                    setCategory={handleCategoryChange}
                  />
                ) : (
                  <input
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            );
          })}

          <UploadProdImage
            productImages={productImages}
            setProductImages={setProductImages}
            disabled={disabled}
          />

          <div className="flex flex-col gap-1">
            <label>Upload Product Videos</label>
            <input
              type="file"
              name="videos"
              multiple
              accept="video/*"
              onChange={(e) =>
                setProductVideos(Array.from(e.target.files || []))
              }
            />
          </div>

          <button
            type="submit"
            disabled={disabled}
            className="mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition disabled:opacity-50"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};
