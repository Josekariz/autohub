import React, { useEffect, useState } from "react"; 
import ReviewCard from "@/components/ReviewCard";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase, mapReviewData } from "@/utils/supabase"; 
import { Review } from "../data/reviews"; 

export default function HomeScreen() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch data
  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;
      if (data) setReviews(data.map(mapReviewData));
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 py-4 bg-white border-b border-gray-100">
        <Text className="text-3xl font-black text-gray-900 tracking-tighter">
          Autohub
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchReviews();
            }}
          />
        }
      >
        <Text className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">
          Latest Reviews
        </Text>

        {loading && !refreshing ? (
          <ActivityIndicator color="#3b82f6" className="mt-20" />
        ) : (
          reviews.map((review) => <ReviewCard key={review.id} {...review} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
