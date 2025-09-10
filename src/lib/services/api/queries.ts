import { queryOptions } from "@tanstack/react-query";
import {
  adminLogin,
  deleteProduct,
  fetchAdminCategories,
  fetchCurrentUser,
  fetchProductById,
  fetchProductIds,
  fetchUserAddress,
  fetchUserCategories,
  getAdminInfo,
  getAllProducts,
  getClientByOrderId,
  getOrders,
  getProductsByCategory,
  getSingleProductById,
  getUsers
} from "./fetchers";
import { updateOrderStatus, UpdateOrderStatusParams, updatePaymentPaidStatus, UpdatePaymentPaidStatusParams, updatePaymentStatus, UpdatePaymentStatusParams } from "./orderApi";


const getCategoriesQuery = () => {
  return queryOptions({
    queryKey: ["categories"],
    queryFn: fetchUserCategories
  });
};

const getAdminCategoriesQuery = () => {
  return queryOptions({
    queryKey: ["admincategories"],
    queryFn: fetchAdminCategories
  });
};

const getProductsQuery = (categoryParam: string) => {
  return queryOptions({
    queryKey: ["products", categoryParam],
    queryFn: () => getProductsByCategory(categoryParam)
  });
};

const getCartProductIdQuery = (productIds: string[]) => {
  return queryOptions({
    queryKey: ["cartproducts", productIds],
    queryFn: () => fetchProductIds(productIds),
    enabled: productIds.length > 0
  });
};

const getAllProductsQuery = () => {
  return queryOptions({
    queryKey: ["allproducts"],
    queryFn: getAllProducts
  });
};






const deleteProductQuery = (id: string | unknown) => {
  return queryOptions({
    queryKey: ["deleteproduct", id],
    queryFn: () => deleteProduct(id),
    enabled: id !== undefined
  });
};

const fetchUserAddressQuery = (addressId: string | undefined) => {
  return {
    queryKey: ["useraddress", addressId],
    queryFn: () => fetchUserAddress(addressId),
    enabled: !!addressId
  };
};

const fetchOrdersQuery = () => {
  return {
    queryKey: ["orders"],
    queryFn: getOrders,
    enabled: true,
    staleTime: 1000 * 60 * 5,
  };
};

const getProductByIdQuery = (id: string | undefined) => {
  return {
    queryKey: ["singleproduct", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id
  };
}

 const getSingleProductQuery = (singleproductid: string | undefined) =>{
  return queryOptions({
    queryKey: ["singleproduct", singleproductid],
    queryFn: () => getSingleProductById(singleproductid),
    enabled: !!singleproductid
  })
}

const fetchUsersQuery = () => {
  return queryOptions({
    queryKey: ["users"],
    queryFn: getUsers,
    enabled: true
  });
}

 const getAdminQuery = (enabled = true) => ({
  queryKey: ["admin"],
  queryFn: getAdminInfo,
  enabled,
});

 const AdminLoginQuery = ( email: string, password: string, enabled: boolean = false) => ({

    queryKey: ['admin-login', email, password],
    queryFn: () => adminLogin({ email, password }),
    enabled, 
   
  });

const getClientQuery = (orderId: string) => ({
  queryKey: ["client", orderId],
  queryFn:() => getClientByOrderId(orderId),
  enabled: !!orderId
})
const getCurrentUser = () => ({
  queryKey: ["currentUser"],
  queryFn:() => fetchCurrentUser(),
  enabled: true
})

const updateOrderStatusQuery = (params: UpdateOrderStatusParams) => ({
  queryKey: ["updateorderstatus", params.orderId],
  queryFn:() => updateOrderStatus(params),
})

const updatePaymentStatusQuery = (params: UpdatePaymentStatusParams) => ({
  queryKey: ["updatepaymentstatus", params.orderId],
  queryFn:() => updatePaymentStatus(params),
})

const updatePaymentPaidStatusQuery = (params: UpdatePaymentPaidStatusParams) => ({
  queryKey: ["updatepaidstatus", params.orderId],
  queryFn:() => updatePaymentPaidStatus(params),
})

export {
  getCategoriesQuery,
  getProductsQuery,
  getCartProductIdQuery,
  getAllProductsQuery,
  deleteProductQuery,
  getAdminCategoriesQuery,
  fetchUserAddressQuery,
  fetchOrdersQuery,
  getProductByIdQuery,
  getSingleProductQuery,
  fetchUsersQuery,
  getAdminQuery,
  getClientQuery,
  getCurrentUser,
  updateOrderStatusQuery,
  updatePaymentStatusQuery,
  updatePaymentPaidStatusQuery,
  AdminLoginQuery

};
