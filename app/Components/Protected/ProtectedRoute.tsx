import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { useStrapiUser } from "../../contexts/UserContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectUrl?: string;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  redirectUrl = "/(auth)/sign-in",
}: ProtectedRouteProps) {
  const { isLoaded, isSignedIn } = useUser();
  const { strapiUser, isLoading: isStrapiLoading } = useStrapiUser();
  const [isChecking, setIsChecking] = React.useState(true);

  useEffect(() => {
    async function checkAuthAndRedirect() {
      try {
        // Save current route for post-auth redirect
        if (requireAuth) {
          await SecureStore.setItemAsync(
            "lastRoute",
            router.getCurrentRoute()?.path || "/(root)/(tabs)"
          );
        }

        if (isLoaded && !isStrapiLoading) {
          const shouldRedirect = requireAuth ? !isSignedIn : isSignedIn;

          if (shouldRedirect) {
            router.replace(redirectUrl);
          }

          setIsChecking(false);
        }
      } catch (error) {
        console.error("Error in auth check:", error);
        setIsChecking(false);
        if (requireAuth) {
          router.replace(redirectUrl);
        }
      }
    }

    checkAuthAndRedirect();
  }, [isLoaded, isSignedIn, isStrapiLoading, requireAuth, redirectUrl]);

  // Check for both Clerk and Strapi user data
  const isFullyAuthenticated = isSignedIn && strapiUser;

  if (isChecking || isStrapiLoading || !isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E53E3E" />
      </View>
    );
  }

  if (requireAuth && !isFullyAuthenticated) {
    return null;
  }

  if (!requireAuth && isFullyAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

// HOC for easier usage
export default function withProtectedRoute(
  Component: React.ComponentType<any>,
  options: Omit<ProtectedRouteProps, "children"> = {}
) {
  return function WrappedComponent(props: any) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
