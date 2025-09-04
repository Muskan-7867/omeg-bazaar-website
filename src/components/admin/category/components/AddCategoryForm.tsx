import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { CategoryFormData } from "../../../../types/Product";
import { createCategory } from "../../../../services/fetchers";
import { useQueryClient } from "@tanstack/react-query";

const AddCategoryForm = () => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    products: [] 
  });

  const [productImages, setProductImages] = useState<File[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length !== files.length) {
      alert("Only image files are allowed.");
      return;
    }

    const limitedFiles = imageFiles.slice(0, 4 - productImages.length);
    setProductImages((prev) => [...prev, ...limitedFiles]);
  };

  useEffect(() => {
    setDisabled(productImages.length >= 4);
  }, [productImages]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const token = Cookies.get("authToken");
    const data = new FormData();
  
    data.append("name", formData.name);
    data.append("description", formData.description);
    productImages.forEach((image) => {
      data.append("images", image);
    });
  
    try {
      const response = await createCategory(data, token || "");
      console.log("Category added:", response);
      await queryClient.invalidateQueries({ queryKey: ["admincategories"] });
      setSubmitSuccess(true);
      setFormData({ name: "", description: "", products: [] });
      setProductImages([]);
    } catch (err) {
      console.error("Error submitting category:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
       <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {submitSuccess && (
        <div className="bg-green-100 text-green-700 p-2 rounded">
          Category added successfully!
        </div>
      )}
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

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-800">Product Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={disabled}
          onChange={handleImage}
          className="py-2 text-gray-700 border border-gray-200 p-2 rounded-md"
        />
        <div className="flex gap-2 mt-2 flex-wrap">
          {productImages.map((img, index) => (
            <img
              key={index}
              src={URL.createObjectURL(img)}
              className="h-32 w-32 object-cover bg-gray-100 rounded"
              alt={`Preview ${index + 1}`}
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
        {isSubmitting ? "Adding..." : "Add Category"}
      </button>
    </form>
    </div>
  );
};

export default AddCategoryForm;
