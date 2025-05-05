import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { format } from "date-fns";
// import { saveUserToStrapi } from "../../Utils/api.auth";

interface UserProfileContentProps {
  onClose: () => void;
}

const UserProfileContent: React.FC<UserProfileContentProps> = ({ onClose }) => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            setIsLoading(true);
            try {
              await signOut();
              onClose();
              router.replace("/(root)/(auth)/sign-in");
            } catch (error) {
              console.error("Error signing out:", error);
              Alert.alert("Error", "Failed to sign out. Please try again.");
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleVerifyEmail = async () => {
    try {
      if (user?.primaryEmailAddress) {
        await user.primaryEmailAddress.prepareVerification({
          strategy: "email_code",
        });
        onClose();
        router.push("/(root)/(auth)/verify-email");
      }
    } catch (error) {
      console.error("Error preparing verification:", error);
      Alert.alert(
        "Error",
        "Failed to send verification code. Please try again."
      );
    }
  };

  const getVerificationStatus = () => {
    return user?.primaryEmailAddress?.verification.status === "verified";
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.signInPrompt}>
          <Ionicons name="person-circle-outline" size={64} color="#E53E3E" />
          <Text style={styles.signInText}>Sign in to access your account</Text>
          <Link href="/(root)/(auth)/sign-in" asChild>
            <TouchableOpacity style={styles.signInButton} onPress={onClose}>
              <Ionicons name="log-in-outline" size={24} color="#fff" />
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: user.imageUrl || "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>
          {user.username || user.firstName || "User"}
        </Text>
        <Text style={styles.email}>
          {user.primaryEmailAddress?.emailAddress}
        </Text>
        {!getVerificationStatus() && (
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleVerifyEmail}
          >
            <Ionicons name="mail-unread-outline" size={20} color="#fff" />
            <Text style={styles.verifyButtonText}>Verify Email</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.lastLoginText}>
          Last login: {format(new Date(), "MMM dd, yyyy HH:mm")}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <Link href="/(root)/(tabs)/(more)/(Settings)" asChild>
          <TouchableOpacity style={styles.actionButton} onPress={onClose}>
            <Ionicons name="settings-outline" size={24} color="#4A5568" />
            <Text style={styles.actionButtonText}>Settings</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(root)/(tabs)/(more)/(Settings)" asChild>
          <TouchableOpacity style={styles.actionButton} onPress={onClose}>
            <Ionicons name="receipt-outline" size={24} color="#4A5568" />
            <Text style={styles.actionButtonText}>Orders</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity
          style={[styles.actionButton, styles.signOutButton]}
          onPress={handleSignOut}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={24} color="#fff" />
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#E53E3E",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A202C",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#4A5568",
    marginBottom: 12,
  },
  verifyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E53E3E",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  verifyButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
  },
  infoContainer: {
    backgroundColor: "#F7FAFC",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  lastLoginText: {
    color: "#4A5568",
    fontSize: 14,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7FAFC",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  actionButtonText: {
    fontSize: 16,
    color: "#4A5568",
    fontWeight: "600",
  },
  signOutButton: {
    backgroundColor: "#E53E3E",
    marginTop: 8,
  },
  signOutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signInPrompt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  signInText: {
    fontSize: 18,
    color: "#4A5568",
    textAlign: "center",
    marginVertical: 16,
    fontWeight: "600",
  },
  signInButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E53E3E",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default UserProfileContent;
