// import React, { useState, useCallback, useMemo } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   Dimensions,
//   Modal,
//   ScrollView,
//   SafeAreaView,
// } from "react-native";
// import { Filter, X, ChevronDown, Check } from "lucide-react-native";
// import { MotiView } from "moti";

// // Color Palette
// const COLORS = {
//   primary: "#8B0000",
//   background: "#FFF9F7",
//   white: "#FFFFFF",
//   lightGray: "#F5F5F5",
//   darkText: "#333333",
//   accent: "#4A4A4A",
// };

// // Categories and Subcategories (Same as original)
// const CATEGORIES = [
//   "Poultry",
//   "Livestock",
//   "Pets",
//   "Aquatic",
//   "Birds",
//   "Utilities",
// ];

// const SUBCATEGORIES = {
//   Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
//   Livestock: ["Sheep", "Cows", "Horses"],
//   Pets: ["Dogs", "Cats", "Rabbit"],
//   Aquatic: ["Fish"],
//   Birds: ["Birds"],
//   Utilities: ["Tools", "Accessories"],
// };

// const EnhancedFilterComponent = () => {
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [selectedFilters, setSelectedFilters] = useState({
//     category: null,
//     subcategories: [],
//   });
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

//   const handleCategorySelect = useCallback((category) => {
//     setActiveCategory((prev) => (prev === category ? null : category));
//     setSelectedFilters((prev) => ({
//       ...prev,
//       category: category,
//       subcategories: [], // Reset subcategories when changing category
//     }));
//   }, []);

//   const handleSubcategoryToggle = useCallback((subcategory) => {
//     setSelectedFilters((prev) => {
//       const currentSubcategories = prev.subcategories;
//       const isSelected = currentSubcategories.includes(subcategory);

//       return {
//         ...prev,
//         subcategories: isSelected
//           ? currentSubcategories.filter((sc) => sc !== subcategory)
//           : [...currentSubcategories, subcategory],
//       };
//     });
//   }, []);

//   const renderCategoryTabs = () => (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.categoryTabContainer}
//     >
//       {CATEGORIES.map((category) => (
//         <Pressable
//           key={category}
//           onPress={() => handleCategorySelect(category)}
//           style={[
//             styles.categoryTab,
//             activeCategory === category && styles.activeCategoryTab,
//           ]}
//         >
//           <Text
//             style={[
//               styles.categoryTabText,
//               activeCategory === category && styles.activeCategoryTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );

//   const openFilterModal = () => setIsFilterModalVisible(true);
//   const closeFilterModal = () => setIsFilterModalVisible(false);

//   const renderFilterModal = () => (
//     <Modal
//       transparent={true}
//       visible={isFilterModalVisible}
//       animationType="slide"
//     >
//       <View style={styles.modalOverlay}>
//         <SafeAreaView style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>Refine Filters</Text>
//             <Pressable onPress={closeFilterModal}>
//               <X size={24} color={COLORS.primary} />
//             </Pressable>
//           </View>

//           {activeCategory && (
//             <ScrollView>
//               <Text style={styles.subcategoryTitle}>
//                 {activeCategory} Subcategories
//               </Text>
//               {SUBCATEGORIES[activeCategory].map((subcategory) => (
//                 <Pressable
//                   key={subcategory}
//                   onPress={() => handleSubcategoryToggle(subcategory)}
//                   style={styles.subcategoryItem}
//                 >
//                   <Text style={styles.subcategoryText}>{subcategory}</Text>
//                   {selectedFilters.subcategories.includes(subcategory) && (
//                     <Check size={20} color={COLORS.primary} />
//                   )}
//                 </Pressable>
//               ))}
//             </ScrollView>
//           )}

//           <View style={styles.modalActions}>
//             <Pressable
//               style={styles.resetButton}
//               onPress={() =>
//                 setSelectedFilters({ category: null, subcategories: [] })
//               }
//             >
//               <Text style={styles.resetButtonText}>Reset All</Text>
//             </Pressable>
//             <Pressable style={styles.applyButton} onPress={closeFilterModal}>
//               <Text style={styles.applyButtonText}>Apply Filters</Text>
//             </Pressable>
//           </View>
//         </SafeAreaView>
//       </View>
//     </Modal>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterHeader}>
//         <Text style={styles.filterHeaderTitle}>Browse Products</Text>
//         <Pressable onPress={openFilterModal} style={styles.filterIconContainer}>
//           <Filter size={24} color={COLORS.primary} />
//           {(selectedFilters.category ||
//             selectedFilters.subcategories.length > 0) && (
//             <View style={styles.filterBadge}>
//               <Text style={styles.filterBadgeText}>
//                 {selectedFilters.subcategories.length}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>

//       {renderCategoryTabs()}
//       {renderFilterModal()}

//       {/* Placeholder for product list - you would replace this with your actual product rendering logic */}
//       <View style={styles.productListPlaceholder}>
//         <Text style={styles.productListPlaceholderText}>
//           Product List Placeholder
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   filterHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   filterHeaderTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   filterIconContainer: {
//     position: "relative",
//   },
//   filterBadge: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterBadgeText: {
//     color: COLORS.white,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   categoryTabContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   categoryTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightGray,
//   },
//   activeCategoryTab: {
//     backgroundColor: COLORS.primary,
//   },
//   categoryTabText: {
//     color: COLORS.darkText,
//     fontWeight: "500",
//   },
//   activeCategoryTabText: {
//     color: COLORS.white,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContainer: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   subcategoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.accent,
//     padding: 16,
//   },
//   subcategoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   subcategoryText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGray,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   resetButtonText: {
//     color: COLORS.primary,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   applyButton: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   productListPlaceholder: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   productListPlaceholderText: {
//     color: COLORS.accent,
//     fontSize: 16,
//   },
// });

// export default EnhancedFilterComponent;

/***************************************** */
// import React, { useState, useCallback, useMemo } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   Dimensions,
//   Modal,
//   ScrollView,
//   SafeAreaView,
// } from "react-native";
// import { Filter, X, ChevronDown, Check } from "lucide-react-native";
// import { MotiView } from "moti";

// // Color Palette
// const COLORS = {
//   primary: "#8B0000",
//   background: "#FFF9F7",
//   white: "#FFFFFF",
//   lightGray: "#F5F5F5",
//   darkText: "#333333",
//   accent: "#4A4A4A",
// };

// // Categories and Subcategories (Same as original)
// const CATEGORIES = [
//   "Poultry",
//   "Livestock",
//   "Pets",
//   "Aquatic",
//   "Birds",
//   "Utilities",
// ];

// const SUBCATEGORIES = {
//   Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
//   Livestock: ["Sheep", "Cows", "Horses"],
//   Pets: ["Dogs", "Cats", "Rabbit"],
//   Aquatic: ["Fish"],
//   Birds: ["Birds"],
//   Utilities: ["Tools", "Accessories"],
// };

// const EnhancedFilterComponent = ({ selectedFilters, setSelectedFilters }) => {
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

//   const handleCategorySelect = useCallback(
//     (category) => {
//       setActiveCategory((prev) => (prev === category ? null : category));
//       setSelectedFilters((prev) => ({
//         ...prev,
//         category: category,
//         subcategories: [], // Reset subcategories when changing category
//       }));
//     },
//     [setSelectedFilters]
//   );

//   const handleSubcategoryToggle = useCallback(
//     (subcategory) => {
//       setSelectedFilters((prev) => {
//         const currentSubcategories = prev.subcategories;
//         const isSelected = currentSubcategories.includes(subcategory);

//         return {
//           ...prev,
//           subcategories: isSelected
//             ? currentSubcategories.filter((sc) => sc !== subcategory)
//             : [...currentSubcategories, subcategory],
//         };
//       });
//     },
//     [setSelectedFilters]
//   );

//   const renderCategoryTabs = () => (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.categoryTabContainer}
//       className="w-full h-0 "
//     >
//       {CATEGORIES.map((category) => (
//         <Pressable
//           key={category}
//           onPress={() => handleCategorySelect(category)}
//           style={[
//             styles.categoryTab,
//             activeCategory === category && styles.activeCategoryTab,
//           ]}
//         >
//           <Text
//             style={[
//               styles.categoryTabText,
//               activeCategory === category && styles.activeCategoryTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );

//   const openFilterModal = () => setIsFilterModalVisible(true);
//   const closeFilterModal = () => setIsFilterModalVisible(false);

//   const renderFilterModal = () => (
//     <Modal
//       transparent={true}
//       visible={isFilterModalVisible}
//       animationType="slide"
//     >
//       <View style={styles.modalOverlay}>
//         <SafeAreaView style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>Refine Filters</Text>
//             <Pressable onPress={closeFilterModal}>
//               <X size={24} color={COLORS.primary} />
//             </Pressable>
//           </View>

//           {activeCategory && (
//             <ScrollView>
//               <Text style={styles.subcategoryTitle}>
//                 {activeCategory} Subcategories
//               </Text>
//               {SUBCATEGORIES[activeCategory].map((subcategory) => (
//                 <Pressable
//                   key={subcategory}
//                   onPress={() => handleSubcategoryToggle(subcategory)}
//                   style={styles.subcategoryItem}
//                 >
//                   <Text style={styles.subcategoryText}>{subcategory}</Text>
//                   {selectedFilters.subcategories.includes(subcategory) && (
//                     <Check size={20} color={COLORS.primary} />
//                   )}
//                 </Pressable>
//               ))}
//             </ScrollView>
//           )}

//           <View style={styles.modalActions}>
//             <Pressable
//               style={styles.resetButton}
//               onPress={() =>
//                 setSelectedFilters({ category: null, subcategories: [] })
//               }
//             >
//               <Text style={styles.resetButtonText}>Reset All</Text>
//             </Pressable>
//             <Pressable style={styles.applyButton} onPress={closeFilterModal}>
//               <Text style={styles.applyButtonText}>Apply Filters</Text>
//             </Pressable>
//           </View>
//         </SafeAreaView>
//       </View>
//     </Modal>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterHeader}>
//         <Text style={styles.filterHeaderTitle}>Browse Products</Text>
//         <Pressable onPress={openFilterModal} style={styles.filterIconContainer}>
//           <Filter size={24} color={COLORS.primary} />
//           {(selectedFilters.category ||
//             selectedFilters.subcategories.length > 0) && (
//             <View style={styles.filterBadge}>
//               <Text style={styles.filterBadgeText}>
//                 {selectedFilters.subcategories.length}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>

//       {renderCategoryTabs()}
//       {renderFilterModal()}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 0.4,
//     backgroundColor: COLORS.background,
//     padding: 10,
//   },
//   filterHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   filterHeaderTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   filterIconContainer: {
//     position: "relative",
//   },
//   filterBadge: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterBadgeText: {
//     color: COLORS.white,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   categoryTabContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     height: 60,
//   },
//   categoryTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightGray,
//   },
//   activeCategoryTab: {
//     backgroundColor: COLORS.primary,
//   },
//   categoryTabText: {
//     color: COLORS.darkText,
//     fontWeight: "500",
//   },
//   activeCategoryTabText: {
//     color: COLORS.white,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContainer: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   subcategoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.accent,
//     padding: 16,
//   },
//   subcategoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   subcategoryText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGray,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   resetButtonText: {
//     color: COLORS.primary,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   applyButton: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   productListPlaceholder: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   productListPlaceholderText: {
//     color: COLORS.accent,
//     fontSize: 16,
//   },
// });

// export default EnhancedFilterComponent;

/***************************************** */
// import React, { useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   Dimensions,
//   Modal,
//   ScrollView,
//   SafeAreaView,
// } from "react-native";
// import { Filter, X, ChevronDown, Check } from "lucide-react-native";

// const COLORS = {
//   primary: "#8B0000",
//   background: "#FFFFFF",
//   white: "#FFFFFF",
//   lightGray: "#F5F5F5",
//   darkText: "#333333",
//   accent: "#4A4A4A",
// };

// const CATEGORIES = [
//   "Poultry",
//   "Livestock",
//   "Pets",
//   "Aquatic",
//   "Birds",
//   "Utilities",
// ];

// const SUBCATEGORIES = {
//   Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
//   Livestock: ["Sheep", "Cows", "Horses"],
//   Pets: ["Dogs", "Cats", "Rabbit"],
//   Aquatic: ["Fish"],
//   Birds: ["Birds"],
//   Utilities: ["Tools", "Accessories"],
// };

// const EnhancedFilterComponent = ({ selectedFilters, setSelectedFilters }) => {
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

//   const handleCategorySelect = useCallback(
//     (category) => {
//       setActiveCategory((prev) => (prev === category ? null : category));
//       setSelectedFilters((prev) => ({
//         ...prev,
//         category: category,
//         subcategories: [],
//       }));
//     },
//     [setSelectedFilters]
//   );

//   const handleSubcategoryToggle = useCallback(
//     (subcategory) => {
//       setSelectedFilters((prev) => {
//         const currentSubcategories = prev.subcategories;
//         const isSelected = currentSubcategories.includes(subcategory);
//         return {
//           ...prev,
//           subcategories: isSelected
//             ? currentSubcategories.filter((sc) => sc !== subcategory)
//             : [...currentSubcategories, subcategory],
//         };
//       });
//     },
//     [setSelectedFilters]
//   );

//   const renderCategoryTabs = () => (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.categoryTabContainer}
//     >
//       {CATEGORIES.map((category) => (
//         <Pressable
//           key={category}
//           onPress={() => handleCategorySelect(category)}
//           style={[
//             styles.categoryTab,
//             activeCategory === category && styles.activeCategoryTab,
//           ]}
//         >
//           <Text
//             style={[
//               styles.categoryTabText,
//               activeCategory === category && styles.activeCategoryTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );

//   const openFilterModal = () => setIsFilterModalVisible(true);
//   const closeFilterModal = () => setIsFilterModalVisible(false);

//   const renderFilterModal = () => (
//     <Modal
//       transparent={true}
//       visible={isFilterModalVisible}
//       animationType="slide"
//     >
//       <View style={styles.modalOverlay}>
//         <SafeAreaView style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>Refine Filters</Text>
//             <Pressable onPress={closeFilterModal}>
//               <X size={24} color={COLORS.primary} />
//             </Pressable>
//           </View>
//           {activeCategory && (
//             <ScrollView>
//               <Text style={styles.subcategoryTitle}>
//                 {activeCategory} Subcategories
//               </Text>
//               {SUBCATEGORIES[activeCategory].map((subcategory) => (
//                 <Pressable
//                   key={subcategory}
//                   onPress={() => handleSubcategoryToggle(subcategory)}
//                   style={styles.subcategoryItem}
//                 >
//                   <Text style={styles.subcategoryText}>{subcategory}</Text>
//                   {selectedFilters.subcategories.includes(subcategory) && (
//                     <Check size={20} color={COLORS.primary} />
//                   )}
//                 </Pressable>
//               ))}
//             </ScrollView>
//           )}
//           <View style={styles.modalActions}>
//             <Pressable
//               style={styles.resetButton}
//               onPress={() =>
//                 setSelectedFilters({ category: null, subcategories: [] })
//               }
//             >
//               <Text style={styles.resetButtonText}>Reset All</Text>
//             </Pressable>
//             <Pressable style={styles.applyButton} onPress={closeFilterModal}>
//               <Text style={styles.applyButtonText}>Apply Filters</Text>
//             </Pressable>
//           </View>
//         </SafeAreaView>
//       </View>
//     </Modal>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterHeader}>
//         <Text style={styles.filterHeaderTitle}>Browse Products</Text>
//         <Pressable onPress={openFilterModal} style={styles.filterIconContainer}>
//           <Filter size={24} color={COLORS.primary} />
//           {(selectedFilters.category ||
//             selectedFilters.subcategories.length > 0) && (
//             <View style={styles.filterBadge}>
//               <Text style={styles.filterBadgeText}>
//                 {selectedFilters.subcategories.length}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>
//       {renderCategoryTabs()}
//       {renderFilterModal()}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 0.2,
//     backgroundColor: COLORS.background,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   filterHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   filterHeaderTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   filterIconContainer: {
//     position: "relative",
//   },
//   filterBadge: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterBadgeText: {
//     color: COLORS.white,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   categoryTabContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 4,
//     height: 50,
//   },
//   categoryTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightGray,
//   },
//   activeCategoryTab: {
//     backgroundColor: COLORS.primary,
//   },
//   categoryTabText: {
//     color: COLORS.darkText,
//     fontWeight: "500",
//     lineHeight: 20,
//   },
//   activeCategoryTabText: {
//     color: COLORS.white,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContainer: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   subcategoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.accent,
//     padding: 16,
//   },
//   subcategoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   subcategoryText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGray,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   resetButtonText: {
//     color: COLORS.primary,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   applyButton: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "600",
//   },
// });

// export default EnhancedFilterComponent;

/************************ */

// import React, { useState, useCallback, useEffect } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   Modal,
//   ScrollView,
//   SafeAreaView,
// } from "react-native";
// import { Filter, X, Check } from "lucide-react-native";
// import * as Haptics from "expo-haptics";

// export interface FilterState {
//   category: string | null;
//   subcategories: string[];
// }

// interface FilterProps {
//   selectedFilters: FilterState;
//   setSelectedFilters: (filters: FilterState) => void;
//   onFiltersApply?: (filters: FilterState) => void;
//   isLoading?: boolean;
// }

// const COLORS = {
//   primary: "#8B0000",
//   background: "#FFFFFF",
//   white: "#FFFFFF",
//   lightGray: "#F5F5F5",
//   darkText: "#333333",
//   accent: "#4A4A4A",
// };

// const CATEGORIES = [
//   "Poultry",
//   "Livestock",
//   "Pets",
//   "Aquatic",
//   "Birds",
//   "Utilities",
// ];

// const SUBCATEGORIES = {
//   Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
//   Livestock: ["Sheep", "Cows", "Horses"],
//   Pets: ["Dogs", "Cats", "Rabbit"],
//   Aquatic: ["Fish"],
//   Birds: ["Birds"],
//   Utilities: ["Tools", "Accessories"],
// };

// const EnhancedFilterComponent: React.FC<FilterProps> = ({
//   selectedFilters,
//   setSelectedFilters,
//   onFiltersApply,
//   isLoading = false,
// }) => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(
//     selectedFilters.category
//   );
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
//   const [localFilters, setLocalFilters] =
//     useState<FilterState>(selectedFilters);

//   useEffect(() => {
//     setLocalFilters(selectedFilters);
//     setActiveCategory(selectedFilters.category);
//   }, [selectedFilters]);

//   const handleCategorySelect = useCallback(
//     async (category: string) => {
//       await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

//       if (activeCategory === category) {
//         // Reset filters when deselecting a category
//         const newFilters = { category: null, subcategories: [] };
//         setActiveCategory(null);
//         setSelectedFilters(newFilters);
//         onFiltersApply?.(newFilters);
//       } else {
//         const newFilters = {
//           category,
//           subcategories: [],
//         };
//         setActiveCategory(category);
//         setSelectedFilters(newFilters);
//         onFiltersApply?.(newFilters);
//       }
//     },
//     [activeCategory, setSelectedFilters, onFiltersApply]
//   );

//   const handleSubcategoryToggle = useCallback(
//     (subcategory: string) => {
//       setSelectedFilters((prev) => {
//         const currentSubcategories = prev.subcategories;
//         const isSelected = currentSubcategories.includes(subcategory);
//         return {
//           ...prev,
//           subcategories: isSelected
//             ? currentSubcategories.filter((sc) => sc !== subcategory)
//             : [...currentSubcategories, subcategory],
//         };
//       });
//     },
//     [setSelectedFilters]
//   );

//   const handleReset = useCallback(async () => {
//     await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//     const resetFilters = { category: null, subcategories: [] };
//     setSelectedFilters(resetFilters);
//     setActiveCategory(null);
//     onFiltersApply?.(resetFilters);
//   }, [setSelectedFilters, onFiltersApply]);

//   const renderCategoryTabs = () => (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.categoryTabContainer}
//     >
//       {CATEGORIES.map((category) => (
//         <Pressable
//           key={category}
//           onPress={() => handleCategorySelect(category)}
//           style={[
//             styles.categoryTab,
//             activeCategory === category && styles.activeCategoryTab,
//           ]}
//         >
//           <Text
//             style={[
//               styles.categoryTabText,
//               activeCategory === category && styles.activeCategoryTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterHeader}>
//         <Text style={styles.filterHeaderTitle}>Browse Products</Text>
//         <Pressable
//           onPress={() => setIsFilterModalVisible(true)}
//           style={styles.filterIconContainer}
//         >
//           <Filter size={24} color={COLORS.primary} />
//           {(selectedFilters.category ||
//             selectedFilters.subcategories.length > 0) && (
//             <View style={styles.filterBadge}>
//               <Text style={styles.filterBadgeText}>
//                 {selectedFilters.subcategories.length}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>

//       {renderCategoryTabs()}

//       <Modal
//         transparent={true}
//         visible={isFilterModalVisible}
//         animationType="slide"
//       >
//         <View style={styles.modalOverlay}>
//           <SafeAreaView style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Refine Filters</Text>
//               <Pressable onPress={() => setIsFilterModalVisible(false)}>
//                 <X size={24} color={COLORS.primary} />
//               </Pressable>
//             </View>
//             {activeCategory && (
//               <ScrollView>
//                 <Text style={styles.subcategoryTitle}>
//                   {activeCategory} Subcategories
//                 </Text>
//                 {SUBCATEGORIES[activeCategory].map((subcategory) => (
//                   <Pressable
//                     key={subcategory}
//                     onPress={() => handleSubcategoryToggle(subcategory)}
//                     style={styles.subcategoryItem}
//                   >
//                     <Text style={styles.subcategoryText}>{subcategory}</Text>
//                     {selectedFilters.subcategories.includes(subcategory) && (
//                       <Check size={20} color={COLORS.primary} />
//                     )}
//                   </Pressable>
//                 ))}
//               </ScrollView>
//             )}
//             <View style={styles.modalActions}>
//               <Pressable style={styles.resetButton} onPress={handleReset}>
//                 <Text style={styles.resetButtonText}>Reset All</Text>
//               </Pressable>
//               <Pressable
//                 style={styles.applyButton}
//                 onPress={() => setIsFilterModalVisible(false)}
//               >
//                 <Text style={styles.applyButtonText}>Apply Filters</Text>
//               </Pressable>
//             </View>
//           </SafeAreaView>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 0.2,
//     backgroundColor: COLORS.background,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   filterHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   filterHeaderTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   filterIconContainer: {
//     position: "relative",
//   },
//   filterBadge: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterBadgeText: {
//     color: COLORS.white,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   categoryTabContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 4,
//     height: 50,
//   },
//   categoryTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightGray,
//   },
//   activeCategoryTab: {
//     backgroundColor: COLORS.primary,
//   },
//   categoryTabText: {
//     color: COLORS.darkText,
//     fontWeight: "500",
//     lineHeight: 20,
//   },
//   activeCategoryTabText: {
//     color: COLORS.white,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContainer: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   subcategoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.accent,
//     padding: 16,
//   },
//   subcategoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   subcategoryText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGray,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   resetButtonText: {
//     color: COLORS.primary,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   applyButton: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "600",
//   },
// });

// export default React.memo(EnhancedFilterComponent);

/****************************** */

// import React, { useState, useCallback, useEffect } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   Modal,
//   ScrollView,
//   SafeAreaView,
// } from "react-native";
// import { Filter, X, Check } from "lucide-react-native";
// import * as Haptics from "expo-haptics";

// export interface FilterState {
//   category: string | null;
//   subcategories: string[];
// }

// interface FilterProps {
//   selectedFilters: FilterState;
//   setSelectedFilters: (filters: FilterState) => void;
//   onFiltersApply?: (filters: FilterState) => void;
//   isLoading?: boolean;
// }

// const COLORS = {
//   primary: "#8B0000",
//   background: "#FFFFFF",
//   white: "#FFFFFF",
//   lightGray: "#F5F5F5",
//   darkText: "#333333",
//   accent: "#4A4A4A",
// } as const;

// const CATEGORIES = [
//   "Poultry",
//   "Livestock",
//   "Pets",
//   "Aquatic",
//   "Birds",
//   "Utilities",
// ] as const;

// const SUBCATEGORIES: Record<(typeof CATEGORIES)[number], string[]> = {
//   Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
//   Livestock: ["Sheep", "Cows", "Horses"],
//   Pets: ["Dogs", "Cats", "Rabbit"],
//   Aquatic: ["Fish"],
//   Birds: ["Birds"],
//   Utilities: ["Tools", "Accessories"],
// } as const;

// const EnhancedFilterComponent: React.FC<FilterProps> = ({
//   selectedFilters,
//   setSelectedFilters,
//   onFiltersApply,
//   isLoading = false,
// }) => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(
//     selectedFilters.category
//   );
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
//   const [localFilters, setLocalFilters] =
//     useState<FilterState>(selectedFilters);

//   useEffect(() => {
//     setLocalFilters(selectedFilters);
//     setActiveCategory(selectedFilters.category);
//   }, [selectedFilters]);

//   const handleCategorySelect = useCallback(
//     async (category: string) => {
//       try {
//         await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//         const newFilters: FilterState =
//           activeCategory === category
//             ? { category: null, subcategories: [] }
//             : { category, subcategories: [] };
//         setActiveCategory(newFilters.category);
//         setLocalFilters(newFilters);
//         setSelectedFilters(newFilters);
//         onFiltersApply?.(newFilters);
//       } catch (error) {
//         console.error("Error selecting category:", error);
//       }
//     },
//     [activeCategory, setSelectedFilters, onFiltersApply]
//   );

//   const handleSubcategoryToggle = useCallback(
//     (subcategory: string) => {
//       setLocalFilters((prev) => {
//         const newSubcategories = prev.subcategories.includes(subcategory)
//           ? prev.subcategories.filter((sc) => sc !== subcategory)
//           : [...prev.subcategories, subcategory];
//         const newFilters = { ...prev, subcategories: newSubcategories };
//         setSelectedFilters(newFilters);
//         return newFilters;
//       });
//     },
//     [setSelectedFilters]
//   );

//   const handleReset = useCallback(async () => {
//     try {
//       await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//       const resetFilters: FilterState = { category: null, subcategories: [] };
//       setLocalFilters(resetFilters);
//       setSelectedFilters(resetFilters);
//       setActiveCategory(null);
//       onFiltersApply?.(resetFilters);
//     } catch (error) {
//       console.error("Error resetting filters:", error);
//     }
//   }, [setSelectedFilters, onFiltersApply]);

//   const handleApplyFilters = useCallback(() => {
//     setIsFilterModalVisible(false);
//     onFiltersApply?.(localFilters);
//   }, [localFilters, onFiltersApply]);

//   const renderCategoryTabs = () => (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.categoryTabContainer}
//     >
//       {CATEGORIES.map((category) => (
//         <Pressable
//           key={category}
//           onPress={() => handleCategorySelect(category)}
//           style={[
//             styles.categoryTab,
//             activeCategory === category && styles.activeCategoryTab,
//           ]}
//           disabled={isLoading}
//         >
//           <Text
//             style={[
//               styles.categoryTabText,
//               activeCategory === category && styles.activeCategoryTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterHeader}>
//         <Text style={styles.filterHeaderTitle}>Browse Products</Text>
//         <Pressable
//           onPress={() => setIsFilterModalVisible(true)}
//           style={styles.filterIconContainer}
//           disabled={isLoading}
//         >
//           <Filter size={24} color={COLORS.primary} />
//           {(selectedFilters.category ||
//             selectedFilters.subcategories.length > 0) && (
//             <View style={styles.filterBadge}>
//               <Text style={styles.filterBadgeText}>
//                 {selectedFilters.subcategories.length || 1}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>

//       {renderCategoryTabs()}

//       <Modal
//         transparent
//         visible={isFilterModalVisible}
//         animationType="slide"
//         onRequestClose={() => setIsFilterModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <SafeAreaView style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Refine Filters</Text>
//               <Pressable
//                 onPress={() => setIsFilterModalVisible(false)}
//                 disabled={isLoading}
//               >
//                 <X size={24} color={COLORS.primary} />
//               </Pressable>
//             </View>
//             {activeCategory && (
//               <ScrollView>
//                 <Text style={styles.subcategoryTitle}>
//                   {activeCategory} Subcategories
//                 </Text>
//                 {SUBCATEGORIES[activeCategory].map((subcategory) => (
//                   <Pressable
//                     key={subcategory}
//                     onPress={() => handleSubcategoryToggle(subcategory)}
//                     style={styles.subcategoryItem}
//                     disabled={isLoading}
//                   >
//                     <Text style={styles.subcategoryText}>{subcategory}</Text>
//                     {localFilters.subcategories.includes(subcategory) && (
//                       <Check size={20} color={COLORS.primary} />
//                     )}
//                   </Pressable>
//                 ))}
//               </ScrollView>
//             )}
//             <View style={styles.modalActions}>
//               <Pressable
//                 style={styles.resetButton}
//                 onPress={handleReset}
//                 disabled={isLoading}
//               >
//                 <Text style={styles.resetButtonText}>Reset All</Text>
//               </Pressable>
//               <Pressable
//                 style={[
//                   styles.applyButton,
//                   isLoading && styles.applyButtonDisabled,
//                 ]}
//                 onPress={handleApplyFilters}
//                 disabled={isLoading}
//               >
//                 <Text style={styles.applyButtonText}>
//                   {isLoading ? "Applying..." : "Apply Filters"}
//                 </Text>
//               </Pressable>
//             </View>
//           </SafeAreaView>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: COLORS.background,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   filterHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   filterHeaderTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   filterIconContainer: {
//     position: "relative",
//   },
//   filterBadge: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterBadgeText: {
//     color: COLORS.white,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   categoryTabContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 4,
//   },
//   categoryTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightGray,
//   },
//   activeCategoryTab: {
//     backgroundColor: COLORS.primary,
//   },
//   categoryTabText: {
//     color: COLORS.darkText,
//     fontWeight: "500",
//   },
//   activeCategoryTabText: {
//     color: COLORS.white,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContainer: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   subcategoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.accent,
//     padding: 16,
//   },
//   subcategoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   subcategoryText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGray,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     paddingVertical: 12,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   resetButtonText: {
//     color: COLORS.primary,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   applyButton: {
//     flex: 1,
//     paddingVertical: 12,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//   },
//   applyButtonDisabled: {
//     backgroundColor: COLORS.accent,
//     opacity: 0.7,
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "600",
//   },
// });

// export default React.memo(EnhancedFilterComponent);

/***************************************** */

// import React, { useState, useCallback, useEffect } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   Modal,
//   ScrollView,
//   SafeAreaView,
// } from "react-native";
// import { Filter, X, Check } from "lucide-react-native";
// import * as Haptics from "expo-haptics";

// export interface FilterState {
//   category: string | null;
//   subcategories: string[];
// }

// interface FilterProps {
//   selectedFilters: FilterState;
//   setSelectedFilters: (filters: FilterState) => void;
//   onFiltersApply?: (filters: FilterState) => void;
//   isLoading?: boolean;
// }

// const COLORS = {
//   primary: "#8B0000",
//   background: "#FFFFFF",
//   white: "#FFFFFF",
//   lightGray: "#F5F5F5",
//   darkText: "#333333",
//   accent: "#4A4A4A",
// } as const;

// const CATEGORIES = [
//   "Poultry",
//   "Livestock",
//   "Pets",
//   "Aquatic",
//   "Birds",
//   "Utilities",
// ] as const;

// const SUBCATEGORIES: Record<(typeof CATEGORIES)[number], string[]> = {
//   Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
//   Livestock: ["Sheep", "Cows", "Horses"],
//   Pets: ["Dogs", "Cats", "Rabbit"],
//   Aquatic: ["Fish"],
//   Birds: ["Birds"],
//   Utilities: ["Tools", "Accessories"],
// } as const;

// const EnhancedFilterComponent: React.FC<FilterProps> = ({
//   selectedFilters,
//   setSelectedFilters,
//   onFiltersApply,
//   isLoading = false,
// }) => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(
//     selectedFilters.category
//   );
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
//   const [localFilters, setLocalFilters] =
//     useState<FilterState>(selectedFilters);

//   useEffect(() => {
//     setLocalFilters(selectedFilters);
//     setActiveCategory(selectedFilters.category);
//   }, [selectedFilters]);

//   const handleCategorySelect = useCallback(
//     async (category: string) => {
//       try {
//         await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//         const newFilters: FilterState =
//           activeCategory === category
//             ? { category: null, subcategories: [] }
//             : { category, subcategories: [] };
//         setActiveCategory(newFilters.category);
//         setLocalFilters(newFilters);
//         setSelectedFilters(newFilters);
//         onFiltersApply?.(newFilters);
//       } catch (error) {
//         console.error("Error selecting category:", error);
//       }
//     },
//     [activeCategory, setSelectedFilters, onFiltersApply]
//   );

//   const handleSubcategoryToggle = useCallback(
//     (subcategory: string) => {
//       setLocalFilters((prev) => {
//         const newSubcategories = prev.subcategories.includes(subcategory)
//           ? prev.subcategories.filter((sc) => sc !== subcategory)
//           : [...prev.subcategories, subcategory];
//         const newFilters = { ...prev, subcategories: newSubcategories };
//         setSelectedFilters(newFilters);
//         return newFilters;
//       });
//     },
//     [setSelectedFilters]
//   );

//   const handleReset = useCallback(async () => {
//     try {
//       await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//       const resetFilters: FilterState = { category: null, subcategories: [] };
//       setLocalFilters(resetFilters);
//       setSelectedFilters(resetFilters);
//       setActiveCategory(null);
//       onFiltersApply?.(resetFilters);
//     } catch (error) {
//       console.error("Error resetting filters:", error);
//     }
//   }, [setSelectedFilters, onFiltersApply]);

//   const handleApplyFilters = useCallback(() => {
//     setIsFilterModalVisible(false);
//     onFiltersApply?.(localFilters);
//   }, [localFilters, onFiltersApply]);

//   const renderCategoryTabs = () => (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.categoryTabContainer}
//     >
//       {CATEGORIES.map((category) => (
//         <Pressable
//           key={category}
//           onPress={() => handleCategorySelect(category)}
//           style={[
//             styles.categoryTab,
//             activeCategory === category && styles.activeCategoryTab,
//           ]}
//           disabled={isLoading}
//         >
//           <Text
//             style={[
//               styles.categoryTabText,
//               activeCategory === category && styles.activeCategoryTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterHeader}>
//         <Text style={styles.filterHeaderTitle}>Browse Products</Text>
//         <Pressable
//           onPress={() => setIsFilterModalVisible(true)}
//           style={styles.filterIconContainer}
//           disabled={isLoading}
//         >
//           <Filter size={24} color={COLORS.primary} />
//           {(selectedFilters.category ||
//             selectedFilters.subcategories.length > 0) && (
//             <View style={styles.filterBadge}>
//               <Text style={styles.filterBadgeText}>
//                 {selectedFilters.subcategories.length || 1}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>

//       {renderCategoryTabs()}

//       <Modal
//         transparent
//         visible={isFilterModalVisible}
//         animationType="slide"
//         onRequestClose={() => setIsFilterModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <SafeAreaView style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Refine Filters</Text>
//               <Pressable
//                 onPress={() => setIsFilterModalVisible(false)}
//                 disabled={isLoading}
//               >
//                 <X size={24} color={COLORS.primary} />
//               </Pressable>
//             </View>
//             {activeCategory && SUBCATEGORIES[activeCategory] ? (
//               <ScrollView>
//                 <Text style={styles.subcategoryTitle}>
//                   {activeCategory} Subcategories
//                 </Text>
//                 {SUBCATEGORIES[activeCategory].map((subcategory) => (
//                   <Pressable
//                     key={subcategory}
//                     onPress={() => handleSubcategoryToggle(subcategory)}
//                     style={styles.subcategoryItem}
//                     disabled={isLoading}
//                   >
//                     <Text style={styles.subcategoryText}>{subcategory}</Text>
//                     {localFilters.subcategories.includes(subcategory) && (
//                       <Check size={20} color={COLORS.primary} />
//                     )}
//                   </Pressable>
//                 ))}
//               </ScrollView>
//             ) : (
//               activeCategory && (
//                 <View style={styles.noSubcategories}>
//                   <Text style={styles.noSubcategoriesText}>
//                     No subcategories available for {activeCategory}
//                   </Text>
//                 </View>
//               )
//             )}
//             <View style={styles.modalActions}>
//               <Pressable
//                 style={styles.resetButton}
//                 onPress={handleReset}
//                 disabled={isLoading}
//               >
//                 <Text style={styles.resetButtonText}>Reset All</Text>
//               </Pressable>
//               <Pressable
//                 style={[
//                   styles.applyButton,
//                   isLoading && styles.applyButtonDisabled,
//                 ]}
//                 onPress={handleApplyFilters}
//                 disabled={isLoading}
//               >
//                 <Text style={styles.applyButtonText}>
//                   {isLoading ? "Applying..." : "Apply Filters"}
//                 </Text>
//               </Pressable>
//             </View>
//           </SafeAreaView>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: COLORS.background,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   filterHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   filterHeaderTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   filterIconContainer: {
//     position: "relative",
//   },
//   filterBadge: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterBadgeText: {
//     color: COLORS.white,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   categoryTabContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 4,
//   },
//   categoryTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightGray,
//   },
//   activeCategoryTab: {
//     backgroundColor: COLORS.primary,
//   },
//   categoryTabText: {
//     color: COLORS.darkText,
//     fontWeight: "500",
//   },
//   activeCategoryTabText: {
//     color: COLORS.white,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContainer: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   subcategoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.accent,
//     padding: 16,
//   },
//   subcategoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   subcategoryText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//   },
//   noSubcategories: {
//     padding: 16,
//   },
//   noSubcategoriesText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//     textAlign: "center",
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGray,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     paddingVertical: 12,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   resetButtonText: {
//     color: COLORS.primary,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   applyButton: {
//     flex: 1,
//     paddingVertical: 12,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//   },
//   applyButtonDisabled: {
//     backgroundColor: COLORS.accent,
//     opacity: 0.7,
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "600",
//   },
// });

// export default React.memo(EnhancedFilterComponent);

/*************************** */

// import React, { useState, useCallback, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   Modal,
//   ScrollView,
//   SafeAreaView,
//   ActivityIndicator,
// } from "react-native";
// import { Filter, X, Check } from "lucide-react-native";
// import * as Haptics from "expo-haptics";

// export interface FilterState {
//   category: string | null;
//   subcategories: string[];
// }

// interface FilterProps {
//   selectedFilters: FilterState;
//   setSelectedFilters: (filters: FilterState) => void;
//   onFiltersApply?: (filters: FilterState) => void;
//   isLoading?: boolean;
// }

// const COLORS = {
//   primary: "#8B0000",
//   background: "#FFFFFF",
//   white: "#FFFFFF",
//   lightGray: "#F5F5F5",
//   darkText: "#333333",
//   accent: "#4A4A4A",
// } as const;

// const CATEGORIES = [
//   "Poultry",
//   "Livestock",
//   "Pets",
//   "Aquatic",
//   "Birds",
//   "Utilities",
// ] as const;

// const SUBCATEGORIES: Record<(typeof CATEGORIES)[number], string[]> = {
//   Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
//   Livestock: ["Sheep", "Cows", "Horses"],
//   Pets: ["Dogs", "Cats", "Rabbit"],
//   Aquatic: ["Fish"],
//   Birds: ["Birds"],
//   Utilities: ["Tools", "Accessories"],
// } as const;

// const EnhancedFilterComponent: React.FC<FilterProps> = ({
//   selectedFilters,
//   setSelectedFilters,
//   onFiltersApply,
//   isLoading = false,
// }) => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(
//     selectedFilters.category
//   );
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
//   const [localFilters, setLocalFilters] =
//     useState<FilterState>(selectedFilters);
//   const [isApplying, setIsApplying] = useState(false);
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

//   // Sync local state with prop changes
//   useEffect(() => {
//     setLocalFilters(selectedFilters);
//     setActiveCategory(selectedFilters.category);
//   }, [selectedFilters]);

//   // Handle category selection with debouncing and feedback
//   const handleCategorySelect = useCallback(
//     async (category: string) => {
//       try {
//         await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//         setIsApplying(true);

//         // Clear any existing debounce timeout
//         if (debounceTimeout.current) {
//           clearTimeout(debounceTimeout.current);
//         }

//         // Debounce filter application for smoother performance
//         debounceTimeout.current = setTimeout(() => {
//           const newFilters: FilterState =
//             activeCategory === category
//               ? { category: null, subcategories: [] } // Reset if clicking active tab
//               : { category, subcategories: [] }; // Set new category

//           setActiveCategory(newFilters.category);
//           setLocalFilters(newFilters);
//           setSelectedFilters(newFilters);
//           onFiltersApply?.(newFilters);
//           setIsApplying(false);
//         }, 300); // 300ms debounce
//       } catch (error) {
//         console.error("Error selecting category:", error);
//         setIsApplying(false);
//       }
//     },
//     [activeCategory, setSelectedFilters, onFiltersApply]
//   );

//   // Toggle subcategory selection
//   const handleSubcategoryToggle = useCallback(
//     (subcategory: string) => {
//       setLocalFilters((prev) => {
//         const newSubcategories = prev.subcategories.includes(subcategory)
//           ? prev.subcategories.filter((sc) => sc !== subcategory)
//           : [...prev.subcategories, subcategory];
//         const newFilters = { ...prev, subcategories: newSubcategories };
//         setSelectedFilters(newFilters);
//         return newFilters;
//       });
//     },
//     [setSelectedFilters]
//   );

//   // Reset all filters
//   const handleReset = useCallback(async () => {
//     try {
//       await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//       const resetFilters: FilterState = { category: null, subcategories: [] };
//       setLocalFilters(resetFilters);
//       setSelectedFilters(resetFilters);
//       setActiveCategory(null);
//       onFiltersApply?.(resetFilters);
//     } catch (error) {
//       console.error("Error resetting filters:", error);
//     }
//   }, [setSelectedFilters, onFiltersApply]);

//   // Apply filters from modal
//   const handleApplyFilters = useCallback(() => {
//     setIsFilterModalVisible(false);
//     onFiltersApply?.(localFilters);
//   }, [localFilters, onFiltersApply]);

//   // Render category tabs
//   const renderCategoryTabs = () => (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.categoryTabContainer}
//     >
//       {CATEGORIES.map((category) => (
//         <Pressable
//           key={category}
//           onPress={() => handleCategorySelect(category)}
//           style={[
//             styles.categoryTab,
//             activeCategory === category && styles.activeCategoryTab,
//           ]}
//           disabled={isLoading || isApplying}
//         >
//           <Text
//             style={[
//               styles.categoryTabText,
//               activeCategory === category && styles.activeCategoryTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterHeader}>
//         <Text style={styles.filterHeaderTitle}>Browse Products</Text>
//         <Pressable
//           onPress={() => setIsFilterModalVisible(true)}
//           style={styles.filterIconContainer}
//           disabled={isLoading || isApplying}
//         >
//           <Filter size={24} color={COLORS.primary} />
//           {(selectedFilters.category ||
//             selectedFilters.subcategories.length > 0) && (
//             <View style={styles.filterBadge}>
//               <Text style={styles.filterBadgeText}>
//                 {selectedFilters.subcategories.length +
//                   (selectedFilters.category ? 1 : 0)}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>

//       {renderCategoryTabs()}

//       {isApplying && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="small" color={COLORS.primary} />
//         </View>
//       )}

//       <Modal
//         transparent
//         visible={isFilterModalVisible}
//         animationType="slide"
//         onRequestClose={() => setIsFilterModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <SafeAreaView style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Refine Filters</Text>
//               <Pressable
//                 onPress={() => setIsFilterModalVisible(false)}
//                 disabled={isLoading || isApplying}
//               >
//                 <X size={24} color={COLORS.primary} />
//               </Pressable>
//             </View>
//             {activeCategory && SUBCATEGORIES[activeCategory] ? (
//               <ScrollView>
//                 <Text style={styles.subcategoryTitle}>
//                   {activeCategory} Subcategories
//                 </Text>
//                 {SUBCATEGORIES[activeCategory].map((subcategory) => (
//                   <Pressable
//                     key={subcategory}
//                     onPress={() => handleSubcategoryToggle(subcategory)}
//                     style={styles.subcategoryItem}
//                     disabled={isLoading || isApplying}
//                   >
//                     <Text style={styles.subcategoryText}>{subcategory}</Text>
//                     {localFilters.subcategories.includes(subcategory) && (
//                       <Check size={20} color={COLORS.primary} />
//                     )}
//                   </Pressable>
//                 ))}
//               </ScrollView>
//             ) : (
//               activeCategory && (
//                 <View style={styles.noSubcategories}>
//                   <Text style={styles.noSubcategoriesText}>
//                     No subcategories available for {activeCategory}
//                   </Text>
//                 </View>
//               )
//             )}
//             <View style={styles.modalActions}>
//               <Pressable
//                 style={styles.resetButton}
//                 onPress={handleReset}
//                 disabled={isLoading || isApplying}
//               >
//                 <Text style={styles.resetButtonText}>Reset All</Text>
//               </Pressable>
//               <Pressable
//                 style={[
//                   styles.applyButton,
//                   (isLoading || isApplying) && styles.applyButtonDisabled,
//                 ]}
//                 onPress={handleApplyFilters}
//                 disabled={isLoading || isApplying}
//               >
//                 <Text style={styles.applyButtonText}>
//                   {isLoading || isApplying ? "Applying..." : "Apply Filters"}
//                 </Text>
//               </Pressable>
//             </View>
//           </SafeAreaView>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: COLORS.background,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   filterHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   filterHeaderTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   filterIconContainer: {
//     position: "relative",
//   },
//   filterBadge: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterBadgeText: {
//     color: COLORS.white,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   categoryTabContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 4,
//   },
//   categoryTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightGray,
//   },
//   activeCategoryTab: {
//     backgroundColor: COLORS.primary,
//   },
//   categoryTabText: {
//     color: COLORS.darkText,
//     fontWeight: "500",
//   },
//   activeCategoryTabText: {
//     color: COLORS.white,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContainer: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   subcategoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.accent,
//     padding: 16,
//   },
//   subcategoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   subcategoryText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//   },
//   noSubcategories: {
//     padding: 16,
//   },
//   noSubcategoriesText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//     textAlign: "center",
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGray,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     paddingVertical: 12,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   resetButtonText: {
//     color: COLORS.primary,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   applyButton: {
//     flex: 1,
//     paddingVertical: 12,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//   },
//   applyButtonDisabled: {
//     backgroundColor: COLORS.accent,
//     opacity: 0.7,
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   loadingOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.7)",
//   },
// });

// export default React.memo(EnhancedFilterComponent);

/********************************** */

// import React, { useState, useCallback, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   Modal,
//   ScrollView,
//   SafeAreaView,
//   ActivityIndicator,
// } from "react-native";
// import { Filter, X, Check } from "lucide-react-native";
// import * as Haptics from "expo-haptics";

// export interface FilterState {
//   category: string | null;
//   subcategories: string[];
// }

// interface FilterProps {
//   selectedFilters: FilterState;
//   setSelectedFilters: (filters: FilterState) => void;
//   onFiltersApply?: (filters: FilterState) => void;
//   isLoading?: boolean;
// }

// const COLORS = {
//   primary: "#8B0000",
//   background: "#FFFFFF",
//   white: "#FFFFFF",
//   lightGray: "#F5F5F5",
//   darkText: "#333333",
//   accent: "#4A4A4A",
// } as const;

// const CATEGORIES = [
//   "Poultry",
//   "Livestock",
//   "Pets",
//   "Aquatic",
//   "Birds",
//   "Utilities",
// ] as const;

// const SUBCATEGORIES: Record<(typeof CATEGORIES)[number], string[]> = {
//   Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
//   Livestock: ["Sheep", "Cows", "Horses"],
//   Pets: ["Dogs", "Cats", "Rabbit"],
//   Aquatic: ["Fish"],
//   Birds: ["Birds"],
//   Utilities: ["Tools", "Accessories"],
// } as const;

// const EnhancedFilterComponent: React.FC<FilterProps> = ({
//   selectedFilters,
//   setSelectedFilters,
//   onFiltersApply,
//   isLoading = false,
// }) => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(
//     selectedFilters.category
//   );
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
//   const [localFilters, setLocalFilters] =
//     useState<FilterState>(selectedFilters);
//   const [isApplying, setIsApplying] = useState(false);
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

//   // Sync local state with prop changes
//   useEffect(() => {
//     setLocalFilters(selectedFilters);
//     setActiveCategory(selectedFilters.category);
//   }, [selectedFilters]);

//   // Handle category selection with reset on active tab click
//   const handleCategorySelect = useCallback(
//     async (category: string) => {
//       try {
//         await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//         setIsApplying(true);

//         if (debounceTimeout.current) {
//           clearTimeout(debounceTimeout.current);
//         }

//         debounceTimeout.current = setTimeout(() => {
//           const newFilters: FilterState =
//             activeCategory === category
//               ? { category: null, subcategories: [] } // Reset filters
//               : { category, subcategories: [] }; // Select new category

//           setActiveCategory(newFilters.category);
//           setLocalFilters(newFilters);
//           setSelectedFilters(newFilters);
//           onFiltersApply?.(newFilters); // Apply reset or new filter
//           setIsApplying(false);
//         }, 300);
//       } catch (error) {
//         console.error("Error selecting category:", error);
//         setIsApplying(false);
//       }
//     },
//     [activeCategory, setSelectedFilters, onFiltersApply]
//   );

//   // Toggle subcategory selection
//   const handleSubcategoryToggle = useCallback(
//     (subcategory: string) => {
//       setLocalFilters((prev) => {
//         const newSubcategories = prev.subcategories.includes(subcategory)
//           ? prev.subcategories.filter((sc) => sc !== subcategory)
//           : [...prev.subcategories, subcategory];
//         const newFilters = { ...prev, subcategories: newSubcategories };
//         setSelectedFilters(newFilters);
//         return newFilters;
//       });
//     },
//     [setSelectedFilters]
//   );

//   // Reset all filters
//   const handleReset = useCallback(async () => {
//     try {
//       await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//       const resetFilters: FilterState = { category: null, subcategories: [] };
//       setLocalFilters(resetFilters);
//       setSelectedFilters(resetFilters);
//       setActiveCategory(null);
//       onFiltersApply?.(resetFilters);
//     } catch (error) {
//       console.error("Error resetting filters:", error);
//     }
//   }, [setSelectedFilters, onFiltersApply]);

//   // Apply filters from modal
//   const handleApplyFilters = useCallback(() => {
//     setIsFilterModalVisible(false);
//     onFiltersApply?.(localFilters);
//   }, [localFilters, onFiltersApply]);

//   // Render category tabs
//   const renderCategoryTabs = () => (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.categoryTabContainer}
//     >
//       {CATEGORIES.map((category) => (
//         <Pressable
//           key={category}
//           onPress={() => handleCategorySelect(category)}
//           style={[
//             styles.categoryTab,
//             activeCategory === category && styles.activeCategoryTab,
//           ]}
//           disabled={isLoading || isApplying}
//         >
//           <Text
//             style={[
//               styles.categoryTabText,
//               activeCategory === category && styles.activeCategoryTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterHeader}>
//         <Text style={styles.filterHeaderTitle}>Browse Products</Text>
//         <Pressable
//           onPress={() => setIsFilterModalVisible(true)}
//           style={styles.filterIconContainer}
//           disabled={isLoading || isApplying}
//         >
//           <Filter size={24} color={COLORS.primary} />
//           {(selectedFilters.category ||
//             selectedFilters.subcategories.length > 0) && (
//             <View style={styles.filterBadge}>
//               <Text style={styles.filterBadgeText}>
//                 {selectedFilters.subcategories.length +
//                   (selectedFilters.category ? 1 : 0)}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>

//       {renderCategoryTabs()}

//       {isApplying && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="small" color={COLORS.primary} />
//         </View>
//       )}

//       <Modal
//         transparent
//         visible={isFilterModalVisible}
//         animationType="slide"
//         onRequestClose={() => setIsFilterModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <SafeAreaView style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Refine Filters</Text>
//               <Pressable
//                 onPress={() => setIsFilterModalVisible(false)}
//                 disabled={isLoading || isApplying}
//               >
//                 <X size={24} color={COLORS.primary} />
//               </Pressable>
//             </View>
//             {activeCategory && SUBCATEGORIES[activeCategory] ? (
//               <ScrollView>
//                 <Text style={styles.subcategoryTitle}>
//                   {activeCategory} Subcategories
//                 </Text>
//                 {SUBCATEGORIES[activeCategory].map((subcategory) => (
//                   <Pressable
//                     key={subcategory}
//                     onPress={() => handleSubcategoryToggle(subcategory)}
//                     style={styles.subcategoryItem}
//                     disabled={isLoading || isApplying}
//                   >
//                     <Text style={styles.subcategoryText}>{subcategory}</Text>
//                     {localFilters.subcategories.includes(subcategory) && (
//                       <Check size={20} color={COLORS.primary} />
//                     )}
//                   </Pressable>
//                 ))}
//               </ScrollView>
//             ) : (
//               <View style={styles.noSubcategories}>
//                 <Text style={styles.noSubcategoriesText}>
//                   {activeCategory
//                     ? `No subcategories available for ${activeCategory}`
//                     : "Please select a category to view subcategories"}
//                 </Text>
//               </View>
//             )}
//             <View style={styles.modalActions}>
//               <Pressable
//                 style={styles.resetButton}
//                 onPress={handleReset}
//                 disabled={isLoading || isApplying}
//               >
//                 <Text style={styles.resetButtonText}>Reset All</Text>
//               </Pressable>
//               <Pressable
//                 style={[
//                   styles.applyButton,
//                   (isLoading || isApplying) && styles.applyButtonDisabled,
//                 ]}
//                 onPress={handleApplyFilters}
//                 disabled={isLoading || isApplying}
//               >
//                 <Text style={styles.applyButtonText}>
//                   {isLoading || isApplying ? "Applying..." : "Apply Filters"}
//                 </Text>
//               </Pressable>
//             </View>
//           </SafeAreaView>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: COLORS.background,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   filterHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   filterHeaderTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   filterIconContainer: {
//     position: "relative",
//   },
//   filterBadge: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterBadgeText: {
//     color: COLORS.white,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   categoryTabContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 4,
//   },
//   categoryTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightGray,
//   },
//   activeCategoryTab: {
//     backgroundColor: COLORS.primary,
//   },
//   categoryTabText: {
//     color: COLORS.darkText,
//     fontWeight: "500",
//   },
//   activeCategoryTabText: {
//     color: COLORS.white,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContainer: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   subcategoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.accent,
//     padding: 16,
//   },
//   subcategoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   subcategoryText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//   },
//   noSubcategories: {
//     padding: 16,
//   },
//   noSubcategoriesText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//     textAlign: "center",
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGray,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     paddingVertical: 12,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   resetButtonText: {
//     color: COLORS.primary,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   applyButton: {
//     flex: 1,
//     paddingVertical: 12,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//   },
//   applyButtonDisabled: {
//     backgroundColor: COLORS.accent,
//     opacity: 0.7,
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   loadingOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.7)",
//   },
// });

// export default React.memo(EnhancedFilterComponent);

/******************************** */

// import React, { useState, useCallback, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   Modal,
//   ScrollView,
//   SafeAreaView,
//   ActivityIndicator,
// } from "react-native";
// import { Filter, X, Check } from "lucide-react-native";
// import * as Haptics from "expo-haptics";

// export interface FilterState {
//   category: string | null;
//   subcategories: string[];
// }

// interface FilterProps {
//   selectedFilters: FilterState;
//   setSelectedFilters: (filters: FilterState) => void;
//   onFiltersApply?: (filters: FilterState) => void;
//   isLoading?: boolean;
// }

// const COLORS = {
//   primary: "#8B0000",
//   background: "#FFFFFF",
//   white: "#FFFFFF",
//   lightGray: "#F5F5F5",
//   darkText: "#333333",
//   accent: "#4A4A4A",
// } as const;

// const CATEGORIES = [
//   "Poultry",
//   "Livestock",
//   "Pets",
//   "Aquatic",
//   "Birds",
//   "Utilities",
// ] as const;

// const SUBCATEGORIES: Record<(typeof CATEGORIES)[number], string[]> = {
//   Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
//   Livestock: ["Sheep", "Cows", "Horses"],
//   Pets: ["Dogs", "Cats", "Rabbit"],
//   Aquatic: ["Fish"],
//   Birds: ["Birds"],
//   Utilities: ["Tools", "Accessories"],
// } as const;

// const EnhancedFilterComponent: React.FC<FilterProps> = ({
//   selectedFilters,
//   setSelectedFilters,
//   onFiltersApply,
//   isLoading = false,
// }) => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(
//     selectedFilters.category
//   );
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
//   const [localFilters, setLocalFilters] =
//     useState<FilterState>(selectedFilters);
//   const [isApplying, setIsApplying] = useState(false);
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

//   // Sync local state with prop changes
//   useEffect(() => {
//     setLocalFilters(selectedFilters);
//     setActiveCategory(selectedFilters.category);
//   }, [selectedFilters]);

//   // Handle category selection with reset on active tab click
//   const handleCategorySelect = useCallback(
//     async (category: string) => {
//       try {
//         await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//         setIsApplying(true);

//         if (debounceTimeout.current) {
//           clearTimeout(debounceTimeout.current);
//         }

//         debounceTimeout.current = setTimeout(() => {
//           const newFilters: FilterState =
//             activeCategory === category
//               ? { category: null, subcategories: [] } // Reset filters when clicking active category
//               : { category, subcategories: [] }; // Select new category

//           setActiveCategory(newFilters.category);
//           setLocalFilters(newFilters);
//           setSelectedFilters(newFilters);
//           onFiltersApply?.(newFilters); // Apply reset or new filter
//           setIsApplying(false);
//         }, 300);
//       } catch (error) {
//         console.error("Error selecting category:", error);
//         setIsApplying(false);
//       }
//     },
//     [activeCategory, setSelectedFilters, onFiltersApply]
//   );

//   // Toggle subcategory selection
//   const handleSubcategoryToggle = useCallback(
//     (subcategory: string) => {
//       setLocalFilters((prev) => {
//         const newSubcategories = prev.subcategories.includes(subcategory)
//           ? prev.subcategories.filter((sc) => sc !== subcategory)
//           : [...prev.subcategories, subcategory];
//         const newFilters = { ...prev, subcategories: newSubcategories };
//         setSelectedFilters(newFilters);
//         return newFilters;
//       });
//     },
//     [setSelectedFilters]
//   );

//   // Reset all filters
//   const handleReset = useCallback(async () => {
//     try {
//       await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//       const resetFilters: FilterState = { category: null, subcategories: [] };
//       setLocalFilters(resetFilters);
//       setSelectedFilters(resetFilters);
//       setActiveCategory(null);
//       onFiltersApply?.(resetFilters);
//     } catch (error) {
//       console.error("Error resetting filters:", error);
//     }
//   }, [setSelectedFilters, onFiltersApply]);

//   // Apply filters from modal
//   const handleApplyFilters = useCallback(() => {
//     setIsFilterModalVisible(false);
//     onFiltersApply?.(localFilters);
//   }, [localFilters, onFiltersApply]);

//   // Get subcategory message based on current state
//   const getSubcategoryMessage = useCallback(() => {
//     if (!activeCategory) {
//       return "Please select a category to view subcategories";
//     }

//     if (
//       !SUBCATEGORIES[activeCategory] ||
//       SUBCATEGORIES[activeCategory].length === 0
//     ) {
//       return `No subcategories available for ${activeCategory}`;
//     }

//     return ""; // Return empty string if subcategories exist
//   }, [activeCategory]);

//   // Render category tabs
//   const renderCategoryTabs = () => (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.categoryTabContainer}
//     >
//       {CATEGORIES.map((category) => (
//         <Pressable
//           key={category}
//           onPress={() => handleCategorySelect(category)}
//           style={[
//             styles.categoryTab,
//             activeCategory === category && styles.activeCategoryTab,
//           ]}
//           disabled={isLoading || isApplying}
//         >
//           <Text
//             style={[
//               styles.categoryTabText,
//               activeCategory === category && styles.activeCategoryTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterHeader}>
//         <Text style={styles.filterHeaderTitle}>Browse Products</Text>
//         <Pressable
//           onPress={() => setIsFilterModalVisible(true)}
//           style={styles.filterIconContainer}
//           disabled={isLoading || isApplying}
//         >
//           <Filter size={24} color={COLORS.primary} />
//           {(selectedFilters.category ||
//             selectedFilters.subcategories.length > 0) && (
//             <View style={styles.filterBadge}>
//               <Text style={styles.filterBadgeText}>
//                 {selectedFilters.subcategories.length +
//                   (selectedFilters.category ? 1 : 0)}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>

//       {renderCategoryTabs()}

//       {isApplying && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="small" color={COLORS.primary} />
//         </View>
//       )}

//       <Modal
//         transparent
//         visible={isFilterModalVisible}
//         animationType="slide"
//         onRequestClose={() => setIsFilterModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <SafeAreaView style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Refine Filters</Text>
//               <Pressable
//                 onPress={() => setIsFilterModalVisible(false)}
//                 disabled={isLoading || isApplying}
//               >
//                 <X size={24} color={COLORS.primary} />
//               </Pressable>
//             </View>
//             {activeCategory &&
//             SUBCATEGORIES[activeCategory] &&
//             SUBCATEGORIES[activeCategory].length > 0 ? (
//               <ScrollView>
//                 <Text style={styles.subcategoryTitle}>
//                   {activeCategory} Subcategories
//                 </Text>
//                 {SUBCATEGORIES[activeCategory].map((subcategory) => (
//                   <Pressable
//                     key={subcategory}
//                     onPress={() => handleSubcategoryToggle(subcategory)}
//                     style={styles.subcategoryItem}
//                     disabled={isLoading || isApplying}
//                   >
//                     <Text style={styles.subcategoryText}>{subcategory}</Text>
//                     {localFilters.subcategories.includes(subcategory) && (
//                       <Check size={20} color={COLORS.primary} />
//                     )}
//                   </Pressable>
//                 ))}
//               </ScrollView>
//             ) : (
//               <View style={styles.noSubcategories}>
//                 <Text style={styles.noSubcategoriesText}>
//                   {getSubcategoryMessage()}
//                 </Text>
//               </View>
//             )}
//             <View style={styles.modalActions}>
//               <Pressable
//                 style={styles.resetButton}
//                 onPress={handleReset}
//                 disabled={isLoading || isApplying}
//               >
//                 <Text style={styles.resetButtonText}>Reset All</Text>
//               </Pressable>
//               <Pressable
//                 style={[
//                   styles.applyButton,
//                   (isLoading || isApplying) && styles.applyButtonDisabled,
//                 ]}
//                 onPress={handleApplyFilters}
//                 disabled={isLoading || isApplying}
//               >
//                 <Text style={styles.applyButtonText}>
//                   {isLoading || isApplying ? "Applying..." : "Apply Filters"}
//                 </Text>
//               </Pressable>
//             </View>
//           </SafeAreaView>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: COLORS.background,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   filterHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   filterHeaderTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   filterIconContainer: {
//     position: "relative",
//   },
//   filterBadge: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterBadgeText: {
//     color: COLORS.white,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   categoryTabContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 4,
//   },
//   categoryTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightGray,
//   },
//   activeCategoryTab: {
//     backgroundColor: COLORS.primary,
//   },
//   categoryTabText: {
//     color: COLORS.darkText,
//     fontWeight: "500",
//   },
//   activeCategoryTabText: {
//     color: COLORS.white,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContainer: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   subcategoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.accent,
//     padding: 16,
//   },
//   subcategoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   subcategoryText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//   },
//   noSubcategories: {
//     padding: 16,
//   },
//   noSubcategoriesText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//     textAlign: "center",
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGray,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     paddingVertical: 12,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   resetButtonText: {
//     color: COLORS.primary,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   applyButton: {
//     flex: 1,
//     paddingVertical: 12,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//   },
//   applyButtonDisabled: {
//     backgroundColor: COLORS.accent,
//     opacity: 0.7,
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   loadingOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.7)",
//   },
// });

// export default React.memo(EnhancedFilterComponent);

/************************** */

// import React, { useState, useCallback, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   Modal,
//   ScrollView,
//   SafeAreaView,
//   ActivityIndicator,
// } from "react-native";
// import { Filter, X, Check } from "lucide-react-native";
// import * as Haptics from "expo-haptics";

// export interface FilterState {
//   category: string | null;
//   subcategories: string[];
// }

// interface FilterProps {
//   selectedFilters: FilterState;
//   setSelectedFilters: (filters: FilterState) => void;
//   onFiltersApply?: (filters: FilterState) => void;
//   isLoading?: boolean;
// }

// const COLORS = {
//   primary: "#8B0000",
//   background: "#FFFFFF",
//   white: "#FFFFFF",
//   lightGray: "#F5F5F5",
//   darkText: "#333333",
//   accent: "#4A4A4A",
// } as const;

// const CATEGORIES = [
//   "Poultry",
//   "Livestock",
//   "Pets",
//   "Aquatic",
//   "Birds",
//   "Utilities",
// ] as const;

// const SUBCATEGORIES: Record<(typeof CATEGORIES)[number], string[]> = {
//   Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
//   Livestock: ["Sheep", "Cows", "Horses"],
//   Pets: ["Dogs", "Cats", "Rabbit"],
//   Aquatic: ["Fish"],
//   Birds: ["Birds"],
//   Utilities: ["Tools", "Accessories"],
// } as const;

// const EnhancedFilterComponent: React.FC<FilterProps> = ({
//   selectedFilters,
//   setSelectedFilters,
//   onFiltersApply,
//   isLoading = false,
// }) => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(
//     selectedFilters.category
//   );
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
//   const [localFilters, setLocalFilters] =
//     useState<FilterState>(selectedFilters);
//   const [isApplying, setIsApplying] = useState(false);
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

//   // Sync local state with prop changes
//   useEffect(() => {
//     setLocalFilters(selectedFilters);
//     setActiveCategory(selectedFilters.category);
//   }, [selectedFilters]);

//   // Reset all filters function - shared between activeTab click and Reset button
//   const resetAllFilters = useCallback(
//     async (withHaptics = true) => {
//       try {
//         if (withHaptics) {
//           await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//         }

//         // Create a reset filter state
//         const resetFilters: FilterState = { category: null, subcategories: [] };

//         // Update all local states
//         setLocalFilters(resetFilters);
//         setActiveCategory(null);

//         // Update parent component state
//         setSelectedFilters(resetFilters);

//         // Apply the reset filters
//         onFiltersApply?.(resetFilters);

//         return resetFilters;
//       } catch (error) {
//         console.error("Error resetting filters:", error);
//         return { category: null, subcategories: [] };
//       }
//     },
//     [setSelectedFilters, onFiltersApply]
//   );

//   // Handle category selection with reset on active tab click
//   const handleCategorySelect = useCallback(
//     async (category: string) => {
//       try {
//         await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//         setIsApplying(true);

//         if (debounceTimeout.current) {
//           clearTimeout(debounceTimeout.current);
//         }

//         debounceTimeout.current = setTimeout(() => {
//           // If clicking on already active category, reset everything
//           if (activeCategory === category) {
//             resetAllFilters(false).then(() => {
//               setIsApplying(false);
//             });
//             return;
//           }

//           // Otherwise, select the new category
//           const newFilters: FilterState = {
//             category,
//             subcategories: [],
//           };

//           setActiveCategory(newFilters.category);
//           setLocalFilters(newFilters);
//           setSelectedFilters(newFilters);
//           onFiltersApply?.(newFilters);
//           setIsApplying(false);
//         }, 300);
//       } catch (error) {
//         console.error("Error selecting category:", error);
//         setIsApplying(false);
//       }
//     },
//     [activeCategory, setSelectedFilters, onFiltersApply, resetAllFilters]
//   );

//   // Toggle subcategory selection
//   const handleSubcategoryToggle = useCallback(
//     (subcategory: string) => {
//       setLocalFilters((prev) => {
//         const newSubcategories = prev.subcategories.includes(subcategory)
//           ? prev.subcategories.filter((sc) => sc !== subcategory)
//           : [...prev.subcategories, subcategory];
//         const newFilters = { ...prev, subcategories: newSubcategories };
//         setSelectedFilters(newFilters);
//         return newFilters;
//       });
//     },
//     [setSelectedFilters]
//   );

//   // Apply filters from modal
//   const handleApplyFilters = useCallback(() => {
//     setIsFilterModalVisible(false);
//     onFiltersApply?.(localFilters);
//   }, [localFilters, onFiltersApply]);

//   // Get subcategory message based on current state
//   const getSubcategoryMessage = useCallback(() => {
//     if (!activeCategory) {
//       return "Please select a category to view subcategories";
//     }

//     if (
//       !SUBCATEGORIES[activeCategory] ||
//       SUBCATEGORIES[activeCategory].length === 0
//     ) {
//       return `No subcategories available for ${activeCategory}`;
//     }

//     return ""; // Return empty string if subcategories exist
//   }, [activeCategory]);

//   // Render category tabs
//   const renderCategoryTabs = () => (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.categoryTabContainer}
//     >
//       {CATEGORIES.map((category) => (
//         <Pressable
//           key={category}
//           onPress={() => handleCategorySelect(category)}
//           style={[
//             styles.categoryTab,
//             activeCategory === category && styles.activeCategoryTab,
//           ]}
//           disabled={isLoading || isApplying}
//         >
//           <Text
//             style={[
//               styles.categoryTabText,
//               activeCategory === category && styles.activeCategoryTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterHeader}>
//         <Text style={styles.filterHeaderTitle}>Browse Products</Text>
//         <Pressable
//           onPress={() => setIsFilterModalVisible(true)}
//           style={styles.filterIconContainer}
//           disabled={isLoading || isApplying}
//         >
//           <Filter size={24} color={COLORS.primary} />
//           {(selectedFilters.category ||
//             selectedFilters.subcategories.length > 0) && (
//             <View style={styles.filterBadge}>
//               <Text style={styles.filterBadgeText}>
//                 {selectedFilters.subcategories.length +
//                   (selectedFilters.category ? 1 : 0)}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>

//       {renderCategoryTabs()}

//       {isApplying && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="small" color={COLORS.primary} />
//         </View>
//       )}

//       <Modal
//         transparent
//         visible={isFilterModalVisible}
//         animationType="slide"
//         onRequestClose={() => setIsFilterModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <SafeAreaView style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Refine Filters</Text>
//               <Pressable
//                 onPress={() => setIsFilterModalVisible(false)}
//                 disabled={isLoading || isApplying}
//               >
//                 <X size={24} color={COLORS.primary} />
//               </Pressable>
//             </View>
//             {activeCategory &&
//             SUBCATEGORIES[activeCategory] &&
//             SUBCATEGORIES[activeCategory].length > 0 ? (
//               <ScrollView>
//                 <Text style={styles.subcategoryTitle}>
//                   {activeCategory} Subcategories
//                 </Text>
//                 {SUBCATEGORIES[activeCategory].map((subcategory) => (
//                   <Pressable
//                     key={subcategory}
//                     onPress={() => handleSubcategoryToggle(subcategory)}
//                     style={styles.subcategoryItem}
//                     disabled={isLoading || isApplying}
//                   >
//                     <Text style={styles.subcategoryText}>{subcategory}</Text>
//                     {localFilters.subcategories.includes(subcategory) && (
//                       <Check size={20} color={COLORS.primary} />
//                     )}
//                   </Pressable>
//                 ))}
//               </ScrollView>
//             ) : (
//               <View style={styles.noSubcategories}>
//                 <Text style={styles.noSubcategoriesText}>
//                   {getSubcategoryMessage()}
//                 </Text>
//               </View>
//             )}
//             <View style={styles.modalActions}>
//               <Pressable
//                 style={styles.resetButton}
//                 onPress={() => resetAllFilters(true)}
//                 disabled={isLoading || isApplying}
//               >
//                 <Text style={styles.resetButtonText}>Reset All</Text>
//               </Pressable>
//               <Pressable
//                 style={[
//                   styles.applyButton,
//                   (isLoading || isApplying) && styles.applyButtonDisabled,
//                 ]}
//                 onPress={handleApplyFilters}
//                 disabled={isLoading || isApplying}
//               >
//                 <Text style={styles.applyButtonText}>
//                   {isLoading || isApplying ? "Applying..." : "Apply Filters"}
//                 </Text>
//               </Pressable>
//             </View>
//           </SafeAreaView>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: COLORS.background,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   filterHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   filterHeaderTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   filterIconContainer: {
//     position: "relative",
//   },
//   filterBadge: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterBadgeText: {
//     color: COLORS.white,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   categoryTabContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 4,
//   },
//   categoryTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightGray,
//   },
//   activeCategoryTab: {
//     backgroundColor: COLORS.primary,
//   },
//   categoryTabText: {
//     color: COLORS.darkText,
//     fontWeight: "500",
//   },
//   activeCategoryTabText: {
//     color: COLORS.white,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContainer: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   subcategoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.accent,
//     padding: 16,
//   },
//   subcategoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   subcategoryText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//   },
//   noSubcategories: {
//     padding: 16,
//   },
//   noSubcategoriesText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//     textAlign: "center",
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGray,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     paddingVertical: 12,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   resetButtonText: {
//     color: COLORS.primary,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   applyButton: {
//     flex: 1,
//     paddingVertical: 12,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//   },
//   applyButtonDisabled: {
//     backgroundColor: COLORS.accent,
//     opacity: 0.7,
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   loadingOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.7)",
//   },
// });

// export default React.memo(EnhancedFilterComponent);

/*********************************** */

// import React, { useState, useCallback, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   Modal,
//   ScrollView,
//   SafeAreaView,
//   ActivityIndicator,
// } from "react-native";
// import { Filter, X, Check } from "lucide-react-native";
// import * as Haptics from "expo-haptics";

// export interface FilterState {
//   category: string | null;
//   subcategories: string[];
// }

// interface FilterProps {
//   selectedFilters: FilterState;
//   setSelectedFilters: (filters: FilterState) => void;
//   onFiltersApply?: (filters: FilterState) => void;
//   isLoading?: boolean;
// }

// const COLORS = {
//   primary: "#8B0000",
//   background: "#FFFFFF",
//   white: "#FFFFFF",
//   lightGray: "#F5F5F5",
//   darkText: "#333333",
//   accent: "#4A4A4A",
// } as const;

// const CATEGORIES = [
//   "Poultry",
//   "Livestock",
//   "Pets",
//   "Aquatic",
//   "Birds",
//   "Utilities",
// ] as const;

// const SUBCATEGORIES: Record<(typeof CATEGORIES)[number], string[]> = {
//   Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
//   Livestock: ["Sheep", "Cows", "Horses"],
//   Pets: ["Dogs", "Cats", "Rabbit"],
//   Aquatic: ["Fish"],
//   Birds: ["Birds"],
//   Utilities: ["Tools", "Accessories"],
// } as const;

// const EnhancedFilterComponent: React.FC<FilterProps> = ({
//   selectedFilters,
//   setSelectedFilters,
//   onFiltersApply,
//   isLoading = false,
// }) => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(
//     selectedFilters.category
//   );
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
//   const [localFilters, setLocalFilters] =
//     useState<FilterState>(selectedFilters);
//   const [isApplying, setIsApplying] = useState(false);
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

//   // Sync local state with prop changes
//   useEffect(() => {
//     setLocalFilters(selectedFilters);
//     setActiveCategory(selectedFilters.category);
//   }, [selectedFilters]);

//   // Handle category selection with reset on active tab click
//   const handleCategorySelect = useCallback(
//     async (category: string) => {
//       try {
//         await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//         setIsApplying(true);

//         const newFilters: FilterState =
//           activeCategory === category
//             ? { category: null, subcategories: [] } // Reset filters
//             : { category, subcategories: [] }; // Select new category

//         setActiveCategory(newFilters.category);
//         setLocalFilters(newFilters);
//         setSelectedFilters(newFilters);
//         onFiltersApply?.(newFilters);
//         setIsApplying(false);
//       } catch (error) {
//         console.error("Error selecting category:", error);
//         setIsApplying(false);
//       }
//     },
//     [activeCategory, setSelectedFilters, onFiltersApply]
//   );

//   // Toggle subcategory selection
//   const handleSubcategoryToggle = useCallback(
//     (subcategory: string) => {
//       setLocalFilters((prev) => {
//         const newSubcategories = prev.subcategories.includes(subcategory)
//           ? prev.subcategories.filter((sc) => sc !== subcategory)
//           : [...prev.subcategories, subcategory];
//         const newFilters = { ...prev, subcategories: newSubcategories };
//         setSelectedFilters(newFilters);
//         return newFilters;
//       });
//     },
//     [setSelectedFilters]
//   );

//   // Reset all filters and close modal
//   const handleReset = useCallback(async () => {
//     try {
//       await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//       const resetFilters: FilterState = { category: null, subcategories: [] };
//       setLocalFilters(resetFilters);
//       setSelectedFilters(resetFilters);
//       setActiveCategory(null); // Explicitly set to null
//       onFiltersApply?.(resetFilters);
//       setIsFilterModalVisible(false); // Close modal immediately
//     } catch (error) {
//       console.error("Error resetting filters:", error);
//     }
//   }, [setSelectedFilters, onFiltersApply]);

//   // Apply filters from modal
//   const handleApplyFilters = useCallback(() => {
//     setIsFilterModalVisible(false);
//     onFiltersApply?.(localFilters);
//   }, [localFilters, onFiltersApply]);

//   // Render category tabs
//   const renderCategoryTabs = () => (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.categoryTabContainer}
//     >
//       {CATEGORIES.map((category) => (
//         <Pressable
//           key={category}
//           onPress={() => handleCategorySelect(category)}
//           style={[
//             styles.categoryTab,
//             activeCategory === category && styles.activeCategoryTab,
//           ]}
//           disabled={isLoading || isApplying}
//         >
//           <Text
//             style={[
//               styles.categoryTabText,
//               activeCategory === category && styles.activeCategoryTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterHeader}>
//         <Text style={styles.filterHeaderTitle}>Browse Products</Text>
//         <Pressable
//           onPress={() => setIsFilterModalVisible(true)}
//           style={styles.filterIconContainer}
//           disabled={isLoading || isApplying}
//         >
//           <Filter size={24} color={COLORS.primary} />
//           {(selectedFilters.category ||
//             selectedFilters.subcategories.length > 0) && (
//             <View style={styles.filterBadge}>
//               <Text style={styles.filterBadgeText}>
//                 {selectedFilters.subcategories.length +
//                   (selectedFilters.category ? 1 : 0)}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>

//       {renderCategoryTabs()}

//       {isApplying && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="small" color={COLORS.primary} />
//         </View>
//       )}

//       <Modal
//         transparent
//         visible={isFilterModalVisible}
//         animationType="slide"
//         onRequestClose={() => setIsFilterModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <SafeAreaView style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Refine Filters</Text>
//               <Pressable
//                 onPress={() => setIsFilterModalVisible(false)}
//                 disabled={isLoading || isApplying}
//               >
//                 <X size={24} color={COLORS.primary} />
//               </Pressable>
//             </View>
//             {activeCategory &&
//             SUBCATEGORIES[activeCategory] &&
//             SUBCATEGORIES[activeCategory].length > 0 ? (
//               <ScrollView>
//                 <Text style={styles.subcategoryTitle}>
//                   {activeCategory} Subcategories
//                 </Text>
//                 {SUBCATEGORIES[activeCategory].map((subcategory) => (
//                   <Pressable
//                     key={subcategory}
//                     onPress={() => handleSubcategoryToggle(subcategory)}
//                     style={styles.subcategoryItem}
//                     disabled={isLoading || isApplying}
//                   >
//                     <Text style={styles.subcategoryText}>{subcategory}</Text>
//                     {localFilters.subcategories.includes(subcategory) && (
//                       <Check size={20} color={COLORS.primary} />
//                     )}
//                   </Pressable>
//                 ))}
//               </ScrollView>
//             ) : (
//               <View style={styles.noSubcategories}>
//                 <Text style={styles.noSubcategoriesText}>
//                   {activeCategory === null || activeCategory === undefined
//                     ? "Please select a category to view subcategories"
//                     : `No subcategories available for ${activeCategory}`}
//                 </Text>
//               </View>
//             )}
//             <View style={styles.modalActions}>
//               <Pressable
//                 style={styles.resetButton}
//                 onPress={handleReset}
//                 disabled={isLoading || isApplying}
//               >
//                 <Text style={styles.resetButtonText}>Reset All</Text>
//               </Pressable>
//               <Pressable
//                 style={[
//                   styles.applyButton,
//                   (isLoading || isApplying) && styles.applyButtonDisabled,
//                 ]}
//                 onPress={handleApplyFilters}
//                 disabled={isLoading || isApplying}
//               >
//                 <Text style={styles.applyButtonText}>
//                   {isLoading || isApplying ? "Applying..." : "Apply Filters"}
//                 </Text>
//               </Pressable>
//             </View>
//           </SafeAreaView>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: COLORS.background,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   filterHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   filterHeaderTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   filterIconContainer: {
//     position: "relative",
//   },
//   filterBadge: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterBadgeText: {
//     color: COLORS.white,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   categoryTabContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 4,
//   },
//   categoryTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightGray,
//   },
//   activeCategoryTab: {
//     backgroundColor: COLORS.primary,
//   },
//   categoryTabText: {
//     color: COLORS.darkText,
//     fontWeight: "500",
//   },
//   activeCategoryTabText: {
//     color: COLORS.white,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContainer: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   subcategoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.accent,
//     padding: 16,
//   },
//   subcategoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   subcategoryText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//   },
//   noSubcategories: {
//     padding: 16,
//   },
//   noSubcategoriesText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//     textAlign: "center",
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGray,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     paddingVertical: 12,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   resetButtonText: {
//     color: COLORS.primary,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   applyButton: {
//     flex: 1,
//     paddingVertical: 12,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//   },
//   applyButtonDisabled: {
//     backgroundColor: COLORS.accent,
//     opacity: 0.7,
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   loadingOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.7)",
//   },
// });

// export default React.memo(EnhancedFilterComponent);

/******************************** */

// import React, { useState, useCallback, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   Modal,
//   ScrollView,
//   SafeAreaView,
//   ActivityIndicator,
// } from "react-native";
// import { Filter, X, Check } from "lucide-react-native";
// import * as Haptics from "expo-haptics";

// export interface FilterState {
//   category: string | null;
//   subcategories: string[];
// }

// interface FilterProps {
//   selectedFilters: FilterState;
//   setSelectedFilters: (filters: FilterState) => void;
//   onFiltersApply?: (filters: FilterState) => void;
//   isLoading?: boolean;
// }

// const COLORS = {
//   primary: "#8B0000",
//   background: "#FFFFFF",
//   white: "#FFFFFF",
//   lightGray: "#F5F5F5",
//   darkText: "#333333",
//   accent: "#4A4A4A",
// } as const;

// const CATEGORIES = [
//   "Poultry",
//   "Livestock",
//   "Pets",
//   "Aquatic",
//   "Birds",
//   "Utilities",
// ] as const;

// const SUBCATEGORIES: Record<(typeof CATEGORIES)[number], string[]> = {
//   Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
//   Livestock: ["Sheep", "Cows", "Horses"],
//   Pets: ["Dogs", "Cats", "Rabbit"],
//   Aquatic: ["Fish"],
//   Birds: ["Birds"],
//   Utilities: ["Tools", "Accessories"],
// } as const;

// const EnhancedFilterComponent: React.FC<FilterProps> = ({
//   selectedFilters,
//   setSelectedFilters,
//   onFiltersApply,
//   isLoading = false,
// }) => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(
//     selectedFilters.category
//   );
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
//   const [localFilters, setLocalFilters] =
//     useState<FilterState>(selectedFilters);
//   const [isApplying, setIsApplying] = useState(false);

//   // Sync local state with prop changes
//   useEffect(() => {
//     setLocalFilters(selectedFilters);
//     setActiveCategory(selectedFilters.category);
//   }, [selectedFilters]);

//   // Handle category selection with reset on active tab click
//   const handleCategorySelect = useCallback(
//     async (category: string) => {
//       try {
//         await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//         setIsApplying(true);

//         const newFilters: FilterState =
//           activeCategory === category
//             ? { category: null, subcategories: [] } // Reset filters
//             : { category, subcategories: [] }; // Select new category

//         // Update both state values synchronously
//         setActiveCategory(newFilters.category);
//         setLocalFilters(newFilters);

//         // Then update parent state and trigger callback
//         setSelectedFilters(newFilters);
//         onFiltersApply?.(newFilters);
//         setIsApplying(false);
//       } catch (error) {
//         console.error("Error selecting category:", error);
//         setIsApplying(false);
//       }
//     },
//     [activeCategory, setSelectedFilters, onFiltersApply]
//   );

//   // Toggle subcategory selection
//   const handleSubcategoryToggle = useCallback(
//     (subcategory: string) => {
//       setLocalFilters((prev) => {
//         const newSubcategories = prev.subcategories.includes(subcategory)
//           ? prev.subcategories.filter((sc) => sc !== subcategory)
//           : [...prev.subcategories, subcategory];
//         const newFilters = { ...prev, subcategories: newSubcategories };
//         setSelectedFilters(newFilters);
//         return newFilters;
//       });
//     },
//     [setSelectedFilters]
//   );

//   // Reset all filters and close modal
//   const handleReset = useCallback(async () => {
//     try {
//       await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//       const resetFilters: FilterState = { category: null, subcategories: [] };

//       // First update local state synchronously
//       setActiveCategory(null);
//       setLocalFilters(resetFilters);

//       // Then update parent state and trigger callback
//       setSelectedFilters(resetFilters);
//       onFiltersApply?.(resetFilters);
//       setIsFilterModalVisible(false);
//     } catch (error) {
//       console.error("Error resetting filters:", error);
//     }
//   }, [setSelectedFilters, onFiltersApply]);

//   // Apply filters from modal
//   const handleApplyFilters = useCallback(() => {
//     setIsFilterModalVisible(false);
//     onFiltersApply?.(localFilters);
//   }, [localFilters, onFiltersApply]);

//   // Render category tabs
//   const renderCategoryTabs = () => (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.categoryTabContainer}
//     >
//       {CATEGORIES.map((category) => (
//         <Pressable
//           key={category}
//           onPress={() => handleCategorySelect(category)}
//           style={[
//             styles.categoryTab,
//             activeCategory === category && styles.activeCategoryTab,
//           ]}
//           disabled={isLoading || isApplying}
//         >
//           <Text
//             style={[
//               styles.categoryTabText,
//               activeCategory === category && styles.activeCategoryTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );

//   // Prepare message for modal when no subcategories are available
//   const getNoSubcategoriesMessage = () => {
//     if (activeCategory === null) {
//       return "Please select a category to view subcategories";
//     } else if (
//       !SUBCATEGORIES[activeCategory] ||
//       SUBCATEGORIES[activeCategory].length === 0
//     ) {
//       return `No subcategories available for ${activeCategory}`;
//     }
//     return "";
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterHeader}>
//         <Text style={styles.filterHeaderTitle}>Browse Products</Text>
//         <Pressable
//           onPress={() => setIsFilterModalVisible(true)}
//           style={styles.filterIconContainer}
//           disabled={isLoading || isApplying}
//         >
//           <Filter size={24} color={COLORS.primary} />
//           {(selectedFilters.category ||
//             selectedFilters.subcategories.length > 0) && (
//             <View style={styles.filterBadge}>
//               <Text style={styles.filterBadgeText}>
//                 {selectedFilters.subcategories.length +
//                   (selectedFilters.category ? 1 : 0)}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>

//       {renderCategoryTabs()}

//       {isApplying && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="small" color={COLORS.primary} />
//         </View>
//       )}

//       <Modal
//         transparent
//         visible={isFilterModalVisible}
//         animationType="slide"
//         onRequestClose={() => setIsFilterModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <SafeAreaView style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Refine Filters</Text>
//               <Pressable
//                 onPress={() => setIsFilterModalVisible(false)}
//                 disabled={isLoading || isApplying}
//               >
//                 <X size={24} color={COLORS.primary} />
//               </Pressable>
//             </View>
//             {activeCategory &&
//             SUBCATEGORIES[activeCategory] &&
//             SUBCATEGORIES[activeCategory].length > 0 ? (
//               <ScrollView>
//                 <Text style={styles.subcategoryTitle}>
//                   {activeCategory} Subcategories
//                 </Text>
//                 {SUBCATEGORIES[activeCategory].map((subcategory) => (
//                   <Pressable
//                     key={subcategory}
//                     onPress={() => handleSubcategoryToggle(subcategory)}
//                     style={styles.subcategoryItem}
//                     disabled={isLoading || isApplying}
//                   >
//                     <Text style={styles.subcategoryText}>{subcategory}</Text>
//                     {localFilters.subcategories.includes(subcategory) && (
//                       <Check size={20} color={COLORS.primary} />
//                     )}
//                   </Pressable>
//                 ))}
//               </ScrollView>
//             ) : (
//               <View style={styles.noSubcategories}>
//                 <Text style={styles.noSubcategoriesText}>
//                   {getNoSubcategoriesMessage()}
//                 </Text>
//               </View>
//             )}
//             <View style={styles.modalActions}>
//               <Pressable
//                 style={styles.resetButton}
//                 onPress={handleReset}
//                 disabled={isLoading || isApplying}
//               >
//                 <Text style={styles.resetButtonText}>Reset All</Text>
//               </Pressable>
//               <Pressable
//                 style={[
//                   styles.applyButton,
//                   (isLoading || isApplying) && styles.applyButtonDisabled,
//                 ]}
//                 onPress={handleApplyFilters}
//                 disabled={isLoading || isApplying}
//               >
//                 <Text style={styles.applyButtonText}>
//                   {isLoading || isApplying ? "Applying..." : "Apply Filters"}
//                 </Text>
//               </Pressable>
//             </View>
//           </SafeAreaView>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: COLORS.background,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   filterHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   filterHeaderTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   filterIconContainer: {
//     position: "relative",
//   },
//   filterBadge: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterBadgeText: {
//     color: COLORS.white,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   categoryTabContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 4,
//   },
//   categoryTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightGray,
//   },
//   activeCategoryTab: {
//     backgroundColor: COLORS.primary,
//   },
//   categoryTabText: {
//     color: COLORS.darkText,
//     fontWeight: "500",
//   },
//   activeCategoryTabText: {
//     color: COLORS.white,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContainer: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   subcategoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.accent,
//     padding: 16,
//   },
//   subcategoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   subcategoryText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//   },
//   noSubcategories: {
//     padding: 16,
//   },
//   noSubcategoriesText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//     textAlign: "center",
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGray,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     paddingVertical: 12,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   resetButtonText: {
//     color: COLORS.primary,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   applyButton: {
//     flex: 1,
//     paddingVertical: 12,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//   },
//   applyButtonDisabled: {
//     backgroundColor: COLORS.accent,
//     opacity: 0.7,
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   loadingOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.7)",
//   },
// });

// export default React.memo(EnhancedFilterComponent);

/*************************** */

// // EnhancedFilterComponent.tsx
// import React, { useState, useCallback, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   Modal,
//   ScrollView,
//   SafeAreaView,
//   ActivityIndicator,
// } from "react-native";
// import { Filter, X, Check } from "lucide-react-native";
// import * as Haptics from "expo-haptics";

// export interface FilterState {
//   category: string | null;
//   subcategories: string[];
// }

// interface FilterProps {
//   selectedFilters: FilterState;
//   setSelectedFilters: (filters: FilterState) => void;
//   onFiltersApply?: (filters: FilterState) => void;
//   isLoading?: boolean;
// }

// const COLORS = {
//   primary: "#8B0000",
//   background: "#FFFFFF",
//   white: "#FFFFFF",
//   lightGray: "#F5F5F5",
//   darkText: "#333333",
//   accent: "#4A4A4A",
// } as const;

// const CATEGORIES = [
//   "Poultry",
//   "Livestock",
//   "Pets",
//   "Aquatic",
//   "Birds",
//   "Utilities",
// ] as const;

// const SUBCATEGORIES: Record<(typeof CATEGORIES)[number], string[]> = {
//   Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
//   Livestock: ["Sheep", "Cows", "Horses"],
//   Pets: ["Dogs", "Cats", "Rabbit"],
//   Aquatic: ["Fish"],
//   Birds: ["Birds"],
//   Utilities: ["Tools", "Accessories"],
// } as const;

// const EnhancedFilterComponent: React.FC<FilterProps> = ({
//   selectedFilters,
//   setSelectedFilters,
//   onFiltersApply,
//   isLoading = false,
// }) => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(
//     selectedFilters.category
//   );
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
//   const [localFilters, setLocalFilters] =
//     useState<FilterState>(selectedFilters);
//   const [isApplying, setIsApplying] = useState(false);

//   // Sync local state with prop changes
//   useEffect(() => {
//     setLocalFilters(selectedFilters);
//     setActiveCategory(selectedFilters.category);
//   }, [selectedFilters]);

//   // Handle category selection with reset on active tab click
//   const handleCategorySelect = useCallback(
//     async (category: string) => {
//       try {
//         await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//         setIsApplying(true);

//         const newFilters: FilterState =
//           activeCategory === category
//             ? { category: null, subcategories: [] } // Reset filters
//             : { category, subcategories: [] }; // Select new category

//         // Update both state values synchronously
//         setActiveCategory(newFilters.category);
//         setLocalFilters(newFilters);

//         // Immediately apply filters
//         setSelectedFilters(newFilters);
//         onFiltersApply?.(newFilters);

//         setIsApplying(false);
//       } catch (error) {
//         console.error("Error selecting category:", error);
//         setIsApplying(false);
//       }
//     },
//     [activeCategory, setSelectedFilters, onFiltersApply]
//   );

//   // Toggle subcategory selection
//   const handleSubcategoryToggle = useCallback(
//     (subcategory: string) => {
//       setLocalFilters((prev) => {
//         const newSubcategories = prev.subcategories.includes(subcategory)
//           ? prev.subcategories.filter((sc) => sc !== subcategory)
//           : [...prev.subcategories, subcategory];
//         const newFilters = { ...prev, subcategories: newSubcategories };
//         setSelectedFilters(newFilters);
//         return newFilters;
//       });
//     },
//     [setSelectedFilters]
//   );

//   // Reset all filters and close modal
//   const handleReset = useCallback(async () => {
//     try {
//       await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//       const resetFilters: FilterState = { category: null, subcategories: [] };

//       // First update local state synchronously
//       setActiveCategory(null);
//       setLocalFilters(resetFilters);

//       // Then update parent state and trigger callback
//       setSelectedFilters(resetFilters);
//       onFiltersApply?.(resetFilters);

//       setIsFilterModalVisible(false);
//     } catch (error) {
//       console.error("Error resetting filters:", error);
//     }
//   }, [setSelectedFilters, onFiltersApply]);

//   // Apply filters from modal
//   const handleApplyFilters = useCallback(() => {
//     setIsFilterModalVisible(false);
//     onFiltersApply?.(localFilters);
//   }, [localFilters, onFiltersApply]);

//   // Render category tabs
//   const renderCategoryTabs = () => (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.categoryTabContainer}
//     >
//       {CATEGORIES.map((category) => (
//         <Pressable
//           key={category}
//           onPress={() => handleCategorySelect(category)}
//           style={[
//             styles.categoryTab,
//             activeCategory === category && styles.activeCategoryTab,
//           ]}
//           disabled={isLoading || isApplying}
//         >
//           <Text
//             style={[
//               styles.categoryTabText,
//               activeCategory === category && styles.activeCategoryTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );

//   // Prepare message for modal when no subcategories are available
//   const getNoSubcategoriesMessage = () => {
//     if (activeCategory === null) {
//       return "Please select a category to view subcategories";
//     } else if (
//       !SUBCATEGORIES[activeCategory] ||
//       SUBCATEGORIES[activeCategory].length === 0
//     ) {
//       return `No subcategories available for ${activeCategory}`;
//     }
//     return "";
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterHeader}>
//         <Text style={styles.filterHeaderTitle}>Browse Products</Text>
//         <Pressable
//           onPress={() => setIsFilterModalVisible(true)}
//           style={styles.filterIconContainer}
//           disabled={isLoading || isApplying}
//         >
//           <Filter size={24} color={COLORS.primary} />
//           {(selectedFilters.category ||
//             selectedFilters.subcategories.length > 0) && (
//             <View style={styles.filterBadge}>
//               <Text style={styles.filterBadgeText}>
//                 {selectedFilters.subcategories.length +
//                   (selectedFilters.category ? 1 : 0)}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>

//       {renderCategoryTabs()}

//       {isApplying && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="small" color={COLORS.primary} />
//         </View>
//       )}

//       <Modal
//         transparent
//         visible={isFilterModalVisible}
//         animationType="slide"
//         onRequestClose={() => setIsFilterModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <SafeAreaView style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Refine Filters</Text>
//               <Pressable
//                 onPress={() => setIsFilterModalVisible(false)}
//                 disabled={isLoading || isApplying}
//               >
//                 <X size={24} color={COLORS.primary} />
//               </Pressable>
//             </View>
//             {activeCategory &&
//             SUBCATEGORIES[activeCategory] &&
//             SUBCATEGORIES[activeCategory].length > 0 ? (
//               <ScrollView>
//                 <Text style={styles.subcategoryTitle}>
//                   {activeCategory} Subcategories
//                 </Text>
//                 {SUBCATEGORIES[activeCategory].map((subcategory) => (
//                   <Pressable
//                     key={subcategory}
//                     onPress={() => handleSubcategoryToggle(subcategory)}
//                     style={styles.subcategoryItem}
//                     disabled={isLoading || isApplying}
//                   >
//                     <Text style={styles.subcategoryText}>{subcategory}</Text>
//                     {localFilters.subcategories.includes(subcategory) && (
//                       <Check size={20} color={COLORS.primary} />
//                     )}
//                   </Pressable>
//                 ))}
//               </ScrollView>
//             ) : (
//               <View style={styles.noSubcategories}>
//                 <Text style={styles.noSubcategoriesText}>
//                   {getNoSubcategoriesMessage()}
//                 </Text>
//               </View>
//             )}
//             <View style={styles.modalActions}>
//               <Pressable
//                 style={styles.resetButton}
//                 onPress={handleReset}
//                 disabled={isLoading || isApplying}
//               >
//                 <Text style={styles.resetButtonText}>Reset All</Text>
//               </Pressable>
//               <Pressable
//                 style={[
//                   styles.applyButton,
//                   (isLoading || isApplying) && styles.applyButtonDisabled,
//                 ]}
//                 onPress={handleApplyFilters}
//                 disabled={isLoading || isApplying}
//               >
//                 <Text style={styles.applyButtonText}>
//                   {isLoading || isApplying ? "Applying..." : "Apply Filters"}
//                 </Text>
//               </Pressable>
//             </View>
//           </SafeAreaView>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: COLORS.background,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   filterHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   filterHeaderTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   filterIconContainer: {
//     position: "relative",
//   },
//   filterBadge: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterBadgeText: {
//     color: COLORS.white,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   categoryTabContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 4,
//   },
//   categoryTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightGray,
//   },
//   activeCategoryTab: {
//     backgroundColor: COLORS.primary,
//   },
//   categoryTabText: {
//     color: COLORS.darkText,
//     fontWeight: "500",
//   },
//   activeCategoryTabText: {
//     color: COLORS.white,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContainer: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   subcategoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.accent,
//     padding: 16,
//   },
//   subcategoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   subcategoryText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//   },
//   noSubcategories: {
//     padding: 16,
//   },
//   noSubcategoriesText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//     textAlign: "center",
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGray,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     paddingVertical: 12,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   resetButtonText: {
//     color: COLORS.primary,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   applyButton: {
//     flex: 1,
//     paddingVertical: 12,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//   },
//   applyButtonDisabled: {
//     backgroundColor: COLORS.accent,
//     opacity: 0.7,
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   loadingOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.7)",
//   },
// });

// export default React.memo(EnhancedFilterComponent);

/********************************* */

// import React, { useState, useCallback, useEffect } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   Modal,
//   ScrollView,
//   SafeAreaView,
//   ActivityIndicator,
// } from "react-native";
// import { Filter, X, Check } from "lucide-react-native";
// import * as Haptics from "expo-haptics";

// export interface FilterState {
//   category: string | null;
//   subcategories: string[];
// }

// interface FilterProps {
//   selectedFilters: FilterState;
//   setSelectedFilters: (filters: FilterState) => void;
//   onFiltersApply?: (filters: FilterState) => void;
//   isLoading?: boolean;
// }

// const COLORS = {
//   primary: "#8B0000",
//   background: "#FFFFFF",
//   white: "#FFFFFF",
//   lightGray: "#F5F5F5",
//   darkText: "#333333",
//   accent: "#4A4A4A",
// } as const;

// const CATEGORIES = [
//   "Poultry",
//   "Livestock",
//   "Pets",
//   "Aquatic",
//   "Birds",
//   "Utilities",
// ] as const;

// const SUBCATEGORIES: Record<(typeof CATEGORIES)[number], string[]> = {
//   Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
//   Livestock: ["Sheep", "Cows", "Horses"],
//   Pets: ["Dogs", "Cats", "Rabbit"],
//   Aquatic: ["Fish"],
//   Birds: ["Birds"],
//   Utilities: ["Tools", "Accessories"],
// } as const;

// const EnhancedFilterComponent: React.FC<FilterProps> = ({
//   selectedFilters,
//   setSelectedFilters,
//   onFiltersApply,
//   isLoading = false,
// }) => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(
//     selectedFilters.category
//   );
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
//   const [localFilters, setLocalFilters] =
//     useState<FilterState>(selectedFilters);
//   const [isApplying, setIsApplying] = useState(false);

//   // Sync local state with prop changes
//   useEffect(() => {
//     setLocalFilters(selectedFilters);
//     setActiveCategory(selectedFilters.category);
//   }, [selectedFilters]);

//   // Handle category selection with reset on active tab click
//   const handleCategorySelect = useCallback(
//     async (category: string) => {
//       try {
//         await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//         setIsApplying(true);

//         const newFilters: FilterState =
//           activeCategory === category
//             ? { category: null, subcategories: [] } // Reset filters
//             : { category, subcategories: [] }; // Select new category

//         // Update local state synchronously
//         setActiveCategory(newFilters.category);
//         setLocalFilters(newFilters);
//         setSelectedFilters(newFilters);
//         onFiltersApply?.(newFilters);

//         setIsApplying(false);
//       } catch (error) {
//         console.error("Error selecting category:", error);
//         setIsApplying(false);
//       }
//     },
//     [activeCategory, setSelectedFilters, onFiltersApply]
//   );

//   // Toggle subcategory selection
//   const handleSubcategoryToggle = useCallback(
//     (subcategory: string) => {
//       setLocalFilters((prev) => {
//         const newSubcategories = prev.subcategories.includes(subcategory)
//           ? prev.subcategories.filter((sc) => sc !== subcategory)
//           : [...prev.subcategories, subcategory];
//         const newFilters = { ...prev, subcategories: newSubcategories };
//         setSelectedFilters(newFilters);
//         return newFilters;
//       });
//     },
//     [setSelectedFilters]
//   );

//   // // Reset all filters and close modal
//   // const handleReset = useCallback(async () => {
//   //   try {
//   //     await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//   //     const resetFilters: FilterState = { category: null, subcategories: [] };

//   //     // Update all states synchronously
//   //     setActiveCategory(null);
//   //     setLocalFilters(resetFilters);
//   //     setSelectedFilters(resetFilters);
//   //     onFiltersApply?.(resetFilters);

//   //     setIsFilterModalVisible(false);
//   //   } catch (error) {
//   //     console.error("Error resetting filters:", error);
//   //   }
//   // }, [setSelectedFilters, onFiltersApply]);

//   const handleReset = useCallback(async () => {
//     try {
//       const resetFilters = async () => {
//         await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//         const resetState: FilterState = { category: null, subcategories: [] };

//         // Update all states synchronously
//         setActiveCategory(null);
//         setLocalFilters(resetState);
//         setSelectedFilters(resetState);
//         onFiltersApply?.(resetState);

//         setIsFilterModalVisible(false);
//       };

//       // Call the reset function twice
//       await resetFilters();
//       await resetFilters();
//     } catch (error) {
//       console.error("Error resetting filters:", error);
//     }
//   }, [
//     setActiveCategory,
//     setLocalFilters,
//     setSelectedFilters,
//     onFiltersApply,
//     setIsFilterModalVisible,
//   ]);

//   // Apply filters from modal
//   const handleApplyFilters = useCallback(() => {
//     setIsFilterModalVisible(false);
//     setSelectedFilters(localFilters);
//     onFiltersApply?.(localFilters);
//   }, [localFilters, setSelectedFilters, onFiltersApply]);

//   // Render category tabs
//   const renderCategoryTabs = () => (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.categoryTabContainer}
//     >
//       {CATEGORIES.map((category) => (
//         <Pressable
//           key={category}
//           onPress={() => handleCategorySelect(category)}
//           style={[
//             styles.categoryTab,
//             activeCategory === category && styles.activeCategoryTab,
//           ]}
//           disabled={isLoading || isApplying}
//         >
//           <Text
//             style={[
//               styles.categoryTabText,
//               activeCategory === category && styles.activeCategoryTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );

//   // Prepare message for modal when no subcategories are available
//   const getNoSubcategoriesMessage = () => {
//     if (activeCategory === null) {
//       return "Please select a category to view subcategories";
//     } else if (
//       !SUBCATEGORIES[activeCategory as keyof typeof SUBCATEGORIES] ||
//       SUBCATEGORIES[activeCategory as keyof typeof SUBCATEGORIES].length === 0
//     ) {
//       return `No subcategories available for ${activeCategory}`;
//     }
//     return "";
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterHeader}>
//         <Text style={styles.filterHeaderTitle}>Browse Products</Text>
//         <Pressable
//           onPress={() => setIsFilterModalVisible(true)}
//           style={styles.filterIconContainer}
//           disabled={isLoading || isApplying}
//         >
//           <Filter size={24} color={COLORS.primary} />
//           {(selectedFilters.category ||
//             selectedFilters.subcategories.length > 0) && (
//             <View style={styles.filterBadge}>
//               <Text style={styles.filterBadgeText}>
//                 {selectedFilters.subcategories.length +
//                   (selectedFilters.category ? 1 : 0)}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>

//       {renderCategoryTabs()}

//       {isApplying && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="small" color={COLORS.primary} />
//         </View>
//       )}

//       <Modal
//         transparent
//         visible={isFilterModalVisible}
//         animationType="slide"
//         onRequestClose={() => setIsFilterModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <SafeAreaView style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Refine Filters</Text>
//               <Pressable
//                 onPress={() => setIsFilterModalVisible(false)}
//                 disabled={isLoading || isApplying}
//               >
//                 <X size={24} color={COLORS.primary} />
//               </Pressable>
//             </View>
//             {activeCategory &&
//             SUBCATEGORIES[activeCategory as keyof typeof SUBCATEGORIES] &&
//             SUBCATEGORIES[activeCategory as keyof typeof SUBCATEGORIES].length >
//               0 ? (
//               <ScrollView>
//                 <Text style={styles.subcategoryTitle}>
//                   {activeCategory} Subcategories
//                 </Text>
//                 {SUBCATEGORIES[
//                   activeCategory as keyof typeof SUBCATEGORIES
//                 ].map((subcategory) => (
//                   <Pressable
//                     key={subcategory}
//                     onPress={() => handleSubcategoryToggle(subcategory)}
//                     style={styles.subcategoryItem}
//                     disabled={isLoading || isApplying}
//                   >
//                     <Text style={styles.subcategoryText}>{subcategory}</Text>
//                     {localFilters.subcategories.includes(subcategory) && (
//                       <Check size={20} color={COLORS.primary} />
//                     )}
//                   </Pressable>
//                 ))}
//               </ScrollView>
//             ) : (
//               <View style={styles.noSubcategories}>
//                 <Text style={styles.noSubcategoriesText}>
//                   {getNoSubcategoriesMessage()}
//                 </Text>
//               </View>
//             )}
//             <View style={styles.modalActions}>
//               <Pressable
//                 style={styles.resetButton}
//                 onPress={handleReset}
//                 disabled={isLoading || isApplying}
//               >
//                 <Text style={styles.resetButtonText}>Reset All</Text>
//               </Pressable>
//               <Pressable
//                 style={[
//                   styles.applyButton,
//                   (isLoading || isApplying) && styles.applyButtonDisabled,
//                 ]}
//                 onPress={handleApplyFilters}
//                 disabled={isLoading || isApplying}
//               >
//                 <Text style={styles.applyButtonText}>
//                   {isLoading || isApplying ? "Applying..." : "Apply Filters"}
//                 </Text>
//               </Pressable>
//             </View>
//           </SafeAreaView>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: COLORS.background,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   filterHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   filterHeaderTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   filterIconContainer: {
//     position: "relative",
//   },
//   filterBadge: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterBadgeText: {
//     color: COLORS.white,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   categoryTabContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 4,
//   },
//   categoryTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightGray,
//   },
//   activeCategoryTab: {
//     backgroundColor: COLORS.primary,
//   },
//   categoryTabText: {
//     color: COLORS.darkText,
//     fontWeight: "500",
//   },
//   activeCategoryTabText: {
//     color: COLORS.white,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContainer: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   subcategoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.accent,
//     padding: 16,
//   },
//   subcategoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   subcategoryText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//   },
//   noSubcategories: {
//     padding: 16,
//   },
//   noSubcategoriesText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//     textAlign: "center",
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGray,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     paddingVertical: 12,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   resetButtonText: {
//     color: COLORS.primary,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   applyButton: {
//     flex: 1,
//     paddingVertical: 12,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//   },
//   applyButtonDisabled: {
//     backgroundColor: COLORS.accent,
//     opacity: 0.7,
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   loadingOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.7)",
//   },
// });

// export default React.memo(EnhancedFilterComponent);

/**************************************************/

import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Filter, X, Check } from "lucide-react-native";
import * as Haptics from "expo-haptics";

export interface FilterState {
  category: string | null;
  subcategories: string[];
}

interface FilterProps {
  selectedFilters: FilterState;
  setSelectedFilters: (filters: FilterState) => void;
  onFiltersApply?: (filters: FilterState) => void;
  isLoading?: boolean;
}

const COLORS = {
  primary: "#008000", // Green
  background: "#FFFFFF",
  white: "#FFFFFF",
  lightGray: "#F5F5F5",
  darkText: "#333333",
  accent: "#4A4A4A",
} as const;

const CATEGORIES = [
  "Poultry",
  "Livestock",
  "Pets",
  "Aquatic",
  "Birds",
  "Utilities",
] as const;

const SUBCATEGORIES: Record<(typeof CATEGORIES)[number], string[]> = {
  Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
  Livestock: ["Sheep", "Cows", "Horses"],
  Pets: ["Dogs", "Cats", "Rabbit"],
  Aquatic: ["Fish"],
  Birds: ["Birds"],
  Utilities: ["Tools", "Accessories"],
} as const;

const EnhancedFilterComponent: React.FC<FilterProps> = ({
  selectedFilters,
  setSelectedFilters,
  onFiltersApply,
  isLoading = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    selectedFilters.category
  );
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [localFilters, setLocalFilters] =
    useState<FilterState>(selectedFilters);
  const [isApplying, setIsApplying] = useState(false);

  // Sync local state with prop changes
  useEffect(() => {
    setLocalFilters(selectedFilters);
    setActiveCategory(selectedFilters.category);
  }, [selectedFilters]);

  // Reset filters logic extracted for reuse
  const resetFilters = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const resetState: FilterState = { category: null, subcategories: [] };
    setActiveCategory(null);
    setLocalFilters(resetState);
    setSelectedFilters(resetState);
    onFiltersApply?.(resetState);
  }, [setActiveCategory, setLocalFilters, setSelectedFilters, onFiltersApply]);

  // Handle category selection with reset on active tab click
  const handleCategorySelect = useCallback(
    async (category: string) => {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIsApplying(true);

        if (activeCategory === category) {
          // Reset filters completely, twice as per requirement
          await resetFilters();
          await resetFilters();
        } else {
          // Select new category
          const newFilters: FilterState = { category, subcategories: [] };
          setActiveCategory(category);
          setLocalFilters(newFilters);
          setSelectedFilters(newFilters);
          onFiltersApply?.(newFilters);
        }

        setIsApplying(false);
      } catch (error) {
        console.error("Error selecting category:", error);
        setIsApplying(false);
      }
    },
    [activeCategory, resetFilters, setSelectedFilters, onFiltersApply]
  );

  // Toggle subcategory selection
  const handleSubcategoryToggle = useCallback(
    (subcategory: string) => {
      setLocalFilters((prev) => {
        const newSubcategories = prev.subcategories.includes(subcategory)
          ? prev.subcategories.filter((sc) => sc !== subcategory)
          : [...prev.subcategories, subcategory];
        const newFilters = { ...prev, subcategories: newSubcategories };
        setSelectedFilters(newFilters);
        return newFilters;
      });
    },
    [setSelectedFilters]
  );

  // Reset all filters and close modal
  const handleReset = useCallback(async () => {
    try {
      // Call resetFilters twice as per requirement
      await resetFilters();
      await resetFilters();
      setIsFilterModalVisible(false);
    } catch (error) {
      console.error("Error resetting filters:", error);
    }
  }, [resetFilters]);

  // Apply filters from modal
  const handleApplyFilters = useCallback(() => {
    setIsFilterModalVisible(false);
    setSelectedFilters(localFilters);
    onFiltersApply?.(localFilters);
  }, [localFilters, setSelectedFilters, onFiltersApply]);

  // Render category tabs
  const renderCategoryTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryTabContainer}
    >
      {CATEGORIES.map((category) => (
        <Pressable
          key={category}
          onPress={() => handleCategorySelect(category)}
          style={[
            styles.categoryTab,
            activeCategory === category && styles.activeCategoryTab,
          ]}
          disabled={isLoading || isApplying}
        >
          <Text
            style={[
              styles.categoryTabText,
              activeCategory === category && styles.activeCategoryTabText,
            ]}
          >
            {category}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );

  // Prepare message for modal when no subcategories are available
  const getNoSubcategoriesMessage = () => {
    if (activeCategory === null) {
      return "Please select a category to view subcategories";
    } else if (
      !SUBCATEGORIES[activeCategory as keyof typeof SUBCATEGORIES] ||
      SUBCATEGORIES[activeCategory as keyof typeof SUBCATEGORIES].length === 0
    ) {
      return `No subcategories available for ${activeCategory}`;
    }
    return "";
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterHeader}>
        <Text style={styles.filterHeaderTitle}>Browse Products</Text>
        <Pressable
          onPress={() => setIsFilterModalVisible(true)}
          style={styles.filterIconContainer}
          disabled={isLoading || isApplying}
        >
          <Filter size={24} color={COLORS.primary} />
          {(selectedFilters.category ||
            selectedFilters.subcategories.length > 0) && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>
                {selectedFilters.subcategories.length +
                  (selectedFilters.category ? 1 : 0)}
              </Text>
            </View>
          )}
        </Pressable>
      </View>

      {renderCategoryTabs()}

      {isApplying && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color={COLORS.primary} />
        </View>
      )}

      <Modal
        transparent
        visible={isFilterModalVisible}
        animationType="slide"
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Refine Filters</Text>
              <Pressable
                onPress={() => setIsFilterModalVisible(false)}
                disabled={isLoading || isApplying}
              >
                <X size={24} color={COLORS.primary} />
              </Pressable>
            </View>
            {activeCategory &&
            SUBCATEGORIES[activeCategory as keyof typeof SUBCATEGORIES] &&
            SUBCATEGORIES[activeCategory as keyof typeof SUBCATEGORIES].length >
              0 ? (
              <ScrollView>
                <Text style={styles.subcategoryTitle}>
                  {activeCategory} Subcategories
                </Text>
                {SUBCATEGORIES[
                  activeCategory as keyof typeof SUBCATEGORIES
                ].map((subcategory) => (
                  <Pressable
                    key={subcategory}
                    onPress={() => handleSubcategoryToggle(subcategory)}
                    style={styles.subcategoryItem}
                    disabled={isLoading || isApplying}
                  >
                    <Text style={styles.subcategoryText}>{subcategory}</Text>
                    {localFilters.subcategories.includes(subcategory) && (
                      <Check size={20} color={COLORS.primary} />
                    )}
                  </Pressable>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.noSubcategories}>
                <Text style={styles.noSubcategoriesText}>
                  {getNoSubcategoriesMessage()}
                </Text>
              </View>
            )}
            <View style={styles.modalActions}>
              <Pressable
                style={styles.resetButton}
                onPress={handleReset}
                disabled={isLoading || isApplying}
              >
                <Text style={styles.resetButtonText}>Reset All</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.applyButton,
                  (isLoading || isApplying) && styles.applyButtonDisabled,
                ]}
                onPress={handleApplyFilters}
                disabled={isLoading || isApplying}
              >
                <Text style={styles.applyButtonText}>
                  {isLoading || isApplying ? "Applying..." : "Apply Filters"}
                </Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterHeaderTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
  },
  filterIconContainer: {
    position: "relative",
  },
  filterBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  filterBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  categoryTabContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
  },
  activeCategoryTab: {
    backgroundColor: COLORS.primary,
  },
  categoryTabText: {
    color: COLORS.darkText,
    fontWeight: "500",
  },
  activeCategoryTabText: {
    color: COLORS.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primary,
  },
  subcategoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.accent,
    padding: 16,
  },
  subcategoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  subcategoryText: {
    fontSize: 16,
    color: COLORS.darkText,
  },
  noSubcategories: {
    padding: 16,
  },
  noSubcategoriesText: {
    fontSize: 16,
    color: COLORS.darkText,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  resetButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  resetButtonText: {
    color: COLORS.primary,
    textAlign: "center",
    fontWeight: "600",
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  applyButtonDisabled: {
    backgroundColor: COLORS.accent,
    opacity: 0.7,
  },
  applyButtonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "600",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});

export default React.memo(EnhancedFilterComponent);
