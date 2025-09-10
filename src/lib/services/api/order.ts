
import { OrderData } from "@/lib/types/Product";
import axios from "axios";
import { BASE_URL } from "./fetchers";



async function placeOrder(orderData: OrderData, token: string) {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/order/create`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

export default placeOrder;