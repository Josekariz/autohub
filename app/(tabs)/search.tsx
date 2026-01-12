import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { reviews } from "../../data/reviews";
import ReviewCard from "@/components/ReviewCard";
import { Ionicons } from "@expo/vector-icons";

export default function SearchTab() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // 1. Debounce Logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  // 2. Filter Logic: Only run if there is a query
  const results =
    debouncedQuery.trim() === ""
      ? []
      : reviews.filter((car) => {
          const searchTerm = debouncedQuery.toLowerCase();
          return (
            car.carMake.toLowerCase().includes(searchTerm) ||
            car.carModel.toLowerCase().includes(searchTerm) ||
            car.title.toLowerCase().includes(searchTerm)
          );
        });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View className="px-6 pt-4 pb-6">
            <Text className="text-3xl font-black text-gray-900 tracking-tight">
              Search
            </Text>
            <Text className="text-gray-500 font-medium">
              Find your next favorite car
            </Text>
          </View>

          {/* Search Input Box */}
          <View className="px-6 pb-6">
            <View className="flex-row items-center bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
              <Ionicons name="search" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-lg text-gray-900"
                placeholder="Search brand or model..."
                placeholderTextColor="#9ca3af"
                value={query}
                onChangeText={setQuery}
                autoCorrect={false}
              />
              {query.length > 0 && (
                <Pressable onPress={() => setQuery("")}>
                  <Ionicons name="close-circle" size={20} color="#9ca3af" />
                </Pressable>
              )}
            </View>
          </View>

          {/* Results Section */}
          <View className="px-6 pb-8">
            {results.length > 0 ? (
              results.map((car) => <ReviewCard key={car.id} {...car} />)
            ) : debouncedQuery.length > 0 ? (
              <View className="items-center mt-20">
                <Ionicons
                  name="alert-circle-outline"
                  size={64}
                  color="#d1d5db"
                />
                <Text className="text-gray-400 mt-4 text-lg font-medium text-center">
                  No results found for &quot;{debouncedQuery}&quot;
                </Text>
              </View>
            ) : (
              <View className="items-center mt-20">
                <Ionicons name="car-outline" size={64} color="#d1d5db" />
                <Text className="text-gray-400 mt-4 text-lg font-medium">
                  Type to start searching...
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
