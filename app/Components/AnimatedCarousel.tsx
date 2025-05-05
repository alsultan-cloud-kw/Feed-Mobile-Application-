// import React, { useRef, useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Animated,
//   Dimensions,
//   StyleSheet,
//   TouchableOpacity,
//   Platform,
//   ActivityIndicator,
// } from "react-native";
// import axios from "axios";

// const { width, height } = Dimensions.get("screen");
// const ITEM_WIDTH = width * 0.9;
// const SPACING = width * 0.05;

// interface CarouselItem {
//   id: number;
//   documentId: string;
//   title: string;
//   description: string;
//   subTitle: string;
//   ctaText: string;
// }

// interface CarouselProps {
//   apiUrl: string;
//   apiToken: string;
// }

// const AnimatedCarousel: React.FC<CarouselProps> = ({ apiUrl, apiToken }) => {
//   const [items, setItems] = useState<CarouselItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const flatListRef = useRef<any>(null);

//   const fetchCarouselData = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}`, {
//         headers: {
//           Authorization: `Bearer ${apiToken}`,
//         },
//       });
//       setItems(response.data.data);
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Failed to fetch carousel data"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCarouselData();
//   }, []);

//   const renderItem = ({
//     item,
//     index,
//   }: {
//     item: CarouselItem;
//     index: number;
//   }) => {
//     const inputRange = [
//       (index - 1) * width,
//       index * width,
//       (index + 1) * width,
//     ];

//     const scale = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.9, 1, 0.9],
//       extrapolate: "clamp",
//     });

//     const opacity = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.5, 1, 0.5],
//       extrapolate: "clamp",
//     });

//     return (
//       <Animated.View
//         style={[
//           styles.itemContainer,
//           {
//             transform: [{ scale }],
//             opacity,
//           },
//         ]}
//       >
//         <View style={styles.card}>
//           <Text style={styles.subtitle}>{item.subTitle}</Text>
//           <Text style={styles.title}>{item.title}</Text>
//           <Text style={styles.description}>{item.description}</Text>
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>{item.ctaText}</Text>
//           </TouchableOpacity>
//         </View>
//       </Animated.View>
//     );
//   };

//   const Pagination = () => {
//     return (
//       <View style={styles.paginationContainer}>
//         {items.map((_, idx) => {
//           const inputRange = [
//             (idx - 1) * width,
//             idx * width,
//             (idx + 1) * width,
//           ];

//           const dotWidth = scrollX.interpolate({
//             inputRange,
//             outputRange: [10, 30, 10],
//             extrapolate: "clamp",
//           });

//           const opacity = scrollX.interpolate({
//             inputRange,
//             outputRange: [0.5, 1, 0.5],
//             extrapolate: "clamp",
//           });

//           return (
//             <Animated.View
//               key={idx.toString()}
//               style={[
//                 styles.dot,
//                 {
//                   width: dotWidth,
//                   opacity,
//                 },
//               ]}
//             />
//           );
//         })}
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Animated.FlatList
//         ref={flatListRef}
//         data={items}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.documentId}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         pagingEnabled
//         snapToInterval={width}
//         decelerationRate="fast"
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//           { useNativeDriver: true }
//         )}
//         contentContainerStyle={styles.flatListContent}
//       />
//       <Pagination />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   flatListContent: {
//     paddingHorizontal: SPACING / 2,
//   },
//   itemContainer: {
//     width: width,
//     paddingHorizontal: SPACING / 2,
//     alignItems: "center",
//   },
//   card: {
//     width: ITEM_WIDTH,
//     padding: 20,
//     borderRadius: 15,
//     backgroundColor: "white",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//     marginBottom: 12,
//   },
//   description: {
//     fontSize: 16,
//     color: "#333",
//     marginBottom: 20,
//     lineHeight: 24,
//   },
//   button: {
//     backgroundColor: "#000",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   paginationContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 20,
//   },
//   dot: {
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "#000",
//     marginHorizontal: 3,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   errorText: {
//     color: "red",
//     fontSize: 16,
//     textAlign: "center",
//   },
// });

// export default AnimatedCarousel;

/************************************ */

// import React, { useRef } from "react";
// import {
//   View,
//   Text,
//   Animated,
//   Dimensions,
//   StyleSheet,
//   TouchableOpacity,
//   Platform,
// } from "react-native";

// const { width, height } = Dimensions.get("screen");
// const ITEM_WIDTH = width * 0.9;
// const SPACING = width * 0.05;

// interface CarouselItem {
//   id: number;
//   documentId: string;
//   title: string;
//   description: string;
//   subTitle: string;
//   ctaText: string;
// }

// // Static data from your API response
// const carouselData = [
//   {
//     id: 6,
//     documentId: "p3byqjqwgejkttrvag0vlpcg",
//     title: "Feed That Shields Your Poultry from Diseases",
//     description:
//       "Feed That Shields Your Poultry from Diseases\nDescription: Innovative feed solutions that enhance your poultry's immunity and protect them from diseases with a unique formula.",
//     subTitle: " Their protection starts here",
//     ctaText: "Learn More",
//   },
//   {
//     id: 2,
//     documentId: "smkmio5zrmpz6qyjx6qd4lyy",
//     title: "Al Sultan Feed Products",
//     description:
//       "Discover premium-quality feed designed to provide balanced nutrition for your poultry, ensuring optimal growth and health.",
//     subTitle: "Where quality poultry feeding begins",
//     ctaText: "Explore Our Products",
//   },
//   {
//     id: 4,
//     documentId: "ulijtj14mtdtf52ygd0ht0xz",
//     title: "Choose Nature for Your Poultry",
//     description:
//       " With fully natural feed, give your poultry the vitality and health they deserve, made from the finest ingredients.",
//     subTitle: "100% Natural Feed",
//     ctaText: "Shop Now",
//   },
// ];

// const AnimatedCarousel: React.FC = () => {
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const flatListRef = useRef<any>(null);

//   const renderItem = ({
//     item,
//     index,
//   }: {
//     item: CarouselItem;
//     index: number;
//   }) => {
//     const inputRange = [
//       (index - 1) * width,
//       index * width,
//       (index + 1) * width,
//     ];

//     const scale = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.9, 1, 0.9],
//       extrapolate: "clamp",
//     });

//     const opacity = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.5, 1, 0.5],
//       extrapolate: "clamp",
//     });

//     const translateY = scrollX.interpolate({
//       inputRange,
//       outputRange: [20, 0, 20],
//       extrapolate: "clamp",
//     });

//     return (
//       <Animated.View
//         style={[
//           styles.itemContainer,
//           {
//             transform: [{ scale }, { translateY }],
//             opacity,
//           },
//         ]}
//       >
//         <View style={styles.card}>
//           <Text style={styles.subtitle}>{item.subTitle}</Text>
//           <Text style={styles.title}>{item.title}</Text>
//           <Text style={styles.description}>{item.description}</Text>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => console.log(`Button pressed for ${item.title}`)}
//           >
//             <Text style={styles.buttonText}>{item.ctaText}</Text>
//           </TouchableOpacity>
//         </View>
//       </Animated.View>
//     );
//   };

//   const Pagination = () => {
//     return (
//       <View style={styles.paginationContainer}>
//         {carouselData.map((_, idx) => {
//           const inputRange = [
//             (idx - 1) * width,
//             idx * width,
//             (idx + 1) * width,
//           ];

//           const dotWidth = scrollX.interpolate({
//             inputRange,
//             outputRange: [10, 30, 10],
//             extrapolate: "clamp",
//           });

//           const opacity = scrollX.interpolate({
//             inputRange,
//             outputRange: [0.5, 1, 0.5],
//             extrapolate: "clamp",
//           });

//           const backgroundColor = scrollX.interpolate({
//             inputRange,
//             outputRange: ["#ccc", "#000", "#ccc"],
//             extrapolate: "clamp",
//           });

//           return (
//             <Animated.View
//               key={idx.toString()}
//               style={[
//                 styles.dot,
//                 {
//                   width: dotWidth,
//                   opacity,
//                   backgroundColor,
//                 },
//               ]}
//             />
//           );
//         })}
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.FlatList
//         ref={flatListRef}
//         data={carouselData}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.documentId}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         pagingEnabled
//         snapToInterval={width}
//         decelerationRate="fast"
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//           { useNativeDriver: true }
//         )}
//         contentContainerStyle={styles.flatListContent}
//       />
//       <Pagination />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   flatListContent: {
//     paddingHorizontal: SPACING / 2,
//   },
//   itemContainer: {
//     width: width,
//     paddingHorizontal: SPACING / 2,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   card: {
//     width: ITEM_WIDTH,
//     padding: 20,
//     borderRadius: 15,
//     backgroundColor: "white",
//     minHeight: height * 0.5,
//     justifyContent: "center",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//     marginBottom: 12,
//     textAlign: "center",
//   },
//   description: {
//     fontSize: 16,
//     color: "#333",
//     marginBottom: 20,
//     lineHeight: 24,
//     textAlign: "center",
//   },
//   button: {
//     backgroundColor: "#000",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: "auto",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   paginationContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 20,
//   },
//   dot: {
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "#000",
//     marginHorizontal: 3,
//   },
// });

// export default AnimatedCarousel;

/************************************** */

// import React, { useRef, useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Animated,
//   Dimensions,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   Platform,
//   Alert,
// } from "react-native";
// import axios from "axios";

// const { width, height } = Dimensions.get("screen");
// const ITEM_WIDTH = width * 0.9;
// const SPACING = width * 0.05;

// interface CarouselItem {
//   id: number;
//   documentId: string;
//   title: string;
//   description: string;
//   subTitle: string;
//   ctaText: string;
// }

// const AnimatedCarousel: React.FC = () => {
//   const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const scrollX = useRef(new Animated.Value(0)).current;
//   const flatListRef = useRef<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/banners`,
//           {
//             headers: {
//               Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BANNER}`,
//             },
//           }
//         );
//         console.log(response.data.data);

//         const fetchedData = response.data.data.map((item: any) => ({
//           id: item.id,
//           documentId: item.documentId || `doc-${item.id}`,
//           title: item.title,
//           description: item.description,
//           subTitle: item.subTitle,
//           ctaText: item.ctaText,
//         }));
//         setCarouselData(fetchedData);
//       } catch (err) {
//         console.error("Error fetching banners:", err);
//         setError("Failed to load banners. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const renderItem = ({
//     item,
//     index,
//   }: {
//     item: CarouselItem;
//     index: number;
//   }) => {
//     const inputRange = [
//       (index - 1) * width,
//       index * width,
//       (index + 1) * width,
//     ];

//     const scale = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.9, 1, 0.9],
//       extrapolate: "clamp",
//     });

//     const opacity = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.5, 1, 0.5],
//       extrapolate: "clamp",
//     });

//     const translateY = scrollX.interpolate({
//       inputRange,
//       outputRange: [20, 0, 20],
//       extrapolate: "clamp",
//     });

//     return (
//       <Animated.View
//         style={[
//           styles.itemContainer,
//           {
//             transform: [{ scale }, { translateY }],
//             opacity,
//           },
//         ]}
//       >
//         <View style={styles.card}>
//           <Text style={styles.subtitle}>{item.subTitle}</Text>
//           <Text style={styles.title}>{item.title}</Text>
//           <Text style={styles.description}>{item.description}</Text>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() =>
//               Alert.alert("CTA Clicked", `You clicked on: ${item.title}`)
//             }
//           >
//             <Text style={styles.buttonText}>{item.ctaText}</Text>
//           </TouchableOpacity>
//         </View>
//       </Animated.View>
//     );
//   };

//   const Pagination = () => {
//     return (
//       <View style={styles.paginationContainer}>
//         {carouselData.map((_, idx) => {
//           const inputRange = [
//             (idx - 1) * width,
//             idx * width,
//             (idx + 1) * width,
//           ];

//           const dotWidth = scrollX.interpolate({
//             inputRange,
//             outputRange: [10, 30, 10],
//             extrapolate: "clamp",
//           });

//           const opacity = scrollX.interpolate({
//             inputRange,
//             outputRange: [0.5, 1, 0.5],
//             extrapolate: "clamp",
//           });

//           const backgroundColor = scrollX.interpolate({
//             inputRange,
//             outputRange: ["#ccc", "#000", "#ccc"],
//             extrapolate: "clamp",
//           });

//           return (
//             <Animated.View
//               key={idx.toString()}
//               style={[
//                 styles.dot,
//                 {
//                   width: dotWidth,
//                   opacity,
//                   backgroundColor,
//                 },
//               ]}
//             />
//           );
//         })}
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Animated.FlatList
//         ref={flatListRef}
//         data={carouselData}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.documentId}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         pagingEnabled
//         snapToInterval={width}
//         decelerationRate="fast"
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//           { useNativeDriver: true }
//         )}
//         contentContainerStyle={styles.flatListContent}
//       />
//       <Pagination />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   errorText: {
//     color: "red",
//     fontSize: 16,
//     textAlign: "center",
//   },
//   flatListContent: {
//     paddingHorizontal: SPACING / 2,
//   },
//   itemContainer: {
//     width: width,
//     paddingHorizontal: SPACING / 2,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   card: {
//     width: ITEM_WIDTH,
//     padding: 20,
//     borderRadius: 15,
//     backgroundColor: "white",
//     minHeight: height * 0.5,
//     justifyContent: "center",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//     marginBottom: 12,
//     textAlign: "center",
//   },
//   description: {
//     fontSize: 16,
//     color: "#333",
//     marginBottom: 20,
//     lineHeight: 24,
//     textAlign: "center",
//   },
//   button: {
//     backgroundColor: "#000",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: "auto",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   paginationContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 20,
//   },
//   dot: {
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "#000",
//     marginHorizontal: 3,
//   },
// });

// export default AnimatedCarousel;

/****************************************** */

import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import axios from "axios";

const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.9;
const SPACING = width * 0.05;

interface CarouselItem {
  id: number;
  documentId: string;
  title: string;
  description: string;
  subTitle: string;
  ctaText: string;
  imageUrl: string;
}

const AnimatedCarousel: React.FC = () => {
  const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/banners`,
          {
            headers: {
              Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BANNER}`,
            },
          }
        );

        const fetchedData = response.data.data.map((item: any) => ({
          id: item.id,
          documentId: item.documentId || `doc-${item.id}`,
          title: item.title,
          description: item.description,
          subTitle: item.subTitle,
          ctaText: item.ctaText,
          imageUrl: item.img?.formats?.large?.url || item.img?.url || "",
        }));
        setCarouselData(fetchedData);
      } catch (err) {
        console.error("Error fetching banners:", err);
        setError("Failed to load banners. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: CarouselItem;
    index: number;
  }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: "clamp",
    });

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [20, 0, 20],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.itemContainer,
          {
            transform: [{ scale }, { translateY }],
            opacity,
          },
        ]}
      >
        <View style={styles.card}>
          {/* Image Section */}
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Text Content Section */}
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>{item.subTitle}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                Alert.alert("CTA Clicked", `You clicked on: ${item.title}`)
              }
            >
              <Text style={styles.buttonText}>{item.ctaText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  const Pagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {carouselData.map((_, idx) => {
          const inputRange = [
            (idx - 1) * width,
            idx * width,
            (idx + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 30, 10],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ["#ccc", "#000", "#ccc"],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={idx.toString()}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                  backgroundColor,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={carouselData}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={renderItem}
        style={{ flexGrow: 0 }}
      />
      <Pagination />
    </View>
  );
};

export default AnimatedCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: ITEM_WIDTH,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: height * 0.4,
  },
  textContainer: {
    padding: 15,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#888",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "#444",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  paginationContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
