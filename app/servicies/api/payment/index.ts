// // services/api/payment/index.ts
// import axios from "axios";

// interface PaymentInitiationResponse {
//   paymentId: string;
//   merchantTxnId: string;
//   paymentUrl: string;
// }

// interface PaymentVerificationResponse {
//   finalStatus: "success" | "failed" | "cancelled" | "pending";
//   PaymentId?: string;
//   StatusDescription?: string;
//   BookeeyTrackId?: string;
//   ErrorCode?: string;
//   ErrorMessage?: string;
// }

// interface CartItem {
//   documentId: string;
//   name: string;
//   quantity: number;
//   price: number;
//   salesPrice?: number;
// }

// const API_URL = process.env.EXPO_PUBLIC_API_URL;

// export const paymentApi = {
//   initiatePayment: async (
//     amount: number,
//     items: CartItem[],
//     platform: string
//   ): Promise<PaymentInitiationResponse> => {
//     try {
//       const response = await axios.post(`${API_URL}/api/payments/initiate`, {
//         amount,
//         customerInfo: {
//           platform,
//           items: items.map((item) => ({
//             id: item.documentId,
//             name: item.name,
//             quantity: item.quantity,
//             price: item.salesPrice || item.price,
//           })),
//         },
//       });

//       return response.data;
//     } catch (error: any) {
//       console.error(
//         "Payment initiation error:",
//         error.response?.data || error.message
//       );
//       throw new Error(
//         error.response?.data?.message ||
//           error.response?.data?.error ||
//           "Payment initiation failed"
//       );
//     }
//   },

//   verifyPayment: async (
//     merchantTxnId: string
//   ): Promise<PaymentVerificationResponse> => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/payments/verify/${merchantTxnId}`
//       );
//       return response.data;
//     } catch (error: any) {
//       console.error(
//         "Payment verification error:",
//         error.response?.data || error.message
//       );
//       throw new Error(
//         error.response?.data?.message ||
//           error.response?.data?.error ||
//           "Payment verification failed"
//       );
//     }
//   },

//   checkPaymentStatus: async (
//     merchantTxnId: string
//   ): Promise<PaymentVerificationResponse> => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/payments/status/${merchantTxnId}`
//       );
//       return response.data;
//     } catch (error: any) {
//       console.error(
//         "Payment status check error:",
//         error.response?.data || error.message
//       );
//       throw new Error(
//         error.response?.data?.message ||
//           error.response?.data?.error ||
//           "Payment status check failed"
//       );
//     }
//   },
// };

// export default paymentApi;

/************************************************** */

// // services/api/payment/index.ts
// import axios from "axios";
// import { CartItem } from "../../../types/cart";

// const API_URL = process.env.EXPO_PUBLIC_API_URL;

// // Add axios interceptor for debugging
// axios.interceptors.request.use((request) => {
//   console.log("Starting Request:", {
//     url: request.url,
//     method: request.method,
//     data: request.data,
//   });
//   return request;
// });

// axios.interceptors.response.use(
//   (response) => {
//     console.log("Response:", {
//       status: response.status,
//       data: response.data,
//     });
//     return response;
//   },
//   (error) => {
//     console.error("Response Error:", {
//       message: error.message,
//       response: error.response?.data,
//     });
//     return Promise.reject(error);
//   }
// );

// export interface PaymentResponse {
//   paymentId: string;
//   merchantTxnId: string;
//   paymentUrl: string;
// }

// export interface PaymentVerificationResponse {
//   MerchantTxnRefNo: string;
//   PaymentId: string;
//   ProcessDate: string | null;
//   StatusDescription: string;
//   BookeeyTrackId: string;
//   BankRefNo: string;
//   PaymentType: string;
//   ErrorCode: string;
//   ProductType: string;
//   finalStatus: "success" | "failed" | "cancelled" | "initiated" | "pending";
//   CardNo: string | null;
//   AuthCode: string | null;
//   PaymentLink: string;
// }

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     "ngrok-skip-browser-warning": "true",
//   },
//   timeout: 15000,
// });

// export const paymentApi = {
//   initiatePayment: async (
//     amount: number,
//     items: CartItem[],
//     platform: string
//   ): Promise<PaymentResponse> => {
//     try {
//       const payload = {
//         amount: Number(amount.toFixed(3)),
//         orderId: `ORD${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
//         customerInfo: {
//           platform,
//           items: items.map((item) => ({
//             id: item.documentId,
//             name: item.name,
//             quantity: item.quantity,
//             price: Number((item.salesPrice || item.price).toFixed(3)),
//           })),
//         },
//       };

//       const { data } = await axiosInstance.post(
//         "/api/payments/initiate",
//         payload
//       );

//       if (!data?.paymentUrl) {
//         throw new Error("Invalid payment response");
//       }

//       return data;
//     } catch (error: any) {
//       console.error(
//         "Payment initiation error:",
//         error.response?.data || error.message
//       );
//       throw new Error(
//         error.response?.data?.message ||
//           error.response?.data?.error ||
//           "Payment initiation failed"
//       );
//     }
//   },

//   verifyPayment: async (
//     merchantTxnId: string
//   ): Promise<PaymentVerificationResponse> => {
//     try {
//       const { data } = await axiosInstance.get(
//         `/api/payments/verify/${merchantTxnId}`
//       );

//       if (!data?.finalStatus) {
//         throw new Error("Invalid verification response");
//       }

//       return data;
//     } catch (error: any) {
//       console.error(
//         "Payment verification error:",
//         error.response?.data || error.message
//       );
//       throw new Error(
//         error.response?.data?.message ||
//           error.response?.data?.error ||
//           "Payment verification failed"
//       );
//     }
//   },

//   getPaymentStatus: async (
//     merchantTxnId: string
//   ): Promise<PaymentVerificationResponse> => {
//     try {
//       const { data } = await axiosInstance.get(
//         `/api/payments/status/${merchantTxnId}`
//       );
//       return data;
//     } catch (error: any) {
//       throw new Error(
//         error.response?.data?.message || "Failed to get payment status"
//       );
//     }
//   },
// };

// export default paymentApi;

/****************************************** */

// // services/api/payment/index.ts
// import axios from "axios";
// import { CartItem } from "../../../types/cart";

// const API_URL = process.env.EXPO_PUBLIC_API_URL;
// const DEBUG = process.env.EXPO_PUBLIC_DEBUG === "true";

// // Add types for the responses
// export interface PaymentResponse {
//   paymentId: string;
//   merchantTxnId: string;
//   paymentUrl: string;
// }

// export interface PaymentVerificationResponse {
//   MerchantTxnRefNo: string;
//   PaymentId: string;
//   ProcessDate: string | null;
//   StatusDescription: string;
//   BookeeyTrackId: string;
//   BankRefNo: string;
//   PaymentType: string;
//   ErrorCode: string;
//   ProductType: string;
//   finalStatus: "success" | "failed" | "cancelled" | "initiated" | "pending";
//   CardNo: string | null;
//   AuthCode: string | null;
//   PaymentLink: string;
// }

// // Create axios instance with default config
// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     "ngrok-skip-browser-warning": "true",
//   },
//   timeout: 15000,
// });

// // Add logging interceptor
// if (DEBUG) {
//   axiosInstance.interceptors.request.use((request) => {
//     console.log("Starting Request:", {
//       url: request.url,
//       method: request.method,
//       data: request.data,
//       timestamp: new Date().toISOString(),
//     });
//     return request;
//   });

//   axiosInstance.interceptors.response.use(
//     (response) => {
//       console.log("Response:", {
//         status: response.status,
//         data: response.data,
//         timestamp: new Date().toISOString(),
//       });
//       return response;
//     },
//     (error) => {
//       console.error("Response Error:", {
//         message: error.message,
//         response: error.response?.data,
//         timestamp: new Date().toISOString(),
//       });
//       return Promise.reject(error);
//     }
//   );
// }

// export const paymentApi = {
//   initiatePayment: async (
//     amount: number,
//     items: CartItem[],
//     platform: string
//   ): Promise<PaymentResponse> => {
//     try {
//       // Validate inputs
//       if (!amount || amount <= 0) {
//         throw new Error("Invalid amount");
//       }
//       if (!items || items.length === 0) {
//         throw new Error("Cart is empty");
//       }

//       const payload = {
//         amount: Number(amount.toFixed(3)), // Format to 3 decimal places for KWD
//         orderId: `ORD${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
//         customerInfo: {
//           platform,
//           items: items.map((item) => ({
//             id: item.documentId,
//             name: item.name,
//             quantity: item.quantity,
//             price: Number((item.salesPrice || item.price).toFixed(3)),
//           })),
//         },
//       };

//       const { data } = await axiosInstance.post<PaymentResponse>(
//         "/api/payments/initiate",
//         payload
//       );

//       if (!data?.paymentUrl) {
//         throw new Error("Invalid payment response");
//       }

//       return data;
//     } catch (error: any) {
//       console.error("Payment initiation error:", {
//         error: error.message,
//         stack: error.stack,
//         timestamp: new Date().toISOString(),
//       });
//       throw new Error(
//         error.response?.data?.message ||
//           error.response?.data?.error ||
//           "Payment initiation failed"
//       );
//     }
//   },

//   verifyPayment: async (
//     merchantTxnId: string
//   ): Promise<PaymentVerificationResponse> => {
//     try {
//       if (!merchantTxnId) {
//         throw new Error("Transaction ID is required");
//       }

//       const { data } = await axiosInstance.get<PaymentVerificationResponse>(
//         `/api/payments/verify/${merchantTxnId}`
//       );

//       if (!data?.finalStatus) {
//         throw new Error("Invalid verification response");
//       }

//       return data;
//     } catch (error: any) {
//       console.error("Payment verification error:", {
//         merchantTxnId,
//         error: error.message,
//         stack: error.stack,
//         timestamp: new Date().toISOString(),
//       });
//       throw new Error(
//         error.response?.data?.message ||
//           error.response?.data?.error ||
//           "Payment verification failed"
//       );
//     }
//   },
// };

// export default paymentApi;

/************************************* */

// // services/api/payment/index.ts
// import axios from "axios";
// import { CartItem } from "../../../types/cart";

// const API_URL = process.env.EXPO_PUBLIC_API_URL;
// const DEBUG = process.env.EXPO_PUBLIC_DEBUG === "true";

// export interface PaymentResponse {
//   paymentId: string;
//   merchantTxnId: string;
//   paymentUrl: string;
// }

// export interface PaymentVerificationResponse {
//   MerchantTxnRefNo: string;
//   PaymentId: string;
//   ProcessDate: string | null;
//   StatusDescription: string;
//   BookeeyTrackId: string;
//   BankRefNo: string;
//   PaymentType: string;
//   ErrorCode: string;
//   ProductType: string;
//   finalStatus: "success" | "failed" | "cancelled" | "initiated" | "pending";
//   CardNo: string | null;
//   AuthCode: string | null;
//   PaymentLink: string;
// }

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     "ngrok-skip-browser-warning": "true",
//     Accept: "application/json",
//   },
//   timeout: 30000,
// });

// if (DEBUG) {
//   axiosInstance.interceptors.request.use(
//     (config) => {
//       console.log("Request:", {
//         url: config.url,
//         method: config.method,
//         data: config.data,
//         headers: config.headers,
//         timestamp: new Date().toISOString(),
//       });
//       return config;
//     },
//     (error) => {
//       console.error("Request Error:", error);
//       return Promise.reject(error);
//     }
//   );

//   axiosInstance.interceptors.response.use(
//     (response) => {
//       console.log("Response:", {
//         status: response.status,
//         data: response.data,
//         timestamp: new Date().toISOString(),
//       });
//       return response;
//     },
//     (error) => {
//       console.error("Response Error:", {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//         timestamp: new Date().toISOString(),
//       });
//       return Promise.reject(error);
//     }
//   );
// }

// export const paymentApi = {
//   initiatePayment: async (
//     amount: number,
//     items: CartItem[],
//     platform: string
//   ): Promise<PaymentResponse> => {
//     try {
//       if (!amount || amount <= 0) {
//         throw new Error("Invalid amount");
//       }
//       if (!items || items.length === 0) {
//         throw new Error("Cart is empty");
//       }

//       const formattedAmount = Number(amount.toFixed(3));
//       const orderId = `ORD${Date.now()}${Math.random()
//         .toString(36)
//         .slice(2, 6)}`;

//       const payload = {
//         amount: formattedAmount,
//         orderId,
//         customerInfo: {
//           platform,
//           items: items.map((item) => ({
//             id: item.documentId,
//             name: item.name,
//             quantity: item.quantity,
//             price: Number((item.salesPrice || item.price).toFixed(3)),
//           })),
//         },
//       };

//       try {
//         const { data } = await axiosInstance.post<PaymentResponse>(
//           "/api/payments/initiate",
//           payload
//         );

//         if (!data?.paymentUrl) {
//           throw new Error("Invalid payment response from server");
//         }

//         return data;
//       } catch (axiosError: any) {
//         if (axiosError.response) {
//           throw new Error(
//             axiosError.response.data.error ||
//               axiosError.response.data.message ||
//               "Server error during payment initiation"
//           );
//         }
//         if (axiosError.request) {
//           throw new Error("No response received from payment server");
//         }
//         throw new Error("Error setting up payment request");
//       }
//     } catch (error: any) {
//       if (DEBUG) {
//         console.error("Payment initiation error:", {
//           error: error.message,
//           stack: error.stack,
//           timestamp: new Date().toISOString(),
//         });
//       }
//       throw error;
//     }
//   },

//   verifyPayment: async (
//     merchantTxnId: string
//   ): Promise<PaymentVerificationResponse> => {
//     try {
//       if (!merchantTxnId) {
//         throw new Error("Transaction ID is required");
//       }

//       try {
//         const { data } = await axiosInstance.get<PaymentVerificationResponse>(
//           `/api/payments/verify/${merchantTxnId}`
//         );

//         if (!data?.finalStatus) {
//           throw new Error("Invalid verification response from server");
//         }

//         return data;
//       } catch (axiosError: any) {
//         if (axiosError.response) {
//           throw new Error(
//             axiosError.response.data.error ||
//               axiosError.response.data.message ||
//               "Server error during payment verification"
//           );
//         }
//         if (axiosError.request) {
//           throw new Error("No response received from verification server");
//         }
//         throw new Error("Error verifying payment");
//       }
//     } catch (error: any) {
//       if (DEBUG) {
//         console.error("Payment verification error:", {
//           merchantTxnId,
//           error: error.message,
//           stack: error.stack,
//           timestamp: new Date().toISOString(),
//         });
//       }
//       throw error;
//     }
//   },
// };

// export default paymentApi;

/**************************************************** */

// // services/api/payment/index.ts
// import axios, { AxiosError } from "axios";
// import { CartItem } from "../../../types/cart";
// import NetInfo from "@react-native-community/netinfo";

// const API_URL = process.env.EXPO_PUBLIC_API_URL;
// const DEBUG = process.env.EXPO_PUBLIC_DEBUG === "true";

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     "ngrok-skip-browser-warning": "true",
//     Accept: "application/json",
//   },
//   timeout: 30000,
//   validateStatus: (status) => status >= 200 && status < 500,
// });

// // Check if URL is accessible
// const checkServerConnection = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/health`, { timeout: 5000 });
//     return response.status === 200;
//   } catch {
//     return false;
//   }
// };

// export const paymentApi = {
//   initiatePayment: async (
//     amount: number,
//     items: CartItem[],
//     platform: string
//   ): Promise<PaymentResponse> => {
//     try {
//       // Check internet connection
//       const netInfo = await NetInfo.fetch();
//       if (!netInfo.isConnected) {
//         throw new Error("No internet connection available");
//       }

//       // Validate server availability
//       const isServerAccessible = await checkServerConnection();
//       if (!isServerAccessible) {
//         throw new Error("Payment server is not accessible");
//       }

//       // Validate inputs
//       if (!amount || amount <= 0) {
//         throw new Error("Invalid amount");
//       }
//       if (!items?.length) {
//         throw new Error("Cart is empty");
//       }

//       const formattedAmount = Number(amount.toFixed(3));
//       const orderId = `ORD${Date.now()}${Math.random()
//         .toString(36)
//         .slice(2, 6)}`;

//       const payload = {
//         amount: formattedAmount,
//         orderId,
//         customerInfo: {
//           platform,
//           items: items.map((item) => ({
//             id: item.documentId,
//             name: item.name,
//             quantity: item.quantity,
//             price: Number((item.salesPrice || item.price).toFixed(3)),
//           })),
//         },
//       };

//       if (DEBUG) {
//         console.log("Payment Payload:", {
//           url: `${API_URL}/api/payments/initiate`,
//           payload,
//           timestamp: new Date().toISOString(),
//         });
//       }

//       try {
//         const response = await axiosInstance.post<PaymentResponse>(
//           "/api/payments/initiate",
//           payload,
//           {
//             headers: {
//               Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
//               "ngrok-skip-browser-warning": "true",
//             },
//           }
//         );

//         if (DEBUG) {
//           console.log("Payment Response:", {
//             status: response.status,
//             data: response.data,
//             timestamp: new Date().toISOString(),
//           });
//         }

//         if (!response.data?.paymentUrl) {
//           throw new Error("Invalid payment response from server");
//         }

//         return response.data;
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           const axiosError = error as AxiosError;
//           if (axiosError.response) {
//             // Server responded with error
//             throw new Error(
//               axiosError.response.data?.error ||
//                 axiosError.response.data?.message ||
//                 `Server error: ${axiosError.response.status}`
//             );
//           } else if (axiosError.request) {
//             // Request made but no response
//             if (axiosError.code === "ECONNABORTED") {
//               throw new Error("Payment request timed out. Please try again.");
//             }
//             throw new Error(
//               "Unable to reach payment server. Please check your connection and try again."
//             );
//           }
//         }
//         throw new Error("Payment initiation failed: " + error.message);
//       }
//     } catch (error: any) {
//       if (DEBUG) {
//         console.error("Payment Error:", {
//           message: error.message,
//           stack: error.stack,
//           timestamp: new Date().toISOString(),
//         });
//       }
//       throw error;
//     }
//   },

//   verifyPayment: async (
//     merchantTxnId: string
//   ): Promise<PaymentVerificationResponse> => {
//     // ... verification code remains the same
//   },
// };

// export default paymentApi;

/*************************************** */

// // services/api/payment/index.ts
// import axios, { AxiosError } from "axios";
// import { CartItem } from "../../../types/cart";
// import NetInfo from "@react-native-community/netinfo";

// const API_URL = process.env.EXPO_PUBLIC_API_URL;
// const DEBUG = process.env.EXPO_PUBLIC_DEBUG === "true";

// export interface PaymentResponse {
//   paymentId: string;
//   merchantTxnId: string;
//   paymentUrl: string;
// }

// export interface PaymentVerificationResponse {
//   MerchantTxnRefNo: string;
//   PaymentId: string;
//   ProcessDate: string | null;
//   StatusDescription: string;
//   BookeeyTrackId: string;
//   BankRefNo: string;
//   PaymentType: string;
//   ErrorCode: string;
//   ProductType: string;
//   finalStatus: "success" | "failed" | "cancelled" | "initiated" | "pending";
//   CardNo: string | null;
//   AuthCode: string | null;
//   PaymentLink: string;
// }

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     "ngrok-skip-browser-warning": "true",
//   },
//   timeout: 30000,
// });

// if (DEBUG) {
//   axiosInstance.interceptors.request.use(
//     (config) => {
//       const timestamp = new Date().toISOString();
//       console.log(`[${timestamp}] Request:`, {
//         url: config.url,
//         method: config.method,
//         headers: config.headers,
//         data: config.data,
//       });
//       return config;
//     },
//     (error) => {
//       console.error("Request Error:", error);
//       return Promise.reject(error);
//     }
//   );

//   axiosInstance.interceptors.response.use(
//     (response) => {
//       const timestamp = new Date().toISOString();
//       console.log(`[${timestamp}] Response:`, {
//         status: response.status,
//         data: response.data,
//       });
//       return response;
//     },
//     (error) => {
//       const timestamp = new Date().toISOString();
//       console.error(`[${timestamp}] Response Error:`, {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//       });
//       return Promise.reject(error);
//     }
//   );
// }

// export const paymentApi = {
//   initiatePayment: async (
//     amount: number,
//     items: CartItem[],
//     platform: string
//   ): Promise<PaymentResponse> => {
//     try {
//       const netInfo = await NetInfo.fetch();
//       if (!netInfo.isConnected) {
//         throw new Error("No internet connection");
//       }

//       if (!amount || amount <= 0) {
//         throw new Error("Invalid amount");
//       }
//       if (!items?.length) {
//         throw new Error("Cart is empty");
//       }

//       const formattedAmount = Number(amount.toFixed(3));
//       const orderId = `ORD${Date.now()}${Math.random()
//         .toString(36)
//         .slice(2, 6)}`;

//       const payload = {
//         amount: formattedAmount,
//         orderId,
//         customerInfo: {
//           platform,
//           items: items.map((item) => ({
//             id: item.documentId,
//             name: item.name,
//             quantity: item.quantity,
//             price: Number((item.salesPrice || item.price).toFixed(3)),
//           })),
//         },
//       };

//       try {
//         const { data } = await axiosInstance.post<PaymentResponse>(
//           "/api/payments/initiate",
//           payload
//         );

//         if (!data?.paymentUrl) {
//           throw new Error("Invalid payment response");
//         }

//         return data;
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           const axiosError = error as AxiosError;
//           if (axiosError.response) {
//             throw new Error(
//               axiosError.response.data?.error ||
//                 axiosError.response.data?.message ||
//                 `Server error: ${axiosError.response.status}`
//             );
//           }
//           if (axiosError.code === "ECONNABORTED") {
//             throw new Error("Request timeout");
//           }
//           throw new Error("Network error");
//         }
//         throw error;
//       }
//     } catch (error: any) {
//       if (DEBUG) {
//         console.error("Payment Error:", {
//           timestamp: new Date().toISOString(),
//           error: error.message,
//           stack: error.stack,
//         });
//       }
//       throw new Error(error.message || "Payment initiation failed");
//     }
//   },

//   verifyPayment: async (
//     merchantTxnId: string
//   ): Promise<PaymentVerificationResponse> => {
//     try {
//       if (!merchantTxnId) {
//         throw new Error("Transaction ID is required");
//       }

//       const netInfo = await NetInfo.fetch();
//       if (!netInfo.isConnected) {
//         throw new Error("No internet connection");
//       }

//       try {
//         const { data } = await axiosInstance.get<PaymentVerificationResponse>(
//           `/api/payments/verify/${merchantTxnId}`
//         );

//         if (!data?.finalStatus) {
//           throw new Error("Invalid verification response");
//         }

//         return data;
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           const axiosError = error as AxiosError;
//           if (axiosError.response) {
//             throw new Error(
//               axiosError.response.data?.error ||
//                 axiosError.response.data?.message ||
//                 "Verification failed"
//             );
//           }
//           if (axiosError.code === "ECONNABORTED") {
//             throw new Error("Verification request timeout");
//           }
//           throw new Error("Network error during verification");
//         }
//         throw error;
//       }
//     } catch (error: any) {
//       if (DEBUG) {
//         console.error("Verification Error:", {
//           timestamp: new Date().toISOString(),
//           merchantTxnId,
//           error: error.message,
//           stack: error.stack,
//         });
//       }
//       throw new Error(error.message || "Payment verification failed");
//     }
//   },
// };

// export default paymentApi;

/************************************************ */

// // services/api/payment/index.ts
// import axios, { AxiosError } from "axios";
// import { CartItem } from "../../../types/cart";
// import NetInfo from "@react-native-community/netinfo";

// const API_URL = process.env.EXPO_PUBLIC_API_URL?.trim();
// const DEBUG = process.env.EXPO_PUBLIC_DEBUG === "true";

// export interface PaymentResponse {
//   paymentId: string;
//   merchantTxnId: string;
//   paymentUrl: string;
// }

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     "ngrok-skip-browser-warning": "true",
//     // Add mobile-specific headers
//     "User-Agent": "Mobile-Payment-App",
//     Connection: "keep-alive",
//   },
//   timeout: 30000,
//   // Add specific axios configs for mobile
//   withCredentials: false,
//   validateStatus: (status) => status >= 200 && status < 300,
// });

// // Function to validate server connectivity
// const validateConnection = async () => {
//   try {
//     const netInfo = await NetInfo.fetch();
//     if (!netInfo.isConnected) {
//       throw new Error("No internet connection available");
//     }

//     if (!API_URL) {
//       throw new Error("API URL is not configured");
//     }

//     // Test server connection
//     await axios.get(`${API_URL}/api/health`, {
//       timeout: 5000,
//       headers: {
//         "ngrok-skip-browser-warning": "true",
//       },
//     });

//     return true;
//   } catch (error) {
//     console.error("Connection validation failed:", error);
//     return false;
//   }
// };

// export const paymentApi = {
//   initiatePayment: async (
//     amount: number,
//     items: CartItem[],
//     platform: string
//   ): Promise<PaymentResponse> => {
//     try {
//       // Validate connection first
//       const isConnected = await validateConnection();
//       if (!isConnected) {
//         throw new Error(
//           "Cannot connect to payment server. Please check your internet connection."
//         );
//       }

//       const formattedAmount = Number(amount.toFixed(3));
//       const orderId = `ORD${Date.now()}${Math.random()
//         .toString(36)
//         .slice(2, 6)}`;

//       const payload = {
//         data: {
//           amount: formattedAmount,
//           orderId,
//           customerInfo: {
//             platform,
//             items: items.map((item) => ({
//               id: item.documentId,
//               name: item.name,
//               quantity: item.quantity,
//               price: Number((item.salesPrice || item.price).toFixed(3)),
//             })),
//           },
//         },
//       };

//       if (DEBUG) {
//         console.log("Payment Request:", {
//           url: `${API_URL}/api/payments/initiate`,
//           payload,
//           headers: axiosInstance.defaults.headers,
//           timestamp: new Date().toISOString(),
//         });
//       }

//       // Make the request with explicit error handling
//       const response = await axiosInstance.post(
//         "/api/payments/initiate",
//         payload,
//         {
//           headers: {
//             ...axiosInstance.defaults.headers,
//             "X-Request-Time": new Date().toISOString(),
//           },
//         }
//       );

//       if (DEBUG) {
//         console.log("Payment Response:", {
//           status: response.status,
//           data: response.data,
//           timestamp: new Date().toISOString(),
//         });
//       }

//       if (!response.data?.data?.paymentUrl) {
//         throw new Error("Invalid payment response structure");
//       }

//       return response.data.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError;
//         if (DEBUG) {
//           console.error("Axios Error:", {
//             message: axiosError.message,
//             code: axiosError.code,
//             response: axiosError.response?.data,
//             status: axiosError.response?.status,
//             timestamp: new Date().toISOString(),
//           });
//         }

//         // Handle specific error cases
//         if (axiosError.code === "ECONNABORTED") {
//           throw new Error("Payment request timed out. Please try again.");
//         }
//         if (!axiosError.response) {
//           throw new Error(
//             "Cannot reach payment server. Please check your connection."
//           );
//         }
//         if (axiosError.response.status === 403) {
//           throw new Error("Access to payment server denied. Please try again.");
//         }
//         throw new Error(
//           axiosError.response.data?.error?.message ||
//             axiosError.response.data?.message ||
//             "Payment initiation failed"
//         );
//       }

//       throw new Error("Payment initiation failed: " + (error as Error).message);
//     }
//   },
// };

// export default paymentApi;

/******************************************* */

// // services/api/payment/index.ts
// import axios, { AxiosError } from "axios";
// import { CartItem } from "../../../types/cart";

// const API_URL = process.env.EXPO_PUBLIC_API_URL;
// const DEBUG = process.env.EXPO_PUBLIC_DEBUG === "true";

// export interface PaymentResponse {
//   paymentId: string;
//   merchantTxnId: string;
//   paymentUrl: string;
// }

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     "ngrok-skip-browser-warning": "true",
//     "User-Agent": "Mobile-Payment-App",
//   },
//   timeout: 30000,
// });

// export const paymentApi = {
//   initiatePayment: async (
//     amount: number,
//     items: CartItem[],
//     platform: string
//   ): Promise<PaymentResponse> => {
//     try {
//       // Format the payload exactly as it works in Postman
//       const payload = {
//         amount: Number(amount.toFixed(3)),
//         orderId: `ORD${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
//         customerInfo: {
//           platform,
//           items: items.map((item) => ({
//             id: item.documentId,
//             name: item.name,
//             quantity: item.quantity,
//             price: Number((item.salesPrice || item.price).toFixed(3)),
//           })),
//         },
//       };

//       if (DEBUG) {
//         console.log("Payment Request:", {
//           url: `${API_URL}/api/payments/initiate`,
//           payload,
//           headers: axiosInstance.defaults.headers,
//         });
//       }

//       const { data } = await axiosInstance.post<PaymentResponse>(
//         "/api/payments/initiate",
//         payload
//       );

//       if (!data?.paymentUrl) {
//         throw new Error("Invalid payment response");
//       }

//       return data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<any>;
//         console.error("Payment Error:", {
//           message: error.message,
//           response: error.response?.data,
//           status: error.response?.status,
//         });

//         // Handle specific error cases
//         if (error.response?.data?.error) {
//           throw new Error(
//             error.response.data.error.message || "Payment failed"
//           );
//         }
//         if (error.code === "ECONNABORTED") {
//           throw new Error("Request timeout");
//         }
//         if (!error.response) {
//           throw new Error("Network error");
//         }
//         throw new Error(error.message);
//       }
//       throw error;
//     }
//   },

//   verifyPayment: async (merchantTxnId: string): Promise<any> => {
//     try {
//       const { data } = await axiosInstance.get(
//         `/api/payments/verify/${merchantTxnId}`
//       );
//       return data;
//     } catch (error) {
//       console.error("Verification Error:", error);
//       throw error;
//     }
//   },
// };

// export default paymentApi;

/************************** */

// // services/api/payment/index.ts
// import axios, { AxiosError } from "axios";
// import { CartItem } from "../../../types/cart";
// import NetInfo from "@react-native-community/netinfo";

// const API_URL = process.env.EXPO_PUBLIC_API_URL?.trim();
// const DEBUG = process.env.EXPO_PUBLIC_DEBUG === "true";

// // Add retry logic
// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     "ngrok-skip-browser-warning": "true",
//     "User-Agent": "Mobile-Payment-App",
//   },
//   timeout: 30000,
// });

// // Add request interceptor to check network
// axiosInstance.interceptors.request.use(async (config) => {
//   const netInfo = await NetInfo.fetch();
//   if (!netInfo.isConnected) {
//     return Promise.reject(new Error("No internet connection"));
//   }
//   return config;
// });

// export const paymentApi = {
//   initiatePayment: async (
//     amount: number,
//     items: CartItem[],
//     platform: string
//   ) => {
//     try {
//       // Validate inputs first
//       if (!amount || amount <= 0) {
//         throw new Error("Invalid amount");
//       }
//       if (!items?.length) {
//         throw new Error("No items in cart");
//       }

//       const payload = {
//         amount: Number(amount.toFixed(3)),
//         orderId: `ORD${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
//         customerInfo: {
//           platform,
//           items: items.map((item) => ({
//             id: item.documentId,
//             name: item.name,
//             quantity: item.quantity,
//             price: Number((item.salesPrice || item.price).toFixed(3)),
//           })),
//         },
//       };

//       if (DEBUG) {
//         console.log("Payment Request:", {
//           url: `${API_URL}/api/payments/initiate`,
//           payload,
//           headers: axiosInstance.defaults.headers,
//           timestamp: new Date().toISOString(),
//         });
//       }

//       const { data } = await axiosInstance.post(
//         "/api/payments/initiate",
//         payload,
//         {
//           timeout: 30000,
//           headers: {
//             ...axiosInstance.defaults.headers,
//             "Cache-Control": "no-cache",
//             Pragma: "no-cache",
//           },
//         }
//       );

//       if (!data?.paymentUrl) {
//         throw new Error("Invalid payment response");
//       }

//       return data;
//     } catch (error) {
//       if (DEBUG) {
//         console.error("Payment Error:", {
//           message: error.message,
//           response: error.response?.data,
//           status: error.response?.status,
//           timestamp: new Date().toISOString(),
//         });
//       }

//       if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError;
//         if (!axiosError.response) {
//           throw new Error(
//             "Cannot connect to payment server. Please check your internet connection."
//           );
//         }
//         if (axiosError.code === "ECONNABORTED") {
//           throw new Error("Payment request timed out. Please try again.");
//         }
//         throw new Error(
//           axiosError.response?.data?.error?.message ||
//             axiosError.response?.data?.message ||
//             "Payment service unavailable"
//         );
//       }

//       throw error;
//     }
//   },
// };

// export default paymentApi;

/*************************************** */

// services/api/payment/index.ts
import axios from "axios";
import { CartItem } from "../../../types/cart";

const API_URL = "https://db17-37-39-223-53.ngrok-free.app";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    Accept: "application/json",
  },
  timeout: 30000,
});

export interface PaymentResponse {
  paymentId: number;
  merchantTxnId: string;
  paymentUrl: string;
}

export const paymentApi = {
  initiatePayment: async (
    amount: number,
    items: CartItem[],
    platform: string
  ): Promise<PaymentResponse> => {
    try {
      const payload = {
        amount: Number(amount.toFixed(3)),
        orderId: `ORD${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
        customerInfo: {
          platform,
          items: items.map((item) => ({
            id: item.documentId,
            name: item.name,
            quantity: item.quantity,
            price: Number((item.salesPrice || item.price).toFixed(3)),
          })),
        },
      };

      const { data } = await axiosInstance.post<PaymentResponse>(
        "/api/payments/initiate",
        payload
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
};
