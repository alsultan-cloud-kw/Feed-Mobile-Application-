// import axios from "axios";
// import { useInfiniteQuery } from "@tanstack/react-query";

// export interface Product {
//   id: string;
//   documentId: string;
//   name: string;
//   price: number;
//   Category: string;
//   Subcategory: string;
//   description?: string;
//   primaryImage?: Array<{
//     formats: {
//       large: { url: string };
//     };
//   }>;
// }

// interface ProductResponse {
//   data: Product[];
//   meta: {
//     pagination: {
//       page: number;
//       pageCount: number;
//       pageSize: number;
//       total: number;
//     };
//   };
// }

// export const productsApi = {
//   getProducts: async ({ pageParam = 1 }): Promise<ProductResponse> => {
//     const response = await axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products`,
//       {
//         params: {
//           populate: "*",
//           "pagination[page]": pageParam,
//           "pagination[pageSize]": 10,
//         },
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//         },
//       }
//     );
//     return response.data;
//   },

//   getProductDetails: async (documentId: string): Promise<Product> => {
//     const response = await axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products/${documentId}?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//         },
//       }
//     );
//     return response.data.data;
//   },
// };

// export const useInfiniteProducts = () => {
//   return useInfiniteQuery({
//     queryKey: ["products"],
//     queryFn: productsApi.getProducts,
//     getNextPageParam: (lastPage) => {
//       const { pagination } = lastPage.meta;
//       return pagination.page < pagination.pageCount
//         ? pagination.page + 1
//         : undefined;
//     },
//     staleTime: 1000 * 60 * 5, // 5 minutes cache
//     cacheTime: 1000 * 60 * 30, // 30 minutes
//   });
// };

/*********************************************** */

import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface Product {
  id: string;
  documentId: string;
  name: string;
  price: number;
  Category: string;
  Subcategory: string;
  description?: string;
  primaryImage?: Array<{
    formats: {
      large: { url: string };
    };
  }>;
}

interface ProductResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

export const productsApi = {
  getProducts: async ({
    pageParam = 1,
    filterParams = {},
  }): Promise<ProductResponse> => {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products`,
      {
        params: {
          populate: "*",
          "pagination[page]": pageParam,
          "pagination[pageSize]": 10,
          ...filterParams, // Spread filter parameters
        },
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
        },
      }
    );
    return response.data;
  },

  getProductDetails: async (documentId: string): Promise<Product> => {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products/${documentId}?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
        },
      }
    );
    return response.data.data;
  },
};

export const useInfiniteProducts = (filterParams = {}) => {
  return useInfiniteQuery({
    queryKey: ["products", filterParams], // Include filters in query key
    queryFn: ({ pageParam = 1 }) => {
      return productsApi.getProducts({
        pageParam,
        filterParams,
      });
    },
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage.meta;
      return pagination.page < pagination.pageCount
        ? pagination.page + 1
        : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};
