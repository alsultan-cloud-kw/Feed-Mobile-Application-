import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AccountItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  isDestructive?: boolean;
}

const AccountItem: React.FC<AccountItemProps> = ({
  icon,
  label,
  onPress,
  isDestructive = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isDestructive && styles.destructiveContainer]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Ionicons
          name={icon}
          size={24}
          color={isDestructive ? "#E53E3E" : "#4A5568"}
        />
        <Text style={[styles.label, isDestructive && styles.destructiveLabel]}>
          {label}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={isDestructive ? "#E53E3E" : "#4A5568"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#F7FAFC",
    borderRadius: 12,
  },
  destructiveContainer: {
    backgroundColor: "#FFF5F5",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  label: {
    fontSize: 16,
    color: "#4A5568",
    fontWeight: "500",
  },
  destructiveLabel: {
    color: "#E53E3E",
  },
});

export default React.memo(AccountItem);
