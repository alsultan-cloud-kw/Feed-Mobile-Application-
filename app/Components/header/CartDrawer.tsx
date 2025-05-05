// components/Header/CartDrawer.tsx
import React from "react";
import { View, Text, ScrollView, Modal, Pressable } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { CartItem } from "./types";
import { styles } from "./styles";

interface CartDrawerProps {
  isVisible: boolean;
  items: CartItem[];
  onUpdateQuantity: (id: string, change: number) => void;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isVisible,
  items,
  onUpdateQuantity,
  onClose,
}) => {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable
          style={styles.drawerContent}
          onPress={(e) => e.stopPropagation()}
        >
          <View className="flex-1">
            <View className="flex-row justify-between items-center p-4 bg-white border-b border-gray-200">
              <Text className="text-xl font-bold">Cart</Text>
              <Icon name="close" onPress={onClose} />
            </View>
            <ScrollView className="flex-1">
              {items.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <View className="flex-1">
                    <Text className="font-semibold">{item.name}</Text>
                    <Text className="text-gray-600">${item.price}</Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <Button
                      icon={{ name: "remove", color: "white" }}
                      onPress={() => onUpdateQuantity(item.id, -1)}
                      disabled={item.quantity <= 0}
                    />
                    <Text>{item.quantity}</Text>
                    <Button
                      icon={{ name: "add", color: "white" }}
                      onPress={() => onUpdateQuantity(item.id, 1)}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
            <View className="p-4 bg-white border-t border-gray-200">
              <Text className="text-xl font-bold mb-4">
                Total: ${total.toFixed(2)}
              </Text>
              <Button title="Checkout" />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CartDrawer;
