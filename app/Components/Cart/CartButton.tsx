// import React from "react";
// import { View, Pressable, Text } from "react-native";
// import { ShoppingCart } from "lucide-react-native";
// import { useRouter } from "expo-router";
// const CartButton: React.FC = () => {
//   const router = useRouter();

//   return (
//     <Pressable
//       onPress={() => router.push("/Screens/Cart")}
//       className="relative flex items-center justify-center p-2 rounded-full bg-white shadow-sm border border-gray-200"
//     >
//       <ShoppingCart size={24} color="#ef4444" />
//       <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
//         <Text className="text-white text-xs font-bold">3</Text>
//       </View>
//     </Pressable>
//   );
// };

// export default CartButton;

/************************************** */

// import React from "react";
// import { View, Pressable, Text } from "react-native";
// import { ShoppingCart } from "lucide-react-native";
// import { useRouter } from "expo-router";
// import useCartStore from "../../../store/cartStore"; // Adjust path as needed

// const CartIcon: React.FC = () => {
//   const router = useRouter();
//   const { itemCount } = useCartStore();

//   return (
//     <>
//       <ShoppingCart size={24} color="#E53935" />
//       {itemCount > 0 && (
//         <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
//           <Text className="text-white text-xs font-bold">{itemCount}</Text>
//         </View>
//       )}
//     </>
//   );
// };

// export default CartIcon;

/****************************************************** */

import React from "react";
import { View, Pressable, Text } from "react-native";
import { ShoppingCart } from "lucide-react-native";
import { useRouter } from "expo-router";
import useCartStore from "../../../store/cartStore";

const CartIcon: React.FC = () => {
  const router = useRouter();
  const { itemCount } = useCartStore();

  return (
    <>
      <ShoppingCart size={24} color="#FFFFFF" strokeWidth={1.5} />
      {itemCount > 0 && (
        <View
          className="absolute -top-1 -right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center"
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          }}
        >
          <Text className="text-black text-xs font-bold">{itemCount}</Text>
        </View>
      )}
    </>
  );
};

export default CartIcon;
