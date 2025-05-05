// components/Header.tsx
import React, { memo, useState } from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, User } from "lucide-react-native";
import { ProfileModal } from "./ProfileModal";
import { COLORS } from "../../constants/theme";
import { Logo } from "../../Icons/Icons";
import CartButton from "../Cart/CartButton";

interface HeaderProps {
  showBack?: any;
  title?: any;
}

export const Header = memo(({ showBack = false, title = "" }: HeaderProps) => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const router = useRouter();

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            {showBack && (
              <Pressable
                onPress={() => router.back()}
                style={styles.backButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <ChevronLeft color={COLORS.text} size={24} />
              </Pressable>
            )}
            <Pressable
              onPress={() => setIsProfileVisible(true)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <User color={COLORS.primary} size={24} />
            </Pressable>
          </View>

          <View style={styles.logoContainer}>
            <Logo />
          </View>

          <Pressable
            onPress={() => router.push("/")}
            style={styles.headerRight}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <CartButton />
          </Pressable>
        </View>

        {title && (
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        )}
      </View>

      <ProfileModal
        visible={isProfileVisible}
        onClose={() => setIsProfileVisible(false)}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: 80,
  },
  headerRight: {
    width: 80,
    alignItems: "flex-end",
  },
  backButton: {
    padding: 8,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    paddingVertical: 8,
    alignItems: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  tabBar: {
    backgroundColor: COLORS.background,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    height: 60,
    paddingVertical: 8,
    elevation: 8,
    shadowColor: COLORS.text,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    minHeight: "50%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  modalBackButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
});
