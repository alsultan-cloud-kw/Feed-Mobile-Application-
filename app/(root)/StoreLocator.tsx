// import React from "react";
// import { StyleSheet, View, Text } from "react-native";
// import MapView, { Marker } from "react-native-maps";

// const StoreLocator = () => {
//   // Sample store data
//   const stores = [
//     { id: "1", name: "Store 1", latitude: 37.78825, longitude: -122.4324 },
//     { id: "2", name: "Store 2", latitude: 37.78125, longitude: -122.4524 },
//     { id: "3", name: "Store 3", latitude: 37.79825, longitude: -122.4024 },
//   ];

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         {stores.map((store) => (
//           <Marker
//             key={store.id}
//             coordinate={{
//               latitude: store.latitude,
//               longitude: store.longitude,
//             }}
//             title={store.name}
//           />
//         ))}
//       </MapView>
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>Select a store marker for details</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   footer: {
//     backgroundColor: "#fff",
//     padding: 10,
//     alignItems: "center",
//   },
//   footerText: {
//     fontSize: 16,
//     color: "#333",
//   },
// });

// export default StoreLocator;

/*********************************************** */

// import React from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Linking,
// } from "react-native";
// import MapView, { Marker, Callout } from "react-native-maps";
// import { SafeAreaView } from "react-native-safe-area-context";

// // const locations = [
// //   {
// //     name: "Al Rai",
// //     count: 3,
// //     coordinates: [29.3123144, 47.9449169],
// //     links: [
// //       "https://maps.app.goo.gl/He9PMgM9tJeQNx6d6",
// //       "https://maps.app.goo.gl/UwpyHtMu4DrUUmcM7",
// //       "https://maps.app.goo.gl/UwpyHtMu4DrUUmcM7",
// //     ],
// //   },
// //   {
// //     name: "Kabed",
// //     count: 2,
// //     coordinates: [29.1084436, 47.7241754],
// //     links: [
// //       "https://www.google.com/maps/place/Al+Sultan+Feeds",
// //       "https://maps.app.goo.gl/6uSVXv4yvWBkCn2D7",
// //     ],
// //   },
// //   {
// //     name: "Al Wafra",
// //     count: 2,
// //     coordinates: [28.5647481, 48.0223215],
// //     links: [
// //       "https://maps.app.goo.gl/hUD7PqXeK1r9v4288",
// //       "https://maps.app.goo.gl/hUD7PqXeK1r9v4288",
// //     ],
// //   },
// //   {
// //     name: "Jahra",
// //     count: 1,
// //     coordinates: [29.3131265, 47.7246863],
// //     links: ["https://maps.app.goo.gl/JGSNnKN8w7KfVEjH9"],
// //   },
// //   {
// //     name: "Abdali",
// //     count: 1,
// //     coordinates: [29.9366, 47.9887],
// //     links: ["https://maps.app.goo.gl/randomLinkForExample"],
// //   },
// // ];

// const locations = [
//   {
//     name: "Al Rai",
//     count: 1,
//     coordinates: [29.3123144, 47.9449169],
//     link: "https://maps.app.goo.gl/He9PMgM9tJeQNx6d6",
//   },
//   {
//     name: "Al Rai",
//     count: 1,
//     coordinates: [29.3123144, 47.9449169],
//     link: "https://maps.app.goo.gl/UwpyHtMu4DrUUmcM7",
//   },
//   {
//     name: "Al Rai",
//     count: 1,
//     coordinates: [29.3123144, 47.9449169],
//     link: "https://maps.app.goo.gl/UwpyHtMu4DrUUmcM7",
//   },
//   {
//     name: "Kabed",
//     count: 1,
//     coordinates: [29.1084436, 47.7241754],
//     link: "https://www.google.com/maps/place/Al+Sultan+Feeds",
//   },
//   {
//     name: "Kabed",
//     count: 1,
//     coordinates: [29.1084436, 47.7241754],
//     link: "https://maps.app.goo.gl/6uSVXv4yvWBkCn2D7",
//   },
//   {
//     name: "Al Wafra",
//     count: 1,
//     coordinates: [28.5647481, 48.0223215],
//     link: "https://maps.app.goo.gl/hUD7PqXeK1r9v4288",
//   },
//   {
//     name: "Al Wafra",
//     count: 1,
//     coordinates: [28.5647481, 48.0223215],
//     link: "https://maps.app.goo.gl/hUD7PqXeK1r9v4288",
//   },
//   {
//     name: "Jahra",
//     count: 1,
//     coordinates: [29.3131265, 47.7246863],
//     link: "https://maps.app.goo.gl/JGSNnKN8w7KfVEjH9",
//   },
//   {
//     name: "Abdali",
//     count: 1,
//     coordinates: [29.9366, 47.9887],
//     link: "https://maps.app.goo.gl/randomLinkForExample",
//   },
// ];

// const StoreLocator = () => {
//   const initialRegion = {
//     latitude: 29.3759,
//     longitude: 47.9774, // Central Kuwait coordinates
//     latitudeDelta: 1.5,
//     longitudeDelta: 1.5,
//   };

//   const handleLinkPress = (link: string) => {
//     Linking.openURL(link).catch((err) =>
//       console.error("Failed to open link:", err)
//     );
//   };

//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <MapView style={styles.map} initialRegion={initialRegion}>
//           {locations.map((location, index) => (
//             <Marker
//               key={index}
//               coordinate={{
//                 latitude: location.coordinates[0],
//                 longitude: location.coordinates[1],
//               }}
//               title={location.name}
//               description={`Locations: ${location.count}`}
//             >
//               <Callout>
//                 <View style={styles.callout}>
//                   <Text style={styles.title}>{location.name}</Text>
//                   {location.links.map((link, idx) => (
//                     <TouchableOpacity
//                       key={idx}
//                       onPress={() => handleLinkPress(link)}
//                     >
//                       <Text style={styles.link}>View Location {idx + 1}</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </Callout>
//             </Marker>
//           ))}
//         </MapView>
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>
//             Select a marker for store details
//           </Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   callout: {
//     width: 200,
//     padding: 10,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   link: {
//     color: "#007BFF",
//     textDecorationLine: "underline",
//     marginVertical: 2,
//   },
//   footer: {
//     backgroundColor: "#fff",
//     padding: 10,
//     alignItems: "center",
//   },
//   footerText: {
//     fontSize: 16,
//     color: "#333",
//   },
// });

// export default StoreLocator;

/********************************************************* */

// import React from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Linking,
// } from "react-native";
// import MapView, { Marker, Callout } from "react-native-maps";
// import { SafeAreaView } from "react-native-safe-area-context";

// const locations = [
//   {
//     name: "Al Rai",
//     count: 1,
//     coordinates: [29.3123144, 47.9449169],
//     link: "https://maps.app.goo.gl/He9PMgM9tJeQNx6d6",
//   },
//   {
//     name: "Al Rai",
//     count: 1,
//     coordinates: [29.3133144, 47.9459169],
//     link: "https://maps.app.goo.gl/UwpyHtMu4DrUUmcM7",
//   },
//   {
//     name: "Al Rai",
//     count: 1,
//     coordinates: [29.3113144, 47.9439169],
//     link: "https://maps.app.goo.gl/UwpyHtMu4DrUUmcM7",
//   },
//   {
//     name: "Kabed",
//     count: 1,
//     coordinates: [29.1084436, 47.7241754],
//     link: "https://www.google.com/maps/place/Al+Sultan+Feeds",
//   },
//   {
//     name: "Kabed",
//     count: 1,
//     coordinates: [29.1094436, 47.7231754],
//     link: "https://maps.app.goo.gl/6uSVXv4yvWBkCn2D7",
//   },
//   {
//     name: "Al Wafra",
//     count: 1,
//     coordinates: [28.5647481, 48.0223215],
//     link: "https://maps.app.goo.gl/hUD7PqXeK1r9v4288",
//   },
//   {
//     name: "Al Wafra",
//     count: 1,
//     coordinates: [28.5657481, 48.0233215],
//     link: "https://maps.app.goo.gl/hUD7PqXeK1r9v4288",
//   },
//   {
//     name: "Jahra",
//     count: 1,
//     coordinates: [29.3131265, 47.7246863],
//     link: "https://maps.app.goo.gl/JGSNnKN8w7KfVEjH9",
//   },
//   {
//     name: "Abdali",
//     count: 1,
//     coordinates: [29.9376, 47.9897],
//     link: "https://maps.app.goo.gl/randomLinkForExample",
//   },
// ];

// const StoreLocator = () => {
//   const initialRegion = {
//     latitude: 29.3759,
//     longitude: 47.9774, // Central Kuwait coordinates
//     latitudeDelta: 1.5,
//     longitudeDelta: 1.5,
//   };

//   const handleLinkPress = (link: any) => {
//     Linking.openURL(link).catch((err) =>
//       console.error("Failed to open link:", err)
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <MapView style={styles.map} initialRegion={initialRegion}>
//           {locations.map((location, index) => (
//             <Marker
//               key={index}
//               coordinate={{
//                 latitude: location.coordinates[0],
//                 longitude: location.coordinates[1],
//               }}
//               title={location.name}
//               description={`Location ${index + 1}`}
//             >
//               <Callout>
//                 <View style={styles.callout}>
//                   <Text style={styles.title}>{location.name}</Text>
//                   <TouchableOpacity
//                     onPress={() => handleLinkPress(location.link)}
//                   >
//                     <Text style={styles.link}>View Location</Text>
//                   </TouchableOpacity>
//                 </View>
//               </Callout>
//             </Marker>
//           ))}
//         </MapView>
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>
//             Select a marker for store details
//           </Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   callout: {
//     width: 200,
//     padding: 10,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   link: {
//     color: "#007BFF",
//     textDecorationLine: "underline",
//     marginVertical: 2,
//   },
//   footer: {
//     backgroundColor: "#fff",
//     padding: 10,
//     alignItems: "center",
//   },
//   footerText: {
//     fontSize: 16,
//     color: "#333",
//   },
// });

// export default StoreLocator;
