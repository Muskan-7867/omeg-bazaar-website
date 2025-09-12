"use client";
import { IoMenu } from "react-icons/io5";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import { getCategories } from "@/lib/services/api/categoryService";

interface Category {
  _id: string;
  name: string;
  slug?: string;
  subcategories?: string[];
}

export default function MobileMenuButton() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRes = await getCategories();
        const categoriesData = Array.isArray(categoriesRes) 
          ? categoriesRes 
          : categoriesRes?.categories || [];
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex justify-center items-center mr-2 text-gray-700 hover:text-primary"
      >
        <IoMenu className="w-6 h-6" />
      </button>
      <MobileMenu 
        isCardVisible={open} 
        setIsCardVisible={setOpen} 
        categories={categories}
      />
    </>
  );
}