// import { Link } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, Dimensions } from "react-native";

// interface DealOfTheDayProps {
//   endTime: string; // ISO string for the end time
// }

// const DealOfTheDay: React.FC<DealOfTheDayProps> = ({ endTime }) => {
//   const [timeLeft, setTimeLeft] = useState<string>("");

//   useEffect(() => {
//     const calculateTimeLeft = () => {
//       const difference = new Date(endTime).getTime() - new Date().getTime();
//       if (difference > 0) {
//         const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
//         const minutes = Math.floor((difference / 1000 / 60) % 60);
//         const seconds = Math.floor((difference / 1000) % 60);
//         setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
//       } else {
//         setTimeLeft("Deal Ended");
//       }
//     };

//     const timer = setInterval(calculateTimeLeft, 1000);
//     return () => clearInterval(timer);
//   }, [endTime]);

//   return (
//     <View
//       className="p-4 m-2 rounded-lg bg-red-500"
//       style={{ height: Dimensions.get("window").height * 0.15 }}
//     >
//       <View className="flex-row-reverse justify-between items-center">
//         <View>
//           <Link href="/(root)/(tabs)/(store)" asChild />
//           <TouchableOpacity>
//             <Text className="text-white text-md ml-4">View all</Text>
//           </TouchableOpacity>
//         </View>
//         <View>
//           <View className="flex-row justify-between items-center">
//             <Text className="text-white text-3xl font-bold">
//               Deal of the Day
//             </Text>
//           </View>
//           <View className="flex-row justify-between items-center mt-4">
//             <Text className="text-white text-lg">{timeLeft}</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default DealOfTheDay;

/***************************** */

// import { Link } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, Dimensions } from "react-native";

// interface DealOfTheDayProps {
//   endTime: string; // ISO string for the end time
// }

// const DealOfTheDay: React.FC<DealOfTheDayProps> = ({ endTime }) => {
//   const [timeLeft, setTimeLeft] = useState<string>("");

//   useEffect(() => {
//     const calculateTimeLeft = () => {
//       const difference = new Date(endTime).getTime() - new Date().getTime();
//       if (difference > 0) {
//         const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
//         const minutes = Math.floor((difference / 1000 / 60) % 60);
//         const seconds = Math.floor((difference / 1000) % 60);
//         setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
//       } else {
//         setTimeLeft("Deal Ended");
//       }
//     };

//     const timer = setInterval(calculateTimeLeft, 1000);
//     return () => clearInterval(timer);
//   }, [endTime]);

//   return (
//     <View
//       className="p-4 m-2 rounded-lg bg-red-500"
//       style={{ height: Dimensions.get("window").height * 0.15 }}
//     >
//       <View className="flex-row-reverse justify-between items-center">
//         <View>
//           <Link href="/(root)/(tabs)/(store)" asChild>
//             <TouchableOpacity>
//               <Text className="text-white text-md ml-4">View all</Text>
//             </TouchableOpacity>
//           </Link>
//         </View>
//         <View>
//           <View className="flex-row justify-between items-center">
//             <Text className="text-white text-3xl font-bold">
//               Deal of the Day
//             </Text>
//           </View>
//           <View className="flex-row justify-between items-center mt-4">
//             <Text className="text-white text-lg">{timeLeft}</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default DealOfTheDay;

/********************************************* */

import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { MotiView } from "moti";
import { ArrowRight } from "lucide-react-native";

interface DealOfTheDayProps {
  endTime: string;
}

const DealOfTheDay: React.FC<DealOfTheDayProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endTime).getTime() - new Date().getTime();
      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        const formattedHours = hours.toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");

        setTimeLeft(
          `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
        );
        setIsAnimating(seconds === 0);
      } else {
        setTimeLeft("00:00:00");
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <MotiView
      style={styles.container}
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500 }}
    >
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Text style={styles.title}>Deal of the Day</Text>
          <MotiView
            animate={isAnimating ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={{ type: "timing", duration: 300 }}
          >
            <Text style={styles.timer}>{timeLeft}</Text>
          </MotiView>
        </View>

        <Link href="/(root)/(tabs)/(store)" asChild>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View all</Text>
            <ArrowRight size={16} color="#FFFFFF" style={styles.icon} />
          </TouchableOpacity>
        </Link>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EF4444",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    height: Dimensions.get("window").height * 0.15,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  timer: {
    fontSize: 14,
    fontWeight: "400",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewAllText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
    marginRight: 4,
  },
  icon: {
    marginLeft: 2,
  },
});

export default React.memo(DealOfTheDay);
