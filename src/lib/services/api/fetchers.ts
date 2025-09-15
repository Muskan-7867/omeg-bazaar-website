import { AddressFormData, CurrentUser } from "@/lib/types/auth";
import { Order } from "@/lib/types/order";
import { EditProductData, Product } from "@/lib/types/Product";
import axios from "axios";

import Cookies from "js-cookie";

const token = Cookies.get("authToken");
const admintoken = Cookies.get("admintoken");
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//for user
const fetchUserCategories = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/product/usercategories`,
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    return response.data.categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

const fetchAdminCategories = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/product/admincategories`,
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    return response.data.categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

const getProductsByCategory = async (name: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/product/category/name/${name}`,
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    return response.data.products;
  } catch (error) {
    console.error("failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};
//used for fetch cart prod ids
const fetchProductIds = async (productIds: string[]): Promise<Product[]> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/product/cartproducts`,
      { ids: productIds }
    );
    console.log("from fetch products", response.data.products);
    return response.data.products;
  } catch (error) {
    console.error("Failed to fetch cart product ids:", error);
    throw error;
  }
};

const fetchCurrentUser = async (
  token?: string
): Promise<CurrentUser | null> => {
  if (!token) {
    console.warn("No token found");
    return null;
  }
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/current`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.user;
  } catch {
    console.error("Failed to fetch user");
    
    Cookies.remove("authToken");
    return null;
  }
};

// const getFilteredProducts = async (
//   page: number,
//   limit: number,
//   minPrice: number,
//   maxPrice: number,
//   category: string,
//   search: string | null
// ) => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/api/v1/product/get/${limit}/${page}/${minPrice}/${maxPrice}/${category}/${
//         search || "-"
//       }`,
//       {
//         headers: { "Content-Type": "application/json" }
//       }
//     );
//     console.log("from getfilterd", response.data.products);
//     return {
//       ProductCount: response.data.totalProduct,
//       products: response.data.products
//     };
//   } catch (error) {
//     console.error("failed to fetch products:", error);
//     throw new Error("Failed to fetch products");
//   }
// };

//for admin
const getAllProducts = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/product/all`);
    return response.data.products;
  } catch (error) {
    console.error("Failed to fetch all products:", error);
    throw error;
  }
};

const deleteProduct = async (id: string | unknown) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/product/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("failed to delete product:", error);
    throw new Error("Failed to delete product");
  }
};

const deleteOrder = async (orderid: string | unknown) => {
  console.log("from deleteorder", orderid);
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/order/delete/${orderid}`
    );
    console.log();
    return response.data;
  } catch (error) {
    console.error("failed to delete order:", error);
    throw new Error("Failed to delete order");
  }
};

const updateProduct = async (
  id: string,
  data: EditProductData,
  images: File[],
  videos: File[]
) => {
  const formData = new FormData();

  // Append text fields
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Append images
  images.forEach((file) => {
    formData.append("images", file);
  });

  // Append videos
  videos.forEach((file) => {
    formData.append("videos", file);
  });

  const response = await axios.put(
    `${BASE_URL}/api/v1/product/update/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return response.data;
};

const createProduct = async (formData: FormData) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/product/create`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return response.data;
};

const createCategory = async (data: FormData, token: string) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/product/category`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

const CreateUserAddress = async (data: AddressFormData, token: string) => {
  const response = await axios.put(`${BASE_URL}/api/v1/user/address`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const fetchCategory = async (categoryId: string) => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/product/category/${categoryId}`
  );
  return response.data;
};

const fetchUserAddress = async (addressId: string | undefined) => {
  if (!addressId) {
    throw new Error("Address ID is required");
  }

  const token = Cookies.get("authToken");
  if (!token) {
    throw new Error("No token provided");
  }

  const response = await axios.get(
    `${BASE_URL}/api/v1/user/useraddress/${addressId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

const getOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/order/products`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.orders || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
const fetchProductById = async (id: string | undefined) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/product/single/${id}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return response.data.product;
  } catch {
    console.log("error in fetching product by id");
  }
};

const getSingleProductById = async (singleproductid: string | undefined) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/product/single/${singleproductid}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return response.data.product;
  } catch {
    console.log("error in fetching product by id");
  }
};

const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/allusers`);
    console.log("form userfetcger", response.data);
    return response.data.users;
  } catch {
    console.log("error in fetching users");
  }
};

const adminRegister = async (adminData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/admin/create`,
      adminData
    );
    return response.data;
  } catch {
    console.log("error in admin register");
  }
};

const adminLogin = async (adminData: { email: string; password: string }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/admin/login`,
      adminData
    );

    return response.data;
  } catch {
    console.log("error in admin login");
  }
};

const getAdminInfo = async () => {
  console.log("get admin info", admintoken);
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/admin/all`, {
      headers: {
        Authorization: `Bearer ${admintoken}`
      }
    });
    console.log("form admin info", response.data);
    return response.data;
  } catch {
    console.log("error in get admin info");
  }
};

const getClientByOrderId = async (orderId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/order/client/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${admintoken}`
        }
      }
    );
    return response.data;
  } catch {
    console.log("error in get client by order id");
  }
};

const updateOrder = async (id: string, data: Partial<Order>) => {
  const response = await axios.patch(`/api/orders/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const res = await fetch(`${BASE_URL}/api/v1/product/category/delete/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to delete category");
  }

  return res.json();
};

export const cancelOrder = async (
  orderId: string | undefined
): Promise<{
  success: boolean;
  message?: string;
}> => {
  if (!orderId) {
    return {
      success: false,
      message: "Order ID is required"
    };
  }

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/order/cancel`, {
      orderId
    });
    return response.data;
  } catch {
    console.error("Error cancelling order:");
    return {
      success: false
    };
  }
};

const getRelatedProducts = async (categoryId: string, currentProductId: string): Promise<Product[]> => {
  if (!categoryId) return [];

  try {
    const res = await axios.get<{ success: boolean; products: Product[] }>(
      `${BASE_URL}/api/v1/product/categoryid/${categoryId}`
    );

    if (res.data.success && res.data.products.length) {
      // Remove current product and limit to 8
      return res.data.products.filter(p => p._id !== currentProductId).slice(0, 8);
    }
    return [];
  } catch (err) {
    console.error("Failed to fetch related products:", err);
    return [];
  }
};

export {
  fetchUserCategories,
  getProductsByCategory,
  fetchProductIds,
  fetchCurrentUser,
  deleteProduct,
  getAllProducts,
  updateProduct,
  createProduct,
  createCategory,
  CreateUserAddress,
  fetchAdminCategories,
  fetchCategory,
  fetchUserAddress,
  getOrders,
  fetchProductById,
  getSingleProductById,
  deleteOrder,
  getUsers,
  adminRegister,
  adminLogin,
  getAdminInfo,
  getClientByOrderId,
  updateOrder,
  getRelatedProducts
};
