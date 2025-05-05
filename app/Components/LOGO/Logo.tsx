// import { View, Image } from "react-native";
// import React from "react";
// import { Link } from "expo-router";

// const Logo = () => {
//   return (
//     <View>
//       <Link href="../../(root)/(tabs)/index.tsx">
//         <Image
//           source={require("../../../assets/logo.png")}
//           className=" w-36 h-36 rounded-full shadow-md "
//         />
//       </Link>
//     </View>
//   );
// };

// export default Logo;

/************************** */

import { View, Image, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Logo = () => {
  const router = useRouter();
  return (
    <View className="">
      <Pressable onPress={() => router.back()}>
        <View className="rounded-full overflow-hidden  ">
          <Image
            source={require("../../../assets/logo.png")}
            className="w-24 h-24 rounded-full "
            resizeMode="cover" // Ensures the image fills the circle properly
          />
        </View>
      </Pressable>
    </View>
  );
};

export default Logo;
