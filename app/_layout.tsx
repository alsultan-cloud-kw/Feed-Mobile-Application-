import { useEffect } from "react";
import { Slot, useRouter } from "expo-router";
import * as Linking from "expo-linking";

export default function Layout() {
  const router = useRouter();

  useEffect(() => {
    const subscription = Linking.addEventListener("url", (event) => {
      const { path, queryParams } = Linking.parse(event.url);

      if (path === "order-success") {
        router.replace({
          pathname: "/(root)/OrderConfirmed",
          params: queryParams,
        });
      } else if (path === "order-failed") {
        router.replace({
          pathname: "/(root)/OrderFailed",
          params: queryParams,
        });
      }
    });

    return () => subscription.remove();
  }, [router]);

  return <Slot />;
}
