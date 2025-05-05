// components/Header/Header.tsx
import React, { useState, useCallback } from "react";
import { View, useColorScheme } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { SearchBar, Icon, Badge } from "@rneui/themed";
import { styles } from "./styles";
import { HeaderProps, CartItem } from "./types";
import { CartDrawer } from "./CartDrawer";

export const Header: React.FC<HeaderProps> = ({ showInScreen }) => {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Show header only in specified screens
  //   if (showInScreen && !pathname.includes(showInScreen)) {
  //     return null;
  //   }

  const handleUpdateQuantity = useCallback((id: string, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  }, []);

  const cartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <View style={styles.headerContainer}>
        <View className="flex-row items-center">
          {/* Logo */}
          <Icon
            name="shopping-bag"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />

          {/* Search Bar */}
          <SearchBar
            placeholder="Search..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            containerStyle={[
              styles.searchInput,
              { backgroundColor: "transparent" },
            ]}
            inputContainerStyle={{ backgroundColor: "#f5f5f5" }}
            platform="default"
          />

          {/* Cart Icon with Badge */}
          <View>
            <Icon
              name="shopping-cart"
              onPress={() => setIsDrawerOpen(true)}
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
            {cartItemsCount > 0 && (
              <Badge
                value={cartItemsCount}
                status="error"
                containerStyle={styles.cartBadge}
              />
            )}
          </View>
        </View>
      </View>

      {/* Cart Drawer */}
      <CartDrawer
        isVisible={isDrawerOpen}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};
export default Header;
