import { getAllProducts } from "@/lib/services/api/fetchers";
import { Product } from "@/lib/types/Product";
import { MetadataRoute } from "next";

const base_url = "https://omegbazaar.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allProducts: Product[] = await getAllProducts();

  const productsSitemap = allProducts
    .map((product) => ({
      url: `${base_url}/products/${product?.slug}`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9
    }))
    .flat() as MetadataRoute.Sitemap;
  return [
    {
      url: `${base_url}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${base_url}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1
    },
    {
      url: `${base_url}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${base_url}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1
    },
    
       {
      url: `${base_url}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1
    },
    ...productsSitemap
  ];
}
