import { Image, Pressable, Text, View } from "react-native";
import { useRouter, Href } from "expo-router";
import { Review } from "../data/reviews";
import { Ionicons } from "@expo/vector-icons";

type ReviewCardProps = Pick<
  Review,
  "id" | "image" | "title" | "carMake" | "year" | "rating"
>;

export default function ReviewCard({
  id,
  image,
  title,
  carMake,
  year,
  rating,
}: ReviewCardProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/review/${id}` as Href)} // Task 5 requirement [cite: 35]
      className="active:opacity-90 mb-5"
    >
      <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <Image
          source={{ uri: image }}
          className="w-full h-52"
          resizeMode="cover"
        />
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
              {carMake} • {year}
            </Text>
            <View className="flex-row items-center bg-amber-50 px-2 py-0.5 rounded-md">
              <Ionicons name="star" size={12} color="#fbbf24" />
              <Text className="ml-1 text-xs font-bold text-amber-700">
                {rating}
              </Text>
            </View>
          </View>
          <Text className="text-xl font-bold text-gray-900">{title}</Text>
        </View>
      </View>
    </Pressable>
  );
}
