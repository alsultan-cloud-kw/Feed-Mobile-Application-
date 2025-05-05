import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react-native";
// import { Modal } from "react-native-paper";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Locator = () => {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  return (
    <SafeAreaView>
      <TouchableOpacity
        className=" flex-row "
        onPress={() => {
          setClicked(!clicked);
          router.push("/(root)/StoreLocator");
        }}
      >
        <Text className="text-green-700"> Our physical locations</Text>
        {clicked ? (
          <ChevronUp size={24} color="#ef4444" />
        ) : (
          <ChevronDown size={24} color="#ef4444" />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Locator;
