// components/OrderSummary/index.tsx
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

interface OrderSummaryRowProps {
  label: string;
  value: string;
  isTotal?: boolean;
  isDiscount?: boolean;
  isLoading?: boolean; // Add this prop
}

export const OrderSummaryRow: React.FC<OrderSummaryRowProps> = ({
  label,
  value,
  isTotal,
  isDiscount,
  isLoading,
}) => (
  <View style={[styles.summaryRow, isTotal && styles.totalRow]}>
    <Text
      style={[
        styles.summaryLabel,
        isTotal && styles.totalLabel,
        isDiscount && styles.discountLabel,
      ]}
    >
      {label}
    </Text>
    <View
      style={[styles.valueContainer, isTotal && styles.totalValueContainer]}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="#10B981"
          style={styles.valueLoader}
        />
      ) : (
        <Text
          style={[
            styles.summaryValue,
            isTotal && styles.totalValue,
            isDiscount && styles.discountLabel,
          ]}
        >
          {value}
        </Text>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center",
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: "Cairo",
    color: "#4b5563",
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: "Cairo-SemiBold",
    color: "#374151",
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: "Cairo-Bold",
    color: "#1f2937",
  },
  totalValue: {
    fontSize: 16,
    fontFamily: "Cairo-Bold",
    color: "#1f2937",
  },
  discountLabel: {
    color: "#059669",
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 80,
    justifyContent: "flex-end",
  },
  totalValueContainer: {
    minWidth: 100, // Slightly wider for total amount
  },
  valueLoader: {
    marginLeft: 8,
  },
});

export default OrderSummaryRow;
