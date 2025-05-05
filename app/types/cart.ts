// types/product.ts
export interface Product {
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

// export interface CartItem extends Omit<Product, "primaryImage"> {
//   quantity: number;
//   imageUrl: string; // This comes from primaryImage[0].formats.large.url
//   salesPrice?: number;
// }

export interface CartItem {
  documentId: string;
  name: string;
  price: number;
  salesPrice?: number;
  quantity: number;
}

export interface PromoCode {
  id: number;
  documentId: string;
  code: string;
  CTA: string;
  amount: number;
  type: "fixed" | "percentage";
  IsActive: boolean;
}

// For your cart store
export interface CartStore {
  items: CartItem[];
  total: number;
  itemCount: number;
  discountedTotal: number;
  appliedCoupon: PromoCode | null;
  addToCart: (product: Product) => void;
  removeFromCart: (documentId: string) => void;
  updateQuantity: (documentId: string, quantity: number) => void;
  applyCoupon: (coupon: PromoCode) => void;
  removeCoupon: () => void;
  clearCart: () => void;
}

// For payment related types
export interface PaymentInitiationRequest {
  amount: number;
  orderId: string;
  customerInfo: {
    platform: string;
    items: Array<{
      id: string;
      name: string;
      quantity: number;
      price: number;
    }>;
  };
}

export interface PaymentResponse {
  paymentId: string;
  merchantTxnId: string;
  paymentUrl: string;
}

export interface PaymentVerificationResponse {
  MerchantTxnRefNo: string;
  PaymentId: string;
  ProcessDate: string | null;
  StatusDescription: string;
  BookeeyTrackId: string;
  BankRefNo: string;
  PaymentType: string;
  ErrorCode: string;
  ProductType: string;
  finalStatus: "success" | "failed" | "cancelled" | "initiated" | "pending";
  CardNo: string | null;
  AuthCode: string | null;
  PaymentLink: string;
}

// Optional: Environment variables type for better TypeScript support
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_STRAPI_API_URL: string;
      EXPO_PUBLIC_STRAPI_API_TOKEN_COUPON: string;
      EXPO_PUBLIC_API_URL: string;
    }
  }
}
