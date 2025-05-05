// BlogCard.tsx
import { View, Text, Image, Pressable } from "react-native";
import { MotiView } from "moti";
import { Link } from "expo-router";

export function BlogCard({ item, index }) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 500,
        delay: index * 100,
      }}
      className="mb-4 mx-4 bg-white rounded-2xl shadow-sm"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }}
    >
      <Link href={`/post/${item.Slug}`} asChild>
        <Pressable className="overflow-hidden">
          {item.FeaturedImage?.formats?.medium?.url && (
            <Image
              source={{ uri: item.FeaturedImage.formats.medium.url }}
              className="w-full h-48 rounded-t-2xl"
              resizeMode="cover"
            />
          )}
          <View className="p-4">
            {item.Category && (
              <Text className="text-sm text-blue-600 mb-2 font-medium">
                {item.Category}
              </Text>
            )}
            <Text
              className="text-xl font-bold text-gray-900 mb-3 text-right"
              numberOfLines={2}
            >
              {item.Title}
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600 text-sm">
                {new Date(item.publishedAt).toLocaleDateString("ar-KW")}
              </Text>
              <Text className="text-gray-600 text-sm">{item.Author}</Text>
            </View>
          </View>
        </Pressable>
      </Link>
    </MotiView>
  );
}
