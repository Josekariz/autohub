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
    <SafeAreaView className="flex-1 bg-main">
      {/* Header */}
      <View className="px-6 py-4 bg-card border-b border-subtle">
        <Text className="text-3xl font-black text-primary tracking-tighter">
          Autohub
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor="#3b82f6"
            onRefresh={() => {
              setRefreshing(true);
              fetchReviews();
            }}
          />
        }
      >
        <Text className="text-xs font-bold text-secondary uppercase mb-4 tracking-widest">
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
