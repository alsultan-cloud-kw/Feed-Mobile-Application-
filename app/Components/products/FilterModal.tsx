// app/(tabs)/store/components/FilterModal.tsx
import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import { MotiView } from "moti";
import { X } from "lucide-react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useState } from "react";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  activeFilters: {
    category: string;
    priceRange: { min: number; max: number };
    sortBy: string;
  };
  onApplyFilters: (filters: any) => void;
}

export default function FilterModal({
  visible,
  onClose,
  activeFilters,
  onApplyFilters,
}: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState(activeFilters);

  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Home",
    "Books",
    "Sports",
  ];

  const sortOptions = [
    { id: "newest", label: "Newest First" },
    { id: "priceAsc", label: "Price: Low to High" },
    { id: "priceDesc", label: "Price: High to Low" },
  ];

  const applyFilters = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50">
        <MotiView
          from={{ translateY: 1000 }}
          animate={{ translateY: 0 }}
          transition={{ type: "timing", duration: 300 }}
          className="flex-1 mt-20 bg-white rounded-t-3xl"
        >
          {/* Header */}
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <Text className="text-xl font-semibold">Filters</Text>
            <Pressable onPress={onClose}>
              <X size={24} color="#374151" />
            </Pressable>
          </View>

          <ScrollView className="flex-1 px-4">
            {/* Categories */}
            <View className="py-4">
              <Text className="text-lg font-medium mb-3">Categories</Text>
              <View className="flex-row flex-wrap gap-2">
                {categories.map((category) => (
                  <Pressable
                    key={category}
                    onPress={() =>
                      setLocalFilters((prev) => ({
                        ...prev,
                        category: category === "All" ? "" : category,
                      }))
                    }
                    className={`px-4 py-2 rounded-full border ${
                      localFilters.category ===
                      (category === "All" ? "" : category)
                        ? "bg-gray-900 border-gray-900"
                        : "border-gray-300"
                    }`}
                  >
                    <Text
                      className={`${
                        localFilters.category ===
                        (category === "All" ? "" : category)
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {category}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Price Range */}
            <View className="py-4">
              <Text className="text-lg font-medium mb-3">Price Range</Text>
              <MultiSlider
                values={[
                  localFilters.priceRange.min,
                  localFilters.priceRange.max,
                ]}
                min={0}
                max={1000}
                step={10}
                sliderLength={280}
                onValuesChange={([min, max]) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    priceRange: { min, max },
                  }))
                }
                selectedStyle={{ backgroundColor: "#111827" }}
                markerStyle={{ backgroundColor: "#111827" }}
              />
              <View className="flex-row justify-between mt-2">
                <Text className="text-gray-600">
                  ${localFilters.priceRange.min}
                </Text>
                <Text className="text-gray-600">
                  ${localFilters.priceRange.max}
                </Text>
              </View>
            </View>

            {/* Sort By */}
            <View className="py-4">
              <Text className="text-lg font-medium mb-3">Sort By</Text>
              {sortOptions.map((option) => (
                <Pressable
                  key={option.id}
                  onPress={() =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      sortBy: option.id,
                    }))
                  }
                  className={`p-3 rounded-lg mb-2 ${
                    localFilters.sortBy === option.id ? "bg-gray-100" : ""
                  }`}
                >
                  <Text className="text-gray-700">{option.label}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          {/* Apply Button */}
          <View className="p-4 border-t border-gray-200">
            <Pressable
              onPress={applyFilters}
              className="w-full bg-gray-900 py-3 rounded-lg items-center"
            >
              <Text className="text-white font-semibold text-lg">
                Apply Filters
              </Text>
            </Pressable>
          </View>
        </MotiView>
      </View>
    </Modal>
  );
}
