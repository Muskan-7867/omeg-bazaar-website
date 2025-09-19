"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { CategoryFormData } from "@/lib/types/Product";
import { getCategoryById, updateCategory } from "@/lib/services/api/fetchers";

interface EditCategoryFormProps {
  categoryId: string;
  onSuccess?: () => void;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ categoryId, onSuccess }) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    slug: "",
    products: [],
  });
  const [productImages, setProductImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<{ url: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // Fetch category details
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = Cookies.get("authToken");
        const category = await getCategoryById(categoryId, token || "");
        setFormData({
          name: category.name,
          description: category.description,
          slug: category.slug,
          products: category.products || [],
        });
        setExistingImages(category.images || []);
      } catch (err) {
        console.error("Error fetching category:", err);
      }
    };
    fetchCategory();
  }, [categoryId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setProductImages((prev) => [...prev, ...imageFiles]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = Cookies.get("authToken");
    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("slug", formData.slug);

    productImages.forEach((image) => {
      data.append("images", image);
    });

    try {
      const response = await updateCategory(categoryId, data, token || "");
      console.log("Category updated:", response);

      await queryClient.invalidateQueries({ queryKey: ["admincategories"] });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error updating category:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Category Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-black">Category Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="py-2 border-b-2 border-primary focus:outline-none focus:ring-0"
            placeholder="Enter Category Name"
          />
        </div>

        {/* Slug */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-black">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="py-2 border-b-2 border-primary focus:outline-none focus:ring-0"
            placeholder="Enter Slug (unique)"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-black">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="py-2 border-b-2 border-primary focus:outline-none focus:ring-0 "
            placeholder="Enter description"
          />
        </div>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-800">Existing Images</label>
            <div className="flex gap-2 flex-wrap">
              {existingImages.map((img, index) => (
                <Image
                  key={index}
                  src={img.url}
                  className="h-32 w-32 object-cover bg-gray-100 rounded"
                  alt={`Category image ${index + 1}`}
                  width={200}
                  height={200}
                />
              ))}
            </div>
          </div>
        )}

        {/* Upload New Images */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-800">Upload New Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImage}
            className="py-2 text-gray-700 border border-gray-200 p-2 rounded-md"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {productImages.map((img, index) => (
              <Image
                key={index}
                src={URL.createObjectURL(img)}
                className="h-32 w-32 object-cover bg-gray-100 rounded"
                alt={`Preview ${index + 1}`}
                width={200}
                height={200}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-4 bg-primary text-white font-semibold py-2 rounded shadow-sm transition ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark"
          }`}
        >
          {isSubmitting ? "Updating..." : "Update Category"}
        </button>
      </form>
    </div>
  );
};

export default EditCategoryForm;
