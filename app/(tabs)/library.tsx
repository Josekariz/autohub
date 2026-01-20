import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AddReviewForm from "@/components/AddReviewForm";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LibraryTab() {
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  const handleAddReview = (reviewData: any) => {
    // later connect this to Supabase
    console.log("Review submitted:", reviewData);
    // Add to local state temporarily
    setReviews([...reviews, reviewData]);
    setShowForm(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-main">
      <View className="flex-1 justify-center items-center px-4">
        {reviews.length === 0 ? (
          <View className="items-center gap-4">
            <Ionicons
              name="car-outline"
              size={64}
              color="#9ca3af"
              style={{ marginBottom: 8 }}
            />

            <Text className="text-2xl font-bold text-primary text-center">
              You have no cars
            </Text>

            <Text className="text-base text-secondary text-center max-w-sm">
              Start adding reviews of cars you own or have driven
            </Text>

            <TouchableOpacity
              className="bg-accent rounded-lg px-6 py-3 mt-6 flex-row items-center gap-2 active:opacity-80"
              onPress={() => setShowForm(true)}
            >
              <Ionicons name="add-circle" size={20} color="white" />
              <Text className="text-white font-semibold text-base">
                Add a Review
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-1 w-full pt-10">
            <Text className="text-2xl font-bold text-primary mb-4">
              My Reviews
            </Text>

            <TouchableOpacity
              className="bg-accent rounded-lg px-6 py-3 flex-row items-center justify-center gap-2 active:opacity-80"
              onPress={() => setShowForm(true)}
            >
              <Ionicons name="add-circle" size={20} color="white" />
              <Text className="text-white font-semibold text-base">
                Add Another Review
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <AddReviewForm
        visible={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleAddReview}
      />
    </SafeAreaView>
  );
}
