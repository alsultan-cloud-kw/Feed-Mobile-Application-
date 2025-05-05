// import React from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   Linking,
//   Image,
//   Dimensions,
//   StyleSheet,
// } from "react-native";
// import { MotiView } from "moti";
// import { LinearGradient } from "expo-linear-gradient";
// import {
//   Phone,
//   Mail,
//   ArrowUpRight,
//   LocateIcon,
//   MapPin,
// } from "lucide-react-native";
// import * as Clipboard from "expo-clipboard";
// import Toast from "react-native-toast-message";

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = width - 32;

// const AboutSection = () => {
//   const copyToClipboard = async () => {
//     await Clipboard.setStringAsync("94076103");
//     Toast.show({
//       type: "success",
//       text1: "Phone number copied!",
//       position: "top",
//       visibilityTime: 2000,
//     });
//   };

//   const openWhatsApp = () => {
//     Linking.openURL("whatsapp://send?phone=+96594076103");
//   };

//   const openEmail = () => {
//     Linking.openURL("mailto:info@keaaf.com");
//   };

//   return (
//     <MotiView
//       from={{ opacity: 0, translateY: 50 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{ type: "spring", damping: 15 }}
//       style={styles.container}
//     >
//       <LinearGradient
//         colors={["#f8fafc", "#f1f5f9"]}
//         style={styles.background}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <Image
//           source={require("../../../assets/factory.jpg")}
//           style={styles.image}
//           resizeMode="cover"
//         />

//         <View style={styles.content}>
//           <Text style={styles.title}>More Than Just E-Commerce</Text>

//           <Text style={styles.description}>
//             As a leading manufacturer and distributor of animal feed since 1980,
//             we welcome partnerships with manufacturers and bulk orders. Our
//             state-of-the-art factory in Kuwait serves local and international
//             markets.
//           </Text>

//           <View className=" flex-row align-middle items-center justify-center">
//             <MapPin size={20} color="#6b7280" />
//             <Text style={styles.locationText}>
//               Shuwaikh Al Rai, Behind Mustafa Karam
//             </Text>
//           </View>

//           <View style={styles.buttonContainer}>
//             <Pressable
//               style={[styles.button, styles.whatsappButton]}
//               onPress={openWhatsApp}
//             >
//               <Phone size={20} color="#fff" />
//               <Text style={styles.buttonText}>Contact Sales</Text>
//             </Pressable>

//             <Pressable
//               style={[styles.button, styles.emailButton]}
//               onPress={openEmail}
//             >
//               <Mail size={20} color="#fff" />
//               <Text style={styles.buttonText}>Business Inquiry</Text>
//             </Pressable>
//           </View>

//           <Pressable style={styles.supportButton} onPress={copyToClipboard}>
//             <View style={styles.supportContent}>
//               <Text style={styles.supportText}>
//                 Need Support? Tap to copy our number
//               </Text>
//               <Text style={styles.phoneNumber}>+965 9407 6103</Text>
//             </View>
//             <ArrowUpRight size={20} color="#4b5563" />
//           </Pressable>
//         </View>
//       </LinearGradient>
//     </MotiView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: CARD_WIDTH,
//     marginHorizontal: 16,
//     marginVertical: 24,
//     borderRadius: 24,
//     overflow: "hidden",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//   },
//   background: {
//     borderRadius: 24,
//     overflow: "hidden",
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//   },
//   content: {
//     padding: 24,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 12,
//   },
//   description: {
//     fontSize: 16,
//     lineHeight: 24,
//     color: "#4b5563",
//     marginBottom: 20,
//   },
//   location: {
//     backgroundColor: "#f3f4f6",
//     padding: 12,
//     borderRadius: 12,
//     marginBottom: 24,
//   },
//   locationText: {
//     fontSize: 14,
//     color: "#374151",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     gap: 12,
//     marginBottom: 16,
//   },
//   button: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     borderRadius: 12,
//     gap: 8,
//   },
//   whatsappButton: {
//     backgroundColor: "#16a34a",
//   },
//   emailButton: {
//     backgroundColor: "#2563eb",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 10,
//     fontWeight: "600",
//   },
//   supportButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 16,
//     backgroundColor: "#f8fafc",
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//   },
//   supportContent: {
//     flex: 1,
//   },
//   supportText: {
//     fontSize: 14,
//     color: "#6b7280",
//     marginBottom: 4,
//   },
//   phoneNumber: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#111827",
//   },
// });

// export default AboutSection;

/************************************** */

// import React from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   Linking,
//   Image,
//   Dimensions,
//   StyleSheet,
//   Platform,
//   ImageSourcePropType,
// } from "react-native";
// import { MotiView } from "moti";
// import { LinearGradient } from "expo-linear-gradient";
// import { Phone, Mail, ArrowUpRight, MapPin } from "lucide-react-native";
// import * as Clipboard from "expo-clipboard";
// import Toast from "react-native-toast-message";

// interface ContactInfo {
//   phone: string;
//   email: string;
//   location: string;
//   whatsappNumber: string;
// }

// interface StyleProps {
//   width: number;
//   colors: {
//     primary: string;
//     secondary: string;
//     text: {
//       primary: string;
//       secondary: string;
//       tertiary: string;
//     };
//     background: {
//       primary: string;
//       secondary: string;
//     };
//     button: {
//       whatsapp: string;
//       email: string;
//     };
//   };
// }

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = width - 32;

// const CONTACT_INFO: ContactInfo = {
//   phone: "94076103",
//   email: "info@keaaf.com",
//   location: "Shuwaikh Al Rai, Behind Mustafa Karam",
//   whatsappNumber: "+96594076103",
// };

// const STYLE_PROPS: StyleProps = {
//   width: CARD_WIDTH,
//   colors: {
//     primary: "#f8fafc",
//     secondary: "#f1f5f9",
//     text: {
//       primary: "#111827",
//       secondary: "#4b5563",
//       tertiary: "#6b7280",
//     },
//     background: {
//       primary: "#f3f4f6",
//       secondary: "#f8fafc",
//     },
//     button: {
//       whatsapp: "#16a34a",
//       email: "#243c5a",
//     },
//   },
// };

// const AboutSection: React.FC = () => {
//   const copyToClipboard = async (text: string, message: string) => {
//     try {
//       await Clipboard.setStringAsync(text);
//       Toast.show({
//         type: "success",
//         text1: message,
//         position: "top",
//         visibilityTime: 2000,
//       });
//     } catch (error) {
//       Toast.show({
//         type: "error",
//         text1: "Failed to copy",
//         position: "top",
//         visibilityTime: 2000,
//       });
//     }
//   };

//   const handleLocationPress = () => {
//     copyToClipboard(CONTACT_INFO.location, "Location copied to clipboard!");
//   };

//   const openWhatsApp = () => {
//     const url = `whatsapp://send?phone=${CONTACT_INFO.whatsappNumber}`;
//     Linking.canOpenURL(url)
//       .then((supported) => {
//         if (supported) {
//           return Linking.openURL(url);
//         }
//         Toast.show({
//           type: "error",
//           text1: "WhatsApp is not installed",
//           position: "top",
//           visibilityTime: 2000,
//         });
//       })
//       .catch(() => {
//         Toast.show({
//           type: "error",
//           text1: "Could not open WhatsApp",
//           position: "top",
//           visibilityTime: 2000,
//         });
//       });
//   };

//   const openEmail = () => {
//     const url = `mailto:${CONTACT_INFO.email}`;
//     Linking.canOpenURL(url)
//       .then((supported) => {
//         if (supported) {
//           return Linking.openURL(url);
//         }
//         Toast.show({
//           type: "error",
//           text1: "Could not open email client",
//           position: "top",
//           visibilityTime: 2000,
//         });
//       })
//       .catch(() => {
//         Toast.show({
//           type: "error",
//           text1: "Failed to open email",
//           position: "top",
//           visibilityTime: 2000,
//         });
//       });
//   };

//   return (
//     <MotiView
//       from={{ opacity: 0, translateY: 50 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{ type: "spring", damping: 15 }}
//       style={styles.container}
//     >
//       <LinearGradient
//         colors={[STYLE_PROPS.colors.primary, STYLE_PROPS.colors.secondary]}
//         style={styles.background}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <Image
//           source={require("../../../assets/factory.jpg") as ImageSourcePropType}
//           style={styles.image}
//           resizeMode="cover"
//         />

//         <View style={styles.content}>
//           <Text style={styles.title}>More Than Just E-Commerce</Text>

//           <Text style={styles.description}>
//             As a leading manufacturer and distributor of animal feed since 1980,
//             we welcome partnerships with manufacturers and bulk orders. Our
//             state-of-the-art factory in Kuwait serves local and international
//             markets.
//           </Text>

//           <Pressable
//             onPress={handleLocationPress}
//             style={styles.locationContainer}
//             android_ripple={{ color: "rgba(0,0,0,0.1)" }}
//           >
//             <MapPin size={20} color={STYLE_PROPS.colors.text.tertiary} />
//             <Text style={styles.locationText}>{CONTACT_INFO.location}</Text>
//           </Pressable>

//           <View style={styles.buttonContainer}>
//             <Pressable
//               style={[styles.button, styles.whatsappButton]}
//               onPress={openWhatsApp}
//               android_ripple={{ color: "rgba(255,255,255,0.2)" }}
//             >
//               <Phone size={20} color="#fff" />
//               <Text style={styles.buttonText}>Contact Sales</Text>
//             </Pressable>

//             <Pressable
//               style={[styles.button, styles.emailButton]}
//               onPress={openEmail}
//               android_ripple={{ color: "rgba(255,255,255,0.2)" }}
//             >
//               <Mail size={20} color="#fff" />
//               <Text style={styles.buttonText}>Business Inquiry</Text>
//             </Pressable>
//           </View>

//           <Pressable
//             style={styles.supportButton}
//             onPress={() =>
//               copyToClipboard(CONTACT_INFO.phone, "Phone number copied!")
//             }
//             android_ripple={{ color: "rgba(0,0,0,0.05)" }}
//           >
//             <View style={styles.supportContent}>
//               <Text style={styles.supportText}>
//                 Need Support? Tap to copy our number
//               </Text>
//               <Text style={styles.phoneNumber}>+965 {CONTACT_INFO.phone}</Text>
//             </View>
//             <ArrowUpRight size={20} color={STYLE_PROPS.colors.text.secondary} />
//           </Pressable>
//         </View>
//       </LinearGradient>
//     </MotiView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: STYLE_PROPS.width,
//     marginHorizontal: 16,
//     marginVertical: 24,
//     borderRadius: 24,
//     overflow: "hidden",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   background: {
//     borderRadius: 24,
//     overflow: "hidden",
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//   },
//   content: {
//     padding: 24,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: STYLE_PROPS.colors.text.primary,
//     marginBottom: 12,
//   },
//   description: {
//     fontSize: 16,
//     lineHeight: 24,
//     color: STYLE_PROPS.colors.text.secondary,
//     marginBottom: 20,
//   },
//   locationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: STYLE_PROPS.colors.background.primary,
//     padding: 12,
//     borderRadius: 12,
//     marginBottom: 24,
//     gap: 8,
//   },
//   locationText: {
//     fontSize: 14,
//     color: STYLE_PROPS.colors.text.primary,
//     textAlign: "center",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     gap: 12,
//     marginBottom: 16,
//   },
//   button: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     borderRadius: 12,
//     gap: 8,
//   },
//   whatsappButton: {
//     backgroundColor: STYLE_PROPS.colors.button.whatsapp,
//   },
//   emailButton: {
//     backgroundColor: STYLE_PROPS.colors.button.email,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 11,
//     fontWeight: "400",
//   },
//   supportButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 16,
//     backgroundColor: STYLE_PROPS.colors.background.secondary,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//   },
//   supportContent: {
//     flex: 1,
//   },
//   supportText: {
//     fontSize: 14,
//     color: STYLE_PROPS.colors.text.tertiary,
//     marginBottom: 4,
//   },
//   phoneNumber: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: STYLE_PROPS.colors.text.primary,
//   },
// });

// export default AboutSection;

/*********************************************** */

import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Linking,
  Image,
  Dimensions,
  StyleSheet,
  Platform,
  ImageSourcePropType,
  Animated,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { MotiView, AnimatePresence } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import {
  Phone,
  Mail,
  ArrowUpRight,
  MapPin,
  ChevronDown,
} from "lucide-react-native";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  whatsappNumber: string;
}

interface StyleProps {
  width: number;
  colors: {
    primary: string;
    secondary: string;
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    background: {
      primary: string;
      secondary: string;
    };
    button: {
      whatsapp: string;
      email: string;
    };
  };
}

interface Section {
  title: string;
  content: string;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32;

const SECTIONS: Section[] = [
  {
    title: "About Us",
    content:
      "As a leading manufacturer and distributor of animal feed since 1980, we welcome partnerships with manufacturers and bulk orders. Our state-of-the-art factory in Kuwait serves local and international markets.",
  },
  {
    title: "Our Mission",
    content:
      "To provide high-quality animal feed products while maintaining sustainable practices and supporting local and international markets.",
  },
];

const CONTACT_INFO: ContactInfo = {
  phone: "94076103",
  email: "info@keaaf.com",
  location: "Shuwaikh Al Rai, Behind Mustafa Karam",
  whatsappNumber: "+96594076103",
};

const STYLE_PROPS: StyleProps = {
  width: CARD_WIDTH,
  colors: {
    primary: "#f8fafc",
    secondary: "#f1f5f9",
    text: {
      primary: "#111827",
      secondary: "#4b5563",
      tertiary: "#6b7280",
    },
    background: {
      primary: "#f3f4f6",
      secondary: "#f8fafc",
    },
    button: {
      whatsapp: "#16a34a",
      email: "#243c5a",
    },
  },
};

const CollapsibleSection: React.FC<{ section: Section; index: number }> = ({
  section,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotateAnimation = new Animated.Value(0);

  const toggleSection = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
    Animated.spring(rotateAnimation, {
      toValue: isExpanded ? 0 : 1,
      useNativeDriver: true,
      tension: 20,
      friction: 7,
    }).start();
  };

  const arrowRotation = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 100, type: "spring", damping: 15 }}
      style={styles.sectionContainer}
    >
      <Pressable
        onPress={toggleSection}
        style={styles.sectionHeader}
        android_ripple={{ color: "rgba(0,0,0,0.05)" }}
      >
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
          <ChevronDown size={20} color={STYLE_PROPS.colors.text.secondary} />
        </Animated.View>
      </Pressable>
      {isExpanded && (
        <MotiView
          from={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ type: "timing", duration: 300 }}
          style={styles.sectionContent}
        >
          <Text style={styles.sectionText}>{section.content}</Text>
        </MotiView>
      )}
    </MotiView>
  );
};

const AboutSection: React.FC = () => {
  const [showContact, setShowContact] = useState(false);

  const copyToClipboard = async (text: string, message: string) => {
    try {
      await Clipboard.setStringAsync(text);
      Toast.show({
        type: "success",
        text1: message,
        position: "top",
        visibilityTime: 2000,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to copy",
        position: "top",
        visibilityTime: 2000,
      });
    }
  };

  const handleLocationPress = () => {
    copyToClipboard(CONTACT_INFO.location, "Location copied to clipboard!");
  };

  const openWhatsApp = () => {
    const url = `whatsapp://send?phone=${CONTACT_INFO.whatsappNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        }
        Toast.show({
          type: "error",
          text1: "WhatsApp is not installed",
          position: "top",
          visibilityTime: 2000,
        });
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Could not open WhatsApp",
          position: "top",
          visibilityTime: 2000,
        });
      });
  };

  const openEmail = () => {
    const url = `mailto:${CONTACT_INFO.email}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        }
        Toast.show({
          type: "error",
          text1: "Could not open email client",
          position: "top",
          visibilityTime: 2000,
        });
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Failed to open email",
          position: "top",
          visibilityTime: 2000,
        });
      });
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", damping: 15 }}
      style={styles.container}
    >
      <LinearGradient
        colors={[STYLE_PROPS.colors.primary, STYLE_PROPS.colors.secondary]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Image
          source={require("../../../assets/factory.jpg") as ImageSourcePropType}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          {SECTIONS.map((section, index) => (
            <CollapsibleSection
              key={section.title}
              section={section}
              index={index}
            />
          ))}

          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 300 }}
          >
            <Pressable
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                setShowContact(!showContact);
              }}
              style={styles.contactToggle}
            >
              <Text style={styles.contactToggleText}>
                {showContact ? "Hide Contact Info" : "Show Contact Info"}
              </Text>
              <Animated.View
                style={{
                  transform: [{ rotate: showContact ? "180deg" : "0deg" }],
                }}
              >
                <ChevronDown
                  size={20}
                  color={STYLE_PROPS.colors.text.secondary}
                />
              </Animated.View>
            </Pressable>
          </MotiView>

          {showContact && (
            <MotiView
              from={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ type: "timing", duration: 300 }}
            >
              <Pressable
                onPress={handleLocationPress}
                style={styles.locationContainer}
                android_ripple={{ color: "rgba(0,0,0,0.1)" }}
              >
                <MapPin size={20} color={STYLE_PROPS.colors.text.tertiary} />
                <Text style={styles.locationText}>{CONTACT_INFO.location}</Text>
              </Pressable>

              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, styles.whatsappButton]}
                  onPress={openWhatsApp}
                  android_ripple={{ color: "rgba(255,255,255,0.2)" }}
                >
                  <Phone size={20} color="#fff" />
                  <Text style={styles.buttonText}>Contact Sales</Text>
                </Pressable>

                <Pressable
                  style={[styles.button, styles.emailButton]}
                  onPress={openEmail}
                  android_ripple={{ color: "rgba(255,255,255,0.2)" }}
                >
                  <Mail size={20} color="#fff" />
                  <Text style={styles.buttonText}>Business Inquiry</Text>
                </Pressable>
              </View>

              <Pressable
                style={styles.supportButton}
                onPress={() =>
                  copyToClipboard(CONTACT_INFO.phone, "Phone number copied!")
                }
                android_ripple={{ color: "rgba(0,0,0,0.05)" }}
              >
                <View style={styles.supportContent}>
                  <Text style={styles.supportText}>
                    Need Support? Tap to copy our number
                  </Text>
                  <Text style={styles.phoneNumber}>
                    +965 {CONTACT_INFO.phone}
                  </Text>
                </View>
                <ArrowUpRight
                  size={20}
                  color={STYLE_PROPS.colors.text.secondary}
                />
              </Pressable>
            </MotiView>
          )}
        </View>
      </LinearGradient>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: STYLE_PROPS.width,
    marginHorizontal: 16,
    marginVertical: 24,
    borderRadius: 24,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  background: {
    borderRadius: 24,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  content: {
    padding: 24,
  },
  sectionContainer: {
    marginBottom: 16,
    backgroundColor: STYLE_PROPS.colors.background.secondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: STYLE_PROPS.colors.text.primary,
  },
  sectionContent: {
    padding: 16,
    paddingTop: 0,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
    color: STYLE_PROPS.colors.text.secondary,
  },
  contactToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: STYLE_PROPS.colors.background.primary,
    borderRadius: 12,
    marginBottom: 16,
  },
  contactToggleText: {
    fontSize: 14,
    fontWeight: "500",
    color: STYLE_PROPS.colors.text.primary,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: STYLE_PROPS.colors.background.primary,
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: STYLE_PROPS.colors.text.primary,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  whatsappButton: {
    backgroundColor: STYLE_PROPS.colors.button.whatsapp,
  },
  emailButton: {
    backgroundColor: STYLE_PROPS.colors.button.email,
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
  supportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: STYLE_PROPS.colors.background.secondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  supportContent: {
    flex: 1,
  },
  supportText: {
    fontSize: 14,
    color: STYLE_PROPS.colors.text.tertiary,
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 14,
    fontWeight: "500",
    color: STYLE_PROPS.colors.text.primary,
  },
});

export default React.memo(AboutSection);
