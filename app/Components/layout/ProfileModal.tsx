// components/ProfileModal.tsx
import React, { memo } from "react";
import { Modal, View, Pressable, StyleSheet, Text } from "react-native";
import { ChevronLeft, User } from "lucide-react-native";
import { COLORS } from "../../constants/theme";

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ProfileModal = memo(({ visible, onClose }: ProfileModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Pressable
              onPress={onClose}
              style={styles.modalBackButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ChevronLeft color={COLORS.text} size={24} />
            </Pressable>
            <Text style={styles.modalTitle}>Profile</Text>
            <User color={COLORS.primary} size={24} />
          </View>
          {/* Add your profile content here */}
        </View>
      </Pressable>
    </Modal>
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
