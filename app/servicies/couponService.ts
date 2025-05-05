// services/couponService.ts
import axios from "axios";

interface CouponResponse {
  data: Array<{
    id: number;
    documentId: string;
    code: string;
    CTA: string;
    amount: number;
    type: "fixed" | "percentage";
    IsActive: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

class CouponService {
  private static instance: CouponService;
  private apiUrl = process.env.EXPO_PUBLIC_STRAPI_API_URL;
  private token = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_COUPON;

  private constructor() {}

  static getInstance(): CouponService {
    if (!CouponService.instance) {
      CouponService.instance = new CouponService();
    }
    return CouponService.instance;
  }

  async fetchCoupons(): Promise<CouponResponse> {
    try {
      const response = await axios.get(`${this.apiUrl}/api/promo-codes`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching coupons:", error);
      throw error;
    }
  }

  validateCoupon(
    couponCode: string,
    coupons: CouponResponse["data"]
  ): {
    isValid: boolean;
    coupon?: CouponResponse["data"][0];
    error?: string;
  } {
    const coupon = coupons.find(
      (c) => c.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (!coupon) {
      return { isValid: false, error: "Invalid coupon code" };
    }

    if (!coupon.IsActive) {
      return { isValid: false, error: "This coupon has expired" };
    }

    return { isValid: true, coupon };
  }
}

export default CouponService.getInstance();
