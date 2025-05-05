// // utils/api.ts
// export const saveUserToStrapi = async (userData: {
//   Username: string;
//   Email: string;
//   ImageURL: string;
// }) => {
//   try {
//     const response = await fetch(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/users`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//         },
//         body: JSON.stringify({ data: userData }),
//       }
//     );
//     return await response.json();
//   } catch (error) {
//     console.error("Error saving user to Strapi:", error);
//     throw error;
//   }
// };

// export const updateUserInStrapi = async (
//   id: string,
//   updates: Partial<{
//     Username: string;
//     ImageURL: string;
//     Confirmed: boolean;
//   }>
// ) => {
//   try {
//     const response = await fetch(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/users/${id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//         },
//         body: JSON.stringify({ data: updates }),
//       }
//     );
//     return await response.json();
//   } catch (error) {
//     console.error("Error updating user in Strapi:", error);
//     throw error;
//   }
// };

/***************************************** */

// // utils/api.ts
// interface StrapiUser {
//   Username: string;
//   Email: string;
//   ImageURL: string;
//   Confirmed?: boolean;
// }

// export const saveUserToStrapi = async (userData: StrapiUser) => {
//   try {
//     const response = await fetch(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/users`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//         },
//         body: JSON.stringify({ data: userData }),
//       }
//     );
//     return await response.json();
//   } catch (error) {
//     console.error("Error saving user to Strapi:", error);
//     throw error;
//   }
// };

// export const updateUserInStrapi = async (
//   id: string,
//   updates: Partial<StrapiUser>
// ) => {
//   try {
//     const response = await fetch(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/users/${id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//         },
//         body: JSON.stringify({ data: updates }),
//       }
//     );
//     return await response.json();
//   } catch (error) {
//     console.error("Error updating user in Strapi:", error);
//     throw error;
//   }
// };

// export const deleteUserFromStrapi = async (id: string) => {
//   try {
//     await fetch(`${process.env.EXPO_PUBLIC_STRAPI_API_URL}/users/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//       },
//     });
//   } catch (error) {
//     console.error("Error deleting user from Strapi:", error);
//     throw error;
//   }
// };

/********************************************* */

// interface UserData {
//   Username: string;
//   Email: string;
//   ProfileIMG: string;
// }

// export const saveUserToStrapi = async (userData: UserData): Promise<any> => {
//   const response = await fetch(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/user-auths/`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//       },
//       body: JSON.stringify({ data: userData }),
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Error saving user to Strapi: ${response.statusText}`);
//   }

//   return response.json();
// };

// export const deleteUserFromStrapi = async (userId: string): Promise<any> => {
//   const response = await fetch(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/user-auths/${userId}`,
//     {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Error deleting user from Strapi: ${response.statusText}`);
//   }

//   return response.json();
// };

// export const uploadImageToStrapi = async (imageUri: string): Promise<any> => {
//   const formData = new FormData();
//   formData.append("files", {
//     uri: imageUri,
//     type: "image/jpeg",
//     name: "profile.jpg",
//   } as any);

//   const response = await fetch(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/upload`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//       },
//       body: formData,
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Error uploading image to Strapi: ${response.statusText}`);
//   }

//   const data = await response.json();
//   return data[0];
// };

/**************************************** */

// interface UserData {
//   Username: string;
//   Email: string;
//   ProfileIMG: string;
// }

// export const saveUserToStrapi = async (userData: UserData): Promise<any> => {
//   const response = await fetch(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/user-auths/`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//       },
//       body: JSON.stringify({ data: userData }),
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Error saving user to Strapi: ${response.statusText}`);
//   }

//   return response.json();
// };

// export const deleteUserFromStrapi = async (userId: string): Promise<any> => {
//   const response = await fetch(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/user-auths/${userId}`,
//     {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Error deleting user from Strapi: ${response.statusText}`);
//   }

//   return response.json();
// };

// export const uploadImageToStrapi = async (imageUri: string): Promise<any> => {
//   const formData = new FormData();
//   formData.append("files", {
//     uri: imageUri,
//     type: "image/jpeg",
//     name: "profile.jpg",
//   } as any);

//   const response = await fetch(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/upload`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//       },
//       body: formData,
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Error uploading image to Strapi: ${response.statusText}`);
//   }

//   const data = await response.json();
//   return data[0];
// };

/********************************************************** */

// import axios from "axios";

// interface UserData {
//   Username: string;
//   Email: string;
//   ProfileIMG: string;
// }

// export const saveUserToStrapi = async (userData: UserData): Promise<any> => {
//   const response = await fetch(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/user-auths/`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//       },
//       body: JSON.stringify({ data: userData }),
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Error saving user to Strapi: ${response.statusText}`);
//   }

//   return response.json();
// };

// export const deleteUserFromStrapi = async (userId: string): Promise<any> => {
//   const response = await fetch(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/user-auths/${userId}`,
//     {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Error deleting user from Strapi: ${response.statusText}`);
//   }

//   return response.json();
// };

// export const uploadImageToStrapi = async (imageUri: string): Promise<any> => {
//   const formData = new FormData();
//   formData.append("files", {
//     uri: imageUri,
//     type: "image/jpeg",
//     name: "profile.jpg",
//   } as any);

//   try {
//     const response = await axios.post(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/upload`,
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     if (response.status !== 200) {
//       throw new Error(
//         `Error uploading image to Strapi: ${response.statusText}`
//       );
//     }

//     return response.data;
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw error;
//   }
// };

/*********************************************************** */
// import axios from "axios";

// interface UserData {
//   Username: string;
//   Email: string;
//   ProfileIMG: string;
// }

// export const saveUserToStrapi = async (userData: UserData): Promise<any> => {
//   const response = await fetch(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/user-auths/`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//       },
//       body: JSON.stringify({ data: userData }),
//     }
//   );

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`Error saving user to Strapi: ${errorText}`);
//   }

//   return response.json();
// };

// export const deleteUserFromStrapi = async (userId: string): Promise<any> => {
//   const response = await fetch(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/user-auths/${userId}`,
//     {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`Error deleting user from Strapi: ${errorText}`);
//   }

//   return response.json();
// };

// export const uploadImageToStrapi = async (imageUri: string): Promise<any> => {
//   const formData = new FormData();
//   formData.append("files", {
//     uri: imageUri,
//     type: "image/jpeg",
//     name: "profile.jpg",
//   } as any);

//   try {
//     const response = await axios.post(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/upload`,
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     if (response.status !== 200) {
//       throw new Error(`Error uploading image to Strapi: ${response.status}`);
//     }

//     const data = response.data;
//     return data[0]; // Return the URL of the uploaded image
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw error;
//   }
// };

/**************************************** */
// import axios from "axios";

// interface UserData {
//   Username: string;
//   Email: string;
//   ProfileIMG: string;
// }

// export const saveUserToStrapi = async (userData: UserData): Promise<any> => {
//   const response = await fetch(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/user-auths/`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//       },
//       body: JSON.stringify({ data: userData }),
//     }
//   );

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`Error saving user to Strapi: ${errorText}`);
//   }

//   return response.json();
// };

// export const deleteUserFromStrapi = async (userId: string): Promise<any> => {
//   const response = await fetch(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/user-auths/${userId}`,
//     {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`Error deleting user from Strapi: ${errorText}`);
//   }

//   return response.json();
// };

// export const uploadImageToStrapi = async (imageUri: string): Promise<any> => {
//   const formData = new FormData();
//   formData.append("files", {
//     uri: imageUri,
//     type: "image/jpeg",
//     name: "profile.jpg",
//   } as any);

//   try {
//     const response = await axios.post(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/upload`,
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     if (response.status !== 201) {
//       throw new Error(`Error uploading image to Strapi: ${response.status}`);
//     }

//     const data = response.data;
//     return data[0]; // Return the URL of the uploaded image
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw error;
//   }
// };

/************************************** */

import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";

// Types
export interface UserData {
  Username: string;
  Email: string;
  ProfileIMG?: string;
  LastLogin: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  } | null;
  error?: {
    status: number;
    message: string;
  };
}

export interface StrapiUser {
  id: number;
  attributes: UserData;
}

export interface UploadResponse {
  id: number;
  url: string;
}

// Environment variables
const BASE_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER;

if (!BASE_URL || !API_TOKEN) {
  throw new Error(
    "Missing required environment variables: STRAPI_API_URL or API_TOKEN"
  );
}

// API error handling
class StrapiError extends Error {
  constructor(message: string, public status?: number, public details?: any) {
    super(message);
    this.name = "StrapiError";
  }
}

// Helper function to handle API responses
async function handleApiResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new StrapiError(
      data.error?.message || "An error occurred",
      response.status,
      data.error
    );
  }

  return data;
}

// Get current timestamp in YYYY-MM-DD HH:MM:SS format
const getCurrentTimestamp = () => {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
};

// Main API functions
export const createOrUpdateUser = async (
  userData: Partial<UserData>
): Promise<StrapiUser> => {
  try {
    if (!userData.Email) {
      throw new StrapiError("Email is required");
    }

    // Check if user exists
    const existingUser = await getUserByEmail(userData.Email);

    const endpoint = existingUser
      ? `${BASE_URL}/api/auths/${existingUser.id}`
      : `${BASE_URL}/api/auths`;

    const method = existingUser ? "PUT" : "POST";
    const currentTime = getCurrentTimestamp();

    const response = await fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          ...userData,
          LastLogin: currentTime,
          updatedAt: currentTime,
          ...(method === "POST" && { createdAt: currentTime }),
        },
      }),
    });

    return handleApiResponse<StrapiUser>(response);
  } catch (error) {
    console.error("Error in createOrUpdateUser:", error);
    throw error instanceof StrapiError
      ? error
      : new StrapiError("Failed to save user data");
  }
};

export const getUserByEmail = async (
  email: string
): Promise<StrapiUser | null> => {
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

    const data = await handleApiResponse<{ data: StrapiUser[] }>(response);
    return data.data[0] || null;
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    return null;
  }
};

export const uploadProfileImage = async (
  uri: string
): Promise<UploadResponse> => {
  try {
    // Verify file exists
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      throw new StrapiError("File does not exist");
    }

    // Create form data
    const formData = new FormData();
    const filename = uri.split("/").pop() || `profile-${Date.now()}.jpg`;

    formData.append("files", {
      uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
      name: filename,
      type: "image/jpeg",
    } as any);

    // Upload image
    const response = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
      body: formData,
    });

    const data = await handleApiResponse<any[]>(response);

    if (!data[0]?.url) {
      throw new StrapiError("Invalid upload response");
    }

    return {
      id: data[0].id,
      url: data[0].url,
    };
  } catch (error) {
    console.error("Error in uploadProfileImage:", error);
    throw error instanceof StrapiError
      ? error
      : new StrapiError("Failed to upload image");
  }
};

// Get user's orders
export const getUserOrders = async (userId: number): Promise<any[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/orders?filters[user][id][$eq]=${userId}&sort=createdAt:desc`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await handleApiResponse<{ data: any[] }>(response);
    return data.data;
  } catch (error) {
    console.error("Error in getUserOrders:", error);
    throw error instanceof StrapiError
      ? error
      : new StrapiError("Failed to fetch orders");
  }
};

// Update last login
export const updateLastLogin = async (userId: number): Promise<void> => {
  try {
    await fetch(`${BASE_URL}/api/auths/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          LastLogin: getCurrentTimestamp(),
        },
      }),
    });
  } catch (error) {
    console.error("Error updating last login:", error);
    // Don't throw error as this is not critical
  }
};
