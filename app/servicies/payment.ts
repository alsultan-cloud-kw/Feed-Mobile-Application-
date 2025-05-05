interface PaymentRequest {
  DBRqst: string;
  Do_Appinfo: {
    APIVer: string;
    APPID: string;
    APPTyp: string;
    AppVer: string;
    Country: string;
    DevcType: string;
    HsCode: string;
    IPAddrs: string;
    MdlID: string;
    OS: string;
    UsrSessID: string;
  };
  Do_MerchDtl: {
    BKY_PRDENUM: string;
    FURL: string;
    MerchUID: string;
    SURL: string;
  };
  Do_PyrDtl: {
    Pyr_MPhone: string;
    Pyr_Name: string;
    Emailid?: string;
    ISDNCD?: string;
  };
  Do_TxnDtl: Array<{
    SubMerchUID: string;
    Txn_AMT: string;
  }>;
  Do_TxnHdr: {
    BKY_Txn_UID: string;
    Merch_Txn_UID: string;
    PayFor: string;
    PayMethod: string;
    Txn_HDR: string;
    hashMac: string;
  };
}

// export const createPaymentRequest = (
//   formData: FormData,
//   orderId: string,
//   amount: number,
//   merchantId: string
// ): PaymentRequest => {
//   const txnHDR = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
//   const rndnum = Math.random().toString(36).slice(2);
//   const sequence = `${merchantId}|${orderId}|${SURL}|${FURL}|${amount.toFixed(
//     3
//   )}|GEN|${SECRET_KEY}|${rndnum}`;
//   const hashMac = CryptoJS.SHA512(sequence).toString(CryptoJS.enc.Hex);

//   return {
//     DBRqst: "PY_ECom",
//     Do_Appinfo: {
//       APIVer: "2.1",
//       APPID: "PG",
//       APPTyp: "MOB",
//       AppVer: "1.0",
//       Country: "KW",
//       DevcType: "5",
//       HsCode: "",
//       IPAddrs: "",
//       MdlID: "Pay_Req",
//       OS: Platform.OS === "ios" ? "iOS" : "Android",
//       UsrSessID: "",
//     },
//     Do_MerchDtl: {
//       BKY_PRDENUM: "ECom",
//       FURL: FURL,
//       MerchUID: merchantId,
//       SURL: SURL,
//     },
//     Do_PyrDtl: {
//       Pyr_Name: `${formData.firstName} ${formData.lastName}`.trim(),
//       Pyr_MPhone: formData.phone.replace(/[^0-9]/g, ""),
//       Emailid: formData.email,
//       ISDNCD: "965",
//     },
//     Do_TxnDtl: [
//       {
//         SubMerchUID: merchantId,
//         Txn_AMT: amount.toFixed(3),
//       },
//     ],
//     Do_TxnHdr: {
//       BKY_Txn_UID: "",
//       Merch_Txn_UID: orderId,
//       PayFor: "ECom",
//       PayMethod: "KNET",
//       Txn_HDR: txnHDR,
//       hashMac: hashMac,
//     },
//   };
// };
