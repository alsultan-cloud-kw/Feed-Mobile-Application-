// import axios from "axios";
// import { useInfiniteQuery } from "@tanstack/react-query";

// export interface Product {
//   id: string;
//   documentId: string;
//   name: string;
//   Category: string;
//   Subcategory: string;
//   price: number | null;
//   description?: string;
//   primaryImage?: {
//     formats?: {
//       thumbnail?: {
//         url?: string;
//       };
//       large?: {
//         url?: string;
//       };
//     };
//   }[];
// }

// interface ProductsResponse {
//   data: Product[];
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

// const ITEMS_PER_PAGE = 10;

// const fetchProducts = async ({ pageParam = 1 }) => {
//   try {
//     const response = await axios.get<ProductsResponse>(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products`,
//       {
//         params: {
//           populate: "*",
//           "pagination[page]": pageParam,
//           "pagination[pageSize]": ITEMS_PER_PAGE,
//         },
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//         },
//       }
//     );

//     // Normalize the data
//     const normalizedData = response.data.data.map((item) => ({
//       ...item,
//       price: item.price ? Number(item.price) : null,
//       documentId: item.documentId || item.id,
//     }));

//     return {
//       data: normalizedData,
//       pageParams: pageParam,
//       meta: response.data.meta,
//     };
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw new Error("Failed to fetch products");
//   }
// };

// export const fetchProductDetails = async (
//   documentId: string
// ): Promise<Product> => {
//   try {
//     const response = await axios.get<{ data: Product }>(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products/${documentId}`,
//       {
//         params: { populate: "*" },
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//         },
//       }
//     );

//     const productData = response.data.data;
//     return {
//       ...productData,
//       price: productData.price ? Number(productData.price) : null,
//       documentId: productData.documentId || productData.id,
//     };
//   } catch (error) {
//     console.error("Error fetching product details:", error);
//     throw new Error("Failed to fetch product details");
//   }
// };

// export const fetchSimilarProducts = async (
//   category: string,
//   currentProductId: string,
//   pageParam = 1
// ) => {
//   if (!category || !currentProductId) {
//     return {
//       data: [],
//       nextPage: undefined,
//     };
//   }

//   try {
//     const response = await axios.get<ProductsResponse>(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products`,
//       {
//         params: {
//           populate: "*",
//           "filters[Category][$eq]": category,
//           "filters[id][$ne]": currentProductId,
//           "pagination[page]": pageParam,
//           "pagination[pageSize]": 4,
//         },
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//         },
//       }
//     );

//     const normalizedData = response.data.data.map((item) => ({
//       ...item,
//       price: item.price ? Number(item.price) : null,
//       documentId: item.documentId || item.id,
//     }));

//     return {
//       data: normalizedData,
//       nextPage:
//         response.data.meta.pagination.page <
//         response.data.meta.pagination.pageCount
//           ? pageParam + 1
//           : undefined,
//     };
//   } catch (error) {
//     console.error("Error fetching similar products:", error);
//     return {
//       data: [],
//       nextPage: undefined,
//     };
//   }
// };

// export const useInfiniteProducts = () => {
//   return useInfiniteQuery({
//     queryKey: ["products"],
//     queryFn: fetchProducts,
//     getNextPageParam: (lastPage) => {
//       const { meta } = lastPage;
//       if (meta.pagination.page < meta.pagination.pageCount) {
//         return lastPage.pageParams + 1;
//       }
//       return undefined;
//     },
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });
// };

/******************************** */

// import axios from "axios";
// import { useInfiniteQuery } from "@tanstack/react-query";

// export interface Product {
//   id: string;
//   documentId: string;
//   name: string;
//   Category: string;
//   Subcategory: string;
//   price: number | null;
//   description?: string;
//   primaryImage?: {
//     formats?: {
//       thumbnail?: {
//         url?: string;
//       };
//       large?: {
//         url?: string;
//       };
//     };
//   }[];
// }

// export interface FilterState {
//   category: string | null;
//   subcategories: string[];
// }

// interface ProductsResponse {
//   data: Product[];
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

// const ITEMS_PER_PAGE = 10;

// export const useInfiniteProducts = ({ filters }: { filters: FilterState }) => {
//   return useInfiniteQuery({
//     queryKey: ["products", filters],
//     queryFn: async ({ pageParam = 1 }) => {
//       try {
//         const response = await axios.get<ProductsResponse>(
//           `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products`,
//           {
//             params: {
//               populate: "*",
//               "pagination[page]": pageParam,
//               "pagination[pageSize]": ITEMS_PER_PAGE,
//               ...(filters.category && {
//                 "filters[Category][$eq]": filters.category,
//               }),
//               ...(filters.subcategories.length > 0 && {
//                 "filters[Subcategory][$in]": filters.subcategories,
//               }),
//             },
//             headers: {
//               Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//             },
//           }
//         );

//         // Normalize the data
//         const normalizedData = response.data.data.map((item) => ({
//           ...item,
//           price: item.price ? Number(item.price) : null,
//           documentId: item.documentId || item.id,
//         }));

//         return {
//           data: normalizedData,
//           pageParams: pageParam,
//           meta: response.data.meta,
//         };
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         throw new Error("Failed to fetch products");
//       }
//     },
//     getNextPageParam: (lastPage) => {
//       const { meta } = lastPage;
//       if (meta.pagination.page < meta.pagination.pageCount) {
//         return lastPage.pageParams + 1;
//       }
//       return undefined;
//     },
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });
// };

/****************************************** */

// import axios from "axios";
// import { useInfiniteQuery } from "@tanstack/react-query";

// export interface Product {
//   id: string;
//   documentId: string;
//   name: string;
//   Category: string;
//   Subcategory: string;
//   price: number | null;
//   description?: string;
//   primaryImage?: {
//     formats?: {
//       thumbnail?: {
//         url?: string;
//       };
//       large?: {
//         url?: string;
//       };
//       medium?: {
//         url?: string;
//       };
//       small?: {
//         url?: string;
//       };
//     };
//     url?: string;
//   }[];
// }

// export interface FilterState {
//   category: string | null;
//   subcategories: string[];
// }

// interface ProductsResponse {
//   data: Product[];
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

// const ITEMS_PER_PAGE = 10;

// const api = axios.create({
//   baseURL: process.env.EXPO_PUBLIC_STRAPI_API_URL,
//   headers: {
//     Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//   },
// });

// export const fetchProductDetails = async (
//   documentId: string
// ): Promise<Product> => {
//   try {
//     const response = await api.get<{ data: Product }>(
//       `/api/products/${documentId}`,
//       {
//         params: { populate: "*" },
//       }
//     );

//     const productData = response.data.data;
//     return {
//       ...productData,
//       price: productData.price ? Number(productData.price) : null,
//       documentId: productData.documentId || productData.id,
//     };
//   } catch (error) {
//     console.error("Error fetching product details:", error);
//     throw new Error("Failed to fetch product details");
//   }
// };

// // export const fetchSimilarProducts = async (
// //   category: string,
// //   currentProductId: string,
// //   pageParam = 1
// // ) => {
// //   try {
// //     const response = await api.get<ProductsResponse>("/api/products", {
// //       params: {
// //         populate: "*",
// //         "filters[Category][$eq]": category,
// //         "filters[id][$ne]": currentProductId,
// //         "pagination[page]": pageParam,
// //         "pagination[pageSize]": 4,
// //       },
// //     });

// //     const normalizedData = response.data.data.map((item) => ({
// //       ...item,
// //       price: item.price ? Number(item.price) : null,
// //       documentId: item.documentId || item.id,
// //     }));

// //     return {
// //       data: normalizedData,
// //       nextPage:
// //         response.data.meta.pagination.page <
// //         response.data.meta.pagination.pageCount
// //           ? pageParam + 1
// //           : undefined,
// //     };
// //   } catch (error) {
// //     console.error("Error fetching similar products:", error);
// //     return {
// //       data: [],
// //       nextPage: undefined,
// //     };
// //   }
// // };

// export const fetchSimilarProducts = async (
//   category: string,
//   currentProductId: string,
//   pageParam = 1
// ) => {
//   try {
//     // Add debugging
//     console.log("Fetching similar products:", {
//       category,
//       currentProductId,
//       pageParam,
//       apiUrl: api.defaults.baseURL,
//     });

//     const response = await api.get<ProductsResponse>("/api/products", {
//       params: {
//         populate: "*",
//         "filters[Category][$eq]": category,
//         // Change this to use documentId instead of id
//         "filters[documentId][$ne]": currentProductId,
//         "pagination[page]": pageParam,
//         "pagination[pageSize]": 4,
//       },
//     });

//     // Add response logging
//     console.log("Similar products response:", {
//       status: response.status,
//       dataLength: response.data.data.length,
//       pagination: response.data.meta.pagination,
//     });

//     const normalizedData = response.data.data.map((item) => ({
//       ...item,
//       price: item.price ? Number(item.price) : null,
//       documentId: item.documentId || item.id,
//     }));

//     return {
//       data: normalizedData,
//       nextPage:
//         response.data.meta.pagination.page <
//         response.data.meta.pagination.pageCount
//           ? pageParam + 1
//           : undefined,
//     };
//   } catch (error) {
//     // Improve error logging
//     if (axios.isAxiosError(error)) {
//       console.error("Axios error fetching similar products:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//         config: {
//           url: error.config?.url,
//           params: error.config?.params,
//         },
//       });
//     } else {
//       console.error("Error fetching similar products:", error);
//     }

//     // Throw the error instead of returning empty data
//     throw error;
//   }
// };

// export const useInfiniteProducts = ({ filters }: { filters: FilterState }) => {
//   return useInfiniteQuery({
//     queryKey: ["products", filters],
//     queryFn: async ({ pageParam = 1 }) => {
//       try {
//         const response = await api.get<ProductsResponse>("/api/products", {
//           params: {
//             populate: "*",
//             "pagination[page]": pageParam,
//             "pagination[pageSize]": ITEMS_PER_PAGE,
//             ...(filters.category && {
//               "filters[Category][$eq]": filters.category,
//             }),
//             ...(filters.subcategories.length > 0 && {
//               "filters[Subcategory][$in]": filters.subcategories,
//             }),
//           },
//         });

//         const normalizedData = response.data.data.map((item) => ({
//           ...item,
//           price: item.price ? Number(item.price) : null,
//           documentId: item.documentId || item.id,
//         }));

//         return {
//           data: normalizedData,
//           pageParams: pageParam,
//           meta: response.data.meta,
//         };
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         throw new Error("Failed to fetch products");
//       }
//     },
//     getNextPageParam: (lastPage) => {
//       const { meta } = lastPage;
//       if (meta.pagination.page < meta.pagination.pageCount) {
//         return lastPage.pageParams + 1;
//       }
//       return undefined;
//     },
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });
// };

// // Helper function to get best available image URL
// export const getBestAvailableImageUrl = (product: Product): string | null => {
//   if (!product?.primaryImage?.[0]) return null;

//   const formats = product.primaryImage[0].formats;
//   return (
//     formats?.large?.url ||
//     formats?.medium?.url ||
//     formats?.small?.url ||
//     formats?.thumbnail?.url ||
//     product.primaryImage[0].url ||
//     null
//   );
// };

/************************************* */

import axios from "axios";

export interface Product {
  id: string;
  documentId: string;
  name: string;
  Category: string;
  Subcategory: string;
  price: number | null;
  description?: string;
  primaryImage?: {
    formats?: {
      thumbnail?: { url?: string };
      small?: { url?: string };
      medium?: { url?: string };
      large?: { url?: string };
    };
    url?: string;
  }[];
}

export interface FilterState {
  category: string | null;
  subcategories: string[];
}

interface ProductsResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const ITEMS_PER_PAGE = 10;

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_STRAPI_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
  },
  timeout: 10000, // Added request timeout
});

export const fetchProductDetails = async (
  documentId: string
): Promise<Product> => {
  if (!documentId) throw new Error("Document ID is required");
  try {
    const response = await api.get<{ data: Product }>(
      `/api/products/${documentId}`,
      {
        params: { populate: "*" },
      }
    );
    const productData = response.data.data;
    return {
      ...productData,
      price: productData.price ? Number(productData.price) : null,
      documentId: productData.documentId || productData.id,
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw new Error("Failed to fetch product details");
  }
};

export const fetchSimilarProducts = async (
  category: string,
  currentProductId: string,
  pageParam = 1
): Promise<{ data: Product[]; nextPage: number | undefined }> => {
  if (!category || !currentProductId) {
    throw new Error("Category and product ID are required");
  }
  try {
    const response = await api.get<ProductsResponse>("/api/products", {
      params: {
        populate: "*",
        "filters[Category][$eq]": category,
        "filters[documentId][$ne]": currentProductId,
        "pagination[page]": pageParam,
        "pagination[pageSize]": 4,
      },
    });

    const normalizedData = response.data.data.map((item) => ({
      ...item,
      price: item.price ? Number(item.price) : null,
      documentId: item.documentId || item.id,
    }));

    return {
      data: normalizedData,
      nextPage:
        response.data.meta.pagination.page <
        response.data.meta.pagination.pageCount
          ? pageParam + 1
          : undefined,
    };
  } catch (error) {
    console.error("Error fetching similar products:", {
      message: axios.isAxiosError(error) ? error.message : String(error),
      status: axios.isAxiosError(error) ? error.response?.status : undefined,
    });
    throw new Error("Failed to fetch similar products");
  }
};

export const fetchProducts = async (
  filters: FilterState,
  pageParam = 1
): Promise<{ data: Product[]; nextPage: number | undefined }> => {
  try {
    const response = await api.get<ProductsResponse>("/api/products", {
      params: {
        populate: "*",
        "pagination[page]": pageParam,
        "pagination[pageSize]": ITEMS_PER_PAGE,
        ...(filters.category && { "filters[Category][$eq]": filters.category }),
        ...(filters.subcategories.length > 0 && {
          "filters[Subcategory][$in]": filters.subcategories,
        }),
      },
    });

    const normalizedData = response.data.data.map((item) => ({
      ...item,
      price: item.price ? Number(item.price) : null,
      documentId: item.documentId || item.id,
    }));

    return {
      data: normalizedData,
      nextPage:
        response.data.meta.pagination.page <
        response.data.meta.pagination.pageCount
          ? pageParam + 1
          : undefined,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const getBestAvailableImageUrl = (product: Product): string | null => {
  if (!product?.primaryImage?.[0]) return null;
  const formats = product.primaryImage[0].formats;
  return (
    formats?.large?.url ||
    formats?.medium?.url ||
    formats?.small?.url ||
    formats?.thumbnail?.url ||
    product.primaryImage[0].url ||
    null
  );
};
