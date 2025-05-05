import React from "react";
import { View, Image } from "react-native";

const slides = [
  {
    id: "1",
    content: (
      <Image
        source={require("../../assets/banner/banner1.png")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    ),
    accessibilityLabel: "Banner image 1",
  },
  {
    id: "2",
    content: (
      <Image
        source={require("../../assets/banner/banner1.png")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    ),
    accessibilityLabel: "Banner image 2",
  },
  {
    id: "3",
    content: (
      <Image
        source={require("../../assets/banner/banner1.png")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    ),
    accessibilityLabel: "Banner image 3",
  },
];

export default slides;
