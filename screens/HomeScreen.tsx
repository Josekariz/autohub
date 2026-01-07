import ReviewCard from "@/components/ReviewCard";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { reviews } from "../data/reviews";
export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-semibold text-gray-900">Autohub</Text>
        <Text className="text-sm text-gray-500 mt-1">
          Discover amazing cars
        </Text>
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            id={review.id}
            title={review.title}
            subtitle={review.subtitle}
            image={review.image}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
