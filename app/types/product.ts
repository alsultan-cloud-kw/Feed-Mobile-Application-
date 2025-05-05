// // types.ts
// export interface Product {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   imageUrl: string;
//   category: string;
//   subcategory: string;
//   locale: string;
//   date: string;
// }

// types.ts
export default interface Product {
  id: number;
  documentId: string;
  name: string;
  price: number;
  description: string | null;
  Category: string;
  Subcategory: string;
  locale: string;
  Date: string;
  primaryImage: Array<{
    formats: {
      large: {
        url: string;
      };
    };
  }>;
}
