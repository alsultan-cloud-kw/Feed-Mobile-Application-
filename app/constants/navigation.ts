// constants/navigation.ts
import { TabConfigType } from "../types/TabConfigType";

export const ICONS = {
  Entypo: require("@expo/vector-icons/Entypo").default,
  MaterialCommunityIcons: require("@expo/vector-icons/MaterialCommunityIcons")
    .default,
  FontAwesome5: require("@expo/vector-icons/FontAwesome5").default,
  Feather: require("@expo/vector-icons/Feather").default,
} as const;

export const TAB_CONFIG: TabConfigType[] = [
  {
    name: "index",
    title: "Home",
    headerColor: "#E53E3E",
    icon: "Entypo",
    iconName: "home",
  },
  {
    name: "(blog)",
    title: "Blog",
    headerColor: "#38A169",
    icon: "MaterialCommunityIcons",
    iconName: "post",
  },
  {
    name: "(store)",
    title: "Store",
    headerColor: "#E53E3E",
    icon: "FontAwesome5",
    iconName: "store",
  },
  {
    name: "(more)",
    title: "More",
    headerColor: "#38A169",
    icon: "Feather",
    iconName: "settings",
  },
] as const;
