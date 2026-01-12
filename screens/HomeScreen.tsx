import ReviewCard from "@/components/ReviewCard";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { reviews } from "../data/reviews";

export default function HomeScreen() {
  const latestReviews = reviews.slice(0, 6); // Get the latest 6 reviews

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
      >
        <Text className="text-xs font-bold text-gray-400 uppercase mb-4">
          Latest Reviews
        </Text>
        {latestReviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
