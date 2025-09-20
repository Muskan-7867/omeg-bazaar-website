"use client";
import { useEffect, useState } from "react";
import ProductFilterBar from "./ProductFilterbar";
import Pagination from "@/components/common/Pagination";
import Table, { BaseRowData } from "@/components/common/Table";
import axios from "axios";
import {  useSearchParams } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProdTable = () => {
 
  const searchParams = useSearchParams();

  // page comes from query string, default 1
  const page = Number(searchParams.get("page") || "1");

  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [limit] = useState<number>(12);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100000);

  const [products, setProducts] = useState<BaseRowData[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${BASE_URL}/api/v1/product/get`, {
          params: {
            page,
            limit,
            minPrice,
            maxPrice,
            category,
            search: search || "",
          },
        });

        setProducts(res.data.products);
        setTotalCount(res.data.totalProduct);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo(0, 0);
  }, [page, limit, minPrice, maxPrice, category, search]);

  const columns = [
    { label: "Product Image", key: "images" as const },
    { label: "Product Name", key: "name" as const },
    { label: "Price", key: "price" as const },
    { label: "Original Price", key: "originalPrice" as const },
    { label: "InStock", key: "inStock" as const },
    {
      label: "Action",
      key: "action" as const,
      renderData: () => (
        <button className="text-black font-bold text-2xl hover:text-gray-800">
          ⋮
        </button>
      ),
    },
  ];

 

  return (
    <>
      <ProductFilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      {loading && <p>Loading Products....</p>}
      {error && <p>{error}</p>}

      <Table columns={columns} data={products} />

      <Pagination
        totalProducts={totalCount}
        productPerPage={limit}

      />
    </>
  );
};

export default ProdTable;
