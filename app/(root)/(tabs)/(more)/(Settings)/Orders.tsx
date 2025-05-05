import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useStrapiUser } from "../../../../contexts/UserContext";

// Types
interface Order {
  id: number;
  attributes: {
    orderNumber: string;
    totalAmount: number;
    status: "pending" | "processing" | "completed" | "cancelled";
    createdAt: string;
    products: {
      data: Array<{
        id: number;
        attributes: {
          title: string;
          price: number;
        };
      }>;
    };
  };
}

// Status badge component
const StatusBadge = ({ status }: { status: Order["attributes"]["status"] }) => {
  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return { bg: "#C6F6D5", text: "#2F855A" };
      case "processing":
        return { bg: "#BEE3F8", text: "#2B6CB0" };
      case "cancelled":
        return { bg: "#FED7D7", text: "#C53030" };
      default:
        return { bg: "#FEEBC8", text: "#C05621" };
    }
  };

  const colors = getStatusColor();

  return (
    <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.statusText, { color: colors.text }]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  );
};

// Order item component
const OrderItem = ({ order }: { order: Order }) => {
  const formattedDate = format(
    parseISO(order.attributes.createdAt),
    "yyyy-MM-dd HH:mm:ss"
  );

  return (
    <Animated.View entering={FadeInDown} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderNumber}>
            Order #{order.attributes.orderNumber}
          </Text>
          <Text style={styles.orderDate}>{formattedDate}</Text>
        </View>
        <StatusBadge status={order.attributes.status} />
      </View>

      <View style={styles.productsList}>
        {order.attributes.products.data.map((product) => (
          <Text key={product.id} style={styles.productItem}>
            • {product.attributes.title}
          </Text>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalAmount}>
          Total: ${order.attributes.totalAmount.toFixed(2)}
        </Text>
        <TouchableOpacity
          style={styles.detailsButton}
          //   onPress={() => router.push(`/orders/${order.id}`)}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
          <Ionicons name="chevron-forward" size={16} color="#E53E3E" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default function Orders() {
  const insets = useSafeAreaInsets();
  const { strapiUser } = useStrapiUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async (showRefresh = false) => {
    if (!strapiUser) return;

    try {
      setError(null);
      if (!showRefresh) setIsLoading(true);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/orders?filters[user][id][$eq]=${strapiUser.id}&sort=createdAt:desc&populate=products`,
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_USER}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch orders");

      const data = await response.json();
      setOrders(data.data);
    } catch (err) {
      setError("Unable to load orders. Please try again.");
      console.error("Error fetching orders:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [strapiUser]);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchOrders(true);
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#E53E3E" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Stack.Screen
        options={{
          title: "Order History",
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#1A202C" />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        }}
      />

      {error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => fetchOrders()}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.centerContainer}>
          <Ionicons name="receipt-outline" size={48} color="#A0AEC0" />
          <Text style={styles.emptyText}>No orders yet</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => router.push("/(root)/(tabs)")}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={({ item }) => <OrderItem order={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor="#E53E3E"
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: 8,
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  orderCard: {
    backgroundColor: "#F7FAFC",
    borderRadius: 12,
    padding: 16,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A202C",
  },
  orderDate: {
    fontSize: 14,
    color: "#718096",
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  productsList: {
    gap: 4,
  },
  productItem: {
    fontSize: 14,
    color: "#4A5568",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A202C",
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailsButtonText: {
    fontSize: 14,
    color: "#E53E3E",
    fontWeight: "500",
  },
  errorText: {
    fontSize: 16,
    color: "#E53E3E",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#E53E3E",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  emptyText: {
    fontSize: 16,
    color: "#4A5568",
    marginVertical: 12,
  },
  shopButton: {
    backgroundColor: "#E53E3E",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  shopButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
