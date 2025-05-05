// SearchBar.tsx
import { useState } from "react";
import { View, TextInput, Pressable, Animated } from "react-native";
import { Search, X } from "lucide-react-native";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="px-4 py-2">
      <View
        className={`flex-row items-center bg-gray-100 rounded-xl px-4 py-2 ${
          isFocused ? "border border-blue-400" : ""
        }`}
      >
        <Search size={20} color="#666" />
        <TextInput
          className="flex-1 mx-3 text-base text-right"
          placeholder="البحث عن المقالات..."
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            onSearch(text);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {query.length > 0 && (
          <Pressable
            onPress={() => {
              setQuery("");
              onSearch("");
            }}
          >
            <X size={20} color="#666" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
