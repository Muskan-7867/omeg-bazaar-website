import { OrderData } from "./Product";



export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  message?: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}
export interface RegisterResponse {
  token: string;
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
  };

}
export interface AddressFormData {
  _id?: string; 
  phone?: string;
  street: string;
  address?: string;
  address1?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}


export interface CurrentUser {
  _id: string;
  username: string;
  email: string;
  contact: string;
 
  role: "admin" | "user";
  address?: AddressFormData | ""; 
  order?: OrderData[];  
  createdAt?: string;
  updatedAt?: string;
}
