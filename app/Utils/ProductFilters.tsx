import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MotiView } from "moti";
import { Filter, X, Check } from "lucide-react-native";

const { width } = Dimensions.get("window");
const FILTER_WIDTH = width * 0.1; // 10% of viewport width

// Types
interface FilterState {
  category: string | null;
  subcategories: string[];
}

interface ProductFiltersProps {
  activeCategory: string | null;
  selectedFilters: FilterState;
  onCategorySelect: (category: string) => void;
  onFiltersChange: (filters: FilterState) => void;
}

// Constants
const COLORS = {
  primary: "#8B0000",
  background: "#FFF9F7",
  white: "#FFFFFF",
  lightGray: "#F5F5F5",
  darkText: "#333333",
  accent: "#4A4A4A",
};

const CATEGORIES = [
  "Poultry",
  "Livestock",
  "Pets",
  "Aquatic",
  "Birds",
  "Utilities",
];

const SUBCATEGORIES = {
  Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
  Livestock: ["Sheep", "Cows", "Horses"],
  Pets: ["Dogs", "Cats", "Rabbit"],
  Aquatic: ["Fish"],
  Birds: ["Birds"],
  Utilities: ["Tools", "Accessories"],
};

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  activeCategory,
  selectedFilters,
  onCategorySelect,
  onFiltersChange,
}) => {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const handleSubcategoryToggle = useCallback(
    (subcategory: string) => {
      const currentSubcategories = selectedFilters.subcategories;
      const isSelected = currentSubcategories.includes(subcategory);

      onFiltersChange({
        ...selectedFilters,
        subcategories: isSelected
          ? currentSubcategories.filter((sc) => sc !== subcategory)
          : [...currentSubcategories, subcategory],
      });
    },
    [selectedFilters, onFiltersChange]
  );

  const resetFilters = useCallback(() => {
    onFiltersChange({ category: null, subcategories: [] });
    onCategorySelect("");
  }, [onFiltersChange, onCategorySelect]);

  const renderCategoryButton = useCallback(
    (category: string) => (
      <MotiView
        key={category}
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          delay: CATEGORIES.indexOf(category) * 50,
        }}
      >
        <Pressable
          onPress={() => onCategorySelect(category)}
          style={[
            styles.categoryButton,
            activeCategory === category && styles.activeCategoryButton,
          ]}
        >
          <Text
            style={[
              styles.categoryButtonText,
              activeCategory === category && styles.activeCategoryButtonText,
            ]}
            numberOfLines={1}
          >
            {category[0]}
          </Text>
        </Pressable>
      </MotiView>
    ),
    [activeCategory, onCategorySelect]
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Pressable
          onPress={() => setIsFilterModalVisible(true)}
          style={styles.filterButton}
        >
          <Filter size={20} color={COLORS.primary} />
          {selectedFilters.subcategories.length > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>
                {selectedFilters.subcategories.length}
              </Text>
            </View>
          )}
        </Pressable>

        {CATEGORIES.map(renderCategoryButton)}
      </ScrollView>

      <Modal
        transparent={true}
        visible={isFilterModalVisible}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <Pressable
                onPress={() => setIsFilterModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <X size={24} color={COLORS.primary} />
              </Pressable>
            </View>

            <ScrollView style={styles.modalContent}>
              {activeCategory && (
                <>
                  <Text style={styles.subcategoryTitle}>
                    {activeCategory} Types
                  </Text>
                  {SUBCATEGORIES[activeCategory]?.map((subcategory) => (
                    <Pressable
                      key={subcategory}
                      onPress={() => handleSubcategoryToggle(subcategory)}
                      style={styles.subcategoryItem}
                    >
                      <Text style={styles.subcategoryText}>{subcategory}</Text>
                      {selectedFilters.subcategories.includes(subcategory) && (
                        <Check size={20} color={COLORS.primary} />
                      )}
                    </Pressable>
                  ))}
                </>
              )}
            </ScrollView>

            <View style={styles.modalActions}>
              <Pressable style={styles.resetButton} onPress={resetFilters}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </Pressable>
              <Pressable
                style={styles.applyButton}
                onPress={() => setIsFilterModalVisible(false)}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: FILTER_WIDTH,
    backgroundColor: COLORS.white,
    borderRightWidth: 1,
    borderRightColor: COLORS.lightGray,
  },
  scrollContent: {
    padding: 8,
  },
  filterButton: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  filterBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  filterBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  categoryButton: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  activeCategoryButton: {
    backgroundColor: COLORS.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.darkText,
  },
  activeCategoryButtonText: {
    color: COLORS.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },
  modalContent: {
    padding: 16,
  },
  subcategoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.accent,
    marginBottom: 12,
  },
  subcategoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  subcategoryText: {
    fontSize: 16,
    color: COLORS.darkText,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  resetButton: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  resetButtonText: {
    color: COLORS.primary,
    textAlign: "center",
    fontWeight: "600",
  },
  applyButton: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  applyButtonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default ProductFilters;
