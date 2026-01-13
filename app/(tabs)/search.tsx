import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase, mapReviewData } from "@/utils/supabase";
import ReviewCard from "@/components/ReviewCard";
import { Review } from "../../data/reviews";
import { Ionicons } from "@expo/vector-icons";

export default function SearchTab() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function handleSearch() {
      if (query.trim().length === 0) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .or(
            `car_make.ilike.%${query}%,car_model.ilike.%${query}%,title.ilike.%${query}%`
          );

        if (error) throw error;

        if (data) {
          setResults(data.map(mapReviewData));
        }
      } catch (err) {
        console.error("Search Error:", err);
      } finally {
        setLoading(false);
      }
    }

    // Debounce: Wait 400ms after user stops typing to call Supabase
    const timer = setTimeout(handleSearch, 400);
    return () => clearTimeout(timer);
  }, [query]);

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
          <View className="px-6 pt-4 pb-6">
            <Text className="text-3xl font-black text-gray-900 tracking-tight">
              Search
            </Text>
            <Text className="text-gray-500 font-medium">
              Find your next favorite car
            </Text>
          </View>

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

          <View className="px-6 pb-8">
            {loading ? (
              <View className="mt-20">
                <ActivityIndicator size="large" color="#2563eb" />
              </View>
            ) : results.length > 0 ? (
              results.map((car) => <ReviewCard key={car.id} {...car} />)
            ) : query.length > 0 ? (
              <View className="items-center mt-20">
                <Ionicons
                  name="alert-circle-outline"
                  size={64}
                  color="#d1d5db"
                />
                <Text className="text-gray-400 mt-4 text-lg font-medium text-center">
                  No results found for &quot;{query}&quot;
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
