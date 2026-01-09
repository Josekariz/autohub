import { Image, Pressable, Text, View } from "react-native";
import { useRouter, Href } from "expo-router";
import { Review } from "../data/reviews";

type ReviewCardProps = Pick<Review, "id" | "image" | "title" | "subtitle">;

export default function ReviewCard({
  id,
  image,
  subtitle,
  title,
}: ReviewCardProps) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(`/review/${id}` as Href)}>
      <View className="bg-white rounded-2xl overflow-hidden shadow-md mb-5">
        <Image
          source={{ uri: image }}
          className="w-full h-56"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-xl font-bold text-gray-900">{title}</Text>
          <Text className="text-sm text-gray-600 mt-1">{subtitle}</Text>
        </View>
      </View>
    </Pressable>
  );
}
