// import * as FileSystem from "expo-file-system";

// const BASE_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const API_TOKEN = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER;

// interface UserData {
//   Username: string;
//   Email: string;
//   ProfileIMG?: string;
// }

// export const uploadImageToStrapi = async (uri: string) => {
//   try {
//     const formData = new FormData();
//     const fileInfo = await FileSystem.getInfoAsync(uri);

//     if (!fileInfo.exists) {
//       throw new Error("File does not exist");
//     }

//     const fileNameParts = uri.split("/");
//     const fileName = fileNameParts[fileNameParts.length - 1];

//     formData.append("files", {
//       uri: uri,
//       name: fileName,
//       type: "image/jpeg", // Adjust based on your image type
//     } as any);

//     const response = await fetch(`${BASE_URL}/api/upload`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to upload image");
//     }

//     const data = await response.json();
//     return { url: data[0].url };
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     throw error;
//   }
// };

// export const saveUserToStrapi = async (userData: UserData) => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/auths`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         data: userData,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to save user data");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error saving user data:", error);
//     throw error;
//   }
// };

// export const getUserFromStrapi = async (email: string) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/api/auths?filters[Email][$eq]=${encodeURIComponent(email)}`,
//       {
//         headers: {
//           Authorization: `Bearer ${API_TOKEN}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch user data");
//     }

//     const data = await response.json();
//     return data.data[0];
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     throw error;
//   }
// };

/************************************************ */

// import { Platform } from "react-native";
// import * as FileSystem from "expo-file-system";

// // Types
// export interface UserData {
//   Username: string;
//   Email: string;
//   ProfileIMG?: string;
//   LastLogin?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface StrapiResponse<T> {
//   data: {
//     id: number;
//     attributes: T;
//   };
//   meta?: {
//     pagination?: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

// export interface StrapiUser {
//   id: number;
//   attributes: UserData;
// }

// export interface UploadResponse {
//   url: string;
//   id: number;
// }

// // Constants
// const BASE_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const API_TOKEN = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER;

// if (!BASE_URL || !API_TOKEN) {
//   throw new Error("Missing required environment variables");
// }

// // Helper Functions
// const formatDateTime = (date: Date): string => {
//   return date.toISOString().slice(0, 19).replace("T", " ");
// };

// const handleApiResponse = async <T>(response: Response): Promise<T> => {
//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(errorData.error?.message || "API request failed");
//   }
//   return response.json();
// };

// // API Functions
// export const getUserFromStrapi = async (
//   email: string
// ): Promise<StrapiUser | null> => {
//   try {
//     if (!email) throw new Error("Email is required");

//     const response = await fetch(
//       `${BASE_URL}/api/auths?filters[Email][$eq]=${encodeURIComponent(email)}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${API_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const data = await handleApiResponse<{ data: StrapiUser[] }>(response);
//     return data.data.length > 0 ? data.data[0] : null;
//   } catch (error) {
//     console.error("Error fetching user from Strapi:", error);
//     return null;
//   }
// };

// export const createOrUpdateUser = async (
//   userData: Partial<UserData>
// ): Promise<StrapiUser> => {
//   try {
//     if (!userData.Email) {
//       throw new Error("Email is required");
//     }

//     const existingUser = await getUserFromStrapi(userData.Email);
//     const currentDateTime = formatDateTime(new Date());

//     const endpoint = existingUser
//       ? `${BASE_URL}/api/auths/${existingUser.id}`
//       : `${BASE_URL}/api/auths`;

//     const method = existingUser ? "PUT" : "POST";

//     const response = await fetch(endpoint, {
//       method,
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         data: {
//           ...userData,
//           LastLogin: currentDateTime,
//           updatedAt: currentDateTime,
//           ...(method === "POST" && { createdAt: currentDateTime }),
//         },
//       }),
//     });

//     return handleApiResponse<StrapiUser>(response);
//   } catch (error) {
//     console.error("Error saving user to Strapi:", error);
//     throw error;
//   }
// };

// export const uploadImageToStrapi = async (
//   uri: string
// ): Promise<UploadResponse> => {
//   try {
//     // Input validation
//     if (!uri) throw new Error("Image URI is required");

//     // File info check
//     const fileInfo = await FileSystem.getInfoAsync(uri);
//     if (!fileInfo.exists) {
//       throw new Error("File does not exist");
//     }

//     // Create FormData
//     const formData = new FormData();
//     const filename = uri.split("/").pop() || `profile-${Date.now()}.jpg`;

//     formData.append("files", {
//       uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
//       type: "image/jpeg",
//       name: filename,
//     } as any);

//     // Upload request
//     const response = await fetch(`${BASE_URL}/api/upload`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         Accept: "application/json",
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to upload image");
//     }

//     const data = await response.json();

//     if (!data[0]?.url) {
//       throw new Error("Invalid upload response");
//     }

//     return {
//       url: data[0].url,
//       id: data[0].id,
//     };
//   } catch (error) {
//     console.error("Error uploading image to Strapi:", error);
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to upload image"
//     );
//   }
// };

// // Utility function to check if user exists
// export const checkUserExists = async (email: string): Promise<boolean> => {
//   try {
//     const user = await getUserFromStrapi(email);
//     return !!user;
//   } catch (error) {
//     console.error("Error checking user existence:", error);
//     return false;
//   }
// };

// // Error handling utility
// export class StrapiError extends Error {
//   constructor(
//     message: string,
//     public statusCode?: number,
//     public details?: any
//   ) {
//     super(message);
//     this.name = "StrapiError";
//   }
// }

/*************************************** */

// import { Platform } from "react-native";
// import * as FileSystem from "expo-file-system";

// // Types
// export interface UserData {
//   Username: string;
//   Email: string;
//   ProfileIMG?: string;
//   LastLogin: string;
// }

// export interface StrapiUser {
//   id: number;
//   attributes: UserData;
// }

// export interface StrapiResponse<T> {
//   data: {
//     id: number;
//     attributes: T;
//   };
//   meta?: {
//     pagination?: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

// interface UploadResponse {
//   id: number;
//   url: string;
// }

// // Constants
// const BASE_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const API_TOKEN = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER;

// if (!BASE_URL || !API_TOKEN) {
//   throw new Error("Missing required environment variables");
// }

// // Helper for API errors
// class ApiError extends Error {
//   constructor(message: string, public status?: number) {
//     super(message);
//     this.name = "ApiError";
//   }
// }

// // Helper to format current datetime
// const formatDateTime = (date: Date = new Date()): string => {
//   return date.toISOString().slice(0, 19).replace("T", " ");
// };

// // Get user by email
// export const getUserByEmail = async (
//   email: string
// ): Promise<StrapiUser | null> => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/api/auths?filters[Email][$eq]=${encodeURIComponent(email)}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${API_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new ApiError("Failed to fetch user", response.status);
//     }

//     const data = await response.json();
//     return data.data.length > 0 ? data.data[0] : null;
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return null;
//   }
// };

// // Create or update user
// export const createOrUpdateUser = async (
//   userData: Partial<UserData>
// ): Promise<StrapiUser> => {
//   try {
//     if (!userData.Email) {
//       throw new ApiError("Email is required");
//     }

//     const existingUser = await getUserByEmail(userData.Email);
//     const endpoint = existingUser
//       ? `${BASE_URL}/api/auths/${existingUser.id}`
//       : `${BASE_URL}/api/auths`;

//     const method = existingUser ? "PUT" : "POST";
//     const currentTime = formatDateTime();

//     const response = await fetch(endpoint, {
//       method,
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         data: {
//           ...userData,
//           LastLogin: currentTime,
//         },
//       }),
//     });

//     if (!response.ok) {
//       throw new ApiError("Failed to save user data", response.status);
//     }

//     return response.json();
//   } catch (error) {
//     console.error("Error saving user:", error);
//     throw error instanceof ApiError
//       ? error
//       : new ApiError("Failed to save user data");
//   }
// };

// // Upload profile image
// export const uploadProfileImage = async (
//   uri: string
// ): Promise<UploadResponse> => {
//   try {
//     // Check if file exists
//     const fileInfo = await FileSystem.getInfoAsync(uri);
//     if (!fileInfo.exists) {
//       throw new ApiError("File does not exist");
//     }

//     // Prepare form data
//     const formData = new FormData();
//     const filename = uri.split("/").pop() || `profile-${Date.now()}.jpg`;

//     formData.append("files", {
//       uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
//       type: "image/jpeg",
//       name: filename,
//     } as any);

//     // Upload to Strapi
//     const response = await fetch(`${BASE_URL}/api/upload`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         Accept: "application/json",
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new ApiError("Failed to upload image", response.status);
//     }

//     const data = await response.json();

//     if (!data[0]?.url) {
//       throw new ApiError("Invalid upload response");
//     }

//     return {
//       id: data[0].id,
//       url: data[0].url,
//     };
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     throw error instanceof ApiError
//       ? error
//       : new ApiError("Failed to upload image");
//   }
// };

// // Update user's profile image
// export const updateUserProfileImage = async (
//   userId: number,
//   imageUrl: string
// ): Promise<StrapiUser> => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/auths/${userId}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         data: {
//           ProfileIMG: imageUrl,
//           updatedAt: formatDateTime(),
//         },
//       }),
//     });

//     if (!response.ok) {
//       throw new ApiError("Failed to update profile image", response.status);
//     }

//     return response.json();
//   } catch (error) {
//     console.error("Error updating profile image:", error);
//     throw error instanceof ApiError
//       ? error
//       : new ApiError("Failed to update profile image");
//   }
// };

// // Update last login
// export const updateLastLogin = async (userId: number): Promise<void> => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/auths/${userId}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         data: {
//           LastLogin: formatDateTime(),
//         },
//       }),
//     });

//     if (!response.ok) {
//       throw new ApiError("Failed to update last login", response.status);
//     }
//   } catch (error) {
//     console.error("Error updating last login:", error);
//     // Don't throw error as this is not critical
//   }
// };

/************************************* */

// interface UserData {
//   Username: string;
//   Email: string;
//   ProfileIMG?: string;
//   LastLogin?: string;
// }

// interface StrapiResponse {
//   data: {
//     id: number;
//     attributes: UserData;
//   };
// }

// const BASE_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const API_TOKEN = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN;

// // if (!BASE_URL || !API_TOKEN) {
// //   throw new Error("Missing Strapi configuration");
// // }

// // Save or update user in Strapi
// export const saveUserToStrapi = async (
//   userData: UserData
// ): Promise<StrapiResponse> => {
//   try {
//     // Check if user exists
//     const existingUser = await getUserByEmail(userData.Email);

//     const endpoint = existingUser
//       ? `${BASE_URL}/api/auths/${existingUser.data.id}`
//       : `${BASE_URL}/api/auths`;

//     const method = existingUser ? "PUT" : "POST";

//     const response = await fetch(endpoint, {
//       method,
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         data: {
//           ...userData,
//           LastLogin: new Date().toISOString().slice(0, 19).replace("T", " "),
//         },
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to save user data");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error saving user:", error);
//     throw error;
//   }
// };

// // Get user by email
// export const getUserByEmail = async (
//   email: string
// ): Promise<StrapiResponse | null> => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/api/auths?filters[Email][$eq]=${encodeURIComponent(email)}`,
//       {
//         headers: {
//           Authorization: `Bearer ${API_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch user");
//     }

//     const data = await response.json();
//     return data.data.length > 0 ? { data: data.data[0] } : null;
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return null;
//   }
// };

// // Upload profile image
// export const uploadProfileImage = async (
//   uri: string
// ): Promise<{ url: string }> => {
//   try {
//     const formData = new FormData();
//     const filename = uri.split("/").pop() || "profile.jpg";

//     formData.append("files", {
//       uri,
//       name: filename,
//       type: "image/jpeg",
//     } as any);

//     const response = await fetch(`${BASE_URL}/api/upload`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to upload image");
//     }

//     const data = await response.json();
//     return { url: data[0].url };
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     throw error;
//   }
// };

// // Update user's profile image
// export const updateUserProfileImage = async (
//   userId: number,
//   imageUrl: string
// ): Promise<StrapiResponse> => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/auths/${userId}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         data: {
//           ProfileIMG: imageUrl,
//         },
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to update profile image");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error updating profile image:", error);
//     throw error;
//   }
// };

// // Get user's orders
// export const getUserOrders = async (userId: number) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/api/orders?filters[user][id][$eq]=${userId}&sort=createdAt:desc`,
//       {
//         headers: {
//           Authorization: `Bearer ${API_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch orders");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     throw error;
//   }
// };

/********************************************** */

// // /utils/api.auth.ts

// interface UserData {
//   Username: string;
//   Email: string;
//   ProfileIMG?: string;
//   LastLogin?: string;
// }

// interface StrapiResponse {
//   data: {
//     documentId: string;
//     attributes: UserData;
//   };
// }

// const BASE_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const API_TOKEN = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER;

// // Error handling utility
// const handleApiError = (error: any, customMessage: string) => {
//   console.error(`${customMessage}:`, error);
//   throw new Error(customMessage);
// };

// // Save or update user in Strapi
// export const saveUserToStrapi = async (
//   userData: UserData
// ): Promise<StrapiResponse> => {
//   try {
//     const existingUser = await getUserByEmail(userData.Email);
//     const endpoint = existingUser
//       ? `${BASE_URL}/api/auths/${existingUser.data.documentId}`
//       : `${BASE_URL}/api/auths`;

//     const response = await fetch(endpoint, {
//       method: existingUser ? "PUT" : "POST",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         data: {
//           ...userData,
//           LastLogin: new Date().toISOString().slice(0, 19).replace("T", " "),
//         },
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     handleApiError(error, "Failed to save user data");
//   }
// };

// // Get user by email with error handling
// export const getUserByEmail = async (
//   email: string
// ): Promise<StrapiResponse | null> => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/api/auths?filters[Email][$eq]=${encodeURIComponent(email)}`,
//       {
//         headers: {
//           Authorization: `Bearer ${API_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data.data.length > 0 ? { data: data.data[0] } : null;
//   } catch (error) {
//     handleApiError(error, "Failed to fetch user");
//     return null;
//   }
// };

// // Upload profile image with proper type handling
// export const uploadProfileImage = async (
//   uri: string
// ): Promise<{ url: string }> => {
//   try {
//     const formData = new FormData();
//     const filename = uri.split("/").pop() || "profile.jpg";

//     // Create file object for upload
//     const file = {
//       uri,
//       name: filename,
//       type: "image/jpeg",
//     } as const;

//     formData.append("files", file as any);

//     const response = await fetch(`${BASE_URL}/api/upload`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         Accept: "application/json",
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`Upload failed with status: ${response.status}`);
//     }

//     const data = await response.json();
//     if (!data[0]?.url) {
//       throw new Error("No URL in upload response");
//     }

//     return { url: data[0].url };
//   } catch (error) {
//     handleApiError(error, "Failed to upload image");
//     throw error;
//   }
// };

// // Get user's orders with pagination support
// export const getUserOrders = async (
//   userId: number,
//   page = 1,
//   pageSize = 10
// ) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/api/orders?filters[user][id][$eq]=${userId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`,
//       {
//         headers: {
//           Authorization: `Bearer ${API_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     handleApiError(error, "Failed to fetch orders");
//     throw error;
//   }
// };

/******************************************* */

// interface UserData {
//   Username?: string;
//   Email?: string;
//   ProfileIMG?: string;
//   LastLogin?: string;
//   documentId?: string;
// }

// interface StrapiResponse {
//   data: {
//     id: number;
//     documentId: string;
//     Username: string;
//     Email: string;
//     ProfileIMG: string;
//     createdAt: string;
//     updatedAt: string;
//     publishedAt: string;
//     Confirmed: boolean;
//   };
//   meta: {};
// }

// const BASE_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const API_TOKEN = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN;

// if (!BASE_URL || !API_TOKEN) {
//   console.warn("Missing Strapi configuration");
// }

// // Error handling utility
// const handleApiError = (error: any, customMessage: string) => {
//   console.error(`${customMessage}:`, error);
//   throw new Error(customMessage);
// };

// // Get user by email
// export const getUserByEmail = async (
//   email: string
// ): Promise<StrapiResponse | null> => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/api/auths?filters[Email][$eq]=${encodeURIComponent(email)}`,
//       {
//         headers: {
//           Authorization: `Bearer ${API_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data.data.length > 0 ? { data: data.data[0] } : null;
//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//     return null;
//   }
// };

// // Save new user to Strapi
// export const createUserInStrapi = async (
//   userData: UserData
// ): Promise<StrapiResponse> => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/auths`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ data: userData }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     handleApiError(error, "Failed to create user");
//     throw error;
//   }
// };

// // Update username
// export const updateUsername = async (
//   documentId: string,
//   newUsername: string
// ): Promise<StrapiResponse> => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/auths/${documentId}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         data: {
//           Username: newUsername,
//         },
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     handleApiError(error, "Failed to update username");
//     throw error;
//   }
// };

// // Update profile image
// export const updateProfileImage = async (
//   documentId: string,
//   imageUrl: string
// ): Promise<StrapiResponse> => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/auths/${documentId}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         data: {
//           ProfileIMG: imageUrl,
//         },
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     handleApiError(error, "Failed to update profile image");
//     throw error;
//   }
// };

// // Upload image to Strapi
// export const uploadProfileImage = async (
//   uri: string
// ): Promise<{ url: string }> => {
//   try {
//     const formData = new FormData();
//     const filename = uri.split("/").pop() || "profile.jpg";

//     formData.append("files", {
//       uri,
//       name: filename,
//       type: "image/jpeg",
//     } as any);

//     const response = await fetch(`${BASE_URL}/api/upload`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         Accept: "application/json",
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`Upload failed with status: ${response.status}`);
//     }

//     const data = await response.json();
//     if (!data[0]?.url) {
//       throw new Error("No URL in upload response");
//     }

//     return { url: data[0].url };
//   } catch (error) {
//     handleApiError(error, "Failed to upload image");
//     throw error;
//   }
// };

// // Update last login
// export const updateLastLogin = async (
//   documentId: string,
//   lastLogin: string
// ): Promise<StrapiResponse> => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/auths/${documentId}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         data: {
//           LastLogin: lastLogin,
//         },
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     handleApiError(error, "Failed to update last login");
//     throw error;
//   }
// };

/************************************** */

// interface UserData {
//   Username: string;
//   Email: string;
//   ProfileIMG?: string;
//   LastLogin?: string;
// }

// interface StrapiResponse {
//   data: {
//     id: number;
//     documentId: string;
//     Username: string;
//     Email: string;
//     ProfileIMG?: string;
//     createdAt: string;
//     updatedAt: string;
//     publishedAt: string;
//     Confirmed: boolean;
//   };
//   meta: {};
// }

// const BASE_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const API_TOKEN = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER;

// // Error handling utility
// const handleApiError = (error: any, customMessage: string) => {
//   console.error(`${customMessage}:`, error);
//   throw new Error(customMessage);
// };

// // Create or update user in Strapi
// export const createOrUpdateUser = async (
//   userData: UserData
// ): Promise<StrapiResponse> => {
//   try {
//     const existingUser = await getUserByEmail(userData.Email);
//     const endpoint = existingUser
//       ? `${BASE_URL}/api/auths/${existingUser.data.documentId}`
//       : `${BASE_URL}/api/auths`;

//     const response = await fetch(endpoint, {
//       method: existingUser ? "PUT" : "POST",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         data: {
//           ...userData,
//           LastLogin: new Date().toISOString().slice(0, 19).replace("T", " "),
//         },
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     handleApiError(error, "Failed to save user data");
//     throw error;
//   }
// };

// // Get user by email
// export const getUserByEmail = async (
//   email: string
// ): Promise<StrapiResponse | null> => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/api/auths?filters[Email][$eq]=${encodeURIComponent(email)}`,
//       {
//         headers: {
//           Authorization: `Bearer ${API_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data.data.length > 0 ? { data: data.data[0] } : null;
//   } catch (error) {
//     handleApiError(error, "Failed to fetch user");
//     return null;
//   }
// };

// // Update username
// export const updateUsername = async (
//   documentId: string,
//   newUsername: string
// ): Promise<StrapiResponse> => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/auths/${documentId}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         data: {
//           Username: newUsername,
//         },
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     handleApiError(error, "Failed to update username");
//     throw error;
//   }
// };

// // Upload image
// export const uploadProfileImage = async (
//   uri: string
// ): Promise<{ url: string }> => {
//   try {
//     const formData = new FormData();
//     const filename = uri.split("/").pop() || "profile.jpg";

//     formData.append("files", {
//       uri,
//       name: filename,
//       type: "image/jpeg",
//     } as any);

//     const response = await fetch(`${BASE_URL}/api/upload`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         Accept: "application/json",
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`Upload failed with status: ${response.status}`);
//     }

//     const data = await response.json();
//     if (!data[0]?.url) {
//       throw new Error("No URL in upload response");
//     }

//     return { url: data[0].url };
//   } catch (error) {
//     handleApiError(error, "Failed to upload image");
//     throw error;
//   }
// };

// // Update profile image
// export const updateProfileImage = async (
//   documentId: string,
//   imageUrl: string
// ): Promise<StrapiResponse> => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/auths/${documentId}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         data: {
//           ProfileIMG: imageUrl,
//         },
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     handleApiError(error, "Failed to update profile image");
//     throw error;
//   }
// };

// // Update last login
// export const updateLastLogin = async (
//   documentId: string
// ): Promise<StrapiResponse> => {
//   try {
//     const currentDateTime = new Date()
//       .toISOString()
//       .slice(0, 19)
//       .replace("T", " ");

//     const response = await fetch(`${BASE_URL}/api/auths/${documentId}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         data: {
//           LastLogin: currentDateTime,
//         },
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     handleApiError(error, "Failed to update last login");
//     throw error;
//   }
// };

/*********************************** */

interface UserData {
  Username?: string;
  Email: string;
  ProfileIMG?: string;
  LastLogin?: string;
}

interface StrapiResponse {
  data: {
    id: number;
    documentId: string;
    Username: string;
    Email: string;
    ProfileIMG: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Confirmed: boolean;
  };
  meta: {};
}

const BASE_URL =
  process.env.EXPO_PUBLIC_STRAPI_API_URL ||
  "https://54e8-37-39-223-53.ngrok-free.app";
const API_TOKEN = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER;

if (!API_TOKEN) {
  console.error("Missing API token");
}

// Get user by email
export const getUserByEmail = async (email: string): Promise<string | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/auths?filters[Email][$eq]=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Return the documentId if user exists
    return result.data?.[0]?.documentId || null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};

// Create new user
export const createUser = async (userData: UserData): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/api/auths`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: userData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Failed to create user:", error);
    return false;
  }
};

// Update username
export const updateUsername = async (
  documentId: string,
  newUsername: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/api/auths/${documentId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          Username: newUsername,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Failed to update username:", error);
    return false;
  }
};

// Update profile image
export const updateProfileImage = async (
  documentId: string,
  imageUrl: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/api/auths/${documentId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          ProfileIMG: imageUrl,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Failed to update profile image:", error);
    return false;
  }
};

// Update last login
export const updateLastLogin = async (documentId: string): Promise<boolean> => {
  try {
    const currentDateTime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const response = await fetch(`${BASE_URL}/api/auths/${documentId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          LastLogin: currentDateTime,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Failed to update last login:", error);
    return false;
  }
};

// Check if user exists and create if not
export const ensureUserExists = async (
  userData: UserData
): Promise<string | null> => {
  try {
    const documentId = await getUserByEmail(userData.Email);

    if (!documentId) {
      // User doesn't exist, create new user
      const created = await createUser(userData);
      if (created) {
        // Get the newly created user's documentId
        return await getUserByEmail(userData.Email);
      }
      return null;
    }

    return documentId;
  } catch (error) {
    console.error("Failed to ensure user exists:", error);
    return null;
  }
};

// Upload image to Strapi
export const uploadImage = async (uri: string): Promise<string | null> => {
  try {
    const formData = new FormData();
    const filename = uri.split("/").pop() || "profile.jpg";

    formData.append("files", {
      uri,
      name: filename,
      type: "image/jpeg",
    } as any);

    const response = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data[0]?.url || null;
  } catch (error) {
    console.error("Failed to upload image:", error);
    return null;
  }
};

export const getStrapiUserByEmail = async (email: string) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/auths?filters[Email][$eq]=${email}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
        },
      }
    );

    if (response.data.data.length > 0) {
      return response.data.data[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching Strapi user:", error);
    return null;
  }
};
