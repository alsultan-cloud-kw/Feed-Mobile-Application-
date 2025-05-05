declare global {
  namespace ReactNavigation {
    interface RootParamList {
      "(tabs)": undefined;
      "order-success": undefined;
      "order-failed": undefined;
      Checkout: undefined;
      payment: {
        status?: string;
        merchantTxnId?: string;
        txnId?: string;
        errorCode?: string;
      };
    }
  }
}
