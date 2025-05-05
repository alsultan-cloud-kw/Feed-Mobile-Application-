// app/hooks/useRedirectToSignIn.ts
import { useEffect } from "react";
import { useSegments, useRouter } from "expo-router";
import { useAuth } from "../contexts/useAuth";

export const useRedirectToSignIn = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isSignedIn && !inAuthGroup) {
      router.replace("/(auth)/SignIn");
    }
  }, [isSignedIn, isLoaded, segments]);
};

export default useRedirectToSignIn;
