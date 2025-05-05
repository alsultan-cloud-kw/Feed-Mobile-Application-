// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import {
//   createOrUpdateUser,
//   getUserFromStrapi,
//   type StrapiUser,
// } from "../Utils/api.auth";

// interface UserContextType {
//   strapiUser: StrapiUser | null;
//   isLoading: boolean;
//   error: Error | null;
//   refreshStrapiUser: () => Promise<void>;
//   updateStrapiUser: (
//     userData: Partial<StrapiUser["attributes"]>
//   ) => Promise<void>;
//   lastSync: string | null;
// }

// interface UserProviderProps {
//   children: React.ReactNode;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export function UserProvider({ children }: UserProviderProps) {
//   const { user, isLoaded: isClerkLoaded } = useUser();
//   const { getToken } = useAuth();
//   const [strapiUser, setStrapiUser] = useState<StrapiUser | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [lastSync, setLastSync] = useState<string | null>(null);

//   const refreshStrapiUser = async () => {
//     if (!user?.primaryEmailAddress?.emailAddress) {
//       setStrapiUser(null);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       setError(null);

//       const email = user.primaryEmailAddress.emailAddress;
//       const existingUser = await getUserFromStrapi(email);

//       if (!existingUser) {
//         // Create new user in Strapi
//         const newUser = await createOrUpdateUser({
//           Username: user.username || user.firstName || "User",
//           Email: email,
//           ProfileIMG: user.imageUrl || "",
//           LastLogin: new Date().toISOString(),
//         });
//         setStrapiUser(newUser);
//       } else {
//         // Update existing user's last login
//         const updatedUser = await createOrUpdateUser({
//           ...existingUser.attributes,
//           LastLogin: new Date().toISOString(),
//         });
//         setStrapiUser(updatedUser);
//       }

//       setLastSync(new Date().toISOString());
//     } catch (err) {
//       console.error("Error refreshing Strapi user:", err);
//       setError(
//         err instanceof Error ? err : new Error("Failed to refresh user data")
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateStrapiUser = async (
//     userData: Partial<StrapiUser["attributes"]>
//   ) => {
//     if (!strapiUser) {
//       throw new Error("No Strapi user found");
//     }

//     try {
//       setIsLoading(true);
//       setError(null);

//       const updatedUser = await createOrUpdateUser({
//         ...strapiUser.attributes,
//         ...userData,
//         LastLogin: new Date().toISOString(),
//       });

//       setStrapiUser(updatedUser);
//       setLastSync(new Date().toISOString());
//     } catch (err) {
//       console.error("Error updating Strapi user:", err);
//       throw err instanceof Error
//         ? err
//         : new Error("Failed to update user data");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Initial sync when Clerk user is loaded
//   useEffect(() => {
//     if (isClerkLoaded && user) {
//       refreshStrapiUser();
//     }
//   }, [isClerkLoaded, user?.id]);

//   // Sync every 30 minutes if the app is active
//   useEffect(() => {
//     if (!user) return;

//     const syncInterval = setInterval(() => {
//       refreshStrapiUser();
//     }, 30 * 60 * 1000); // 30 minutes

//     return () => clearInterval(syncInterval);
//   }, [user]);

//   const value = {
//     strapiUser,
//     isLoading,
//     error,
//     refreshStrapiUser,
//     updateStrapiUser,
//     lastSync,
//   };

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// }

// export function useStrapiUser() {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useStrapiUser must be used within a UserProvider");
//   }
//   return context;
// }

// // Custom hook that combines Clerk and Strapi user data
// export function useCurrentUser() {
//   const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
//   const { strapiUser, isLoading: isStrapiLoading, error } = useStrapiUser();

//   return {
//     clerkUser,
//     strapiUser,
//     isLoading: !isClerkLoaded || isStrapiLoading,
//     error,
//     isAuthenticated: !!clerkUser && !!strapiUser,
//   };
// }

// // Type guard for checking if user is authenticated
// export function isAuthenticated(
//   user: ReturnType<typeof useCurrentUser>
// ): user is ReturnType<typeof useCurrentUser> & { isAuthenticated: true } {
//   return user.isAuthenticated;
// }

/*********************************** */

// import React, { createContext, useContext, useState, useCallback } from "react";
// import { useUser as ClerkUseUser } from "@clerk/clerk-expo";
// import {
//   UserData,
//   StrapiUser,
//   createOrUpdateUser,
//   uploadProfileImage,
//   updateUserProfileImage,
//   getUserByEmail,
// } from "../Utils/api.auth";

// interface UserContextType {
//   strapiUser: StrapiUser | null;
//   isLoading: boolean;
//   error: string | null;
//   refreshStrapiUser: () => Promise<void>;
//   updateProfile: (data: Partial<UserData>) => Promise<void>;
//   updateProfileImage: (uri: string) => Promise<void>;
//   getLastLoginFormatted: () => string;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// // Format date to YYYY-MM-DD HH:MM:SS
// const formatDate = (date: Date): string => {
//   return date.toISOString().replace("T", " ").split(".")[0];
// };

// export function UserProvider({ children }: { children: React.ReactNode }) {
//   const { user, isLoaded: isClerkLoaded } = ClerkUseUser();
//   const [strapiUser, setStrapiUser] = useState<StrapiUser | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const refreshStrapiUser = useCallback(async () => {
//     if (!user?.primaryEmailAddress?.emailAddress) {
//       setStrapiUser(null);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       setError(null);

//       const email = user.primaryEmailAddress.emailAddress;
//       const existingUser = await getUserByEmail(email);

//       if (existingUser) {
//         // Update existing user's last login
//         const updatedUser = await createOrUpdateUser({
//           ...existingUser.attributes,
//           LastLogin: formatDate(new Date()),
//         });
//         setStrapiUser(updatedUser);
//       } else {
//         // Create new user
//         const newUser = await createOrUpdateUser({
//           Username: user.username || user.firstName || "User",
//           Email: email,
//           ProfileIMG: user.imageUrl || "",
//           LastLogin: formatDate(new Date()),
//         });
//         setStrapiUser(newUser);
//       }
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Failed to refresh user data";
//       console.error("Error refreshing Strapi user:", err);
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [user]);

//   const updateProfile = async (data: Partial<UserData>) => {
//     if (!strapiUser) {
//       throw new Error("No active user found");
//     }

//     try {
//       setIsLoading(true);
//       setError(null);

//       const updatedUser = await createOrUpdateUser({
//         ...strapiUser.attributes,
//         ...data,
//         LastLogin: formatDate(new Date()),
//       });

//       setStrapiUser(updatedUser);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Failed to update profile";
//       console.error("Error updating profile:", err);
//       setError(errorMessage);
//       throw new Error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateProfileImage = async (uri: string) => {
//     if (!strapiUser) {
//       throw new Error("No active user found");
//     }

//     try {
//       setIsLoading(true);
//       setError(null);

//       // Upload the image first
//       const uploadResult = await uploadProfileImage(uri);

//       // Then update the user profile with the new image URL
//       const updatedUser = await updateUserProfileImage(
//         strapiUser.id,
//         uploadResult.url
//       );

//       setStrapiUser(updatedUser);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Failed to update profile image";
//       console.error("Error updating profile image:", err);
//       setError(errorMessage);
//       throw new Error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getLastLoginFormatted = useCallback(() => {
//     if (!strapiUser?.attributes?.LastLogin) {
//       return formatDate(new Date());
//     }
//     return strapiUser.attributes.LastLogin;
//   }, [strapiUser]);

//   // Initial load when Clerk user is available
//   React.useEffect(() => {
//     if (isClerkLoaded && user) {
//       refreshStrapiUser();
//     }
//   }, [isClerkLoaded, user?.id]);

//   // Auto refresh every 30 minutes
//   React.useEffect(() => {
//     if (!user) return;

//     const intervalId = setInterval(() => {
//       refreshStrapiUser();
//     }, 30 * 60 * 1000); // 30 minutes

//     return () => clearInterval(intervalId);
//   }, [user]);

//   const value = {
//     strapiUser,
//     isLoading,
//     error,
//     refreshStrapiUser,
//     updateProfile,
//     updateProfileImage,
//     getLastLoginFormatted,
//   };

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// }

// // Custom hook to use the user context
// export function useStrapiUser() {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useStrapiUser must be used within a UserProvider");
//   }
//   return context;
// }

// // Combined hook for both Clerk and Strapi user data
// export function useUser() {
//   const clerkAuth = ClerkUseUser();
//   const { strapiUser, isLoading: isStrapiLoading } = useStrapiUser();

//   return {
//     user: clerkAuth.user,
//     strapiUser,
//     isLoading: clerkAuth.isLoaded && isStrapiLoading,
//     isAuthenticated: !!clerkAuth.user && !!strapiUser,
//   };
// }

/*********************************************** */

// import React, { createContext, useState, useEffect, useContext } from "react";
// import { useUser } from "@clerk/clerk-expo";
// import axios from "axios";

// const EXPO_PUBLIC_STRAPI_API_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const EXPO_PUBLIC_STRAPI_API_TOKEN_USER =
//   process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER;

// // Define the context
// interface UserContextProps {
//   user: any;
//   strapiUser: any;
//   setStrapiUser: React.Dispatch<React.SetStateAction<any>>;
//   checkAndCreateUser: () => Promise<void>;
// }

// // Create the context
// const UserContext = createContext<UserContextProps | undefined>(undefined);

// // Define the provider component
// export const UserProvider: React.FC = ({ children }) => {
//   const { user } = useUser();
//   const [strapiUser, setStrapiUser] = useState<any>(null);

//   useEffect(() => {
//     if (user) {
//       checkAndCreateUser();
//     }
//   }, [user]);

//   const checkAndCreateUser = async () => {
//     if (!user) return;

//     const userData = {
//       Username: user.fullName,
//       Email: user.primaryEmailAddress?.emailAddress,
//       ProfileIMG: user.imageUrl,
//     };

//     try {
//       // Check if user exists in Strapi
//       const response = await axios.get(
//         `${EXPO_PUBLIC_STRAPI_API_URL}/api/auths?filters[Email][$eq]=${userData.Email}`,
//         {
//           headers: {
//             Authorization: `Bearer ${EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//           },
//         }
//       );

//       if (response.data.data.length === 0) {
//         // User doesn't exist, create them
//         const createResponse = await axios.post(
//           `${EXPO_PUBLIC_STRAPI_API_URL}/api/auths`,
//           { data: userData },
//           {
//             headers: {
//               Authorization: `Bearer ${EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//             },
//           }
//         );
//         setStrapiUser(createResponse.data.data);
//       } else {
//         setStrapiUser(response.data.data[0]);
//       }
//     } catch (error) {
//       console.error("Error checking/creating user:", error);
//     }
//   };

//   return (
//     <UserContext.Provider
//       value={{ user, strapiUser, setStrapiUser, checkAndCreateUser }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Custom hook to use the UserContext
// export const useStrapiUser = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useStrapiUser must be used within a UserProvider");
//   }
//   return context;
// };

/************************************** */

// import React, { createContext, useState, useEffect, useContext } from "react";
// import { useUser } from "@clerk/clerk-expo";
// import axios from "axios";

// const EXPO_PUBLIC_STRAPI_API_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const EXPO_PUBLIC_STRAPI_API_TOKEN_USER =
//   process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER;

// // Define the context
// interface UserContextProps {
//   user: any;
//   strapiUser: any;
//   setStrapiUser: React.Dispatch<React.SetStateAction<any>>;
//   checkAndCreateUser: () => Promise<void>;
// }

// // Create the context
// const UserContext = createContext<UserContextProps | undefined>(undefined);

// // Define the provider component
// export const UserProvider: React.FC = ({ children }) => {
//   const { user } = useUser();
//   const [strapiUser, setStrapiUser] = useState<any>(null);

//   useEffect(() => {
//     if (user) {
//       checkAndCreateUser();
//     }
//   }, [user]);

//   const checkAndCreateUser = async () => {
//     if (!user) return;

//     const userData = {
//       Username: user.fullName,
//       Email: user.primaryEmailAddress?.emailAddress,
//       ProfileIMG: user.imageUrl,
//     };

//     try {
//       // Check if user exists in Strapi
//       const response = await axios.get(
//         `${EXPO_PUBLIC_STRAPI_API_URL}/api/auths?filters[Email][$eq]=${userData.Email}`,
//         {
//           headers: {
//             Authorization: `Bearer ${EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//           },
//         }
//       );

//       if (response.data.data.length === 0) {
//         // User doesn't exist, create them
//         const createResponse = await axios.post(
//           `${EXPO_PUBLIC_STRAPI_API_URL}/api/auths`,
//           { data: userData },
//           {
//             headers: {
//               Authorization: `Bearer ${EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//             },
//           }
//         );
//         setStrapiUser(createResponse.data.data);
//       } else {
//         setStrapiUser(response.data.data[0]);
//       }
//     } catch (error) {
//       console.error("Error checking/creating user:", error);
//     }
//   };

//   return (
//     <UserContext.Provider
//       value={{ user, strapiUser, setStrapiUser, checkAndCreateUser }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Custom hook to use the UserContext
// export const useStrapiUser = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useStrapiUser must be used within a UserProvider");
//   }
//   return context;
// };

/************************************** */

// import React, { createContext, useState, useEffect, useContext } from "react";
// import { useUser } from "@clerk/clerk-expo";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const EXPO_PUBLIC_STRAPI_API_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const EXPO_PUBLIC_STRAPI_API_TOKEN_USER =
//   process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER;

// // Define the context
// interface UserContextProps {
//   user: any;
//   strapiUser: any;
//   setStrapiUser: React.Dispatch<React.SetStateAction<any>>;
//   checkAndCreateUser: () => Promise<void>;
// }

// // Create the context
// const UserContext = createContext<UserContextProps | undefined>(undefined);

// // Define the provider component
// export const UserProvider: React.FC = ({ children }) => {
//   const { user } = useUser();
//   const [strapiUser, setStrapiUser] = useState<any>(null);

//   useEffect(() => {
//     if (user) {
//       checkAndCreateUser();
//     }
//   }, [user]);

//   const checkAndCreateUser = async () => {
//     if (!user) return;

//     const userData = {
//       Username: user.fullName,
//       Email: user.primaryEmailAddress?.emailAddress,
//       ProfileIMG: user.imageUrl,
//     };

//     try {
//       // Check if user exists in Strapi
//       const response = await axios.get(
//         `${EXPO_PUBLIC_STRAPI_API_URL}/api/auths?filters[Email][$eq]=${userData.Email}`,
//         {
//           headers: {
//             Authorization: `Bearer ${EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//           },
//         }
//       );

//       if (response.data.data.length === 0) {
//         // User doesn't exist, create them
//         const createResponse = await axios.post(
//           `${EXPO_PUBLIC_STRAPI_API_URL}/api/auths`,
//           { data: userData },
//           {
//             headers: {
//               Authorization: `Bearer ${EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//             },
//           }
//         );
//         setStrapiUser(createResponse.data.data);
//         await AsyncStorage.setItem(
//           "strapiUser",
//           JSON.stringify(createResponse.data.data)
//         );
//       } else {
//         setStrapiUser(response.data.data[0]);
//         await AsyncStorage.setItem(
//           "strapiUser",
//           JSON.stringify(response.data.data[0])
//         );
//       }
//     } catch (error) {
//       console.error("Error checking/creating user:", error);
//     }
//   };

//   return (
//     <UserContext.Provider
//       value={{ user, strapiUser, setStrapiUser, checkAndCreateUser }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Custom hook to use the UserContext
// export const useStrapiUser = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useStrapiUser must be used within a UserProvider");
//   }
//   return context;
// };

/************************************ */

// import React, { createContext, useState, useEffect, useContext } from "react";
// import { useUser } from "@clerk/clerk-expo";
// import axios from "axios";
// import * as SecureStore from "expo-secure-store";

// const EXPO_PUBLIC_STRAPI_API_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const EXPO_PUBLIC_STRAPI_API_TOKEN_USER =
//   process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER;

// interface StrapiUser {
//   id: string;
//   Username: string;
//   Email: string;
//   ProfileIMG: string;
//   LastLogin: string;
// }

// interface UserContextProps {
//   user: any;
//   strapiUser: StrapiUser | null;
//   setStrapiUser: React.Dispatch<React.SetStateAction<StrapiUser | null>>;
//   checkAndCreateUser: () => Promise<void>;
//   updateStrapiUser: (data: Partial<StrapiUser>) => Promise<boolean>;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { user } = useUser();
//   const [strapiUser, setStrapiUser] = useState<StrapiUser | null>(null);

//   const fetchStrapiUser = async (email: string) => {
//     try {
//       const response = await axios.get(
//         `${EXPO_PUBLIC_STRAPI_API_URL}/api/auths?filters[Email][$eq]=${email}`,
//         {
//           headers: {
//             Authorization: `Bearer ${EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//           },
//         }
//       );
//       return response.data.data[0] || null;
//     } catch (error) {
//       console.error("Error fetching Strapi user:", error);
//       return null;
//     }
//   };

//   const checkAndCreateUser = async () => {
//     if (!user?.primaryEmailAddress?.emailAddress) return;

//     try {
//       // First try to fetch existing user
//       const existingUser = await fetchStrapiUser(
//         user.primaryEmailAddress.emailAddress
//       );

//       if (existingUser) {
//         // Use existing Strapi user data
//         setStrapiUser(existingUser);
//       } else {
//         // Create new user in Strapi
//         const userData = {
//           Username: user.username || user.firstName || "User",
//           Email: user.primaryEmailAddress.emailAddress,
//           ProfileIMG: user.imageUrl || "",
//           LastLogin: new Date().toISOString(),
//         };

//         const response = await axios.post(
//           `${EXPO_PUBLIC_STRAPI_API_URL}/api/auths`,
//           { data: userData },
//           {
//             headers: {
//               Authorization: `Bearer ${EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//             },
//           }
//         );

//         setStrapiUser(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error in checkAndCreateUser:", error);
//       throw error;
//     }
//   };

//   const updateStrapiUser = async (data: Partial<StrapiUser>) => {
//     if (!strapiUser?.id) return false;

//     try {
//       const response = await axios.put(
//         `${EXPO_PUBLIC_STRAPI_API_URL}/api/auths/${strapiUser.id}`,
//         { data },
//         {
//           headers: {
//             Authorization: `Bearer ${EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//           },
//         }
//       );

//       setStrapiUser(response.data.data);
//       return true;
//     } catch (error) {
//       console.error("Error updating Strapi user:", error);
//       return false;
//     }
//   };

//   useEffect(() => {
//     const initializeUser = async () => {
//       if (user) {
//         await checkAndCreateUser();
//       }
//     };

//     initializeUser();
//   }, [user]);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         strapiUser,
//         setStrapiUser,
//         checkAndCreateUser,
//         updateStrapiUser,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useStrapiUser = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useStrapiUser must be used within a UserProvider");
//   }
//   return context;
// };

/******************************** */

// import React, { createContext, useState, useEffect, useContext } from "react";
// import { useUser } from "@clerk/clerk-expo";
// import axios from "axios";
// import * as SecureStore from "expo-secure-store";

// const EXPO_PUBLIC_STRAPI_API_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const EXPO_PUBLIC_STRAPI_API_TOKEN_USER =
//   process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER;

// // Define types for better type safety
// export interface StrapiUser {
//   id: string;
//   attributes: {
//     Username: string;
//     Email: string;
//     ProfileIMG: string;
//     LastLogin: string;
//     createdAt: string;
//     updatedAt: string;
//   };
// }

// interface UserContextState {
//   isLoading: boolean;
//   error: string | null;
//   lastSync: string | null;
// }

// interface UserContextValue {
//   user: any; // Clerk user type
//   strapiUser: StrapiUser | null;
//   contextState: UserContextState;
//   setStrapiUser: React.Dispatch<React.SetStateAction<StrapiUser | null>>;
//   refreshStrapiUser: () => Promise<void>;
//   updateStrapiUser: (
//     data: Partial<StrapiUser["attributes"]>
//   ) => Promise<boolean>;
//   syncWithClerk: () => Promise<void>;
// }

// const UserContext = createContext<UserContextValue | undefined>(undefined);

// interface UserProviderProps {
//   children: React.ReactNode;
// }

// const formatUTCDateTime = (date: Date = new Date()): string => {
//   return date.toISOString().slice(0, 19).replace("T", " ");
// };

// export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
//   const { user, isSignedIn } = useUser();
//   const [strapiUser, setStrapiUser] = useState<StrapiUser | null>(null);
//   const [contextState, setContextState] = useState<UserContextState>({
//     isLoading: true,
//     error: null,
//     lastSync: null,
//   });

//   const api = axios.create({
//     baseURL: EXPO_PUBLIC_STRAPI_API_URL,
//     headers: {
//       Authorization: `Bearer ${EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
//     },
//   });

//   // Add request interceptor for error handling
//   api.interceptors.request.use(
//     (config) => {
//       // You could add request logging here
//       return config;
//     },
//     (error) => {
//       console.error("API Request Error:", error);
//       return Promise.reject(error);
//     }
//   );

//   const fetchStrapiUser = async (email: string): Promise<StrapiUser | null> => {
//     try {
//       const response = await api.get(
//         `/api/auths?filters[Email][$eq]=${email}&populate=*`
//       );
//       return response.data.data[0] || null;
//     } catch (error) {
//       console.error("Error fetching Strapi user:", error);
//       throw error;
//     }
//   };

//   const createStrapiUser = async (
//     userData: Partial<StrapiUser["attributes"]>
//   ): Promise<StrapiUser> => {
//     try {
//       const response = await api.post("/api/auths", {
//         data: userData,
//       });
//       return response.data.data;
//     } catch (error) {
//       console.error("Error creating Strapi user:", error);
//       throw error;
//     }
//   };

//   const syncWithClerk = async () => {
//     if (!isSignedIn || !user?.primaryEmailAddress?.emailAddress) {
//       return;
//     }

//     setContextState((prev) => ({ ...prev, isLoading: true, error: null }));

//     try {
//       const existingUser = await fetchStrapiUser(
//         user.primaryEmailAddress.emailAddress
//       );

//       if (existingUser) {
//         // Update existing user if needed
//         const needsUpdate =
//           existingUser.attributes.Username !==
//             (user.username || user.firstName) ||
//           existingUser.attributes.ProfileIMG !== user.imageUrl;

//         if (needsUpdate) {
//           await updateStrapiUser({
//             Username: user.username || user.firstName || "User",
//             ProfileIMG: user.imageUrl || "",
//             LastLogin: formatUTCDateTime(),
//           });
//         }

//         setStrapiUser(existingUser);
//       } else {
//         // Create new user
//         const newUser = await createStrapiUser({
//           Username: user.username || user.firstName || "User",
//           Email: user.primaryEmailAddress.emailAddress,
//           ProfileIMG: user.imageUrl || "",
//           LastLogin: formatUTCDateTime(),
//         });

//         setStrapiUser(newUser);
//       }

//       await SecureStore.setItemAsync("lastSyncTime", new Date().toISOString());
//       setContextState((prev) => ({
//         ...prev,
//         lastSync: new Date().toISOString(),
//       }));
//     } catch (error) {
//       console.error("Error syncing with Clerk:", error);
//       setContextState((prev) => ({
//         ...prev,
//         error: "Failed to sync user data",
//       }));
//     } finally {
//       setContextState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const refreshStrapiUser = async () => {
//     if (!strapiUser?.attributes.Email) return;

//     setContextState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       const refreshed = await fetchStrapiUser(strapiUser.attributes.Email);
//       if (refreshed) {
//         setStrapiUser(refreshed);
//       }
//     } catch (error) {
//       console.error("Error refreshing Strapi user:", error);
//       setContextState((prev) => ({
//         ...prev,
//         error: "Failed to refresh user data",
//       }));
//     } finally {
//       setContextState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const updateStrapiUser = async (
//     data: Partial<StrapiUser["attributes"]>
//   ): Promise<boolean> => {
//     if (!strapiUser?.id) return false;

//     setContextState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       const response = await api.put(`/api/auths/${strapiUser.id}`, {
//         data: {
//           ...data,
//           LastLogin: formatUTCDateTime(),
//         },
//       });

//       setStrapiUser(response.data.data);
//       return true;
//     } catch (error) {
//       console.error("Error updating Strapi user:", error);
//       setContextState((prev) => ({
//         ...prev,
//         error: "Failed to update user data",
//       }));
//       return false;
//     } finally {
//       setContextState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   // Initial sync and periodic refresh
//   useEffect(() => {
//     if (isSignedIn) {
//       syncWithClerk();
//     }

//     // Set up periodic refresh (every 5 minutes)
//     const refreshInterval = setInterval(refreshStrapiUser, 300000);

//     return () => {
//       clearInterval(refreshInterval);
//     };
//   }, [isSignedIn, user]);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         strapiUser,
//         contextState,
//         setStrapiUser,
//         refreshStrapiUser,
//         updateStrapiUser,
//         syncWithClerk,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useStrapiUser = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useStrapiUser must be used within a UserProvider");
//   }
//   return context;
// };

/********************************************** */

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import * as SecureStore from "expo-secure-store";
// import { router } from "expo-router";

// // Define types for better type safety
// interface UserData {
//   username: string;
//   email: string;
//   imageUrl: string;
//   lastLogin: string;
//   isGuestMode: boolean;
// }

// interface UserContextState {
//   isLoading: boolean;
//   error: string | null;
//   userData: UserData | null;
//   isInitialized: boolean;
// }

// interface UserContextValue extends UserContextState {
//   updateUserData: (data: Partial<UserData>) => Promise<void>;
//   refreshUserData: () => Promise<void>;
//   clearUserData: () => Promise<void>;
//   signOutUser: () => Promise<void>;
//   setGuestMode: (enabled: boolean) => Promise<void>;
//   formatDateTime: (date?: Date) => string;
// }

// const UserContext = createContext<UserContextValue | undefined>(undefined);

// const STORAGE_KEYS = {
//   USER_DATA: "user_data",
//   IS_AUTHENTICATED: "isAuthenticated",
//   IS_GUEST_MODE: "isGuestMode",
//   LAST_LOGIN: "lastLogin",
//   SESSION_ID: "sessionId",
// } as const;

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { user, isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const [state, setState] = useState<UserContextState>({
//     isLoading: true,
//     error: null,
//     userData: null,
//     isInitialized: false,
//   });

//   // Format date to UTC YYYY-MM-DD HH:MM:SS
//   const formatDateTime = (date: Date = new Date()): string => {
//     return date.toISOString().slice(0, 19).replace("T", " ");
//   };

//   // Initialize user data from secure storage
//   const initializeUserData = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       const [storedUserData, isAuth, isGuest] = await Promise.all([
//         SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA),
//         SecureStore.getItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
//         SecureStore.getItemAsync(STORAGE_KEYS.IS_GUEST_MODE),
//       ]);

//       // Handle authentication state
//       if (isAuth === "true" && isSignedIn && user) {
//         const userData: UserData = {
//           username: user.username || "User",
//           email: user.primaryEmailAddress?.emailAddress || "",
//           imageUrl: user.imageUrl || "",
//           lastLogin: formatDateTime(),
//           isGuestMode: false,
//         };

//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(userData)
//         );

//         setState((prev) => ({
//           ...prev,
//           userData,
//           isInitialized: true,
//         }));

//         // Update last login time
//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.LAST_LOGIN,
//           formatDateTime()
//         );
//       } else if (isGuest === "true") {
//         // Handle guest mode
//         const guestData: UserData = {
//           username: "Guest User",
//           email: "",
//           imageUrl: "",
//           lastLogin: formatDateTime(),
//           isGuestMode: true,
//         };

//         setState((prev) => ({
//           ...prev,
//           userData: guestData,
//           isInitialized: true,
//         }));
//       } else if (storedUserData) {
//         // Restore previous session
//         setState((prev) => ({
//           ...prev,
//           userData: JSON.parse(storedUserData),
//           isInitialized: true,
//         }));
//       } else {
//         // No valid session found
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     } catch (error) {
//       console.error("Error initializing user data:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to initialize user data",
//       }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   useEffect(() => {
//     initializeUserData();
//   }, [isSignedIn]);

//   const updateUserData = async (data: Partial<UserData>) => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       if (!state.userData) throw new Error("No user data available");

//       const updatedData = {
//         ...state.userData,
//         ...data,
//         lastLogin: formatDateTime(),
//       };

//       await SecureStore.setItemAsync(
//         STORAGE_KEYS.USER_DATA,
//         JSON.stringify(updatedData)
//       );

//       setState((prev) => ({
//         ...prev,
//         userData: updatedData,
//       }));
//     } catch (error) {
//       console.error("Error updating user data:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to update user data",
//       }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const refreshUserData = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));
//       await initializeUserData();
//     } catch (error) {
//       console.error("Error refreshing user data:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to refresh user data",
//       }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const clearUserData = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       // Clear all user-related data from secure storage
//       await Promise.all(
//         Object.values(STORAGE_KEYS).map((key) =>
//           SecureStore.deleteItemAsync(key)
//         )
//       );

//       setState((prev) => ({
//         ...prev,
//         userData: null,
//         isInitialized: false,
//       }));
//     } catch (error) {
//       console.error("Error clearing user data:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to clear user data",
//       }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const signOutUser = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       // Clear all stored data
//       await clearUserData();

//       // Sign out from Clerk if signed in
//       if (isSignedIn) {
//         await signOut();
//       }

//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       console.error("Error signing out:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to sign out",
//       }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const setGuestMode = async (enabled: boolean) => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       if (enabled) {
//         const guestData: UserData = {
//           username: "Guest User",
//           email: "",
//           imageUrl: "",
//           lastLogin: formatDateTime(),
//           isGuestMode: true,
//         };

//         await Promise.all([
//           SecureStore.setItemAsync(STORAGE_KEYS.IS_GUEST_MODE, "true"),
//           SecureStore.setItemAsync(
//             STORAGE_KEYS.USER_DATA,
//             JSON.stringify(guestData)
//           ),
//         ]);

//         setState((prev) => ({
//           ...prev,
//           userData: guestData,
//           isInitialized: true,
//         }));

//         router.replace("/(root)/(tabs)");
//       } else {
//         await clearUserData();
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     } catch (error) {
//       console.error("Error setting guest mode:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to set guest mode",
//       }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const contextValue: UserContextValue = {
//     ...state,
//     updateUserData,
//     refreshUserData,
//     clearUserData,
//     signOutUser,
//     setGuestMode,
//     formatDateTime,
//   };

//   return (
//     <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
//   );
// };

// // Custom hook to use the UserContext
// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useUserContext must be used within a UserProvider");
//   }
//   return context;
// };

/******************************************** */

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import * as SecureStore from "expo-secure-store";
// import { router } from "expo-router";
// import axios from "axios";

// interface UserData {
//   username: string;
//   email: string;
//   imageUrl: string;
//   lastLogin: string;
//   isGuestMode: boolean;
// }

// interface UserContextState {
//   isLoading: boolean;
//   error: string | null;
//   userData: UserData | null;
//   isInitialized: boolean;
// }

// interface UserContextValue extends UserContextState {
//   updateUserData: (data: Partial<UserData>) => Promise<void>;
//   refreshUserData: () => Promise<void>;
//   clearUserData: () => Promise<void>;
//   signOutUser: () => Promise<void>;
//   setGuestMode: (enabled: boolean) => Promise<void>;
//   formatDateTime: (date?: Date) => string;
// }

// const UserContext = createContext<UserContextValue | undefined>(undefined);

// const STORAGE_KEYS = {
//   USER_DATA: "user_data",
//   IS_AUTHENTICATED: "isAuthenticated",
//   IS_GUEST_MODE: "isGuestMode",
//   LAST_LOGIN: "lastLogin",
//   SESSION_ID: "sessionId",
// } as const;

// const STRAPI_API_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const STRAPI_API_TOKEN = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN;

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { user, isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const [state, setState] = useState<UserContextState>({
//     isLoading: true,
//     error: null,
//     userData: null,
//     isInitialized: false,
//   });

//   const formatDateTime = (date: Date = new Date()): string => {
//     return date.toISOString().slice(0, 19).replace("T", " ");
//   };

//   const syncWithStrapi = async (userData: UserData) => {
//     try {
//       const response = await axios.post(
//         `${STRAPI_API_URL}/users`,
//         {
//           username: userData.username,
//           email: userData.email,
//           imageUrl: userData.imageUrl,
//         },
//         {
//           headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
//         }
//       );
//       console.log("User synced with Strapi:", response.data);
//     } catch (error) {
//       console.error("Error syncing with Strapi:", error);
//     }
//   };

//   const initializeUserData = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       const [storedUserData, isAuth, isGuest] = await Promise.all([
//         SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA),
//         SecureStore.getItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
//         SecureStore.getItemAsync(STORAGE_KEYS.IS_GUEST_MODE),
//       ]);

//       if (isAuth === "true" && isSignedIn && user) {
//         const userData: UserData = {
//           username: user.username || "User",
//           email: user.primaryEmailAddress?.emailAddress || "",
//           imageUrl: user.imageUrl || "",
//           lastLogin: formatDateTime(),
//           isGuestMode: false,
//         };

//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(userData)
//         );
//         await syncWithStrapi(userData);

//         setState((prev) => ({ ...prev, userData, isInitialized: true }));
//       } else if (isGuest === "true") {
//         const guestData: UserData = {
//           username: "Guest User",
//           email: "",
//           imageUrl: "",
//           lastLogin: formatDateTime(),
//           isGuestMode: true,
//         };

//         setState((prev) => ({
//           ...prev,
//           userData: guestData,
//           isInitialized: true,
//         }));
//       } else if (storedUserData) {
//         setState((prev) => ({
//           ...prev,
//           userData: JSON.parse(storedUserData),
//           isInitialized: true,
//         }));
//       } else {
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     } catch (error) {
//       console.error("Error initializing user data:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to initialize user data",
//       }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   useEffect(() => {
//     initializeUserData();
//   }, [isSignedIn]);

//   const updateUserData = async (data: Partial<UserData>) => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));
//       if (!state.userData) throw new Error("No user data available");

//       const updatedData = {
//         ...state.userData,
//         ...data,
//         lastLogin: formatDateTime(),
//       };
//       await SecureStore.setItemAsync(
//         STORAGE_KEYS.USER_DATA,
//         JSON.stringify(updatedData)
//       );
//       await syncWithStrapi(updatedData);
//       setState((prev) => ({ ...prev, userData: updatedData }));
//     } catch (error) {
//       console.error("Error updating user data:", error);
//       setState((prev) => ({ ...prev, error: "Failed to update user data" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const refreshUserData = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));
//       await initializeUserData();
//     } catch (error) {
//       console.error("Error refreshing user data:", error);
//       setState((prev) => ({ ...prev, error: "Failed to refresh user data" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const clearUserData = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));
//       await Promise.all(
//         Object.values(STORAGE_KEYS).map((key) =>
//           SecureStore.deleteItemAsync(key)
//         )
//       );
//       setState((prev) => ({ ...prev, userData: null, isInitialized: false }));
//     } catch (error) {
//       console.error("Error clearing user data:", error);
//       setState((prev) => ({ ...prev, error: "Failed to clear user data" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const signOutUser = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));
//       await clearUserData();
//       if (isSignedIn) {
//         await signOut();
//       }
//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       console.error("Error signing out:", error);
//       setState((prev) => ({ ...prev, error: "Failed to sign out" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const setGuestMode = async (enabled: boolean) => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));
//       if (enabled) {
//         const guestData: UserData = {
//           username: "Guest User",
//           email: "",
//           imageUrl: "",
//           lastLogin: formatDateTime(),
//           isGuestMode: true,
//         };
//         await SecureStore.setItemAsync(STORAGE_KEYS.IS_GUEST_MODE, "true");
//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(guestData)
//         );
//         setState((prev) => ({
//           ...prev,
//           userData: guestData,
//           isInitialized: true,
//         }));
//         router.replace("/(root)/(tabs)");
//       } else {
//         await clearUserData();
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     } catch (error) {
//       console.error("Error setting guest mode:", error);
//       setState((prev) => ({ ...prev, error: "Failed to set guest mode" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const contextValue: UserContextValue = {
//     ...state,
//     updateUserData,
//     refreshUserData,
//     clearUserData,
//     signOutUser,
//     setGuestMode,
//     formatDateTime,
//   };

//   return (
//     <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useUserContext must be used within a UserProvider");
//   }
//   return context;
// };

/************************************************* */

// // UserContext.tsx

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useMemo,
// } from "react";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import * as SecureStore from "expo-secure-store";
// import { router } from "expo-router";

// interface UserData {
//   id: string;
//   username: string;
//   email: string;
//   imageUrl: string;
//   lastLogin: string;
//   isGuestMode: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// interface UserContextState {
//   isLoading: boolean;
//   error: string | null;
//   userData: UserData | null;
//   isInitialized: boolean;
// }

// interface UserContextValue extends UserContextState {
//   updateUserData: (data: Partial<UserData>) => Promise<void>;
//   refreshUserData: () => Promise<void>;
//   clearUserData: () => Promise<void>;
//   signOutUser: () => Promise<void>;
//   setGuestMode: (enabled: boolean) => Promise<void>;
//   formatDateTime: (date?: Date) => string;
// }

// const UserContext = createContext<UserContextValue | undefined>(undefined);

// const STORAGE_KEYS = {
//   USER_DATA: "user_data",
//   IS_AUTHENTICATED: "isAuthenticated",
//   IS_GUEST_MODE: "isGuestMode",
//   LAST_LOGIN: "lastLogin",
//   SESSION_ID: "sessionId",
// } as const;

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { user, isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const [state, setState] = useState<UserContextState>({
//     isLoading: false,
//     error: null,
//     userData: null,
//     isInitialized: false,
//   });

//   const formatDateTime = (date: Date = new Date()): string => {
//     return date.toISOString().slice(0, 19).replace("T", " ");
//   };

//   const initializeUserData = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       const [storedUserData, isAuth, isGuest] = await Promise.all([
//         SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA),
//         SecureStore.getItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
//         SecureStore.getItemAsync(STORAGE_KEYS.IS_GUEST_MODE),
//       ]);

//       if (isAuth === "true" && isSignedIn && user) {
//         const userData: UserData = {
//           id: user.id,
//           username: user.username || "User",
//           email: user.primaryEmailAddress?.emailAddress || "",
//           imageUrl: user.imageUrl || "",
//           lastLogin: formatDateTime(),
//           isGuestMode: false,
//           createdAt: formatDateTime(),
//           updatedAt: formatDateTime(),
//         };

//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(userData)
//         );

//         setState((prev) => ({
//           ...prev,
//           userData,
//           isInitialized: true,
//         }));

//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.LAST_LOGIN,
//           formatDateTime()
//         );
//       } else if (isGuest === "true") {
//         const guestData: UserData = {
//           id: `guest_${Date.now()}`,
//           username: "Guest User",
//           email: "",
//           imageUrl: "",
//           lastLogin: formatDateTime(),
//           isGuestMode: true,
//           createdAt: formatDateTime(),
//           updatedAt: formatDateTime(),
//         };

//         setState((prev) => ({
//           ...prev,
//           userData: guestData,
//           isInitialized: true,
//         }));
//       } else if (storedUserData) {
//         setState((prev) => ({
//           ...prev,
//           userData: JSON.parse(storedUserData),
//           isInitialized: true,
//         }));
//       } else {
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     } catch (error) {
//       console.error("User data initialization error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to initialize user data",
//       }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   useEffect(() => {
//     let mounted = true;

//     const initialize = async () => {
//       if (mounted) {
//         await initializeUserData();
//       }
//     };

//     initialize();

//     return () => {
//       mounted = false;
//     };
//   }, [isSignedIn]);

//   const updateUserData = async (data: Partial<UserData>) => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       if (!state.userData) throw new Error("No user data available");

//       const updatedData = {
//         ...state.userData,
//         ...data,
//         updatedAt: formatDateTime(),
//       };

//       await SecureStore.setItemAsync(
//         STORAGE_KEYS.USER_DATA,
//         JSON.stringify(updatedData)
//       );

//       setState((prev) => ({
//         ...prev,
//         userData: updatedData,
//       }));
//     } catch (error) {
//       console.error("User data update error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to update user data",
//       }));
//       throw error;
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   // Continuation of UserContext.tsx

//   const refreshUserData = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       // If user is signed in, sync with Clerk data
//       if (isSignedIn && user) {
//         const updatedData: UserData = {
//           ...state.userData!,
//           username: user.username || state.userData?.username || "User",
//           email:
//             user.primaryEmailAddress?.emailAddress ||
//             state.userData?.email ||
//             "",
//           imageUrl: user.imageUrl || state.userData?.imageUrl || "",
//           lastLogin: formatDateTime(new Date("2025-03-01 12:23:25")), // Using provided UTC time
//           updatedAt: formatDateTime(new Date("2025-03-01 12:23:25")),
//         };

//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(updatedData)
//         );

//         setState((prev) => ({
//           ...prev,
//           userData: updatedData,
//         }));
//       } else {
//         await initializeUserData();
//       }
//     } catch (error) {
//       console.error("Data refresh error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to refresh user data",
//       }));
//       throw error;
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const clearUserData = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       // Clear all user-related data from secure storage
//       await Promise.all(
//         Object.values(STORAGE_KEYS).map((key) =>
//           SecureStore.deleteItemAsync(key)
//         )
//       );

//       setState((prev) => ({
//         ...prev,
//         userData: null,
//         isInitialized: false,
//       }));
//     } catch (error) {
//       console.error("Data clearing error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to clear user data",
//       }));
//       throw error;
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const signOutUser = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       // Store last login time before clearing data
//       const lastLoginTime = formatDateTime(new Date("2025-03-01 12:23:25"));
//       await SecureStore.setItemAsync(STORAGE_KEYS.LAST_LOGIN, lastLoginTime);

//       // Clear all stored data
//       await clearUserData();

//       // Sign out from Clerk if signed in
//       if (isSignedIn) {
//         await signOut();
//       }

//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       console.error("Sign out error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to sign out",
//       }));
//       throw error;
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const setGuestMode = async (enabled: boolean) => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       if (enabled) {
//         const guestData: UserData = {
//           id: `guest_${Date.now()}`,
//           username: "Guest User",
//           email: "",
//           imageUrl: "",
//           lastLogin: formatDateTime(new Date("2025-03-01 12:23:25")),
//           isGuestMode: true,
//           createdAt: formatDateTime(new Date("2025-03-01 12:23:25")),
//           updatedAt: formatDateTime(new Date("2025-03-01 12:23:25")),
//         };

//         await Promise.all([
//           SecureStore.setItemAsync(STORAGE_KEYS.IS_GUEST_MODE, "true"),
//           SecureStore.setItemAsync(
//             STORAGE_KEYS.USER_DATA,
//             JSON.stringify(guestData)
//           ),
//         ]);

//         setState((prev) => ({
//           ...prev,
//           userData: guestData,
//           isInitialized: true,
//         }));

//         router.replace("/(root)/(tabs)");
//       } else {
//         await clearUserData();
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     } catch (error) {
//       console.error("Guest mode error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to set guest mode",
//       }));
//       throw error;
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   // Memoize context value to prevent unnecessary re-renders
//   const contextValue = useMemo<UserContextValue>(
//     () => ({
//       ...state,
//       updateUserData,
//       refreshUserData,
//       clearUserData,
//       signOutUser,
//       setGuestMode,
//       formatDateTime,
//     }),
//     [state]
//   );

//   return (
//     <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
//   );
// };

// // Custom hook with type checking
// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useUserContext must be used within a UserProvider");
//   }
//   return context;
// };

// // Helper hook for guest mode
// export const useIsGuest = () => {
//   const { userData } = useUserContext();
//   return userData?.isGuestMode ?? false;
// };

// // Helper hook for authentication status
// export const useIsAuthenticated = () => {
//   const { userData, isInitialized } = useUserContext();
//   return {
//     isAuthenticated: Boolean(userData && !userData.isGuestMode),
//     isInitialized,
//   };
// };

/*****************************************/

// // UserContext.tsx

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useMemo,
// } from "react";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import * as SecureStore from "expo-secure-store";
// import { router } from "expo-router";

// const CURRENT_UTC = "2025-03-01 12:43:37";
// const CURRENT_USER = "MohamedAbbas004";

// interface UserData {
//   id: string;
//   username: string;
//   email: string;
//   imageUrl: string;
//   lastLogin: string;
//   isGuestMode: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// interface UserContextState {
//   isLoading: boolean;
//   error: string | null;
//   userData: UserData | null;
//   isInitialized: boolean;
// }

// interface UserContextValue extends UserContextState {
//   updateUserData: (data: Partial<UserData>) => Promise<void>;
//   refreshUserData: () => Promise<void>;
//   clearUserData: () => Promise<void>;
//   signOutUser: () => Promise<void>;
//   setGuestMode: (enabled: boolean) => Promise<void>;
//   formatDateTime: (date?: Date) => string;
//   checkAuthStatus: () => Promise<boolean>;
// }

// const UserContext = createContext<UserContextValue | undefined>(undefined);

// const STORAGE_KEYS = {
//   USER_DATA: "user_data",
//   IS_AUTHENTICATED: "isAuthenticated",
//   IS_GUEST_MODE: "isGuestMode",
//   LAST_LOGIN: "lastLogin",
//   SESSION_ID: "sessionId",
// } as const;

// const clearSecureStorage = async () => {
//   try {
//     const deletePromises = Object.values(STORAGE_KEYS).map((key) =>
//       SecureStore.deleteItemAsync(key)
//     );
//     await Promise.all(deletePromises);
//     return true;
//   } catch (error) {
//     console.error("Storage clear error:", error);
//     return false;
//   }
// };

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { user, isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const [state, setState] = useState<UserContextState>({
//     isLoading: false,
//     error: null,
//     userData: null,
//     isInitialized: false,
//   });

//   const formatDateTime = (date: Date = new Date()): string => {
//     return CURRENT_UTC;
//   };

//   const checkAuthStatus = async () => {
//     try {
//       const [isAuth, userData] = await Promise.all([
//         SecureStore.getItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
//         SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA),
//       ]);

//       if (isAuth !== "true" || !userData) {
//         await clearSecureStorage();
//         setState((prev) => ({
//           ...prev,
//           userData: null,
//           isInitialized: false,
//         }));
//         return false;
//       }

//       return true;
//     } catch (error) {
//       await clearSecureStorage();
//       return false;
//     }
//   };

//   const initializeUserData = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       const isValidAuth = await checkAuthStatus();
//       if (!isValidAuth && !isSignedIn) {
//         router.replace("/(root)/(auth)/sign-in");
//         return;
//       }

//       if (isSignedIn && user) {
//         const userData: UserData = {
//           id: user.id,
//           username: user.username || CURRENT_USER,
//           email: user.primaryEmailAddress?.emailAddress || "",
//           imageUrl: user.imageUrl || "",
//           lastLogin: CURRENT_UTC,
//           isGuestMode: false,
//           createdAt: CURRENT_UTC,
//           updatedAt: CURRENT_UTC,
//         };

//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(userData)
//         );

//         await SecureStore.setItemAsync(STORAGE_KEYS.IS_AUTHENTICATED, "true");

//         setState((prev) => ({
//           ...prev,
//           userData,
//           isInitialized: true,
//         }));
//       }
//     } catch (error) {
//       await clearSecureStorage();
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to initialize user data",
//       }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   useEffect(() => {
//     let mounted = true;

//     const initialize = async () => {
//       if (mounted) {
//         await initializeUserData();
//       }
//     };

//     initialize();

//     return () => {
//       mounted = false;
//     };
//   }, [isSignedIn]);

//   const updateUserData = async (data: Partial<UserData>) => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       if (!state.userData) throw new Error("No user data available");

//       const updatedData = {
//         ...state.userData,
//         ...data,
//         updatedAt: CURRENT_UTC,
//       };

//       await SecureStore.setItemAsync(
//         STORAGE_KEYS.USER_DATA,
//         JSON.stringify(updatedData)
//       );

//       setState((prev) => ({
//         ...prev,
//         userData: updatedData,
//       }));
//     } catch (error) {
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to update user data",
//       }));
//       throw error;
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const refreshUserData = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       if (isSignedIn && user) {
//         const updatedData: UserData = {
//           ...state.userData!,
//           username: user.username || state.userData?.username || CURRENT_USER,
//           email:
//             user.primaryEmailAddress?.emailAddress ||
//             state.userData?.email ||
//             "",
//           imageUrl: user.imageUrl || state.userData?.imageUrl || "",
//           lastLogin: CURRENT_UTC,
//           updatedAt: CURRENT_UTC,
//         };

//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(updatedData)
//         );

//         setState((prev) => ({
//           ...prev,
//           userData: updatedData,
//         }));
//       } else {
//         await initializeUserData();
//       }
//     } catch (error) {
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to refresh user data",
//       }));
//       throw error;
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const clearUserData = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));
//       await clearSecureStorage();
//       setState((prev) => ({
//         ...prev,
//         userData: null,
//         isInitialized: false,
//       }));
//     } catch (error) {
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to clear user data",
//       }));
//       throw error;
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const signOutUser = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));
//       await SecureStore.setItemAsync(STORAGE_KEYS.LAST_LOGIN, CURRENT_UTC);
//       await clearSecureStorage();

//       if (isSignedIn) {
//         await signOut();
//       }

//       setState((prev) => ({
//         ...prev,
//         userData: null,
//         isInitialized: false,
//       }));

//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to sign out",
//       }));
//       throw error;
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const setGuestMode = async (enabled: boolean) => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       if (enabled) {
//         const guestData: UserData = {
//           id: `guest_${Date.now()}`,
//           username: "Guest User",
//           email: "",
//           imageUrl: "",
//           lastLogin: CURRENT_UTC,
//           isGuestMode: true,
//           createdAt: CURRENT_UTC,
//           updatedAt: CURRENT_UTC,
//         };

//         await Promise.all([
//           SecureStore.setItemAsync(STORAGE_KEYS.IS_GUEST_MODE, "true"),
//           SecureStore.setItemAsync(
//             STORAGE_KEYS.USER_DATA,
//             JSON.stringify(guestData)
//           ),
//         ]);

//         setState((prev) => ({
//           ...prev,
//           userData: guestData,
//           isInitialized: true,
//         }));

//         router.replace("/(root)/(tabs)");
//       } else {
//         await clearUserData();
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     } catch (error) {
//       setState((prev) => ({
//         ...prev,
//         error: "Failed to set guest mode",
//       }));
//       throw error;
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const contextValue = useMemo<UserContextValue>(
//     () => ({
//       ...state,
//       updateUserData,
//       refreshUserData,
//       clearUserData,
//       signOutUser,
//       setGuestMode,
//       formatDateTime,
//       checkAuthStatus,
//     }),
//     [state]
//   );

//   return (
//     <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useUserContext must be used within a UserProvider");
//   }
//   return context;
// };

// export const useIsGuest = () => {
//   const { userData } = useUserContext();
//   return userData?.isGuestMode ?? false;
// };

// export const useIsAuthenticated = () => {
//   const { userData, isInitialized } = useUserContext();
//   return {
//     isAuthenticated: Boolean(userData && !userData.isGuestMode),
//     isInitialized,
//   };
// };

/************************************** */

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useMemo,
// } from "react";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import * as SecureStore from "expo-secure-store";
// import { router } from "expo-router";
// import axios from "axios";

// interface UserData {
//   id: string;
//   username: string;
//   email: string;
//   imageUrl: string;
//   lastLogin: string;
//   isGuestMode: boolean;
// }

// interface UserContextState {
//   isLoading: boolean;
//   error: string | null;
//   userData: UserData | null;
//   isInitialized: boolean;
// }

// interface UserContextValue extends UserContextState {
//   updateUserData: (data: Partial<UserData>) => Promise<void>;
//   refreshUserData: () => Promise<void>;
//   clearUserData: () => Promise<void>;
//   signOutUser: () => Promise<void>;
//   setGuestMode: (enabled: boolean) => Promise<void>;
//   formatDateTime: (date?: Date) => string;
// }

// const UserContext = createContext<UserContextValue | undefined>(undefined);

// const STORAGE_KEYS = {
//   USER_DATA: "user_data",
//   IS_AUTHENTICATED: "isAuthenticated",
//   IS_GUEST_MODE: "isGuestMode",
// } as const;

// const STRAPI_API_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const STRAPI_API_TOKEN = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN;

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { user, isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const [state, setState] = useState<UserContextState>({
//     isLoading: true,
//     error: null,
//     userData: null,
//     isInitialized: false,
//   });

//   const formatDateTime = (date: Date = new Date()): string => {
//     return date.toISOString().slice(0, 19).replace("T", " ");
//   };

//   const syncWithStrapi = async (userData: UserData) => {
//     const config = { headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` } };
//     const response = await axios.get(
//       `${STRAPI_API_URL}/users?filters[email][$eq]=${encodeURIComponent(
//         userData.email
//       )}`,
//       config
//     );

//     if (response.data.length > 0) {
//       const existingUser = response.data[0];
//       return {
//         ...userData,
//         username: existingUser.username,
//         imageUrl: existingUser.imageUrl,
//       };
//     }

//     await axios.post(`${STRAPI_API_URL}/users`, userData, config);
//     return userData;
//   };

//   const initializeUserData = async () => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       const [isAuth, isGuest, storedData] = await Promise.all([
//         SecureStore.getItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
//         SecureStore.getItemAsync(STORAGE_KEYS.IS_GUEST_MODE),
//         SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA),
//       ]);

//       if (isSignedIn && user && isAuth === "true") {
//         const userData: UserData = {
//           id: user.id,
//           username: user.username || "User",
//           email: user.primaryEmailAddress?.emailAddress || "",
//           imageUrl: user.imageUrl || "",
//           lastLogin: formatDateTime(),
//           isGuestMode: false,
//         };
//         const syncedData = await syncWithStrapi(userData);
//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(syncedData)
//         );
//         setState((prev) => ({
//           ...prev,
//           userData: syncedData,
//           isInitialized: true,
//         }));
//         router.replace("/(root)/(tabs)");
//       } else if (isGuest === "true" && storedData) {
//         const guestData: UserData = JSON.parse(storedData);
//         setState((prev) => ({
//           ...prev,
//           userData: guestData,
//           isInitialized: true,
//         }));
//         router.replace("/(root)/(tabs)");
//       } else {
//         await clearUserData();
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     } catch (error) {
//       setState((prev) => ({ ...prev, error: "Initialization failed" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   useEffect(() => {
//     initializeUserData();
//   }, [isSignedIn]);

//   const updateUserData = async (data: Partial<UserData>) => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       if (!state.userData) throw new Error("No user data");
//       const updatedData = { ...state.userData, ...data };
//       if (!updatedData.isGuestMode) await syncWithStrapi(updatedData);
//       await SecureStore.setItemAsync(
//         STORAGE_KEYS.USER_DATA,
//         JSON.stringify(updatedData)
//       );
//       setState((prev) => ({ ...prev, userData: updatedData }));
//     } catch (error) {
//       setState((prev) => ({ ...prev, error: "Update failed" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const refreshUserData = async () => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       if (isSignedIn && user) {
//         const updatedData = await syncWithStrapi(
//           state.userData || {
//             id: user.id,
//             username: user.username || "User",
//             email: user.primaryEmailAddress?.emailAddress || "",
//             imageUrl: user.imageUrl || "",
//             lastLogin: formatDateTime(),
//             isGuestMode: false,
//           }
//         );
//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(updatedData)
//         );
//         setState((prev) => ({ ...prev, userData: updatedData }));
//       }
//     } catch (error) {
//       setState((prev) => ({ ...prev, error: "Refresh failed" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const clearUserData = async () => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       await Promise.all([
//         SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA),
//         SecureStore.deleteItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
//         SecureStore.deleteItemAsync(STORAGE_KEYS.IS_GUEST_MODE),
//       ]);
//       setState((prev) => ({ ...prev, userData: null, isInitialized: false }));
//     } catch (error) {
//       setState((prev) => ({ ...prev, error: "Clear failed" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const signOutUser = async () => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       await clearUserData();
//       if (isSignedIn) await signOut();
//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       setState((prev) => ({ ...prev, error: "Sign-out failed" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const setGuestMode = async (enabled: boolean) => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       if (enabled) {
//         const guestData: UserData = {
//           id: `guest_${Date.now()}`,
//           username: "Guest User",
//           email: "",
//           imageUrl: "",
//           lastLogin: formatDateTime(),
//           isGuestMode: true,
//         };
//         await Promise.all([
//           SecureStore.setItemAsync(STORAGE_KEYS.IS_GUEST_MODE, "true"),
//           SecureStore.setItemAsync(
//             STORAGE_KEYS.USER_DATA,
//             JSON.stringify(guestData)
//           ),
//           SecureStore.deleteItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
//         ]);
//         setState((prev) => ({
//           ...prev,
//           userData: guestData,
//           isInitialized: true,
//         }));
//         router.replace("/(root)/(tabs)");
//       } else {
//         await clearUserData();
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     } catch (error) {
//       setState((prev) => ({ ...prev, error: "Guest mode failed" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const contextValue = useMemo<UserContextValue>(
//     () => ({
//       ...state,
//       updateUserData,
//       refreshUserData,
//       clearUserData,
//       signOutUser,
//       setGuestMode,
//       formatDateTime,
//     }),
//     [state]
//   );

//   return (
//     <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context)
//     throw new Error("useUserContext must be used within a UserProvider");
//   return context;
// };

/*********************************** */

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useMemo,
// } from "react";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import * as SecureStore from "expo-secure-store";
// import { router } from "expo-router";
// import axios from "axios";

// interface UserData {
//   id: string;
//   username: string;
//   email: string;
//   imageUrl: string;
//   lastLogin: string;
//   isGuestMode: boolean;
//   documentId?: string;
// }

// interface UserContextState {
//   isLoading: boolean;
//   error: string | null;
//   userData: UserData | null;
//   isInitialized: boolean;
// }

// interface UserContextValue extends UserContextState {
//   updateUserData: (data: Partial<UserData>) => Promise<void>;
//   refreshUserData: () => Promise<void>;
//   clearUserData: () => Promise<void>;
//   signOutUser: () => Promise<void>;
//   setGuestMode: (enabled: boolean) => Promise<void>;
//   uploadImage: (file: File) => Promise<string | null>;
//   formatDateTime: (date?: Date) => string;
// }

// const UserContext = createContext<UserContextValue | undefined>(undefined);

// const STORAGE_KEYS = {
//   USER_DATA: "user_data",
//   IS_AUTHENTICATED: "isAuthenticated",
//   IS_GUEST_MODE: "isGuestMode",
// } as const;

// const STRAPI_API_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const STRAPI_API_TOKEN_USER = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER;

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { user, isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const [state, setState] = useState<UserContextState>({
//     isLoading: true,
//     error: null,
//     userData: null,
//     isInitialized: false,
//   });

//   const formatDateTime = (date: Date = new Date()): string => {
//     return date.toISOString().slice(0, 19).replace("T", " ");
//   };

//   const getAxiosConfig = () => ({
//     headers: {
//       Authorization: `Bearer ${STRAPI_API_TOKEN_USER}`,
//       "Content-Type": "application/json",
//     },
//   });

//   const syncWithStrapi = async (userData: UserData): Promise<UserData> => {
//     const config = getAxiosConfig();
//     try {
//       // Check if user exists by email
//       const response = await axios.get(
//         `${STRAPI_API_URL}/api/auths?filters[Email][$eq]=${encodeURIComponent(
//           userData.email
//         )}`,
//         config
//       );

//       if (response.data.data.length > 0) {
//         // User exists, update it
//         const existingUser = response.data.data[0];
//         const updatePayload = {
//           data: {
//             Username: userData.username,
//             ProfileIMG: userData.imageUrl,
//           },
//         };
//         const updateResponse = await axios.put(
//           `${STRAPI_API_URL}/api/auths/${existingUser.documentId}`,
//           updatePayload,
//           config
//         );
//         const updatedData = updateResponse.data.data;
//         return {
//           id: updatedData.id.toString(),
//           username: updatedData.Username,
//           email: updatedData.Email,
//           imageUrl: updatedData.ProfileIMG,
//           lastLogin: formatDateTime(),
//           isGuestMode: false,
//           documentId: updatedData.documentId,
//         };
//       } else {
//         // User doesn't exist, create it
//         const createPayload = {
//           data: {
//             Username: userData.username,
//             Email: userData.email,
//             ProfileIMG: userData.imageUrl,
//           },
//         };
//         const createResponse = await axios.post(
//           `${STRAPI_API_URL}/api/auths`,
//           createPayload,
//           config
//         );
//         const createdData = createResponse.data.data;
//         return {
//           id: createdData.id.toString(),
//           username: createdData.Username,
//           email: createdData.Email,
//           imageUrl: createdData.ProfileIMG,
//           lastLogin: formatDateTime(),
//           isGuestMode: false,
//           documentId: createdData.documentId,
//         };
//       }
//     } catch (error) {
//       console.error("Error syncing with Strapi:", error);
//       throw new Error("Failed to sync user with Strapi");
//     }
//   };

//   const uploadImage = async (file: File): Promise<string | null> => {
//     const formData = new FormData();
//     formData.append("files", file);
//     const config = {
//       headers: {
//         Authorization: `Bearer ${STRAPI_API_TOKEN_USER}`,
//         "Content-Type": "multipart/form-data",
//       },
//     };
//     try {
//       const response = await axios.post(
//         `${STRAPI_API_URL}/api/upload`,
//         formData,
//         config
//       );
//       const uploadedImageUrl = response.data[0]?.url;
//       return uploadedImageUrl || null;
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       setState((prev) => ({ ...prev, error: "Image upload failed" }));
//       return null;
//     }
//   };

//   const initializeUserData = async () => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       const [isAuth, isGuest, storedData] = await Promise.all([
//         SecureStore.getItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
//         SecureStore.getItemAsync(STORAGE_KEYS.IS_GUEST_MODE),
//         SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA),
//       ]);

//       if (isSignedIn && user && isAuth === "true") {
//         const userData: UserData = {
//           id: user.id,
//           username: user.username || "User",
//           email: user.primaryEmailAddress?.emailAddress || "",
//           imageUrl: user.imageUrl || "",
//           lastLogin: formatDateTime(),
//           isGuestMode: false,
//         };
//         const syncedData = await syncWithStrapi(userData);
//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(syncedData)
//         );
//         await SecureStore.setItemAsync(STORAGE_KEYS.IS_AUTHENTICATED, "true");
//         setState((prev) => ({
//           ...prev,
//           userData: syncedData,
//           isInitialized: true,
//         }));
//         router.replace("/(root)/(tabs)");
//       } else if (isGuest === "true" && storedData) {
//         const guestData: UserData = JSON.parse(storedData);
//         setState((prev) => ({
//           ...prev,
//           userData: guestData,
//           isInitialized: true,
//         }));
//         router.replace("/(root)/(tabs)");
//       } else {
//         await clearUserData();
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     } catch (error) {
//       setState((prev) => ({ ...prev, error: "Initialization failed" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   useEffect(() => {
//     initializeUserData();
//   }, [isSignedIn]);

//   const updateUserData = async (data: Partial<UserData>) => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       if (!state.userData) throw new Error("No user data available");
//       const updatedData = { ...state.userData, ...data };
//       if (!updatedData.isGuestMode && updatedData.documentId) {
//         const syncedData = await syncWithStrapi(updatedData);
//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(syncedData)
//         );
//         setState((prev) => ({ ...prev, userData: syncedData }));
//       } else {
//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(updatedData)
//         );
//         setState((prev) => ({ ...prev, userData: updatedData }));
//       }
//     } catch (error) {
//       setState((prev) => ({ ...prev, error: "Update failed" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const refreshUserData = async () => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       if (isSignedIn && user) {
//         const userData: UserData = {
//           id: user.id,
//           username: user.username || "User",
//           email: user.primaryEmailAddress?.emailAddress || "",
//           imageUrl: user.imageUrl || "",
//           lastLogin: formatDateTime(),
//           isGuestMode: false,
//         };
//         const syncedData = await syncWithStrapi(userData);
//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(syncedData)
//         );
//         setState((prev) => ({ ...prev, userData: syncedData }));
//       }
//     } catch (error) {
//       setState((prev) => ({ ...prev, error: "Refresh failed" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const clearUserData = async () => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       await Promise.all([
//         SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA),
//         SecureStore.deleteItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
//         SecureStore.deleteItemAsync(STORAGE_KEYS.IS_GUEST_MODE),
//       ]);
//       setState((prev) => ({ ...prev, userData: null, isInitialized: false }));
//     } catch (error) {
//       setState((prev) => ({ ...prev, error: "Clear failed" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const signOutUser = async () => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       await clearUserData();
//       if (isSignedIn) await signOut();
//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       setState((prev) => ({ ...prev, error: "Sign-out failed" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const setGuestMode = async (enabled: boolean) => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       if (enabled) {
//         const guestData: UserData = {
//           id: `guest_${Date.now()}`,
//           username: "Guest User",
//           email: "",
//           imageUrl: "",
//           lastLogin: formatDateTime(),
//           isGuestMode: true,
//         };
//         await Promise.all([
//           SecureStore.setItemAsync(STORAGE_KEYS.IS_GUEST_MODE, "true"),
//           SecureStore.setItemAsync(
//             STORAGE_KEYS.USER_DATA,
//             JSON.stringify(guestData)
//           ),
//           SecureStore.deleteItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
//         ]);
//         setState((prev) => ({
//           ...prev,
//           userData: guestData,
//           isInitialized: true,
//         }));
//         router.replace("/(root)/(tabs)");
//       } else {
//         await clearUserData();
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     } catch (error) {
//       setState((prev) => ({ ...prev, error: "Guest mode failed" }));
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const contextValue = useMemo<UserContextValue>(
//     () => ({
//       ...state,
//       updateUserData,
//       refreshUserData,
//       clearUserData,
//       signOutUser,
//       setGuestMode,
//       uploadImage,
//       formatDateTime,
//     }),
//     [state]
//   );

//   return (
//     <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context)
//     throw new Error("useUserContext must be used within a UserProvider");
//   return context;
// };

/**************************************** */

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useMemo,
// } from "react";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import * as SecureStore from "expo-secure-store";
// import { router } from "expo-router";
// import axios from "axios";
// import { Toast } from "react-native-toast-message/lib/src/Toast";

// interface UserData {
//   id: string;
//   username: string;
//   email: string;
//   imageUrl: string;
//   lastLogin: string;
//   isGuestMode: boolean;
//   documentId?: string;
// }

// interface UserContextState {
//   isLoading: boolean;
//   error: string | null;
//   userData: UserData | null;
//   isInitialized: boolean;
// }

// interface UserContextValue extends UserContextState {
//   updateUserData: (data: Partial<UserData>) => Promise<void>;
//   refreshUserData: () => Promise<void>;
//   clearUserData: () => Promise<void>;
//   signOutUser: () => Promise<void>;
//   setGuestMode: (enabled: boolean) => Promise<void>;
//   uploadImage: (file: File) => Promise<string | null>;
//   formatDateTime: (date?: Date) => string;
// }

// const UserContext = createContext<UserContextValue | undefined>(undefined);

// const STORAGE_KEYS = {
//   USER_DATA: "user_data",
//   IS_AUTHENTICATED: "isAuthenticated",
//   IS_GUEST_MODE: "isGuestMode",
// } as const;

// const STRAPI_API_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const STRAPI_API_TOKEN_USER = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER;

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { user, isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const [state, setState] = useState<UserContextState>({
//     isLoading: true,
//     error: null,
//     userData: null,
//     isInitialized: false,
//   });

//   const formatDateTime = (date: Date = new Date()): string => {
//     return date.toISOString().slice(0, 19).replace("T", " ");
//   };

//   const getAxiosConfig = () => ({
//     headers: {
//       Authorization: `Bearer ${STRAPI_API_TOKEN_USER}`,
//       "Content-Type": "application/json",
//     },
//   });

//   const getUserFromStrapi = async (email: string): Promise<UserData | null> => {
//     const config = getAxiosConfig();
//     try {
//       const response = await axios.get(
//         `${STRAPI_API_URL}/api/auths?filters[Email][$eq]=${encodeURIComponent(
//           email
//         )}`,
//         config
//       );

//       if (response.data.data.length > 0) {
//         const userData = response.data.data[0];
//         return {
//           id: userData.id.toString(),
//           username: userData.Username,
//           email: userData.Email,
//           imageUrl: userData.ProfileIMG || "",
//           lastLogin: formatDateTime(),
//           isGuestMode: false,
//           documentId: userData.documentId,
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error("Error fetching user from Strapi:", error);
//       return null;
//     }
//   };

//   const syncWithStrapi = async (userData: UserData): Promise<UserData> => {
//     const config = getAxiosConfig();
//     try {
//       // Check if user exists in Strapi by email
//       const existingUser = await getUserFromStrapi(userData.email);

//       if (existingUser) {
//         // User exists, update only if needed
//         const updatePayload = {
//           data: {
//             Username: userData.username,
//             ProfileIMG: userData.imageUrl,
//           },
//         };

//         const updateResponse = await axios.put(
//           `${STRAPI_API_URL}/api/auths/${existingUser.documentId}`,
//           updatePayload,
//           config
//         );

//         const updatedData = updateResponse.data.data;
//         return {
//           id: userData.id, // Keep the Clerk ID
//           username: updatedData.Username,
//           email: updatedData.Email,
//           imageUrl: updatedData.ProfileIMG || "",
//           lastLogin: formatDateTime(),
//           isGuestMode: false,
//           documentId: updatedData.documentId,
//         };
//       } else {
//         // User doesn't exist, create it
//         const createPayload = {
//           data: {
//             Username: userData.username,
//             Email: userData.email,
//             ProfileIMG: userData.imageUrl || "",
//           },
//         };

//         const createResponse = await axios.post(
//           `${STRAPI_API_URL}/api/auths`,
//           createPayload,
//           config
//         );

//         const createdData = createResponse.data.data;
//         return {
//           id: userData.id, // Keep the Clerk ID
//           username: createdData.Username,
//           email: createdData.Email,
//           imageUrl: createdData.ProfileIMG || "",
//           lastLogin: formatDateTime(),
//           isGuestMode: false,
//           documentId: createdData.documentId,
//         };
//       }
//     } catch (error) {
//       console.error("Error syncing with Strapi:", error);
//       Toast.show({
//         type: "error",
//         text1: "Sync Error",
//         text2: "Failed to sync user with backend",
//       });
//       // Return original data if sync fails
//       return userData;
//     }
//   };

//   const uploadImage = async (file: File): Promise<string | null> => {
//     if (!STRAPI_API_URL || !STRAPI_API_TOKEN_USER) {
//       Toast.show({
//         type: "error",
//         text1: "Upload Error",
//         text2: "API configuration missing",
//       });
//       return null;
//     }

//     const formData = new FormData();
//     formData.append("files", file);

//     try {
//       const response = await axios.post(
//         `${STRAPI_API_URL}/api/upload`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${STRAPI_API_TOKEN_USER}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.data && response.data.length > 0) {
//         Toast.show({
//           type: "success",
//           text1: "Upload Successful",
//         });
//         return response.data[0]?.url || null;
//       }
//       return null;
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       Toast.show({
//         type: "error",
//         text1: "Upload Failed",
//         text2: "Could not upload image",
//       });
//       return null;
//     }
//   };

//   const initializeUserData = async () => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       const [isAuth, isGuest, storedData] = await Promise.all([
//         SecureStore.getItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
//         SecureStore.getItemAsync(STORAGE_KEYS.IS_GUEST_MODE),
//         SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA),
//       ]);

//       if (isSignedIn && user) {
//         // User is signed in with Clerk
//         Toast.show({
//           type: "info",
//           text1: "Syncing account...",
//           visibilityTime: 2000,
//         });

//         const email = user.primaryEmailAddress?.emailAddress || "";

//         // First check if we already have this user in Strapi
//         const existingUser = await getUserFromStrapi(email);

//         let userData: UserData;

//         if (existingUser) {
//           // Use existing data from Strapi but keep Clerk ID
//           userData = {
//             ...existingUser,
//             id: user.id,
//             lastLogin: formatDateTime(),
//           };
//         } else {
//           // Create new user data
//           userData = {
//             id: user.id,
//             username: user.username || user.firstName || "User",
//             email: email,
//             imageUrl: user.imageUrl || "",
//             lastLogin: formatDateTime(),
//             isGuestMode: false,
//           };

//           // Sync with Strapi
//           userData = await syncWithStrapi(userData);
//         }

//         // Save to secure storage
//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(userData)
//         );
//         await SecureStore.setItemAsync(STORAGE_KEYS.IS_AUTHENTICATED, "true");
//         await SecureStore.setItemAsync(STORAGE_KEYS.IS_GUEST_MODE, "false");

//         setState((prev) => ({
//           ...prev,
//           userData: userData,
//           isInitialized: true,
//           isLoading: false,
//         }));

//         Toast.show({
//           type: "success",
//           text1: "Welcome back!",
//           text2: `Hello, ${userData.username}`,
//         });

//         router.replace("/(root)/(tabs)");
//       } else if (isGuest === "true" && storedData) {
//         // Guest mode is active
//         const guestData: UserData = JSON.parse(storedData);
//         setState((prev) => ({
//           ...prev,
//           userData: guestData,
//           isInitialized: true,
//           isLoading: false,
//         }));

//         Toast.show({
//           type: "info",
//           text1: "Guest Mode",
//           text2: "Hey there! Sign in to access all features.",
//         });

//         router.replace("/(root)/(tabs)");
//       } else {
//         // No valid session, clear and redirect to sign in
//         await clearUserData();
//         setState((prev) => ({ ...prev, isLoading: false }));
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     } catch (error) {
//       console.error("Initialization error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Session initialization failed",
//         isLoading: false,
//       }));

//       Toast.show({
//         type: "error",
//         text1: "Initialization Error",
//         text2: "Please try signing in again",
//       });

//       router.replace("/(root)/(auth)/sign-in");
//     }
//   };

//   useEffect(() => {
//     initializeUserData();
//   }, [isSignedIn]);

//   const updateUserData = async (data: Partial<UserData>) => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       if (!state.userData) {
//         throw new Error("No user data available");
//       }

//       const updatedData = { ...state.userData, ...data };

//       if (!updatedData.isGuestMode && updatedData.email) {
//         // Only sync with Strapi if not in guest mode and has email
//         if (updatedData.documentId) {
//           // User exists in Strapi, update
//           const syncedData = await syncWithStrapi(updatedData);
//           await SecureStore.setItemAsync(
//             STORAGE_KEYS.USER_DATA,
//             JSON.stringify(syncedData)
//           );
//           setState((prev) => ({
//             ...prev,
//             userData: syncedData,
//             isLoading: false,
//           }));

//           Toast.show({
//             type: "success",
//             text1: "Profile Updated",
//           });
//         } else {
//           // New user, create in Strapi
//           const syncedData = await syncWithStrapi(updatedData);
//           await SecureStore.setItemAsync(
//             STORAGE_KEYS.USER_DATA,
//             JSON.stringify(syncedData)
//           );
//           setState((prev) => ({
//             ...prev,
//             userData: syncedData,
//             isLoading: false,
//           }));
//         }
//       } else {
//         // Guest mode, just update local storage
//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(updatedData)
//         );
//         setState((prev) => ({
//           ...prev,
//           userData: updatedData,
//           isLoading: false,
//         }));
//       }
//     } catch (error) {
//       console.error("Update user data error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Update failed",
//         isLoading: false,
//       }));

//       Toast.show({
//         type: "error",
//         text1: "Update Failed",
//         text2: "Could not update profile",
//       });
//     }
//   };

//   const refreshUserData = async () => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       if (isSignedIn && user) {
//         const email = user.primaryEmailAddress?.emailAddress || "";

//         // Get fresh data from Strapi
//         const strapiUser = await getUserFromStrapi(email);

//         if (strapiUser) {
//           // Keep the Clerk ID
//           const refreshedData = {
//             ...strapiUser,
//             id: user.id,
//             lastLogin: formatDateTime(),
//           };

//           await SecureStore.setItemAsync(
//             STORAGE_KEYS.USER_DATA,
//             JSON.stringify(refreshedData)
//           );

//           setState((prev) => ({
//             ...prev,
//             userData: refreshedData,
//             isLoading: false,
//           }));

//           Toast.show({
//             type: "success",
//             text1: "Profile Refreshed",
//           });
//         } else {
//           // If user not found in Strapi, recreate
//           const userData: UserData = {
//             id: user.id,
//             username: user.username || user.firstName || "User",
//             email: email,
//             imageUrl: user.imageUrl || "",
//             lastLogin: formatDateTime(),
//             isGuestMode: false,
//           };

//           const syncedData = await syncWithStrapi(userData);

//           await SecureStore.setItemAsync(
//             STORAGE_KEYS.USER_DATA,
//             JSON.stringify(syncedData)
//           );

//           setState((prev) => ({
//             ...prev,
//             userData: syncedData,
//             isLoading: false,
//           }));
//         }
//       } else {
//         setState((prev) => ({ ...prev, isLoading: false }));
//       }
//     } catch (error) {
//       console.error("Refresh user data error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Refresh failed",
//         isLoading: false,
//       }));

//       Toast.show({
//         type: "error",
//         text1: "Refresh Failed",
//         text2: "Could not refresh profile data",
//       });
//     }
//   };

//   const clearUserData = async () => {
//     try {
//       await Promise.all([
//         SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA),
//         SecureStore.deleteItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
//         SecureStore.deleteItemAsync(STORAGE_KEYS.IS_GUEST_MODE),
//       ]);

//       setState((prev) => ({
//         ...prev,
//         userData: null,
//         isInitialized: false,
//         isLoading: false,
//         error: null,
//       }));
//     } catch (error) {
//       console.error("Clear user data error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Clear failed",
//         isLoading: false,
//       }));
//     }
//   };

//   const signOutUser = async () => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       Toast.show({
//         type: "info",
//         text1: "Signing out...",
//         visibilityTime: 1500,
//       });

//       // Clear all data first
//       await clearUserData();

//       // Then sign out from Clerk if signed in
//       if (isSignedIn) {
//         await signOut();
//       }

//       // Redirect to sign-in page
//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       console.error("Sign out error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Sign-out failed",
//         isLoading: false,
//       }));

//       Toast.show({
//         type: "error",
//         text1: "Sign Out Failed",
//         text2: "Please try again",
//       });
//     }
//   };

//   const setGuestMode = async (enabled: boolean) => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       if (enabled) {
//         // Enable guest mode
//         const guestData: UserData = {
//           id: `guest_${Date.now()}`,
//           username: "Guest User",
//           email: "",
//           imageUrl: "",
//           lastLogin: formatDateTime(),
//           isGuestMode: true,
//         };

//         await Promise.all([
//           SecureStore.setItemAsync(STORAGE_KEYS.IS_GUEST_MODE, "true"),
//           SecureStore.setItemAsync(
//             STORAGE_KEYS.USER_DATA,
//             JSON.stringify(guestData)
//           ),
//           SecureStore.deleteItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
//         ]);

//         setState((prev) => ({
//           ...prev,
//           userData: guestData,
//           isInitialized: true,
//           isLoading: false,
//         }));

//         Toast.show({
//           type: "info",
//           text1: "Guest Mode",
//           text2: "You can sign in anytime to access all features",
//         });

//         router.replace("/(root)/(tabs)");
//       } else {
//         // Disable guest mode
//         await clearUserData();

//         setState((prev) => ({
//           ...prev,
//           isLoading: false,
//         }));

//         router.replace("/(root)/(auth)/sign-in");
//       }
//     } catch (error) {
//       console.error("Guest mode error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Guest mode failed",
//         isLoading: false,
//       }));

//       Toast.show({
//         type: "error",
//         text1: "Error",
//         text2: "Could not set guest mode",
//       });
//     }
//   };

//   const contextValue = useMemo<UserContextValue>(
//     () => ({
//       ...state,
//       updateUserData,
//       refreshUserData,
//       clearUserData,
//       signOutUser,
//       setGuestMode,
//       uploadImage,
//       formatDateTime,
//     }),
//     [state]
//   );

//   return (
//     <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUserContext must be used within a UserProvider");
//   }
//   return context;
// };

/************************************ */

// //Works latest

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useMemo,
// } from "react";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import * as SecureStore from "expo-secure-store";
// import { router } from "expo-router";
// import axios from "axios";
// import { Toast } from "react-native-toast-message/lib/src/Toast";

// interface UserData {
//   id: string;
//   username: string;
//   email: string;
//   imageUrl: string;
//   lastLogin: string;
//   isGuestMode: boolean;
//   documentId?: string;
// }

// interface UserContextState {
//   isLoading: boolean;
//   error: string | null;
//   userData: UserData | null;
//   isInitialized: boolean;
// }

// interface UserContextValue extends UserContextState {
//   updateUserData: (data: Partial<UserData>) => Promise<void>;
//   refreshUserData: () => Promise<void>;
//   clearUserData: () => Promise<void>;
//   signOutUser: () => Promise<void>;
//   setGuestMode: (enabled: boolean) => Promise<void>;
//   uploadImage: (file: File) => Promise<string | null>;
//   formatDateTime: (date?: Date) => string;
// }

// const UserContext = createContext<UserContextValue | undefined>(undefined);

// const STORAGE_KEYS = {
//   USER_DATA: "user_data",
//   IS_AUTHENTICATED: "isAuthenticated",
//   IS_GUEST_MODE: "isGuestMode",
// } as const;

// const STRAPI_API_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
// const STRAPI_API_TOKEN_USER = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER;

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { user, isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const [state, setState] = useState<UserContextState>({
//     isLoading: true,
//     error: null,
//     userData: null,
//     isInitialized: false,
//   });

//   const formatDateTime = (date: Date = new Date()): string => {
//     // Check for invalid Date (NaN value)
//     if (isNaN(date.getTime())) {
//       return "";
//     }
//     return date.toISOString().slice(0, 19).replace("T", " ");
//   };

//   const getAxiosConfig = () => ({
//     headers: {
//       Authorization: `Bearer ${STRAPI_API_TOKEN_USER}`,
//       "Content-Type": "application/json",
//     },
//   });

//   const getUserFromStrapi = async (email: string): Promise<UserData | null> => {
//     const config = getAxiosConfig();
//     try {
//       const response = await axios.get(
//         `${STRAPI_API_URL}/api/auths?filters[Email][$eq]=${encodeURIComponent(
//           email
//         )}`,
//         config
//       );

//       if (response.data.data.length > 0) {
//         const userData = response.data.data[0];
//         return {
//           id: userData.id.toString(),
//           username: userData.Username,
//           email: userData.Email,
//           imageUrl: userData.ProfileIMG || "",
//           lastLogin: formatDateTime(),
//           isGuestMode: false,
//           documentId: userData.documentId,
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error("Error fetching user from Strapi:", error);
//       return null;
//     }
//   };

//   const syncWithStrapi = async (userData: UserData): Promise<UserData> => {
//     const config = getAxiosConfig();
//     try {
//       // Check if user exists in Strapi by email
//       const existingUser = await getUserFromStrapi(userData.email);

//       if (existingUser) {
//         // User exists, update only if needed
//         const updatePayload = {
//           data: {
//             Username: userData.username,
//             ProfileIMG: userData.imageUrl,
//           },
//         };

//         const updateResponse = await axios.put(
//           `${STRAPI_API_URL}/api/auths/${existingUser.documentId}`,
//           updatePayload,
//           config
//         );

//         const updatedData = updateResponse.data.data;
//         return {
//           id: userData.id, // Keep the Clerk ID
//           username: updatedData.Username,
//           email: updatedData.Email,
//           imageUrl: updatedData.ProfileIMG || "",
//           lastLogin: formatDateTime(),
//           isGuestMode: false,
//           documentId: updatedData.documentId,
//         };
//       } else {
//         // User doesn't exist, create it
//         const createPayload = {
//           data: {
//             Username: userData.username,
//             Email: userData.email,
//             ProfileIMG: userData.imageUrl || "",
//           },
//         };

//         const createResponse = await axios.post(
//           `${STRAPI_API_URL}/api/auths`,
//           createPayload,
//           config
//         );

//         const createdData = createResponse.data.data;
//         return {
//           id: userData.id, // Keep the Clerk ID
//           username: createdData.Username,
//           email: createdData.Email,
//           imageUrl: createdData.ProfileIMG || "",
//           lastLogin: formatDateTime(),
//           isGuestMode: false,
//           documentId: createdData.documentId,
//         };
//       }
//     } catch (error) {
//       console.error("Error syncing with Strapi:", error);
//       Toast.show({
//         type: "error",
//         text1: "Sync Error",
//         text2: "Failed to sync user with backend",
//       });
//       // Return original data if sync fails
//       return userData;
//     }
//   };

//   const uploadImage = async (file: File): Promise<string | null> => {
//     if (!STRAPI_API_URL || !STRAPI_API_TOKEN_USER) {
//       Toast.show({
//         type: "error",
//         text1: "Upload Error",
//         text2: "API configuration missing",
//       });
//       return null;
//     }

//     const formData = new FormData();
//     formData.append("files", file);

//     try {
//       const response = await axios.post(
//         `${STRAPI_API_URL}/api/upload`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${STRAPI_API_TOKEN_USER}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.data && response.data.length > 0) {
//         Toast.show({
//           type: "success",
//           text1: "Upload Successful",
//         });
//         return response.data[0]?.url || null;
//       }
//       return null;
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       Toast.show({
//         type: "error",
//         text1: "Upload Failed",
//         text2: "Could not upload image",
//       });
//       return null;
//     }
//   };

//   const initializeUserData = async () => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       const [isAuth, isGuest, storedData] = await Promise.all([
//         SecureStore.getItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
//         SecureStore.getItemAsync(STORAGE_KEYS.IS_GUEST_MODE),
//         SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA),
//       ]);

//       if (isSignedIn && user) {
//         Toast.show({
//           type: "info",
//           text1: "Syncing account...",
//           visibilityTime: 2000,
//         });

//         const email = user.primaryEmailAddress?.emailAddress || "";
//         const existingUser = await getUserFromStrapi(email);

//         let userData: UserData;

//         if (existingUser) {
//           userData = {
//             ...existingUser,
//             id: user.id,
//             lastLogin: formatDateTime(),
//           };
//         } else {
//           userData = {
//             id: user.id,
//             username: user.username || user.firstName || "User",
//             email: email,
//             imageUrl: user.imageUrl || "",
//             lastLogin: formatDateTime(),
//             isGuestMode: false,
//           };
//           userData = await syncWithStrapi(userData);
//         }

//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(userData)
//         );
//         await SecureStore.setItemAsync(STORAGE_KEYS.IS_AUTHENTICATED, "true");
//         await SecureStore.setItemAsync(STORAGE_KEYS.IS_GUEST_MODE, "false");

//         setState((prev) => ({
//           ...prev,
//           userData: userData,
//           isInitialized: true,
//           isLoading: false,
//         }));

//         Toast.show({
//           type: "success",
//           text1: "Welcome back!",
//           text2: `Hello, ${userData.username}`,
//         });

//         router.replace("/(root)/(tabs)");
//       } else if (isGuest === "true" && storedData) {
//         const guestData: UserData = JSON.parse(storedData);
//         setState((prev) => ({
//           ...prev,
//           userData: guestData,
//           isInitialized: true,
//           isLoading: false,
//         }));

//         Toast.show({
//           type: "info",
//           text1: "Guest Mode",
//           text2: "Hey there! Sign in to access all features.",
//         });

//         router.replace("/(root)/(tabs)");
//       } else {
//         await clearUserData();
//         setState((prev) => ({ ...prev, isLoading: false }));
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     } catch (error) {
//       console.error("Initialization error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Session initialization failed",
//         isLoading: false,
//       }));

//       Toast.show({
//         type: "error",
//         text1: "Initialization Error",
//         text2: "Please try signing in again",
//       });

//       router.replace("/(root)/(auth)/sign-in");
//     }
//   };

//   useEffect(() => {
//     initializeUserData();
//   }, [isSignedIn]);

//   const updateUserData = async (data: Partial<UserData>) => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       if (!state.userData) {
//         throw new Error("No user data available");
//       }
//       const updatedData = { ...state.userData, ...data };
//       if (!updatedData.isGuestMode && updatedData.email) {
//         if (updatedData.documentId) {
//           const syncedData = await syncWithStrapi(updatedData);
//           await SecureStore.setItemAsync(
//             STORAGE_KEYS.USER_DATA,
//             JSON.stringify(syncedData)
//           );
//           setState((prev) => ({
//             ...prev,
//             userData: syncedData,
//             isLoading: false,
//           }));
//           Toast.show({
//             type: "success",
//             text1: "Profile Updated",
//           });
//         } else {
//           const syncedData = await syncWithStrapi(updatedData);
//           await SecureStore.setItemAsync(
//             STORAGE_KEYS.USER_DATA,
//             JSON.stringify(syncedData)
//           );
//           setState((prev) => ({
//             ...prev,
//             userData: syncedData,
//             isLoading: false,
//           }));
//         }
//       } else {
//         await SecureStore.setItemAsync(
//           STORAGE_KEYS.USER_DATA,
//           JSON.stringify(updatedData)
//         );
//         setState((prev) => ({
//           ...prev,
//           userData: updatedData,
//           isLoading: false,
//         }));
//       }
//     } catch (error) {
//       console.error("Update user data error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Update failed",
//         isLoading: false,
//       }));
//       Toast.show({
//         type: "error",
//         text1: "Update Failed",
//         text2: "Could not update profile",
//       });
//     }
//   };

//   const refreshUserData = async () => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       if (isSignedIn && user) {
//         const email = user.primaryEmailAddress?.emailAddress || "";
//         const strapiUser = await getUserFromStrapi(email);
//         if (strapiUser) {
//           const refreshedData = {
//             ...strapiUser,
//             id: user.id,
//             lastLogin: formatDateTime(),
//           };
//           await SecureStore.setItemAsync(
//             STORAGE_KEYS.USER_DATA,
//             JSON.stringify(refreshedData)
//           );
//           setState((prev) => ({
//             ...prev,
//             userData: refreshedData,
//             isLoading: false,
//           }));
//           Toast.show({
//             type: "success",
//             text1: "Profile Refreshed",
//           });
//         } else {
//           const userData: UserData = {
//             id: user.id,
//             username: user.username || user.firstName || "User",
//             email: email,
//             imageUrl: user.imageUrl || "",
//             lastLogin: formatDateTime(),
//             isGuestMode: false,
//           };
//           const syncedData = await syncWithStrapi(userData);
//           await SecureStore.setItemAsync(
//             STORAGE_KEYS.USER_DATA,
//             JSON.stringify(syncedData)
//           );
//           setState((prev) => ({
//             ...prev,
//             userData: syncedData,
//             isLoading: false,
//           }));
//         }
//       } else {
//         setState((prev) => ({ ...prev, isLoading: false }));
//       }
//     } catch (error) {
//       console.error("Refresh user data error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Refresh failed",
//         isLoading: false,
//       }));
//       Toast.show({
//         type: "error",
//         text1: "Refresh Failed",
//         text2: "Could not refresh profile data",
//       });
//     }
//   };

//   const clearUserData = async () => {
//     try {
//       await Promise.all([
//         SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA),
//         SecureStore.deleteItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
//         SecureStore.deleteItemAsync(STORAGE_KEYS.IS_GUEST_MODE),
//       ]);
//       setState((prev) => ({
//         ...prev,
//         userData: null,
//         isInitialized: false,
//         isLoading: false,
//         error: null,
//       }));
//     } catch (error) {
//       console.error("Clear user data error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Clear failed",
//         isLoading: false,
//       }));
//     }
//   };

//   const signOutUser = async () => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       Toast.show({
//         type: "info",
//         text1: "Signing out...",
//         visibilityTime: 1500,
//       });
//       await clearUserData();
//       if (isSignedIn) {
//         await signOut();
//       }
//       // Delay navigation slightly to ensure that the root layout is mounted before navigation
//       setTimeout(() => {
//         router.replace("/(root)/(auth)/sign-in");
//       }, 500);
//     } catch (error) {
//       console.error("Sign out error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Sign-out failed",
//         isLoading: false,
//       }));
//       Toast.show({
//         type: "error",
//         text1: "Sign Out Failed",
//         text2: "Please try again",
//       });
//     }
//   };

//   const setGuestMode = async (enabled: boolean) => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       if (enabled) {
//         const guestData: UserData = {
//           id: `guest_${Date.now()}`,
//           username: "Guest User",
//           email: "",
//           imageUrl: "",
//           lastLogin: formatDateTime(),
//           isGuestMode: true,
//         };

//         await Promise.all([
//           SecureStore.setItemAsync(STORAGE_KEYS.IS_GUEST_MODE, "true"),
//           SecureStore.setItemAsync(
//             STORAGE_KEYS.USER_DATA,
//             JSON.stringify(guestData)
//           ),
//           SecureStore.deleteItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
//         ]);

//         setState((prev) => ({
//           ...prev,
//           userData: guestData,
//           isInitialized: true,
//           isLoading: false,
//         }));

//         Toast.show({
//           type: "info",
//           text1: "Guest Mode",
//           text2: "You can sign in anytime to access all features",
//         });

//         router.replace("/(root)/(tabs)");
//       } else {
//         await clearUserData();
//         setState((prev) => ({
//           ...prev,
//           isLoading: false,
//         }));
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     } catch (error) {
//       console.error("Guest mode error:", error);
//       setState((prev) => ({
//         ...prev,
//         error: "Guest mode failed",
//         isLoading: false,
//       }));
//       Toast.show({
//         type: "error",
//         text1: "Error",
//         text2: "Could not set guest mode",
//       });
//     }
//   };

//   const contextValue = useMemo<UserContextValue>(
//     () => ({
//       ...state,
//       updateUserData,
//       refreshUserData,
//       clearUserData,
//       signOutUser,
//       setGuestMode,
//       uploadImage,
//       formatDateTime,
//     }),
//     [state]
//   );

//   return (
//     <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUserContext must be used within a UserProvider");
//   }
//   return context;
// };

/**************************************************** */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useUser, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import axios from "axios";
import Toast from "react-native-toast-message";

interface UserData {
  id: string; // Clerk ID
  strapiId?: string; // Strapi numeric ID
  username: string;
  email: string;
  imageUrl: string;
  firstName: string;
  lastName: string;
  phone: string;
  lastLogin: string;
  isGuestMode: boolean;
}

interface UserContextState {
  isLoading: boolean;
  error: string | null;
  userData: UserData | null;
  isInitialized: boolean;
}

interface UserContextValue extends UserContextState {
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  refreshUserData: () => Promise<void>;
  clearUserData: () => Promise<void>;
  signOutUser: () => Promise<void>;
  setGuestMode: (enabled: boolean) => Promise<void>;
  uploadImage: (file: File) => Promise<string | null>;
  formatDateTime: (date?: Date) => string;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  USER_DATA: "user_data",
  IS_AUTHENTICATED: "isAuthenticated",
  IS_GUEST_MODE: "isGuestMode",
} as const;

const STRAPI_API_URL = process.env.EXPO_PUBLIC_STRAPI_API_URL;
const STRAPI_API_TOKEN_USER = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER;

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useAuth();
  const [state, setState] = useState<UserContextState>({
    isLoading: true,
    error: null,
    userData: null,
    isInitialized: false,
  });

  const formatDateTime = (date: Date = new Date()): string => {
    if (isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 19).replace("T", " ");
  };

  const getAxiosConfig = () => ({
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN_USER}`,
      "Content-Type": "application/json",
    },
  });

  const getUserFromStrapi = async (
    email: string
  ): Promise<Partial<UserData> | null> => {
    const config = getAxiosConfig();
    try {
      const response = await axios.get(
        `${STRAPI_API_URL}/api/auths?filters[Email][$eq]=${encodeURIComponent(
          email
        )}`,
        config
      );
      if (response.data.data.length > 0) {
        const userData = response.data.data[0];
        return {
          strapiId: userData.id.toString(),
          username: userData.attributes.Username,
          email: userData.attributes.Email,
          imageUrl: userData.attributes.ProfileIMG || "",
          firstName: userData.attributes.firstName || "",
          lastName: userData.attributes.lastName || "",
          phone: userData.attributes.phone || "",
          isGuestMode: false,
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching user from Strapi:", error);
      return null;
    }
  };

  const syncWithStrapi = async (
    userData: Partial<UserData>
  ): Promise<Partial<UserData>> => {
    const config = getAxiosConfig();
    try {
      const existingUser = await getUserFromStrapi(userData.email || "");
      if (existingUser) {
        const updatePayload = {
          data: {
            Username: userData.username,
            ProfileIMG: userData.imageUrl,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
          },
        };
        const updateResponse = await axios.put(
          `${STRAPI_API_URL}/api/auths/${existingUser.strapiId}`,
          updatePayload,
          config
        );
        const updatedData = updateResponse.data.data;
        return {
          strapiId: updatedData.id.toString(),
          username: updatedData.attributes.Username,
          email: updatedData.attributes.Email,
          imageUrl: updatedData.attributes.ProfileIMG || "",
          firstName: updatedData.attributes.firstName || "",
          lastName: updatedData.attributes.lastName || "",
          phone: updatedData.attributes.phone || "",
          isGuestMode: false,
        };
      } else {
        const createPayload = {
          data: {
            Username: userData.username,
            Email: userData.email,
            ProfileIMG: userData.imageUrl || "",
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
          },
        };
        const createResponse = await axios.post(
          `${STRAPI_API_URL}/api/auths`,
          createPayload,
          config
        );
        const createdData = createResponse.data.data;
        return {
          strapiId: createdData.id.toString(),
          username: createdData.attributes.Username,
          email: createdData.attributes.Email,
          imageUrl: createdData.attributes.ProfileIMG || "",
          firstName: createdData.attributes.firstName || "",
          lastName: createdData.attributes.lastName || "",
          phone: createdData.attributes.phone || "",
          isGuestMode: false,
        };
      }
    } catch (error) {
      console.error("Error syncing with Strapi:", error);
      Toast.show({
        type: "error",
        text1: "Sync Error",
        text2: "Failed to sync user with backend",
      });
      return userData;
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("files", file);
    try {
      const response = await axios.post(
        `${STRAPI_API_URL}/api/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${STRAPI_API_TOKEN_USER}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data && response.data.length > 0) {
        Toast.show({ type: "success", text1: "Upload Successful" });
        return response.data[0]?.url || null;
      }
      return null;
    } catch (error) {
      console.error("Image upload failed:", error);
      Toast.show({
        type: "error",
        text1: "Upload Failed",
        text2: "Could not upload image",
      });
      return null;
    }
  };

  const initializeUserData = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const [isAuth, isGuest, storedData] = await Promise.all([
        SecureStore.getItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
        SecureStore.getItemAsync(STORAGE_KEYS.IS_GUEST_MODE),
        SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA),
      ]);

      if (isSignedIn && user) {
        const email = user.primaryEmailAddress?.emailAddress || "";
        const existingUser = await getUserFromStrapi(email);
        let userData: UserData;

        if (existingUser) {
          userData = {
            id: user.id,
            strapiId: existingUser.strapiId,
            username: existingUser.username,
            email: existingUser.email,
            imageUrl: existingUser.imageUrl,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            phone: existingUser.phone,
            lastLogin: formatDateTime(),
            isGuestMode: false,
          };
        } else {
          const newUserData = await syncWithStrapi({
            username: user.username || user.firstName || "User",
            email,
            imageUrl: user.imageUrl || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            phone: user.phoneNumbers[0]?.phoneNumber || "",
          });
          userData = {
            id: user.id,
            strapiId: newUserData.strapiId,
            username: newUserData.username,
            email: newUserData.email,
            imageUrl: newUserData.imageUrl,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            phone: newUserData.phone,
            lastLogin: formatDateTime(),
            isGuestMode: false,
          };
        }

        await SecureStore.setItemAsync(
          STORAGE_KEYS.USER_DATA,
          JSON.stringify(userData)
        );
        await SecureStore.setItemAsync(STORAGE_KEYS.IS_AUTHENTICATED, "true");
        await SecureStore.setItemAsync(STORAGE_KEYS.IS_GUEST_MODE, "false");

        setState((prev) => ({
          ...prev,
          userData,
          isInitialized: true,
          isLoading: false,
        }));
        Toast.show({
          type: "success",
          text1: "Welcome back!",
          text2: `Hello, ${userData.username}`,
        });
        router.replace("/(root)/(tabs)");
      } else if (isGuest === "true" && storedData) {
        const guestData: UserData = JSON.parse(storedData);
        setState((prev) => ({
          ...prev,
          userData: guestData,
          isInitialized: true,
          isLoading: false,
        }));
        Toast.show({
          type: "info",
          text1: "Guest Mode",
          text2: "Hey there! Sign in to access all features.",
        });
        router.replace("/(root)/(tabs)");
      } else {
        await clearUserData();
        setState((prev) => ({ ...prev, isLoading: false }));
        router.replace("/(root)/(auth)/sign-in");
      }
    } catch (error) {
      console.error("Initialization error:", error);
      setState((prev) => ({
        ...prev,
        error: "Session initialization failed",
        isLoading: false,
      }));
      Toast.show({
        type: "error",
        text1: "Initialization Error",
        text2: "Please try signing in again",
      });
      router.replace("/(root)/(auth)/sign-in");
    }
  };

  useEffect(() => {
    initializeUserData();
  }, [isSignedIn]);

  const updateUserData = async (data: Partial<UserData>) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      if (!state.userData) throw new Error("No user data available");
      const updatedData = { ...state.userData, ...data };
      if (!updatedData.isGuestMode && updatedData.email) {
        const syncedData = await syncWithStrapi(updatedData);
        const newUserData = {
          ...updatedData,
          ...syncedData,
          lastLogin: formatDateTime(),
        };
        await SecureStore.setItemAsync(
          STORAGE_KEYS.USER_DATA,
          JSON.stringify(newUserData)
        );
        setState((prev) => ({
          ...prev,
          userData: newUserData,
          isLoading: false,
        }));
        Toast.show({ type: "success", text1: "Profile Updated" });
      } else {
        await SecureStore.setItemAsync(
          STORAGE_KEYS.USER_DATA,
          JSON.stringify(updatedData)
        );
        setState((prev) => ({
          ...prev,
          userData: updatedData,
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error("Update user data error:", error);
      setState((prev) => ({
        ...prev,
        error: "Update failed",
        isLoading: false,
      }));
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: "Could not update profile",
      });
    }
  };

  const refreshUserData = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      if (isSignedIn && user) {
        const email = user.primaryEmailAddress?.emailAddress || "";
        const strapiUser = await getUserFromStrapi(email);
        if (strapiUser) {
          const refreshedData = {
            ...state.userData,
            ...strapiUser,
            lastLogin: formatDateTime(),
          } as UserData;
          await SecureStore.setItemAsync(
            STORAGE_KEYS.USER_DATA,
            JSON.stringify(refreshedData)
          );
          setState((prev) => ({
            ...prev,
            userData: refreshedData,
            isLoading: false,
          }));
          Toast.show({ type: "success", text1: "Profile Refreshed" });
        }
      }
    } catch (error) {
      console.error("Refresh user data error:", error);
      setState((prev) => ({
        ...prev,
        error: "Refresh failed",
        isLoading: false,
      }));
      Toast.show({
        type: "error",
        text1: "Refresh Failed",
        text2: "Could not refresh profile data",
      });
    }
  };

  const clearUserData = async () => {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA),
        SecureStore.deleteItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
        SecureStore.deleteItemAsync(STORAGE_KEYS.IS_GUEST_MODE),
      ]);
      setState((prev) => ({
        ...prev,
        userData: null,
        isInitialized: false,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      console.error("Clear user data error:", error);
      setState((prev) => ({
        ...prev,
        error: "Clear failed",
        isLoading: false,
      }));
    }
  };

  const signOutUser = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      await clearUserData();
      if (isSignedIn) await signOut();
      setTimeout(() => router.replace("/(root)/(auth)/sign-in"), 500);
    } catch (error) {
      console.error("Sign out error:", error);
      setState((prev) => ({
        ...prev,
        error: "Sign-out failed",
        isLoading: false,
      }));
      Toast.show({
        type: "error",
        text1: "Sign Out Failed",
        text2: "Please try again",
      });
    }
  };

  const setGuestMode = async (enabled: boolean) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      if (enabled) {
        const guestData: UserData = {
          id: `guest_${Date.now()}`,
          username: "Guest User",
          email: "",
          imageUrl: "",
          firstName: "",
          lastName: "",
          phone: "",
          lastLogin: formatDateTime(),
          isGuestMode: true,
        };
        await Promise.all([
          SecureStore.setItemAsync(STORAGE_KEYS.IS_GUEST_MODE, "true"),
          SecureStore.setItemAsync(
            STORAGE_KEYS.USER_DATA,
            JSON.stringify(guestData)
          ),
          SecureStore.deleteItemAsync(STORAGE_KEYS.IS_AUTHENTICATED),
        ]);
        setState((prev) => ({
          ...prev,
          userData: guestData,
          isInitialized: true,
          isLoading: false,
        }));
        Toast.show({
          type: "info",
          text1: "Guest Mode",
          text2: "Sign in to access all features",
        });
        router.replace("/(root)/(tabs)");
      } else {
        await clearUserData();
        setState((prev) => ({ ...prev, isLoading: false }));
        router.replace("/(root)/(auth)/sign-in");
      }
    } catch (error) {
      console.error("Guest mode error:", error);
      setState((prev) => ({
        ...prev,
        error: "Guest mode failed",
        isLoading: false,
      }));
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not set guest mode",
      });
    }
  };

  const contextValue = useMemo<UserContextValue>(
    () => ({
      ...state,
      updateUserData,
      refreshUserData,
      clearUserData,
      signOutUser,
      setGuestMode,
      uploadImage,
      formatDateTime,
    }),
    [state]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within a UserProvider");
  return context;
};
