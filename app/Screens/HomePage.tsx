// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   Animated,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const { width } = Dimensions.get("window");
// const SPACING = 16;
// const CATEGORY_WIDTH = width * 0.35;
// const FEATURED_HEIGHT = width * 0.5;
// const PRODUCT_WIDTH = (width - SPACING * 3) / 2;

// const HomePage = () => {
//   const insets = useSafeAreaInsets();
//   const [currentPage, setCurrentPage] = useState(1);
//   const fadeAnim = new Animated.Value(0);
//   const slideAnim = new Animated.Value(50);

//   // Sample data - replace with your actual data
//   const categories = [
//     { id: "1", title: "Dog Food", icon: "🐕" },
//     { id: "2", title: "Cat Food", icon: "🐱" },
//     { id: "3", title: "Bird Feed", icon: "🦜" },
//     { id: "4", title: "Fish Food", icon: "🐠" },
//     { id: "5", title: "Horse Feed", icon: "🐎" },
//   ];

//   const featuredCategories = [
//     { id: "1", title: "Premium Dog Food", image: "placeholder.jpg" },
//     { id: "2", title: "Organic Cat Food", image: "placeholder.jpg" },
//     { id: "3", title: "Special Bird Feed", image: "placeholder.jpg" },
//   ];

//   const products = Array(12)
//     .fill()
//     .map((_, i) => ({
//       id: `${i + 1}`,
//       title: `Product ${i + 1}`,
//       price: Math.floor(Math.random() * 50) + 10,
//       image: "placeholder.jpg",
//     }));

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         friction: 8,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   const renderCategory = ({ item, index }) => {
//     const animDelay = index * 100;
//     const itemFade = new Animated.Value(0);

//     useEffect(() => {
//       Animated.timing(itemFade, {
//         toValue: 1,
//         duration: 500,
//         delay: animDelay,
//         useNativeDriver: true,
//       }).start();
//     }, []);

//     return (
//       <Animated.View style={[styles.categoryItem, { opacity: itemFade }]}>
//         <TouchableOpacity
//           style={styles.categoryButton}
//           onPress={() => console.log(`Category ${item.id} pressed`)}
//         >
//           <Text style={styles.categoryIcon}>{item.icon}</Text>
//           <Text style={styles.categoryTitle}>{item.title}</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     );
//   };

//   const renderFeaturedCategory = ({ item }) => (
//     <TouchableOpacity style={styles.featuredItem}>
//       <Image
//         source={{ uri: "https://via.placeholder.com/300x200" }}
//         style={styles.featuredImage}
//       />
//       <Text style={styles.featuredTitle}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   const renderProduct = ({ item }) => (
//     <TouchableOpacity style={styles.productItem}>
//       <Image
//         source={{ uri: "https://via.placeholder.com/200x200" }}
//         style={styles.productImage}
//       />
//       <Text style={styles.productTitle}>{item.title}</Text>
//       <Text style={styles.productPrice}>${item.price}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <Animated.ScrollView
//       style={[
//         styles.container,
//         { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
//       ]}
//       contentContainerStyle={{ paddingTop: insets.top }}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* Categories */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Categories</Text>
//         <FlatList
//           data={categories}
//           renderItem={renderCategory}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.categoryList}
//         />
//       </View>

//       {/* Featured Categories */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Featured</Text>
//         <FlatList
//           data={featuredCategories}
//           renderItem={renderFeaturedCategory}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.featuredList}
//         />
//       </View>

//       {/* Promotional Banner */}
//       <View style={styles.promotionalSection}>
//         <Image
//           source={{ uri: "https://via.placeholder.com/400x200" }}
//           style={styles.promotionalImage}
//         />
//       </View>

//       {/* Dual Banner */}
//       <View style={styles.dualBanner}>
//         <TouchableOpacity style={styles.dualBannerItem}>
//           <Image
//             source={{ uri: "https://via.placeholder.com/200x150" }}
//             style={styles.dualBannerImage}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.dualBannerItem}>
//           <Image
//             source={{ uri: "https://via.placeholder.com/200x150" }}
//             style={styles.dualBannerImage}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Products Grid */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Popular Products</Text>
//         <FlatList
//           data={products.slice((currentPage - 1) * 6, currentPage * 6)}
//           renderItem={renderProduct}
//           numColumns={2}
//           columnWrapperStyle={styles.productRow}
//         />
//       </View>

//       {/* Pagination */}
//       <View style={styles.pagination}>
//         {Array(Math.ceil(products.length / 6))
//           .fill()
//           .map((_, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.pageButton,
//                 currentPage === index + 1 && styles.activePageButton,
//               ]}
//               onPress={() => setCurrentPage(index + 1)}
//             >
//               <Text
//                 style={[
//                   styles.pageButtonText,
//                   currentPage === index + 1 && styles.activePageButtonText,
//                 ]}
//               >
//                 {index + 1}
//               </Text>
//             </TouchableOpacity>
//           ))}
//       </View>
//     </Animated.ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   section: {
//     padding: SPACING,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "600",
//     marginBottom: SPACING,
//     color: "#333",
//   },
//   categoryList: {
//     paddingHorizontal: SPACING / 2,
//   },
//   categoryItem: {
//     marginHorizontal: SPACING / 2,
//   },
//   categoryButton: {
//     width: CATEGORY_WIDTH,
//     padding: SPACING,
//     backgroundColor: "#f5f5f5",
//     borderRadius: 12,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   categoryIcon: {
//     fontSize: 32,
//     marginBottom: SPACING / 2,
//   },
//   categoryTitle: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#333",
//   },
//   featuredList: {
//     paddingHorizontal: SPACING / 2,
//   },
//   featuredItem: {
//     width: width * 0.7,
//     marginHorizontal: SPACING / 2,
//   },
//   featuredImage: {
//     width: "100%",
//     height: FEATURED_HEIGHT,
//     borderRadius: 12,
//   },
//   featuredTitle: {
//     fontSize: 16,
//     fontWeight: "500",
//     marginTop: SPACING / 2,
//     color: "#333",
//   },
//   promotionalSection: {
//     padding: SPACING,
//   },
//   promotionalImage: {
//     width: "100%",
//     height: width * 0.4,
//     borderRadius: 12,
//   },
//   dualBanner: {
//     flexDirection: "row",
//     padding: SPACING,
//     gap: SPACING,
//   },
//   dualBannerItem: {
//     flex: 1,
//   },
//   dualBannerImage: {
//     width: "100%",
//     height: width * 0.3,
//     borderRadius: 12,
//   },
//   productRow: {
//     justifyContent: "space-between",
//     marginBottom: SPACING,
//   },
//   productItem: {
//     width: PRODUCT_WIDTH,
//     marginBottom: SPACING,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: SPACING,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   productImage: {
//     width: "100%",
//     height: PRODUCT_WIDTH,
//     borderRadius: 8,
//     marginBottom: SPACING / 2,
//   },
//   productTitle: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#333",
//     marginBottom: SPACING / 4,
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2196F3",
//   },
//   pagination: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: SPACING,
//     gap: SPACING / 2,
//   },
//   pageButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: "#f5f5f5",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   activePageButton: {
//     backgroundColor: "#2196F3",
//   },
//   pageButtonText: {
//     color: "#666",
//     fontWeight: "500",
//   },
//   activePageButtonText: {
//     color: "#fff",
//   },
// });

// export default HomePage;

/************************************************** */
// // HomePage.js
// import React, { useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   Animated,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const { width } = Dimensions.get("window");
// const SPACING = 16;
// const CATEGORY_WIDTH = width * 0.35;
// const FEATURED_HEIGHT = width * 0.5;
// const PRODUCT_WIDTH = (width - SPACING * 3) / 2;

// // Separate Category Item Component
// const CategoryItem = ({ item, index }) => {
//   const itemFade = React.useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const animDelay = index * 100;
//     Animated.timing(itemFade, {
//       toValue: 1,
//       duration: 500,
//       delay: animDelay,
//       useNativeDriver: true,
//     }).start();
//   }, [index]);

//   return (
//     <Animated.View style={[styles.categoryItem, { opacity: itemFade }]}>
//       <TouchableOpacity
//         style={styles.categoryButton}
//         onPress={() => console.log(`Category ${item.id} pressed`)}
//       >
//         <Text style={styles.categoryIcon}>{item.icon}</Text>
//         <Text style={styles.categoryTitle}>{item.title}</Text>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };

// const HomePage = () => {
//   const insets = useSafeAreaInsets();
//   const [currentPage, setCurrentPage] = React.useState(1);
//   const fadeAnim = React.useRef(new Animated.Value(0)).current;
//   const slideAnim = React.useRef(new Animated.Value(50)).current;

//   // Sample data
//   const categories = [
//     { id: "1", title: "Dog Food", icon: "🐕" },
//     { id: "2", title: "Cat Food", icon: "🐱" },
//     { id: "3", title: "Bird Feed", icon: "🦜" },
//     { id: "4", title: "Fish Food", icon: "🐠" },
//     { id: "5", title: "Horse Feed", icon: "🐎" },
//   ];

//   const featuredCategories = [
//     { id: "1", title: "Premium Dog Food", image: "placeholder.jpg" },
//     { id: "2", title: "Organic Cat Food", image: "placeholder.jpg" },
//     { id: "3", title: "Special Bird Feed", image: "placeholder.jpg" },
//   ];

//   const products = Array(12)
//     .fill()
//     .map((_, i) => ({
//       id: `${i + 1}`,
//       title: `Product ${i + 1}`,
//       price: Math.floor(Math.random() * 50) + 10,
//       image: "placeholder.jpg",
//     }));

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         friction: 8,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [fadeAnim, slideAnim]);

//   const renderFeaturedCategory = ({ item }) => (
//     <TouchableOpacity style={styles.featuredItem}>
//       <Image
//         source={{ uri: "https://via.placeholder.com/300x200" }}
//         style={styles.featuredImage}
//       />
//       <Text style={styles.featuredTitle}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   const renderProduct = ({ item }) => (
//     <TouchableOpacity style={styles.productItem}>
//       <Image
//         source={{ uri: "https://via.placeholder.com/200x200" }}
//         style={styles.productImage}
//       />
//       <Text style={styles.productTitle}>{item.title}</Text>
//       <Text style={styles.productPrice}>${item.price}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <Animated.ScrollView
//       style={[
//         styles.container,
//         { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
//       ]}
//       contentContainerStyle={{ paddingTop: insets.top }}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* Categories */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Categories</Text>
//         <FlatList
//           data={categories}
//           renderItem={({ item, index }) => (
//             <CategoryItem item={item} index={index} />
//           )}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.categoryList}
//         />
//       </View>

//       {/* Rest of the components remain the same */}
//       {/* Featured Categories */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Featured</Text>
//         <FlatList
//           data={featuredCategories}
//           renderItem={renderFeaturedCategory}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.featuredList}
//         />
//       </View>

//       {/* Products Grid */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Popular Products</Text>
//         <FlatList
//           data={products.slice((currentPage - 1) * 6, currentPage * 6)}
//           renderItem={renderProduct}
//           numColumns={2}
//           columnWrapperStyle={styles.productRow}
//         />
//       </View>

//       {/* Pagination */}
//       <View style={styles.pagination}>
//         {Array(Math.ceil(products.length / 6))
//           .fill()
//           .map((_, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.pageButton,
//                 currentPage === index + 1 && styles.activePageButton,
//               ]}
//               onPress={() => setCurrentPage(index + 1)}
//             >
//               <Text
//                 style={[
//                   styles.pageButtonText,
//                   currentPage === index + 1 && styles.activePageButtonText,
//                 ]}
//               >
//                 {index + 1}
//               </Text>
//             </TouchableOpacity>
//           ))}
//       </View>
//     </Animated.ScrollView>
//   );
// };

// // Styles remain the same as before...
// const styles = StyleSheet.create({
//   // ... (same styles as before)
// });

// export default HomePage;

/*************************************** */

// // HomePage.js
// import { View, Text, FlatList, Image } from "react-native";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HomePage = () => {
//   const [banners, setBanners] = useState([]);
//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/banners?populate=*`,
//           {
//             headers: {
//               Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BANNER}`,
//             },
//           }
//         );
//         setBanners(response.data.data);
//         console.log(
//           "Raw API response:",
//           JSON.stringify(response.data.data, null, 2)
//         );
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchBanners();
//   }, []); // Empty dependency array means this runs only on component mount

//   const renderBanner = ({ banner }) => {
//     <View>
//       <Text>{banner?.titel}</Text>
//       <Image source={banner?.img?.formats?.large.url} />
//     </View>;
//   };
//   return (
//     <>
//       <View>
//         <Text>Categories</Text>
//         <FlatList data={banners} renderItem={renderBanner} />
//       </View>

//       <View>
//         <Text>Featured Products</Text>
//       </View>

//       <View>
//         <Text>Grid Featured design</Text>
//       </View>

//       <View>
//         <Text>Our store</Text>
//       </View>
//     </>
//   );
// };

// export default HomePage;

/***************** **************************************/

// import { View, Text, FlatList, Image, StyleSheet } from "react-native";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HomePage = () => {
//   const [banners, setBanners] = useState([]);
//   const [products, setProducts] = useState([]);

//   // Fetch banners data from API on component mount
//   useEffect(() => {
//     // fetch banners
//     const fetchBanners = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/banners?populate=*`,
//           {
//             headers: {
//               Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BANNER}`,
//             },
//           }
//         );
//         setBanners(response.data.data);
//         console.log(
//           "Raw API response:",
//           JSON.stringify(response.data.data, null, 2)
//         );
//       } catch (error) {
//         console.error("Error fetching banners:", error);
//       }
//     };

//     fetchBanners();

//     // fetch products
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*`,
//           {
//             headers: {
//               Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//             },
//           }
//         );
//         setProducts(response.data);
//         console.log(
//           "Raw API response:",
//           JSON.stringify(response.data.data, null, 2)
//         );
//       } catch (error) {
//         console.error("Error fetching Products:", error);
//       }
//     };

//     fetchProducts();
//   }, []); // Empty dependency array means this runs only on component mount

//   // Render function for each banner item
//   const renderBanner = ({ item }) => (
//     <View style={styles.bannerContainer}>
//       <Text style={styles.title}>{item.title}</Text>
//       <Image
//         style={styles.image}
//         source={{ uri: item.img?.formats?.large?.url }}
//         resizeMode="cover"
//       />
//     </View>
//   );

//   // Render function for each product item
//   const renderProducts = ({ product }) => (
//     <View style={styles.bannerContainer}>
//       <Text style={styles.title}>{product?.name}</Text>
//       <Text style={styles.price}>${product?.price}</Text>
//       <Text style={styles.category}>
//         {product?.Category} - {product?.Subcategory}
//       </Text>
//       <Text style={styles.description}>
//         {product?.description && (
//           <Text>{product?.description.replace(/<[^>]*>/g, "")}</Text>
//         )}
//       </Text>
//       <Image
//         style={styles.image}
//         source={{ uri: product?.primaryImage[0]?.formats?.large?.url }}
//         resizeMode="cover"
//       />
//     </View>
//   );
//   return (
//     <>
//       // Section 1
//       <View style={styles.container}>
//         <Text style={styles.header}>Banners</Text>
//         {/* FlatList for horizontal scrolling banners */}
//         <FlatList
//           data={banners}
//           renderItem={renderBanner}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal={true} // Set to horizontal scrolling
//           showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
//         />
//       </View>
//       //Sectoion 2
//       <View>
//         <Text>Section2</Text>
//         <FlatList
//           data={products}
//           renderItem={renderProducts}
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//         />
//       </View>
//       //Sectoion 3
//       <View>
//         <Text>Section3</Text>
//       </View>
//     </>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//     paddingHorizontal: 10,
//     backgroundColor: "#fff", // Background color
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   bannerContainer: {
//     marginRight: 10, // Space between images
//     alignItems: "center", // Center align images and title
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "500",
//     textAlign: "center",
//     marginBottom: 5, // Space between title and image
//   },
//   image: {
//     width: 300, // Image width
//     height: 180, // Image height
//     borderRadius: 8, // Optional: Adds rounded corners to the image
//   },

//   price: {
//     fontSize: 16,
//     color: "#888",
//     marginBottom: 10,
//   },
//   category: {
//     fontSize: 14,
//     color: "#555",
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 14,
//     color: "#333",
//     marginBottom: 10,
//   },
// });

// export default HomePage;

/************************** */

// import { View, Text, FlatList, Image, StyleSheet } from "react-native";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HomePage = () => {
//   const [banners, setBanners] = useState([]);
//   const [products, setProducts] = useState([]);

//   // Fetch banners data from API on component mount
//   useEffect(() => {
//     // fetch banners
//     const fetchBanners = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/banners?populate=*`,
//           {
//             headers: {
//               Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BANNER}`,
//             },
//           }
//         );
//         setBanners(response.data.data);
//         console.log(
//           "Raw API response for banners:",
//           JSON.stringify(response.data.data, null, 2)
//         );
//       } catch (error) {
//         console.error("Error fetching banners:", error);
//       }
//     };

//     fetchBanners();

//     // fetch products
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*`,
//           {
//             headers: {
//               Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//             },
//           }
//         );
//         setProducts(response.data.data); // Ensure you set the correct data
//         console.log(
//           "Raw API response for products:",
//           JSON.stringify(response.data.data, null, 2)
//         );
//       } catch (error) {
//         console.error("Error fetching Products:", error);
//       }
//     };

//     fetchProducts();
//   }, []); // Empty dependency array means this runs only on component mount

//   // Render function for each banner item
//   const renderBanner = ({ item }) => (
//     <View style={styles.bannerContainer}>
//       <Text style={styles.title}>{item.title}</Text>
//       <Image
//         style={styles.image}
//         source={{ uri: item.img?.formats?.large?.url }}
//         resizeMode="cover"
//       />
//     </View>
//   );

//   // Render function for each product item
//   const renderProduct = ({ item }) => (
//     <View style={styles.bannerContainer}>
//       <Text style={styles.title}>{item.name}</Text>
//       <Text style={styles.price}>${item.price}</Text>
//       <Text style={styles.category}>
//         {item.Category} - {item.Subcategory}
//       </Text>
//       <Image
//         style={styles.image}
//         source={{ uri: item.primaryImage[0]?.formats?.large?.url }}
//         resizeMode="cover"
//       />
//     </View>
//   );

//   return (
//     <>
//       {/* Section 1: Banners */}
//       <View style={styles.container}>
//         <Text style={styles.header}>Banners</Text>
//         <FlatList
//           data={banners}
//           renderItem={renderBanner}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal={true} // Horizontal scrolling
//           showsHorizontalScrollIndicator={false}
//         />
//       </View>

//       {/* Section 2: Products */}
//       <View>
//         <Text style={styles.header}>Products</Text>
//         <FlatList
//           data={products}
//           renderItem={renderProduct}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal={true} // Horizontal scrolling
//           showsHorizontalScrollIndicator={false}
//         />
//       </View>

//       {/* Section 3 (Placeholder) */}
//       <View>
//         <Text>Section3</Text>
//       </View>
//     </>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//     paddingHorizontal: 10,
//     backgroundColor: "#fff",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   bannerContainer: {
//     marginRight: 10,
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "500",
//     textAlign: "center",
//     marginBottom: 5,
//   },
//   image: {
//     width: 300,
//     height: 180,
//     borderRadius: 8,
//   },
//   price: {
//     fontSize: 16,
//     color: "#888",
//     marginBottom: 10,
//   },
//   category: {
//     fontSize: 14,
//     color: "#555",
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 14,
//     color: "#333",
//     marginBottom: 10,
//   },
// });

// export default HomePage;

/**************************** ****************************/

// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   StyleSheet,
//   Dimensions,
//   ActivityIndicator,
//   RefreshControl,
//   Animated,
//   TouchableOpacity,
//   Platform,
// } from "react-native";
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { LinearGradient } from "expo-linear-gradient";
// import { BlurView } from "@react-native-community/blur";
// import * as Haptics from "expo-haptics";
// import { StatusBar } from "expo-status-bar";
// import { WebView } from "react-native-webview";
// import ProductGridSection from "../Components/products/ProductGridSection";

// const { width } = Dimensions.get("window");
// const BANNER_ITEM_WIDTH = width * 0.85;
// const PRODUCT_ITEM_WIDTH = width * 0.7;
// const BLOG_ITEM_WIDTH = width * 0.8;

// //Products Grid
// const COLUMN_COUNT = 2;
// const GRID_GAP = 12;
// const ITEM_WIDTH = (width - 32 - GRID_GAP) / COLUMN_COUNT;
// const ITEMS_PER_PAGE = 6; // 3 rows × 2 columns

// //Products section

// const HomePage = () => {
//   const [banners, setBanners] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState(null);

//   const scrollY = useRef(new Animated.Value(0)).current;
//   const bannerScrollX = useRef(new Animated.Value(0)).current;

//   const fetchData = async () => {
//     setError(null);
//     setLoading(true);
//     try {
//       const [bannersResponse, productsResponse, blogsResponse] =
//         await Promise.all([
//           axios.get(
//             `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/banners?populate=*`,
//             {
//               headers: {
//                 Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BANNER}`,
//               },
//             }
//           ),
//           axios.get(
//             `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*`,
//             {
//               headers: {
//                 Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//               },
//             }
//           ),
//           axios.get(
//             `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?populate=*`,
//             {
//               headers: {
//                 Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BLOG}`,
//               },
//             }
//           ),
//         ]);

//       setBanners(bannersResponse.data.data);
//       setProducts(productsResponse.data.data);
//       setBlogs(blogsResponse.data.data);
//     } catch (err) {
//       setError("Failed to load content. Please try again later.");
//       console.error("Error fetching data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchData();
//     setRefreshing(false);
//   };

//   const handleProductPress = (product) => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     // Navigation logic here
//   };

//   // Banner animation
//   const renderBanner = ({ item, index }) => {
//     const inputRange = [
//       (index - 1) * BANNER_ITEM_WIDTH,
//       index * BANNER_ITEM_WIDTH,
//       (index + 1) * BANNER_ITEM_WIDTH,
//     ];

//     const scale = bannerScrollX.interpolate({
//       inputRange,
//       outputRange: [0.9, 1, 0.9],
//     });

//     const opacity = bannerScrollX.interpolate({
//       inputRange,
//       outputRange: [0.6, 1, 0.6],
//     });

//     return (
//       <Animated.View
//         style={[styles.bannerContainer, { transform: [{ scale }], opacity }]}
//       >
//         <LinearGradient
//           colors={["rgba(0,0,0,0.3)", "transparent"]}
//           style={styles.bannerGradient}
//         >
//           <Image
//             style={styles.bannerImage}
//             source={{ uri: item.img?.formats?.large?.url }}
//             resizeMode="cover"
//           />
//           <BlurView intensity={80} style={styles.bannerTextContainer}>
//             <Text style={styles.bannerTitle}>{item.title}</Text>
//           </BlurView>
//         </LinearGradient>
//       </Animated.View>
//     );
//   };

//   const renderProduct = ({ item }) => (
//     <TouchableOpacity
//       style={styles.productContainer}
//       onPress={() => handleProductPress(item)}
//       activeOpacity={0.7}
//     >
//       <Image
//         style={styles.productImage}
//         source={{ uri: item.primaryImage[0]?.formats?.large?.url }}
//         resizeMode="cover"
//       />
//       <View style={styles.productInfo}>
//         <Text style={styles.productTitle} numberOfLines={1}>
//           {item.name}
//         </Text>
//         <Text style={styles.price}>{item.price.toFixed(3)} kwd</Text>
//         <View style={styles.categoryContainer}>
//           <Text style={styles.category}>{item.Category}</Text>
//           <Text style={styles.subcategory}>{item.Subcategory}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   // const renderBlogs = ({ blog }) => (
//   //   <TouchableOpacity
//   //     style={styles.productContainer}
//   //     onPress={() => handleProductPress(blog)}
//   //     activeOpacity={0.7}
//   //   >
//   //     <Text style={styles.productTitle} numberOfLines={1}>
//   //       {blog.title}
//   //     </Text>
//   //     <Text>Authot:{blog.author}</Text>
//   //   </TouchableOpacity>
//   // );

//   const renderBlogPost = ({ item }) => (
//     <TouchableOpacity
//       style={styles.blogContainer}
//       onPress={() => handleBlogPress(item)}
//       activeOpacity={0.7}
//     >
//       <Image
//         style={styles.blogImage}
//         source={{ uri: item.FeaturedImage?.formats?.medium?.url }}
//         resizeMode="cover"
//       />
//       <LinearGradient
//         colors={["transparent", "rgba(0,0,0,0.8)"]}
//         style={styles.blogGradient}
//       >
//         <View style={styles.blogContent}>
//           <Text style={styles.blogCategory}>{item.Category}</Text>
//           <Text style={styles.blogTitle} numberOfLines={2}>
//             {item.Title}
//           </Text>
//           <View style={styles.blogMeta}>
//             <Text style={styles.blogAuthor}>By {item.Author}</Text>
//             <Text style={styles.blogDate}>
//               {new Date(item.publishedAt).toLocaleDateString()}
//             </Text>
//           </View>
//         </View>
//       </LinearGradient>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0066CC" />
//         <Text style={styles.loadingText}>Loading amazing content...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//         <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
//           <Text style={styles.retryButtonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <Animated.ScrollView
//       style={styles.container}
//       onScroll={Animated.event(
//         [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//         { useNativeDriver: true }
//       )}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//       showsVerticalScrollIndicator={false}
//     >
//       <StatusBar style="dark" />

//       {/* Banners Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionHeader}>Featured</Text>
//         <Animated.FlatList
//           data={banners}
//           renderItem={renderBanner}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           pagingEnabled
//           snapToInterval={BANNER_ITEM_WIDTH}
//           decelerationRate="fast"
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { x: bannerScrollX } } }],
//             { useNativeDriver: true }
//           )}
//           contentContainerStyle={styles.bannerList}
//         />
//       </View>

//       {/* Products Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionHeader}>Popular Products</Text>
//         <FlatList
//           data={products}
//           renderItem={renderProduct}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.productList}
//           snapToInterval={PRODUCT_ITEM_WIDTH}
//           decelerationRate="fast"
//         />
//       </View>

//       {/* Blogs Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionHeader}>Latest Articles</Text>
//         <FlatList
//           data={blogs}
//           renderItem={renderBlogPost}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.blogList}
//           snapToInterval={BLOG_ITEM_WIDTH}
//           decelerationRate="fast"
//         />
//       </View>
//       {/* <View style={styles.section}>
//         <ProductGridSection
//           products={products}
//           onProductPress={() => console.log("pressed")}
//         />
//       </View> */}
//     </Animated.ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f8f9fa",
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "#666",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   errorText: {
//     fontSize: 16,
//     color: "#dc3545",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   retryButton: {
//     backgroundColor: "#0066CC",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   retryButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionHeader: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 16,
//     marginLeft: 16,
//     color: "#1a1a1a",
//   },
//   bannerContainer: {
//     width: BANNER_ITEM_WIDTH,
//     marginHorizontal: (width - BANNER_ITEM_WIDTH) / 2,
//     borderRadius: 16,
//     overflow: "hidden",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   bannerGradient: {
//     height: 200,
//     justifyContent: "space-between",
//   },
//   bannerImage: {
//     width: "100%",
//     height: 200,
//     position: "absolute",
//   },
//   bannerTextContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 16,
//     borderBottomLeftRadius: 16,
//     borderBottomRightRadius: 16,
//     overflow: "hidden",
//   },
//   bannerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#fff",
//   },
//   bannerList: {
//     paddingVertical: 8,
//   },
//   productContainer: {
//     width: PRODUCT_ITEM_WIDTH,
//     marginHorizontal: 8,
//     borderRadius: 12,
//     backgroundColor: "#fff",
//     overflow: "hidden",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   productImage: {
//     width: "100%",
//     height: 200,
//   },
//   productInfo: {
//     padding: 12,
//   },
//   productTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1a1a1a",
//     marginBottom: 4,
//   },
//   price: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#EE4B2B",
//     marginBottom: 8,
//   },
//   categoryContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   category: {
//     fontSize: 14,
//     color: "#666",
//     backgroundColor: "#f1f3f5",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//     marginRight: 8,
//   },
//   subcategory: {
//     fontSize: 14,
//     color: "#666",
//   },
//   productList: {
//     paddingLeft: 8,
//     paddingRight: 16,
//   },
//   blogContainer: {
//     width: BLOG_ITEM_WIDTH,
//     height: 280,
//     marginHorizontal: 8,
//     borderRadius: 12,
//     overflow: "hidden",
//     backgroundColor: "#fff",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   blogImage: {
//     width: "100%",
//     height: "100%",
//     position: "absolute",
//   },
//   blogGradient: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: "60%",
//     justifyContent: "flex-end",
//     padding: 16,
//   },
//   blogContent: {
//     gap: 8,
//   },
//   blogCategory: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "600",
//     backgroundColor: "rgba(255,255,255,0.2)",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//     alignSelf: "flex-start",
//   },
//   blogTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#fff",
//     lineHeight: 24,
//   },
//   blogMeta: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 8,
//   },
//   blogAuthor: {
//     color: "#fff",
//     fontSize: 12,
//     opacity: 0.8,
//   },
//   blogDate: {
//     color: "#fff",
//     fontSize: 12,
//     opacity: 0.8,
//   },
//   blogList: {
//     paddingLeft: 8,
//     paddingRight: 16,
//     paddingVertical: 8,
//   },
// });

// export default HomePage;

/*********************************** */

// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   StyleSheet,
//   Dimensions,
//   ActivityIndicator,
//   RefreshControl,
//   Animated,
//   TouchableOpacity,
//   Platform,
//   animated,
// } from "react-native";
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { LinearGradient } from "expo-linear-gradient";
// // import { BlurView } from "@react-native-community/blur";
// import * as Haptics from "expo-haptics";
// import { StatusBar } from "expo-status-bar";
// import { WebView } from "react-native-webview";
// import ProductGridSection from "../Components/products/ProductGridSection";
// import DealOfTheDay from "../Components/Home/DealOfTheDay";
// import GridOfPopularProducts from "../Components/Home/GridOfPopularProducts";
// import FeaturedProducts from "../Components/Home/FeaturedProducts";
// import CategoriesSection from "../Components/Home/CategoriesSection";
// import BlogSection from "../Components/Home/BlogSection";

// const { width } = Dimensions.get("window");
// const BANNER_ITEM_WIDTH = width * 0.85;
// const PRODUCT_ITEM_WIDTH = width * 0.7;
// const BLOG_ITEM_WIDTH = width * 0.8;

// //Products Grid
// const COLUMN_COUNT = 2;
// const GRID_GAP = 12;
// const ITEM_WIDTH = (width - 32 - GRID_GAP) / COLUMN_COUNT;
// const ITEMS_PER_PAGE = 6; // 3 rows × 2 columns

// //Products section

// const HomePage = () => {
//   const [banners, setBanners] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [blogs, setBlogs] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState(null);

//   const scrollY = useRef(new Animated.Value(0)).current;
//   const bannerScrollX = useRef(new Animated.Value(0)).current;

//   // animated into view blurred text
//   const opacityV = new Animated.Value(0);

//   useEffect(() => {
//     Animated.timing(opacityV, {
//       toValue: 1,
//       duration: 500,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const fetchData = async () => {
//     setError(null);
//     setLoading(true);
//     try {
//       const [
//         bannersResponse,
//         productsResponse,
//         blogsResponse,
//         categoriesResponse,
//       ] = await Promise.all([
//         axios.get(
//           `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/banners?populate=*`,
//           {
//             headers: {
//               Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BANNER}`,
//             },
//           }
//         ),
//         axios.get(
//           `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*`,
//           {
//             headers: {
//               Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//             },
//           }
//         ),
//         axios.get(
//           `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?populate=*`,
//           {
//             headers: {
//               Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BLOG}`,
//             },
//           }
//         ),
//         axios.get(
//           `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/categories?populate=*`,
//           {
//             headers: {
//               Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_CATEGORIES}`,
//             },
//           }
//         ),
//       ]);

//       setBanners(bannersResponse.data.data);
//       setProducts(productsResponse.data.data);
//       setBlogs(blogsResponse.data.data);
//       setCategories(categoriesResponse.data.data);
//     } catch (err) {
//       setError("Failed to load content. Please try again later.");
//       console.error("Error fetching data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchData();
//     setRefreshing(false);
//   };

//   const handleProductPress = (product) => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     // Navigation logic here
//   };

//   // Banner animation
//   const renderBanner = ({ item, index }) => {
//     const inputRange = [
//       (index - 1) * BANNER_ITEM_WIDTH,
//       index * BANNER_ITEM_WIDTH,
//       (index + 1) * BANNER_ITEM_WIDTH,
//     ];

//     const scale = bannerScrollX.interpolate({
//       inputRange,
//       outputRange: [0.9, 1, 0.9],
//     });

//     const opacity = bannerScrollX.interpolate({
//       inputRange,
//       outputRange: [0.6, 1, 0.6],
//     });

//     // PLaceholder
//     const handleBlogPress = () => {};

//     return (
//       <Animated.View
//         style={[styles.bannerContainer, { transform: [{ scale }], opacity }]}
//       >
//         <LinearGradient
//           colors={["rgba(0,0,0,0.3)", "transparent"]}
//           style={styles.bannerGradient}
//         >
//           <Image
//             style={styles.bannerImage}
//             source={{ uri: item.img?.formats?.large?.url }}
//             resizeMode="cover"
//           />
//           <Animated.View
//             style={[
//               StyleSheet.absoluteFillObject,
//               {
//                 backgroundColor: "rgba(255, 255, 255, 0.4)",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 opacity: opacity, // Apply animated opacity
//               },
//             ]}
//           >
//             <Text style={styles.bannerTitle}>{item.title}</Text>
//           </Animated.View>
//         </LinearGradient>
//       </Animated.View>
//     );
//   };

//   const renderProduct = ({ item }) => (
//     <TouchableOpacity
//       style={styles.productContainer}
//       onPress={() => handleProductPress(item)}
//       activeOpacity={0.7}
//     >
//       <Image
//         style={styles.productImage}
//         source={{ uri: item.primaryImage[0]?.formats?.large?.url }}
//         resizeMode="cover"
//       />
//       <View style={styles.productInfo}>
//         <Text style={styles.productTitle} numberOfLines={1}>
//           {item.name}
//         </Text>
//         <Text style={styles.price}>{item.price.toFixed(3)} kwd</Text>
//         <View style={styles.categoryContainer}>
//           <Text style={styles.category}>{item.Category}</Text>
//           <Text style={styles.subcategory}>{item.Subcategory}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   //Categories
//   const handleCategoriesPress = () => {};

//   const renderCategories = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => handleCategoriesPress()}
//       activeOpacity={0.7}
//       className="flex-col justify-center align-middle place-items-center"
//     >
//       <View className="">
//         {/* Highlight Background */}
//         <View className="bg-gradient-to-r from-green-800 to-green-900 rounded-lg px-4 py-2">
//           <Text className="text-center text-green-800/90 font-bold text-lg">
//             {item.title}
//           </Text>
//         </View>
//       </View>
//       <Image
//         source={{ uri: item.categoryImage.formats.large.url }}
//         resizeMode="cover"
//         className="rounded-full w-[8rem] h-[8rem] bg-green-800 shadow-lg shadow-green-500/50 "
//       />
//     </TouchableOpacity>
//   );

//   // const renderBlogs = ({ blog }) => (
//   //   <TouchableOpacity
//   //     style={styles.productContainer}
//   //     onPress={() => handleProductPress(blog)}
//   //     activeOpacity={0.7}
//   //   >
//   //     <Text style={styles.productTitle} numberOfLines={1}>
//   //       {blog.title}
//   //     </Text>
//   //     <Text>Authot:{blog.author}</Text>
//   //   </TouchableOpacity>
//   // );

//   const renderBlogPost = ({ item }) => (
//     <TouchableOpacity
//       style={styles.blogContainer}
//       onPress={() => handleBlogPress(item)}
//       activeOpacity={0.7}
//     >
//       <Image
//         style={styles.blogImage}
//         source={{ uri: item.FeaturedImage?.formats?.medium?.url }}
//         resizeMode="cover"
//       />
//       <LinearGradient
//         colors={["transparent", "rgba(0,0,0,0.8)"]}
//         style={styles.blogGradient}
//       >
//         <View style={styles.blogContent}>
//           <Text style={styles.blogCategory}>{item.Category}</Text>
//           <Text style={styles.blogTitle} numberOfLines={2}>
//             {item.Title}
//           </Text>
//           <View style={styles.blogMeta}>
//             <Text style={styles.blogAuthor}>By {item.Author}</Text>
//             <Text style={styles.blogDate}>
//               {new Date(item.publishedAt).toLocaleDateString()}
//             </Text>
//           </View>
//         </View>
//       </LinearGradient>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0066CC" />
//         <Text style={styles.loadingText}>Loading amazing content...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//         <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
//           <Text style={styles.retryButtonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <Animated.ScrollView
//       style={styles.container}
//       onScroll={Animated.event(
//         [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//         { useNativeDriver: true }
//       )}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//       showsVerticalScrollIndicator={false}
//     >
//       {/* Categories section */}
//       <CategoriesSection
//         categories={categories}
//         // onCategoryPress={handleCategoryPress}
//         // isLoading={false} // Set to true to show loading skeleton
//       />

//       {/* Banners Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionHeader}>Featured</Text>
//         <Animated.FlatList
//           data={banners}
//           renderItem={renderBanner}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           pagingEnabled
//           snapToInterval={BANNER_ITEM_WIDTH}
//           decelerationRate="fast"
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { x: bannerScrollX } } }],
//             { useNativeDriver: true }
//           )}
//           contentContainerStyle={styles.bannerList}
//         />
//       </View>

//       {/* Featured Section */}
//       <FeaturedProducts products={products} />
//       {/* Deal of the day Section */}
//       <DealOfTheDay endTime="2025-01-23T00:00:00Z" />

//       {/* Products Section */}
//       <GridOfPopularProducts products={products} />

//       {/* Blogs Section */}
//       <BlogSection blogs={blogs} />
//     </Animated.ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f8f9fa",
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "#666",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   errorText: {
//     fontSize: 16,
//     color: "#dc3545",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   retryButton: {
//     backgroundColor: "#0066CC",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   retryButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionHeader: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 16,
//     marginLeft: 16,
//     color: "#1a1a1a",
//   },
//   bannerContainer: {
//     width: BANNER_ITEM_WIDTH,
//     marginHorizontal: (width - BANNER_ITEM_WIDTH) / 2,
//     borderRadius: 16,
//     overflow: "hidden",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   bannerGradient: {
//     height: 200,
//     justifyContent: "space-between",
//   },
//   bannerImage: {
//     width: "100%",
//     height: 200,
//     position: "absolute",
//   },
//   bannerTextContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 16,
//     borderBottomLeftRadius: 16,
//     borderBottomRightRadius: 16,
//     overflow: "hidden",
//   },
//   bannerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#fff",
//   },
//   bannerList: {
//     paddingVertical: 8,
//   },
//   productContainer: {
//     width: PRODUCT_ITEM_WIDTH,
//     marginHorizontal: 8,
//     borderRadius: 12,
//     backgroundColor: "#fff",
//     overflow: "hidden",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   productImage: {
//     width: "100%",
//     height: 200,
//   },
//   productInfo: {
//     padding: 12,
//   },
//   productTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1a1a1a",
//     marginBottom: 4,
//   },
//   price: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#EE4B2B",
//     marginBottom: 8,
//   },
//   categoryContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   category: {
//     fontSize: 14,
//     color: "#666",
//     backgroundColor: "#f1f3f5",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//     marginRight: 8,
//   },
//   subcategory: {
//     fontSize: 14,
//     color: "#666",
//   },
//   productList: {
//     paddingLeft: 8,
//     paddingRight: 16,
//   },
//   blogContainer: {
//     width: BLOG_ITEM_WIDTH,
//     height: 280,
//     marginHorizontal: 8,
//     borderRadius: 12,
//     overflow: "hidden",
//     backgroundColor: "#fff",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   blogImage: {
//     width: "100%",
//     height: "100%",
//     position: "absolute",
//   },
//   blogGradient: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: "60%",
//     justifyContent: "flex-end",
//     padding: 16,
//   },
//   blogContent: {
//     gap: 8,
//   },
//   blogCategory: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "600",
//     backgroundColor: "rgba(255,255,255,0.2)",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//     alignSelf: "flex-start",
//   },
//   blogTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#fff",
//     lineHeight: 24,
//   },
//   blogMeta: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 8,
//   },
//   blogAuthor: {
//     color: "#fff",
//     fontSize: 12,
//     opacity: 0.8,
//   },
//   blogDate: {
//     color: "#fff",
//     fontSize: 12,
//     opacity: 0.8,
//   },
//   blogList: {
//     paddingLeft: 8,
//     paddingRight: 16,
//     paddingVertical: 8,
//   },
//   categoriesSeprator: { width: 8 },
//   categoriesList: {
//     paddingVertical: 10,
//   },
//   categoriesTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#fff",
//   },
// });

// export default HomePage;

/**************************************************** */

// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   Image,
//   Platform,
//   RefreshControl,
// } from "react-native";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { LinearGradient } from "expo-linear-gradient";
// import * as Haptics from "expo-haptics";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withRepeat,
//   withTiming,
//   interpolateColor,
// } from "react-native-reanimated";
// import ProductGridSection from "../Components/products/ProductGridSection";
// import DealOfTheDay from "../Components/Home/DealOfTheDay";
// import GridOfPopularProducts from "../Components/Home/GridOfPopularProducts";
// import FeaturedProducts from "../Components/Home/FeaturedProducts";
// import CategoriesSection from "../Components/Home/CategoriesSection";
// import BlogSection from "../Components/Home/BlogSection";
// import OfferSection from "../Components/Home/OfferSection";

// // Skeleton Components
// const SkeletonBanner = () => {
//   const opacity = useSharedValue(0.5);

//   React.useEffect(() => {
//     opacity.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
//   }, []);

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       opacity: opacity.value,
//       backgroundColor: interpolateColor(
//         opacity.value,
//         [0.5, 1],
//         ["#E1E9EE", "#F2F8FC"]
//       ),
//     };
//   });

//   return (
//     <Animated.View style={[styles.skeletonBanner, animatedStyle]}>
//       <View style={styles.skeletonContent} />
//     </Animated.View>
//   );
// };

// const SkeletonProductCard = () => {
//   const opacity = useSharedValue(0.5);

//   React.useEffect(() => {
//     opacity.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
//   }, []);

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       opacity: opacity.value,
//       backgroundColor: interpolateColor(
//         opacity.value,
//         [0.5, 1],
//         ["#E1E9EE", "#F2F8FC"]
//       ),
//     };
//   });

//   return (
//     <Animated.View style={[styles.skeletonProductCard, animatedStyle]}>
//       <View style={styles.skeletonImagePlaceholder} />
//       <View style={styles.skeletonTextContainer}>
//         <View style={styles.skeletonLine} />
//         <View style={styles.skeletonLine} />
//       </View>
//     </Animated.View>
//   );
// };

// // API Fetching Functions
// const fetchHomepageData = async () => {
//   const [banners, products, blogs, categories] = await Promise.all([
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/banners?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BANNER}`,
//         },
//       }
//     ),
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//         },
//       }
//     ),
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BLOG}`,
//         },
//       }
//     ),
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/categories?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_CATEGORIES}`,
//         },
//       }
//     ),
//   ]);

//   return {
//     banners: banners.data.data,
//     products: products.data.data,
//     blogs: blogs.data.data,
//     categories: categories.data.data,
//   };
// };

// const HomePage = () => {
//   const { data, isLoading, isError, refetch } = useQuery({
//     queryKey: ["homepage-data"],
//     queryFn: fetchHomepageData,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     cacheTime: 30 * 60 * 1000, // 30 minutes
//   });

//   const handleProductPress = (product) => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     // Navigation logic here
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <FlatList
//           data={[1, 2, 3, 4]}
//           renderItem={() => <SkeletonProductCard />}
//           keyExtractor={(item) => item.toString()}
//           ListHeaderComponent={() => (
//             <>
//               <SkeletonBanner />
//               <SkeletonBanner />
//             </>
//           )}
//         />
//       </View>
//     );
//   }

//   if (isError) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Failed to load content</Text>
//         <TouchableOpacity onPress={refetch} style={styles.retryButton}>
//           <Text style={styles.retryButtonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <Animated.ScrollView
//       nestedScrollEnabled={true}
//       style={styles.container}
//       refreshControl={
//         <RefreshControl refreshing={isLoading} onRefresh={refetch} />
//       }
//       showsVerticalScrollIndicator={false}
//     >
//       {/* Categories section */}
//       <CategoriesSection categories={data.categories} />

//       {/* Banners Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionHeader}>Featured</Text>
//         <FlatList
//           data={data.banners}
//           renderItem={({ item }) => (
//             <Animated.View style={styles.bannerContainer}>
//               <LinearGradient
//                 colors={["rgba(0,0,0,0.3)", "transparent"]}
//                 style={styles.bannerGradient}
//               >
//                 <Image
//                   style={styles.bannerImage}
//                   source={{ uri: item.img?.formats?.large?.url }}
//                   resizeMode="cover"
//                 />
//                 <Text style={styles.bannerTitle}>{item.title}</Text>
//               </LinearGradient>
//             </Animated.View>
//           )}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           pagingEnabled
//           snapToInterval={width * 0.85}
//           decelerationRate="fast"
//         />
//       </View>
//       {/* Offer sections */}
//       <OfferSection />
//       {/* Featured Section */}
//       <FeaturedProducts products={data.products} />

//       {/* Deal of the day Section */}
//       <DealOfTheDay endTime="2025-01-23T00:00:00Z" />

//       {/* Products Section */}
//       <GridOfPopularProducts products={data.products} />

//       {/* Blogs Section */}
//       <BlogSection blogs={data.blogs} />
//     </Animated.ScrollView>
//   );
// };

// const { width } = Dimensions.get("window");

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f8f9fa",
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "#666",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   errorText: {
//     fontSize: 16,
//     color: "#dc3545",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   retryButton: {
//     backgroundColor: "#0066CC",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   retryButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionHeader: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 16,
//     marginLeft: 16,
//     color: "#1a1a1a",
//   },
//   bannerContainer: {
//     width: width * 0.85,
//     marginHorizontal: (width - width * 0.85) / 2,
//     borderRadius: 16,
//     overflow: "hidden",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   bannerGradient: {
//     height: 200,
//     justifyContent: "space-between",
//   },
//   bannerImage: {
//     width: "100%",
//     height: 200,
//     position: "absolute",
//   },
//   bannerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#fff",
//     position: "absolute",
//     bottom: 10,
//     left: 10,
//   },
//   skeletonBanner: {
//     width: width * 0.9,
//     height: 200,
//     borderRadius: 16,
//     marginHorizontal: width * 0.05,
//     marginVertical: 10,
//     overflow: "hidden",
//   },
//   skeletonProductCard: {
//     width: width * 0.7,
//     height: 250,
//     borderRadius: 16,
//     marginHorizontal: 10,
//     marginVertical: 10,
//     overflow: "hidden",
//   },
//   skeletonImagePlaceholder: {
//     width: "100%",
//     height: "70%",
//     backgroundColor: "#E1E9EE",
//   },
//   skeletonTextContainer: {
//     padding: 10,
//     gap: 5,
//   },
//   skeletonLine: {
//     height: 15,
//     backgroundColor: "#E1E9EE",
//     borderRadius: 4,
//     width: "80%",
//   },
// });

// export default HomePage;

/*********************************************** */

// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   Image,
//   Platform,
//   RefreshControl,
// } from "react-native";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { LinearGradient } from "expo-linear-gradient";
// import * as Haptics from "expo-haptics";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withRepeat,
//   withTiming,
//   interpolateColor,
// } from "react-native-reanimated";

// import ProductGridSection from "../Components/products/ProductGridSection";
// import DealOfTheDay from "../Components/Home/DealOfTheDay";
// import GridOfPopularProducts from "../Components/Home/GridOfPopularProducts";
// import FeaturedProducts from "../Components/Home/FeaturedProducts";
// import CategoriesSection from "../Components/Home/CategoriesSection";
// import BlogSection from "../Components/Home/BlogSection";
// import OfferSection from "../Components/Home/OfferSection";

// const { width } = Dimensions.get("window");

// // ------------------------------------------------------------------
// // Skeleton Components (for loading state)
// // ------------------------------------------------------------------
// const SkeletonBanner = () => {
//   const opacity = useSharedValue(0.5);

//   React.useEffect(() => {
//     opacity.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
//   }, []);

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       opacity: opacity.value,
//       backgroundColor: interpolateColor(
//         opacity.value,
//         [0.5, 1],
//         ["#E1E9EE", "#F2F8FC"]
//       ),
//     };
//   });

//   return (
//     <Animated.View style={[styles.skeletonBanner, animatedStyle]}>
//       {/* You can add inner skeleton content if needed */}
//       <View style={styles.skeletonContent} />
//     </Animated.View>
//   );
// };

// const SkeletonProductCard = () => {
//   const opacity = useSharedValue(0.5);

//   React.useEffect(() => {
//     opacity.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
//   }, []);

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       opacity: opacity.value,
//       backgroundColor: interpolateColor(
//         opacity.value,
//         [0.5, 1],
//         ["#E1E9EE", "#F2F8FC"]
//       ),
//     };
//   });

//   return (
//     <Animated.View style={[styles.skeletonProductCard, animatedStyle]}>
//       <View style={styles.skeletonImagePlaceholder} />
//       <View style={styles.skeletonTextContainer}>
//         <View style={styles.skeletonLine} />
//         <View style={styles.skeletonLine} />
//       </View>
//     </Animated.View>
//   );
// };

// // ------------------------------------------------------------------
// // API Fetching Function
// // ------------------------------------------------------------------
// const fetchHomepageData = async () => {
//   const [banners, products, blogs, categories] = await Promise.all([
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/banners?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BANNER}`,
//         },
//       }
//     ),
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//         },
//       }
//     ),
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BLOG}`,
//         },
//       }
//     ),
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/categories?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_CATEGORIES}`,
//         },
//       }
//     ),
//   ]);

//   return {
//     banners: banners.data.data,
//     products: products.data.data,
//     blogs: blogs.data.data,
//     categories: categories.data.data,
//   };
// };

// // ------------------------------------------------------------------
// // HomePage Component Using a Single FlatList for All Sections
// // ------------------------------------------------------------------
// const HomePage = () => {
//   const { data, isLoading, isError, refetch } = useQuery({
//     queryKey: ["homepage-data"],
//     queryFn: fetchHomepageData,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     cacheTime: 30 * 60 * 1000, // 30 minutes
//   });

//   const handleProductPress = (product) => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     // Add your navigation logic here
//   };

//   // While loading, show a skeleton list
//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <FlatList
//           data={[1, 2, 3, 4]}
//           renderItem={() => <SkeletonProductCard />}
//           keyExtractor={(item) => item.toString()}
//           ListHeaderComponent={() => (
//             <>
//               <SkeletonBanner />
//               <SkeletonBanner />
//             </>
//           )}
//         />
//       </View>
//     );
//   }

//   // If there was an error, show a simple error view with a retry button
//   if (isError) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Failed to load content</Text>
//         <TouchableOpacity onPress={refetch} style={styles.retryButton}>
//           <Text style={styles.retryButtonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   // Compose the different homepage sections into an array.
//   // Each section can be rendered as an item in the FlatList.
//   const sections = [
//     {
//       key: "categories",
//       component: <CategoriesSection categories={data.categories} />,
//     },
//     {
//       key: "banners",
//       component: (
//         <View style={styles.section}>
//           <Text style={styles.sectionHeader}>Featured</Text>
//           <FlatList
//             data={data.banners}
//             renderItem={({ item }) => (
//               <Animated.View style={styles.bannerContainer}>
//                 <LinearGradient
//                   colors={["rgba(0,0,0,0.3)", "transparent"]}
//                   style={styles.bannerGradient}
//                 >
//                   <Image
//                     style={styles.bannerImage}
//                     source={{ uri: item.img?.formats?.large?.url }}
//                     resizeMode="cover"
//                   />
//                   <Text style={styles.bannerTitle}>{item.title}</Text>
//                 </LinearGradient>
//               </Animated.View>
//             )}
//             keyExtractor={(item) => item.id.toString()}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             pagingEnabled
//             snapToInterval={width * 0.85}
//             decelerationRate="fast"
//           />
//         </View>
//       ),
//     },
//     {
//       key: "offer",
//       component: <OfferSection />,
//     },
//     {
//       key: "featuredProducts",
//       component: (
//         <FeaturedProducts
//           products={data.products}
//           onProductPress={handleProductPress}
//         />
//       ),
//     },
//     {
//       key: "dealOfTheDay",
//       component: <DealOfTheDay endTime="2025-01-23T00:00:00Z" />,
//     },
//     {
//       key: "gridPopularProducts",
//       component: <GridOfPopularProducts products={data.products} />,
//     },
//     {
//       key: "blogs",
//       component: <BlogSection blogs={data.blogs} />,
//     },
//   ];

//   return (
//     <FlatList
//       data={sections}
//       renderItem={({ item }) => item.component}
//       keyExtractor={(item) => item.key}
//       refreshControl={
//         <RefreshControl refreshing={isLoading} onRefresh={refetch} />
//       }
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={styles.container}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: "#f8f9fa",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   errorText: {
//     fontSize: 16,
//     color: "#dc3545",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   retryButton: {
//     backgroundColor: "#0066CC",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   retryButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionHeader: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 16,
//     marginLeft: 16,
//     color: "#1a1a1a",
//   },
//   bannerContainer: {
//     width: width * 0.85,
//     marginHorizontal: (width - width * 0.85) / 2,
//     borderRadius: 16,
//     overflow: "hidden",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   bannerGradient: {
//     height: 200,
//     justifyContent: "space-between",
//   },
//   bannerImage: {
//     width: "100%",
//     height: 200,
//     position: "absolute",
//   },
//   bannerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#fff",
//     position: "absolute",
//     bottom: 10,
//     left: 10,
//   },
//   skeletonBanner: {
//     width: width * 0.9,
//     height: 200,
//     borderRadius: 16,
//     marginHorizontal: width * 0.05,
//     marginVertical: 10,
//     overflow: "hidden",
//   },
//   skeletonProductCard: {
//     width: width * 0.7,
//     height: 250,
//     borderRadius: 16,
//     marginHorizontal: 10,
//     marginVertical: 10,
//     overflow: "hidden",
//   },
//   skeletonImagePlaceholder: {
//     width: "100%",
//     height: "70%",
//     backgroundColor: "#E1E9EE",
//   },
//   skeletonTextContainer: {
//     padding: 10,
//     gap: 5,
//   },
//   skeletonLine: {
//     height: 15,
//     backgroundColor: "#E1E9EE",
//     borderRadius: 4,
//     width: "80%",
//   },
// });

// export default HomePage;

/************************************************ */
// Old Home page and Works

// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   Image,
//   Platform,
//   RefreshControl,
//   Pressable,
// } from "react-native";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { LinearGradient } from "expo-linear-gradient";
// import * as Haptics from "expo-haptics";
// import { MotiView } from "moti";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withRepeat,
//   withTiming,
//   interpolateColor,
// } from "react-native-reanimated";

// // import ProductGridSection from "../Components/products/ProductGridSection";
// import DealOfTheDay from "../Components/Home/DealOfTheDay";
// import GridOfPopularProducts from "../Components/Home/GridOfPopularProducts";
// import FeaturedProducts from "../Components/Home/FeaturedProducts";
// import CategoriesSection from "../Components/Home/CategoriesSection";
// import BlogSection from "../Components/Home/BlogSection";
// // import OfferSection from "../Components/Home/OfferSection";

// const { width } = Dimensions.get("window");
// const BOX_HEIGHT = 300;

// const SkeletonPlaceholder = ({ width, height, style }) => {
//   return (
//     <MotiView
//       from={{ opacity: 0.3 }}
//       animate={{ opacity: 1 }}
//       transition={{
//         type: "timing",
//         duration: 1000,
//         loop: true,
//       }}
//       style={[styles.skeleton, { width, height }, style]}
//     />
//   );
// };

// const SkeletonBanner = () => (
//   <MotiView
//     from={{ opacity: 0.3 }}
//     animate={{ opacity: 1 }}
//     transition={{
//       type: "timing",
//       duration: 1000,
//       loop: true,
//     }}
//     style={styles.skeletonBanner}
//   >
//     <View style={styles.skeletonContent} />
//   </MotiView>
// );

// const SkeletonProductCard = ({ index }) => (
//   <MotiView
//     from={{ opacity: 0.3, translateY: 20 }}
//     animate={{ opacity: 1, translateY: 0 }}
//     transition={{
//       type: "timing",
//       duration: 1000,
//       delay: index * 50,
//       loop: true,
//     }}
//     style={[
//       styles.skeletonProductCard,
//       {
//         marginLeft: index % 2 === 0 ? 8 : 4,
//         marginRight: index % 2 === 0 ? 4 : 8,
//       },
//     ]}
//   >
//     <View style={styles.skeletonImagePlaceholder} />
//     <View style={styles.skeletonTextContainer}>
//       <View style={[styles.skeletonLine, { width: "80%" }]} />
//       <View style={[styles.skeletonLine, { width: "60%" }]} />
//       <View style={[styles.skeletonLine, { width: "40%" }]} />
//     </View>
//   </MotiView>
// );

// const HomepageSkeleton = () => {
//   return (
//     <View style={styles.container}>
//       <SkeletonBanner />
//       <View style={styles.categoriesContainer}>
//         {[...Array(4)].map((_, index) => (
//           <SkeletonPlaceholder
//             key={`category-${index}`}
//             width={80}
//             height={80}
//             style={styles.categorySkeletonItem}
//           />
//         ))}
//       </View>
//       <View style={styles.productsGridContainer}>
//         {[...Array(6)].map((_, index) => (
//           <SkeletonProductCard key={`product-${index}`} index={index} />
//         ))}
//       </View>
//     </View>
//   );
// };

// const fetchHomepageData = async () => {
//   const [banners, products, blogs, categories] = await Promise.all([
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/banners?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BANNER}`,
//         },
//       }
//     ),
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//         },
//       }
//     ),
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BLOG}`,
//         },
//       }
//     ),
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/categories?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_CATEGORIES}`,
//         },
//       }
//     ),
//   ]);

//   return {
//     banners: banners.data.data,
//     products: products.data.data,
//     blogs: blogs.data.data,
//     categories: categories.data.data,
//   };
// };

// const HomePage = () => {
//   const { data, isLoading, isError, refetch } = useQuery({
//     queryKey: ["homepage-data"],
//     queryFn: fetchHomepageData,
//     staleTime: 5 * 60 * 1000,
//     cacheTime: 30 * 60 * 1000,
//   });

//   const handleProductPress = (product) => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//   };

//   if (isLoading) {
//     return <HomepageSkeleton />;
//   }

//   if (isError) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Failed to load content</Text>
//         <TouchableOpacity onPress={refetch} style={styles.retryButton}>
//           <Text style={styles.retryButtonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const sections = [
//     {
//       key: "banners",
//       component: (
//         <View style={styles.section}>
//           <Text style={styles.sectionHeader}>Featured</Text>
//           <FlatList
//             data={data.banners}
//             renderItem={({ item }) => (
//               <Animated.View style={styles.bannerContainer}>
//                 <LinearGradient
//                   colors={["rgba(0,0,0,0.3)", "transparent"]}
//                   style={styles.bannerGradient}
//                 >
//                   <Image
//                     style={styles.bannerImage}
//                     source={{ uri: item.img?.formats?.large?.url }}
//                     resizeMode="cover"
//                   />
//                   <Text style={styles.bannerTitle}>{item.title}</Text>
//                 </LinearGradient>
//               </Animated.View>
//             )}
//             keyExtractor={(item) => item.id.toString()}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             pagingEnabled
//             snapToInterval={width * 0.85}
//             decelerationRate="fast"
//           />
//         </View>
//       ),
//     },
//     {
//       key: "categories",
//       component: <CategoriesSection categories={data.categories} />,
//     },
//     // {
//     //   key: "offer",
//     //   component: <OfferSection />,
//     // },
//     {
//       key: "featuredProducts",
//       component: (
//         <FeaturedProducts
//           products={data.products}
//           onProductPress={handleProductPress}
//         />
//       ),
//     },
//     {
//       key: "dealOfTheDay",
//       component: <DealOfTheDay endTime="2025-01-23T00:00:00Z" />,
//     },
//     {
//       key: "gridPopularProducts",
//       component: <GridOfPopularProducts products={data.products} />,
//     },
//     {
//       key: "blogs",
//       component: <BlogSection blogs={data.blogs} />,
//     },
//   ];

//   return (
//     <FlatList
//       data={sections}
//       renderItem={({ item }) => item.component}
//       keyExtractor={(item) => item.key}
//       refreshControl={
//         <RefreshControl refreshing={isLoading} onRefresh={refetch} />
//       }
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={styles.container}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: "#f8f9fa",
//     padding: 16,
//   },
//   skeleton: {
//     backgroundColor: "#e0e0e0",
//     borderRadius: 8,
//   },
//   skeletonBanner: {
//     width: width - 32,
//     height: 200,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 16,
//     marginBottom: 24,
//   },
//   categoriesContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 24,
//   },
//   categorySkeletonItem: {
//     borderRadius: 40,
//   },
//   productsGridContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   skeletonProductCard: {
//     width: (width - 40) / 2,
//     height: BOX_HEIGHT,
//     backgroundColor: "white",
//     borderRadius: 16,
//     marginBottom: 16,
//     overflow: "hidden",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   skeletonImagePlaceholder: {
//     width: "100%",
//     height: "60%",
//     backgroundColor: "#e0e0e0",
//   },
//   skeletonTextContainer: {
//     padding: 12,
//     gap: 8,
//   },
//   skeletonLine: {
//     height: 12,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 6,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   errorText: {
//     fontSize: 16,
//     color: "#dc3545",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   retryButton: {
//     backgroundColor: "#0066CC",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   retryButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionHeader: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 16,
//     marginLeft: 16,
//     color: "#1a1a1a",
//   },
//   bannerContainer: {
//     width: width * 0.85,
//     marginHorizontal: (width - width * 0.85) / 2,
//     borderRadius: 16,
//     overflow: "hidden",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   bannerGradient: {
//     height: 200,
//     justifyContent: "space-between",
//   },
//   bannerImage: {
//     width: "100%",
//     height: 200,
//     position: "absolute",
//   },
//   bannerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#fff",
//     position: "absolute",
//     bottom: 10,
//     left: 10,
//   },
// });

// export default HomePage;

/*************************************************** */

// // New Home page

// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   Image,
//   Platform,
//   RefreshControl,
// } from "react-native";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { LinearGradient } from "expo-linear-gradient";
// import * as Haptics from "expo-haptics";
// import { MotiView } from "moti";
// import Animated from "react-native-reanimated";

// import DealOfTheDay from "../Components/Home/DealOfTheDay";
// import GridOfPopularProducts from "../Components/Home/GridOfPopularProducts";
// import FeaturedProducts from "../Components/Home/FeaturedProducts";
// import CategoriesSection from "../Components/Home/CategoriesSection";
// import BlogSection from "../Components/Home/BlogSection";
// import BannerSection from "../Components/Home/BannerSection";

// const { width } = Dimensions.get("window");
// const BOX_HEIGHT = 300;

// const SkeletonPlaceholder = ({ width, height, style }) => {
//   return (
//     <MotiView
//       from={{ opacity: 0.3 }}
//       animate={{ opacity: 1 }}
//       transition={{
//         type: "timing",
//         duration: 1000,
//         loop: true,
//       }}
//       style={[styles.skeleton, { width, height }, style]}
//     />
//   );
// };

// const SkeletonBanner = () => (
//   <MotiView
//     from={{ opacity: 0.3 }}
//     animate={{ opacity: 1 }}
//     transition={{
//       type: "timing",
//       duration: 1000,
//       loop: true,
//     }}
//     style={styles.skeletonBanner}
//   >
//     <View style={styles.skeletonContent} />
//   </MotiView>
// );

// const SkeletonProductCard = ({ index }) => (
//   <MotiView
//     from={{ opacity: 0.3, translateY: 20 }}
//     animate={{ opacity: 1, translateY: 0 }}
//     transition={{
//       type: "timing",
//       duration: 1000,
//       delay: index * 50,
//       loop: true,
//     }}
//     style={[
//       styles.skeletonProductCard,
//       {
//         marginLeft: index % 2 === 0 ? 8 : 4,
//         marginRight: index % 2 === 0 ? 4 : 8,
//       },
//     ]}
//   >
//     <View style={styles.skeletonImagePlaceholder} />
//     <View style={styles.skeletonTextContainer}>
//       <View style={[styles.skeletonLine, { width: "80%" }]} />
//       <View style={[styles.skeletonLine, { width: "60%" }]} />
//       <View style={[styles.skeletonLine, { width: "40%" }]} />
//     </View>
//   </MotiView>
// );

// const HomepageSkeleton = () => {
//   return (
//     <View style={styles.container}>
//       <SkeletonBanner />
//       <View style={styles.categoriesContainer}>
//         {[...Array(4)].map((_, index) => (
//           <SkeletonPlaceholder
//             key={`category-${index}`}
//             width={80}
//             height={80}
//             style={styles.categorySkeletonItem}
//           />
//         ))}
//       </View>
//       <View style={styles.productsGridContainer}>
//         {[...Array(6)].map((_, index) => (
//           <SkeletonProductCard key={`product-${index}`} index={index} />
//         ))}
//       </View>
//     </View>
//   );
// };

// const fetchHomepageData = async () => {
//   const [banners, products, blogs, categories] = await Promise.all([
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/banners?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BANNER}`,
//         },
//       }
//     ),
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//         },
//       }
//     ),
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BLOG}`,
//         },
//       }
//     ),
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/categories?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_CATEGORIES}`,
//         },
//       }
//     ),
//   ]);

//   return {
//     banners: banners.data.data,
//     products: products.data.data,
//     blogs: blogs.data.data,
//     categories: categories.data.data,
//   };
// };

// const HomePage = () => {
//   const { data, isLoading, isError, refetch } = useQuery({
//     queryKey: ["homepage-data"],
//     queryFn: fetchHomepageData,
//     staleTime: 5 * 60 * 1000,
//     cacheTime: 30 * 60 * 1000,
//   });

//   const handleProductPress = (product) => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//   };

//   if (isLoading) {
//     return <HomepageSkeleton />;
//   }

//   if (isError) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Failed to load content</Text>
//         <TouchableOpacity onPress={refetch} style={styles.retryButton}>
//           <Text style={styles.retryButtonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const sections = [
//     {
//       key: "banners",
//       component: <BannerSection banners={data.banners} />,
//     },
//     {
//       key: "categories",
//       component: <CategoriesSection categories={data.categories} />,
//     },
//     // {
//     //   key: "offer",
//     //   component: <OfferSection />,
//     // },
//     {
//       key: "featuredProducts",
//       component: (
//         <FeaturedProducts
//           products={data.products}
//           onProductPress={handleProductPress}
//         />
//       ),
//     },
//     {
//       key: "dealOfTheDay",
//       component: <DealOfTheDay endTime="2025-01-23T00:00:00Z" />,
//     },
//     {
//       key: "gridPopularProducts",
//       component: <GridOfPopularProducts products={data.products} />,
//     },
//     {
//       key: "blogs",
//       component: <BlogSection blogs={data.blogs} />,
//     },
//   ];

//   return (
//     <FlatList
//       data={sections}
//       renderItem={({ item }) => item.component}
//       keyExtractor={(item) => item.key}
//       refreshControl={
//         <RefreshControl refreshing={isLoading} onRefresh={refetch} />
//       }
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={styles.container}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: "#f8f9fa",
//     padding: 16,
//   },
//   skeleton: {
//     backgroundColor: "#e0e0e0",
//     borderRadius: 8,
//   },
//   skeletonBanner: {
//     width: width - 32,
//     height: 200,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 16,
//     marginBottom: 24,
//   },
//   categoriesContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 24,
//   },
//   categorySkeletonItem: {
//     borderRadius: 40,
//   },
//   productsGridContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   skeletonProductCard: {
//     width: (width - 40) / 2,
//     height: BOX_HEIGHT,
//     backgroundColor: "white",
//     borderRadius: 16,
//     marginBottom: 16,
//     overflow: "hidden",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   skeletonImagePlaceholder: {
//     width: "100%",
//     height: "60%",
//     backgroundColor: "#e0e0e0",
//   },
//   skeletonTextContainer: {
//     padding: 12,
//     gap: 8,
//   },
//   skeletonLine: {
//     height: 12,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 6,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   errorText: {
//     fontSize: 16,
//     color: "#dc3545",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   retryButton: {
//     backgroundColor: "#0066CC",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   retryButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionHeader: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 16,
//     marginLeft: 16,
//     color: "#1a1a1a",
//   },
//   bannerContainer: {
//     width: width * 0.85,
//     marginHorizontal: (width - width * 0.85) / 2,
//     borderRadius: 16,
//     overflow: "hidden",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   bannerGradient: {
//     height: 200,
//     justifyContent: "space-between",
//   },
//   bannerImage: {
//     width: "100%",
//     height: 200,
//     position: "absolute",
//   },
//   bannerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#fff",
//     position: "absolute",
//     bottom: 10,
//     left: 10,
//   },
// });

// export default HomePage;

/******************************* */

// import React, { useCallback } from "react";
// import {
//   View,
//   FlatList,
//   RefreshControl,
//   useWindowDimensions,
//   Platform,
// } from "react-native";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { MotiView } from "moti";
// import { HomePageData } from "../types/home";
// import { ErrorView } from "../Components/common/ErrorView";
// import DealOfTheDay from "../Components/Home/DealOfTheDay";
// import GridOfPopularProducts from "../Components/Home/GridOfPopularProducts";
// import FeaturedProducts from "../Components/Home/FeaturedProducts";
// import CategoriesSection from "../Components/Home/CategoriesSection";
// import BlogSection from "../Components/Home/BlogSection";
// import BannerSection from "../Components/Home/BannerSection";
// import AboutSection from "../Components/Home/AboutSection";

// const fetchHomepageData = async (): Promise<HomePageData> => {
//   const [banners, products, blogs, categories] = await Promise.all([
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/banners?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BANNER}`,
//         },
//       }
//     ),
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//         },
//       }
//     ),
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BLOG}`,
//         },
//       }
//     ),
//     axios.get(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/categories?populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_CATEGORIES}`,
//         },
//       }
//     ),
//   ]);

//   return {
//     banners: banners.data.data,
//     products: products.data.data,
//     blogs: blogs.data.data,
//     categories: categories.data.data,
//   };
// };

// const SkeletonShimmer = ({ children, delay = 0 }) => (
//   <MotiView
//     from={{ opacity: 0.5 }}
//     animate={{ opacity: 1 }}
//     transition={{
//       type: "timing",
//       duration: 1000,
//       loop: true,
//       repeatReverse: true,
//       delay,
//     }}
//   >
//     {children}
//   </MotiView>
// );

// const HomepageSkeleton = () => {
//   const { width } = useWindowDimensions();
//   const BANNER_HEIGHT = width * 0.5;
//   const CATEGORY_SIZE = width * 0.2;
//   const PRODUCT_WIDTH = (width - 48) / 2;

//   return (
//     <View style={{ flex: 1, backgroundColor: "#F9FAFB", padding: 16 }}>
//       <SkeletonShimmer>
//         <View
//           style={{
//             height: BANNER_HEIGHT,
//             backgroundColor: "#E5E7EB",
//             borderRadius: 16,
//             marginBottom: 24,
//             overflow: Platform.OS === "android" ? "hidden" : "visible",
//             ...Platform.select({
//               ios: {
//                 shadowColor: "#000",
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.05,
//                 shadowRadius: 4,
//               },
//               android: {
//                 elevation: 3,
//               },
//             }),
//           }}
//         />
//       </SkeletonShimmer>

//       <View style={{ flexDirection: "row", marginBottom: 24, gap: 12 }}>
//         {[...Array(4)].map((_, i) => (
//           <SkeletonShimmer key={i} delay={i * 100}>
//             <View
//               style={{
//                 width: CATEGORY_SIZE,
//                 height: CATEGORY_SIZE,
//                 backgroundColor: "#E5E7EB",
//                 borderRadius: CATEGORY_SIZE / 2,
//               }}
//             />
//           </SkeletonShimmer>
//         ))}
//       </View>

//       <View
//         style={{
//           flexDirection: "row",
//           flexWrap: "wrap",
//           gap: 16,
//           justifyContent: "space-between",
//         }}
//       >
//         {[...Array(6)].map((_, i) => (
//           <SkeletonShimmer key={i} delay={i * 50}>
//             <View
//               style={{
//                 width: PRODUCT_WIDTH,
//                 height: PRODUCT_WIDTH * 1.4,
//                 backgroundColor: "#E5E7EB",
//                 borderRadius: 12,
//                 overflow: "hidden",
//               }}
//             >
//               <View
//                 style={{
//                   height: "60%",
//                   backgroundColor: "#D1D5DB",
//                 }}
//               />
//               <View style={{ padding: 12, gap: 8 }}>
//                 <View
//                   style={{
//                     height: 12,
//                     backgroundColor: "#D1D5DB",
//                     borderRadius: 6,
//                     width: "80%",
//                   }}
//                 />
//                 <View
//                   style={{
//                     height: 12,
//                     backgroundColor: "#D1D5DB",
//                     borderRadius: 6,
//                     width: "50%",
//                   }}
//                 />
//               </View>
//             </View>
//           </SkeletonShimmer>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default function HomePage() {
//   const { data, isLoading, isError, refetch } = useQuery({
//     queryKey: ["homepage-data"],
//     queryFn: fetchHomepageData,
//     staleTime: 5 * 60 * 1000,
//     cacheTime: 30 * 60 * 1000,
//   });

//   const sections = React.useMemo(
//     () =>
//       !data
//         ? []
//         : [
//             {
//               key: "banners",
//               component: <BannerSection banners={data.banners} />,
//             },
//             {
//               key: "categories",
//               component: <CategoriesSection categories={data.categories} />,
//             },
//             {
//               key: "featuredProducts",
//               component: <FeaturedProducts products={data.products} />,
//             },
//             {
//               key: "dealOfTheDay",
//               component: <DealOfTheDay endTime="2025-02-26T08:53:18Z" />,
//             },
//             {
//               key: "gridPopularProducts",
//               component: <GridOfPopularProducts products={data.products} />,
//             },
//             {
//               key: "aboutUs",
//               component: <AboutSection />,
//             },
//             {
//               key: "blogs",
//               component: <BlogSection blogs={data.blogs} />,
//             },
//           ],
//     [data]
//   );

//   const renderItem = useCallback(
//     ({ item }) => <React.Fragment>{item.component}</React.Fragment>,
//     []
//   );

//   if (isError) {
//     return <ErrorView onRetry={refetch} />;
//   }

//   if (isLoading) {
//     return <HomepageSkeleton />;
//   }

//   return (
//     <FlatList
//       data={sections}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.key}
//       refreshControl={
//         <RefreshControl
//           refreshing={isLoading}
//           onRefresh={refetch}
//           tintColor="#4ECB71"
//           colors={["#4ECB71"]}
//         />
//       }
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{
//         flexGrow: 1,
//         backgroundColor: "#F9FAFB",
//         paddingBottom: 16,
//       }}
//       removeClippedSubviews={Platform.OS === "android"}
//       maxToRenderPerBatch={3}
//       windowSize={5}
//       initialNumToRender={3}
//     />
//   );
// }

/*******************************/

import React, { useCallback } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  useWindowDimensions,
  Platform,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MotiView } from "moti";
import { HomePageData } from "../types/home";
import { ErrorView } from "../Components/common/ErrorView";
import DealOfTheDay from "../Components/Home/DealOfTheDay";
import GridOfPopularProducts from "../Components/Home/GridOfPopularProducts";
import FeaturedProducts from "../Components/Home/FeaturedProducts";
import CategoriesSection from "../Components/Home/CategoriesSection";
import BlogSection from "../Components/Home/BlogSection";
import BannerSection from "../Components/Home/BannerSection";
import AboutSection from "../Components/Home/AboutSection";

const fetchHomepageData = async (): Promise<HomePageData> => {
  const auth = {
    username: process.env.EXPO_PUBLIC_STRAPI_API_USERNAME,
    password: process.env.EXPO_PUBLIC_STRAPI_API_PASSWORD,
  };

  const [banners, products, blogs, categories] = await Promise.all([
    axios.get(
      `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/banners?populate=*`,
      { auth }
    ),
    axios.get(
      `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*`,
      { auth }
    ),
    axios.get(
      `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?populate=*`,
      { auth }
    ),
    axios.get(
      `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/categories?populate=*`,
      { auth }
    ),
  ]);

  return {
    banners: banners.data.data,
    products: products.data.data,
    blogs: blogs.data.data,
    categories: categories.data.data,
  };
};

const SkeletonShimmer = ({ children, delay = 0 }) => (
  <MotiView
    from={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{
      type: "timing",
      duration: 1000,
      loop: true,
      repeatReverse: true,
      delay,
    }}
  >
    {children}
  </MotiView>
);

const HomepageSkeleton = () => {
  const { width } = useWindowDimensions();
  const BANNER_HEIGHT = width * 0.5;
  const CATEGORY_SIZE = width * 0.2;
  const PRODUCT_WIDTH = (width - 48) / 2;

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB", padding: 16 }}>
      <SkeletonShimmer>
        <View
          style={{
            height: BANNER_HEIGHT,
            backgroundColor: "#E5E7EB",
            borderRadius: 16,
            marginBottom: 24,
            overflow: Platform.OS === "android" ? "hidden" : "visible",
            ...Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
              },
              android: {
                elevation: 3,
              },
            }),
          }}
        />
      </SkeletonShimmer>

      <View style={{ flexDirection: "row", marginBottom: 24, gap: 12 }}>
        {[...Array(4)].map((_, i) => (
          <SkeletonShimmer key={i} delay={i * 100}>
            <View
              style={{
                width: CATEGORY_SIZE,
                height: CATEGORY_SIZE,
                backgroundColor: "#E5E7EB",
                borderRadius: CATEGORY_SIZE / 2,
              }}
            />
          </SkeletonShimmer>
        ))}
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "space-between",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <SkeletonShimmer key={i} delay={i * 50}>
            <View
              style={{
                width: PRODUCT_WIDTH,
                height: PRODUCT_WIDTH * 1.4,
                backgroundColor: "#E5E7EB",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "60%",
                  backgroundColor: "#D1D5DB",
                }}
              />
              <View style={{ padding: 12, gap: 8 }}>
                <View
                  style={{
                    height: 12,
                    backgroundColor: "#D1D5DB",
                    borderRadius: 6,
                    width: "80%",
                  }}
                />
                <View
                  style={{
                    height: 12,
                    backgroundColor: "#D1D5DB",
                    borderRadius: 6,
                    width: "50%",
                  }}
                />
              </View>
            </View>
          </SkeletonShimmer>
        ))}
      </View>
    </View>
  );
};

export default function HomePage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["homepage-data"],
    queryFn: fetchHomepageData,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const sections = React.useMemo(
    () =>
      !data
        ? []
        : [
            {
              key: "banners",
              component: <BannerSection banners={data.banners} />,
            },
            {
              key: "categories",
              component: <CategoriesSection categories={data.categories} />,
            },
            {
              key: "featuredProducts",
              component: <FeaturedProducts products={data.products} />,
            },
            {
              key: "dealOfTheDay",
              component: <DealOfTheDay endTime="2025-02-26T08:53:18Z" />,
            },
            {
              key: "gridPopularProducts",
              component: <GridOfPopularProducts products={data.products} />,
            },
            // {
            //   key: "aboutUs",
            //   component: <AboutSection />,
            // },
            {
              key: "blogs",
              component: <BlogSection blogs={data.blogs} />,
            },
          ],
    [data]
  );

  const renderItem = useCallback(
    ({ item }) => <React.Fragment>{item.component}</React.Fragment>,
    []
  );

  if (isError) {
    return <ErrorView onRetry={refetch} />;
  }

  if (isLoading) {
    return <HomepageSkeleton />;
  }

  return (
    <FlatList
      data={sections}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
          tintColor="#4ECB71"
          colors={["#4ECB71"]}
        />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#F9FAFB",
        paddingBottom: 16,
      }}
      removeClippedSubviews={Platform.OS === "android"}
      maxToRenderPerBatch={3}
      windowSize={5}
      initialNumToRender={3}
    />
  );
}
