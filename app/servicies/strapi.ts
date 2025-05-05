// app/services/strapi.ts
// app/services/strapi.ts
import axios from "axios";

interface UserData {
  username: string;
  email: string;
  imageUrl: string;
}

export enum OrderStatus {
  PENDING = "Pending",
  PROCESSING = "Processing",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export interface Order {
  id: string;
  status: OrderStatus;
  total: number;
  details: string;
  date: string;
}

const strapiAPI = axios.create({
  baseURL: process.env.EXPO_PUBLIC_STRAPI_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
  },
});

export const saveUserToStrapi = async (userData: UserData) => {
  try {
    const response = await strapiAPI.post("/api/user-auths", {
      data: userData,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving user to Strapi:", error);
    throw error;
  }
};
