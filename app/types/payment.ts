// // types/payment.ts
// export interface PaymentInitiationData {
//   amount: number;
//   customerInfo: {
//     platform: string;
//     items: Array<{
//       id: string;
//       name: string;
//       quantity: number;
//       price: number;
//     }>;
//   };
// }

// export interface PaymentStatus {
//   finalStatus: "success" | "failed" | "cancelled" | "pending";
//   PaymentId?: string;
//   StatusDescription?: string;
//   BookeeyTrackId?: string;
//   ErrorCode?: string;
//   ErrorMessage?: string;
// }

/*********************************** */

// types/payment.ts
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
