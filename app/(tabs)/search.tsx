import React, { useState, useEffect, useRef } from "react";
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

  const searchCacheRef = useRef<Record<string, Review[]>>({});
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    async function handleSearch() {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      const trimmedQuery = query.trim().toLowerCase();

      if (searchCacheRef.current[trimmedQuery]) {
        setResults(searchCacheRef.current[trimmedQuery]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .or(
            `car_make.ilike.%${trimmedQuery}%,car_model.ilike.%${trimmedQuery}%,title.ilike.%${trimmedQuery}%`
          )
          .limit(50);

        if (error) throw error;

        if (data) {
          const mapped = data.map(mapReviewData);
          searchCacheRef.current[trimmedQuery] = mapped;
          setResults(mapped);
        }
      } catch (err) {
        // Suppress logs for manual aborts
        if ((err as any).name !== "AbortError") {
          console.error("Search Error:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(handleSearch, 400);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <SafeAreaView className="flex-1 bg-main">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6 pt-4 pb-6">
            <Text className="text-3xl font-black text-primary tracking-tight">
              Search
            </Text>

            <Text className="text-secondary font-medium">
              Find your next favorite car
            </Text>
          </View>

          <View className="px-6 pb-6">
            <View className="flex-row items-center bg-card px-4 py-3 rounded-2xl border border-subtle shadow-sm">
              <Ionicons name="search" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-lg text-primary"
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
                <ActivityIndicator size="large" color="#2d7cd0" />
              </View>
            ) : results.length > 0 ? (
              results.map((car) => <ReviewCard key={car.id} {...car} />)
            ) : query.length > 0 ? (
              <View className="items-center mt-20">
                <Ionicons
                  name="alert-circle-outline"
                  size={64}
                  color="#9ca3af"
                />

                <Text className="text-secondary mt-4 text-lg font-medium text-center">
                  No results found for &quot;{query}&quot;
                </Text>
              </View>
            ) : (
              <View className="items-center mt-20">
                {/* Placeholder State Icon */}
                <Ionicons name="car-outline" size={64} color="#9ca3af" />

                <Text className="text-secondary mt-4 text-lg font-medium">
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
