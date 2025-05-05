// import React, { useState } from "react";
// import { View, Text, Image, Pressable, ScrollView } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const ProfileScreen: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(true); // Default logged in for now
//   const userData = {
//     userName: "John",
//     userFullName: "John Doe",
//     userEmail: "john.doe@example.com",
//     userRole: "Premium Member",
//     joinDate: "Member since Jan 2024",
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     // Add logout logic here later
//   };

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//     // Add login logic here later
//   };

//   if (!isLoggedIn) {
//     return (
//       <View className="flex-1 bg-gray-50 justify-center items-center p-6">
//         <View className="bg-white rounded-3xl p-8 w-full shadow-md">
//           <Text className="text-2xl font-bold text-center text-gray-800 mb-6">
//             Welcome Back
//           </Text>
//           <Pressable
//             onPress={handleLogin}
//             className="bg-blue-500 py-4 px-6 rounded-xl active:bg-blue-600"
//           >
//             <Text className="text-white text-center font-semibold text-lg">
//               Log In
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <ScrollView className="flex-1 bg-gray-50">
//       {/* Header Section */}
//       <View className="bg-white pb-4 shadow-sm">
//         <View className="pt-12 px-6 flex-row justify-between items-center">
//           <Text className="text-2xl font-bold text-gray-800">Profile</Text>
//           <Pressable
//             onPress={handleLogout}
//             className="bg-gray-100 p-2 rounded-full"
//           >
//             <Ionicons name="log-out-outline" size={24} color="#4B5563" />
//           </Pressable>
//         </View>
//       </View>

//       {/* Profile Card */}
//       <View className="p-6">
//         <View className="bg-white rounded-3xl p-6 shadow-md">
//           <View className="items-center">
//             <View className="relative">
//               <Image
//                 source={{
//                   uri: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//                 }}
//                 className="w-24 h-24 rounded-full"
//               />
//               <View className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white" />
//             </View>
//             <Text className="mt-4 text-xl font-bold text-gray-800">
//               {userData.userFullName}
//             </Text>
//             <Text className="text-gray-500 mb-2">{userData.userRole}</Text>
//             <Text className="text-sm text-gray-400">{userData.joinDate}</Text>
//           </View>

//           {/* Contact Information */}
//           <View className="mt-6 space-y-4">
//             <View className="flex-row items-center p-4 bg-gray-50 rounded-xl">
//               <Ionicons name="mail-outline" size={24} color="#4B5563" />
//               <Text className="ml-3 text-gray-600">{userData.userEmail}</Text>
//             </View>
//             <Pressable className="flex-row items-center p-4 bg-gray-50 rounded-xl">
//               <Ionicons name="settings-outline" size={24} color="#4B5563" />
//               <Text className="ml-3 text-gray-600">Account Settings</Text>
//               <Ionicons
//                 name="chevron-forward"
//                 size={24}
//                 color="#4B5563"
//                 style={{ marginLeft: "auto" }}
//               />
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default ProfileScreen;
