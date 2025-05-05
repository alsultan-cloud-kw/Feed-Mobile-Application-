// env.d.ts
declare module "@env" {
  export interface ProcessEnv {
    EXPO_PUBLIC_BOOKEEY_MERCHANT_ID: string;
    EXPO_PUBLIC_BOOKEEY_SECRET_KEY: string;
    EXPO_PUBLIC_APP_SCHEME: string;
    EXPO_PUBLIC_ENV: "development" | "production";
    EXPO_PUBLIC_BOOKEEY_API_URL_SANDBOX?: string;
    EXPO_PUBLIC_BOOKEEY_API_URL_PRODUCTION?: string;
  }
}
