// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export interface CartItem {
//   id: number;
//   documentId: string;
//   name: string;
//   price: number;
//   salesPrice: number | null;
//   quantity: number;
//   imageUrl: string;
// }

// interface CartState {
//   items: CartItem[];
//   total: number;
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (documentId: string) => void;
//   updateQuantity: (documentId: string, quantity: number) => void;
//   clearCart: () => void;
// }

// const calculateTotal = (items: CartItem[]) => {
//   return items.reduce((total, item) => {
//     const itemPrice = item.salesPrice || item.price;
//     return total + itemPrice * item.quantity;
//   }, 0);
// };

// const useCartStore = create<CartState>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       total: 0,

//       addToCart: (newItem) => {
//         set((state) => {
//           const existingItemIndex = state.items.findIndex(
//             (item) => item.documentId === newItem.documentId
//           );

//           const updatedItems = [...state.items];

//           if (existingItemIndex >= 0) {
//             updatedItems[existingItemIndex].quantity += newItem.quantity;
//           } else {
//             updatedItems.push(newItem);
//           }

//           return {
//             items: updatedItems,
//             total: calculateTotal(updatedItems),
//           };
//         });
//       },

//       removeFromCart: (documentId) => {
//         set((state) => {
//           const updatedItems = state.items.filter(
//             (item) => item.documentId !== documentId
//           );

//           return {
//             items: updatedItems,
//             total: calculateTotal(updatedItems),
//           };
//         });
//       },

//       updateQuantity: (documentId, quantity) => {
//         set((state) => {
//           const updatedItems = state.items.map((item) =>
//             item.documentId === documentId
//               ? { ...item, quantity: Math.max(1, quantity) }
//               : item
//           );

//           return {
//             items: updatedItems,
//             total: calculateTotal(updatedItems),
//           };
//         });
//       },

//       clearCart: () => {
//         set(() => ({
//           items: [],
//           total: 0,
//         }));
//       },
//     }),
//     {
//       name: "cart-storage",
//       storage: createJSONStorage(() => AsyncStorage),
//     }
//   )
// );

// export default useCartStore;

/**************************** */

// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export interface CartItem {
//   id: number;
//   documentId: string;
//   name: string;
//   price: number;
//   salesPrice?: number | null;
//   quantity: number;
//   imageUrl: string;
// }

// interface CartState {
//   items: CartItem[];
//   total: number;
//   itemCount: number;
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (documentId: string) => void;
//   updateQuantity: (documentId: string, quantity: number) => void;
//   clearCart: () => void;
// }

// const calculateTotal = (items: CartItem[]) => {
//   return items.reduce((total, item) => {
//     const itemPrice = item.salesPrice || item.price;
//     return total + itemPrice * item.quantity;
//   }, 0);
// };

// const useCartStore = create<CartState>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       total: 0,
//       itemCount: 0,

//       addToCart: (newItem) => {
//         set((state) => {
//           const existingItemIndex = state.items.findIndex(
//             (item) => item.documentId === newItem.documentId
//           );

//           const updatedItems = [...state.items];

//           if (existingItemIndex >= 0) {
//             updatedItems[existingItemIndex].quantity += newItem.quantity;
//           } else {
//             updatedItems.push(newItem);
//           }

//           return {
//             items: updatedItems,
//             total: calculateTotal(updatedItems),
//             itemCount: updatedItems.reduce(
//               (sum, item) => sum + item.quantity,
//               0
//             ),
//           };
//         });
//       },

//       removeFromCart: (documentId) => {
//         set((state) => {
//           const updatedItems = state.items.filter(
//             (item) => item.documentId !== documentId
//           );

//           return {
//             items: updatedItems,
//             total: calculateTotal(updatedItems),
//             itemCount: updatedItems.reduce(
//               (sum, item) => sum + item.quantity,
//               0
//             ),
//           };
//         });
//       },

//       updateQuantity: (documentId, quantity) => {
//         set((state) => {
//           const updatedItems = state.items.map((item) =>
//             item.documentId === documentId
//               ? { ...item, quantity: Math.max(1, quantity) }
//               : item
//           );

//           return {
//             items: updatedItems,
//             total: calculateTotal(updatedItems),
//             itemCount: updatedItems.reduce(
//               (sum, item) => sum + item.quantity,
//               0
//             ),
//           };
//         });
//       },

//       clearCart: () => {
//         set(() => ({
//           items: [],
//           total: 0,
//           itemCount: 0,
//         }));
//       },
//     }),
//     {
//       name: "cart-storage",
//       storage: createJSONStorage(() => AsyncStorage),
//     }
//   )
// );

// export default useCartStore;

/********************************************** */

// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export interface CartItem {
//   id: number;
//   documentId: string;
//   name: string;
//   price: number;
//   salesPrice?: number | null;
//   quantity: number;
//   imageUrl: string;
// }

// interface CartState {
//   items: CartItem[];
//   total: number;
//   itemCount: number;
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (documentId: string) => void;
//   updateQuantity: (documentId: string, quantity: number) => void;
//   clearCart: () => void;
// }

// const calculateTotal = (items: CartItem[]) => {
//   return items.reduce((total, item) => {
//     const itemPrice = item.salesPrice || item.price;
//     return total + itemPrice * item.quantity;
//   }, 0);
// };

// const useCartStore = create<CartState>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       total: 0,
//       itemCount: 0,

//       addToCart: (newItem) => {
//         set((state) => {
//           const existingItemIndex = state.items.findIndex(
//             (item) => item.documentId === newItem.documentId
//           );

//           const updatedItems = [...state.items];

//           if (existingItemIndex >= 0) {
//             updatedItems[existingItemIndex].quantity += newItem.quantity;
//           } else {
//             updatedItems.push(newItem);
//           }

//           return {
//             items: updatedItems,
//             total: calculateTotal(updatedItems),
//             itemCount: updatedItems.reduce(
//               (sum, item) => sum + item.quantity,
//               0
//             ),
//           };
//         });
//       },

//       removeFromCart: (documentId) => {
//         set((state) => {
//           const updatedItems = state.items.filter(
//             (item) => item.documentId !== documentId
//           );

//           return {
//             items: updatedItems,
//             total: calculateTotal(updatedItems),
//             itemCount: updatedItems.reduce(
//               (sum, item) => sum + item.quantity,
//               0
//             ),
//           };
//         });
//       },

//       updateQuantity: (documentId, quantity) => {
//         set((state) => {
//           const updatedItems = state.items.map((item) =>
//             item.documentId === documentId
//               ? { ...item, quantity: Math.max(1, quantity) }
//               : item
//           );

//           return {
//             items: updatedItems,
//             total: calculateTotal(updatedItems),
//             itemCount: updatedItems.reduce(
//               (sum, item) => sum + item.quantity,
//               0
//             ),
//           };
//         });
//       },

//       clearCart: () => {
//         set(() => ({
//           items: [],
//           total: 0,
//           itemCount: 0,
//         }));
//       },
//     }),
//     {
//       name: "cart-storage",
//       storage: createJSONStorage(() => AsyncStorage),
//     }
//   )
// );

// export default useCartStore;

/************************************************************** */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface CartItem {
  id: number;
  documentId: string;
  name: string;
  price: number;
  salesPrice?: number | null;
  quantity: number;
  imageUrl: string;
}

interface CouponData {
  id: number;
  documentId: string;
  code: string;
  amount: number;
  type: "fixed" | "percentage";
  CTA: string;
  IsActive: boolean;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  appliedCoupon: CouponData | null;
  discountedTotal: number;

  // Actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (documentId: string) => void;
  updateQuantity: (documentId: string, quantity: number) => void;
  applyCoupon: (coupon: CouponData) => void;
  removeCoupon: () => void;
  clearCart: () => void;
}

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((total, item) => {
    const itemPrice = item.salesPrice || item.price;
    return total + itemPrice * item.quantity;
  }, 0);
};

const calculateDiscountedTotal = (total: number, coupon: CouponData | null) => {
  if (!coupon) return total;

  if (coupon.type === "percentage") {
    return total * (1 - coupon.amount / 100);
  } else {
    return Math.max(0, total - coupon.amount);
  }
};

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      appliedCoupon: null,
      discountedTotal: 0,

      addToCart: (newItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.documentId === newItem.documentId
          );

          const updatedItems = [...state.items];

          if (existingItemIndex >= 0) {
            updatedItems[existingItemIndex].quantity += newItem.quantity;
          } else {
            updatedItems.push(newItem);
          }

          const newTotal = calculateTotal(updatedItems);
          const newDiscountedTotal = calculateDiscountedTotal(
            newTotal,
            state.appliedCoupon
          );

          return {
            items: updatedItems,
            total: newTotal,
            discountedTotal: newDiscountedTotal,
            itemCount: updatedItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            ),
          };
        });
      },

      removeFromCart: (documentId) => {
        set((state) => {
          const updatedItems = state.items.filter(
            (item) => item.documentId !== documentId
          );

          const newTotal = calculateTotal(updatedItems);
          const newDiscountedTotal = calculateDiscountedTotal(
            newTotal,
            state.appliedCoupon
          );

          return {
            items: updatedItems,
            total: newTotal,
            discountedTotal: newDiscountedTotal,
            itemCount: updatedItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            ),
          };
        });
      },

      updateQuantity: (documentId, quantity) => {
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.documentId === documentId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          );

          const newTotal = calculateTotal(updatedItems);
          const newDiscountedTotal = calculateDiscountedTotal(
            newTotal,
            state.appliedCoupon
          );

          return {
            items: updatedItems,
            total: newTotal,
            discountedTotal: newDiscountedTotal,
            itemCount: updatedItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            ),
          };
        });
      },

      applyCoupon: (coupon) => {
        set((state) => {
          const newDiscountedTotal = calculateDiscountedTotal(
            state.total,
            coupon
          );
          return {
            appliedCoupon: coupon,
            discountedTotal: newDiscountedTotal,
          };
        });
      },

      removeCoupon: () => {
        set((state) => ({
          appliedCoupon: null,
          discountedTotal: state.total,
        }));
      },

      clearCart: () => {
        set(() => ({
          items: [],
          total: 0,
          itemCount: 0,
          appliedCoupon: null,
          discountedTotal: 0,
        }));
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount,
        appliedCoupon: state.appliedCoupon,
        discountedTotal: state.discountedTotal,
      }),
    }
  )
);

export default useCartStore;
