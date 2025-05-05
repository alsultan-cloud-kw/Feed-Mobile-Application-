// // services/bookeeyPayment.ts
// import axios from "axios";
// import { SHA512 } from "crypto-js";
// // import Config from "@env";

// interface BookeeyConfig {
//   merchantId: string;
//   secretKey: string;
//   successUrl: string;
//   failureUrl: string;
//   isSandbox?: boolean;
// }

// class BookeeyPaymentService {
//   private config: BookeeyConfig;
//   private baseUrl: string;

//   constructor(config: BookeeyConfig) {
//     this.config = config;
//     this.baseUrl = config.isSandbox
//       ? "https://demo.bookeey.com/pgapi/api"
//       : "https://pg.bookeey.com/internalapi/api";
//   }

//   private generateHashMac(
//     txnRef: string,
//     amount: number,
//     rndNum: string
//   ): string {
//     const sequence = [
//       this.config.merchantId,
//       txnRef,
//       this.config.successUrl,
//       this.config.failureUrl,
//       amount.toFixed(3),
//       "GEN",
//       this.config.secretKey,
//       rndNum,
//     ].join("|");

//     return SHA512(sequence).toString();
//   }

//   private generateTxnRef(): string {
//     return `MOB${Date.now()}${Math.floor(Math.random() * 1000)}`;
//   }

//   async initiatePayment(
//     amount: number,
//     customerInfo?: {
//       name?: string;
//       phone?: string;
//       platform?: string;
//       orderId?: string;
//     }
//   ) {
//     const txnRef = this.generateTxnRef();
//     const rndNum = Math.floor(Math.random() * 10000000000).toString();
//     const hashMac = this.generateHashMac(txnRef, amount, rndNum);

//     const payload = {
//       DBRqst: "PY_ECom",
//       Do_Appinfo: {
//         APPTyp: "MOB",
//         AppVer: "1.0",
//         OS: "React Native",
//       },
//       Do_MerchDtl: {
//         BKY_PRDENUM: "ECom",
//         MerchUID: this.config.merchantId,
//         SURL: this.config.successUrl,
//         FURL: this.config.failureUrl,
//       },
//       Do_PyrDtl: {
//         Pyr_MPhone: customerInfo?.phone || "",
//         Pyr_Name: customerInfo?.name || "",
//       },
//       Do_TxnDtl: [
//         {
//           SubMerchUID: this.config.merchantId,
//           Txn_AMT: amount.toFixed(3),
//         },
//       ],
//       Do_TxnHdr: {
//         Merch_Txn_UID: txnRef,
//         PayFor: "ECom",
//         PayMethod: "knet",
//         Txn_HDR: rndNum,
//         hashMac: hashMac,
//       },
//       Do_MoreDtl: {
//         Cust_Data1: customerInfo?.platform || "MOBILE_APP",
//         Cust_Data2: customerInfo?.orderId || "",
//       },
//     };

//     try {
//       const response = await axios.post(
//         `${this.baseUrl}/payment/requestLink`,
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       return response.data;
//     } catch (error) {
//       console.error("Bookeey payment initiation error:", error);
//       throw error;
//     }
//   }

//   async checkPaymentStatus(merchantTxnRef: string) {
//     const hashMac = SHA512(
//       `${this.config.merchantId}|${this.config.secretKey}`
//     ).toString();

//     try {
//       const response = await axios.post(
//         `${this.baseUrl}/payment/paymentstatus`,
//         {
//           Mid: this.config.merchantId,
//           MerchantTxnRefNo: [merchantTxnRef],
//           HashMac: hashMac,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       return response.data;
//     } catch (error) {
//       console.error("Payment status check error:", error);
//       throw error;
//     }
//   }
// }

// export default BookeeyPaymentService;

/**************************************************** */

import axios from "axios";
import { SHA512 } from "crypto-js";

interface BookeeyConfig {
  merchantId: string;
  secretKey: string;
  successUrl: string;
  failureUrl: string;
  isSandbox?: boolean;
}

class BookeeyPaymentService {
  private config: BookeeyConfig;
  private baseUrl: string;

  constructor(config: BookeeyConfig) {
    this.config = config;
    this.baseUrl = config.isSandbox
      ? "https://demo.bookeey.com/pgapi/api"
      : "https://pg.bookeey.com/internalapi/api";
  }

  private generateHashMac(
    txnRef: string,
    amount: number,
    rndNum: string
  ): string {
    // Format amount to 3 decimal places without rounding
    const formattedAmount = Number(amount.toFixed(3)).toString();

    // Sequence as per documentation:
    // MerchUID|Merch_Txn_UID|SURL|FURL|Txn_AMT|crossCat|secret_key|rndnum
    const sequence = [
      this.config.merchantId,
      txnRef,
      this.config.successUrl,
      this.config.failureUrl,
      formattedAmount,
      "GEN",
      this.config.secretKey,
      rndNum,
    ].join("|");

    return SHA512(sequence).toString().toLowerCase();
  }

  private generateTxnRef(): string {
    return `MOB${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }

  async initiatePayment(
    amount: number,
    customerInfo?: {
      name?: string;
      phone?: string;
      platform?: string;
      orderId?: string;
    }
  ) {
    try {
      const txnRef = this.generateTxnRef();
      const rndNum = Date.now().toString();
      const hashMac = this.generateHashMac(txnRef, amount, rndNum);

      const payload = {
        DBRqst: "PY_ECom",
        Do_Appinfo: {
          APPTyp: "MOB",
          AppVer: "1.0",
          APIVer: "2.1",
          Country: "KW",
          IPAddrs: "",
          OS: customerInfo?.platform || "MOBILE_APP",
          APPID: "",
          MdlID: "",
        },
        Do_MerchDtl: {
          BKY_PRDENUM: "ECom",
          MerchUID: this.config.merchantId,
          SURL: this.config.successUrl,
          FURL: this.config.failureUrl,
        },
        Do_PyrDtl: {
          Pyr_MPhone: customerInfo?.phone || "",
          ISDNCD: "965",
          Pyr_Name: customerInfo?.name || "",
        },
        Do_TxnDtl: [
          {
            SubMerchUID: this.config.merchantId,
            Txn_AMT: Number(amount.toFixed(3)).toString(),
          },
        ],
        Do_TxnHdr: {
          Merch_Txn_UID: txnRef,
          PayFor: "ECom",
          PayMethod: "knet",
          Txn_HDR: rndNum,
          hashMac: hashMac,
        },
      };

      console.log("Sending payment request:", {
        url: `${this.baseUrl}/payment/requestLink`,
        payload,
      });

      const response = await axios.post(
        `${this.baseUrl}/payment/requestLink`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data?.PayUrl) {
        throw new Error(
          response.data?.ErrorMessage || "Invalid payment response"
        );
      }

      return response.data;
    } catch (error: any) {
      console.error("Bookeey payment initiation error:", {
        message: error.message,
        response: error.response?.data,
      });
      throw new Error(error.response?.data?.ErrorMessage || error.message);
    }
  }

  async checkPaymentStatus(merchantTxnRef: string) {
    try {
      const hashMac = SHA512(
        `${this.config.merchantId}|${this.config.secretKey}`
      )
        .toString()
        .toLowerCase();

      const response = await axios.post(
        `${this.baseUrl}/payment/paymentstatus`,
        {
          Mid: this.config.merchantId,
          MerchantTxnRefNo: [merchantTxnRef],
          HashMac: hashMac,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error("Payment status check error:", error);
      throw new Error(error.response?.data?.ErrorMessage || error.message);
    }
  }
}

export default BookeeyPaymentService;
