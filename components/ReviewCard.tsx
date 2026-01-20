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
      onPress={() => router.push(`/review/${id}` as Href)}
      className="active:opacity-90 mb-5"
    >
      <View className="bg-card rounded-2xl overflow-hidden shadow-sm border border-subtle">
        <Image
          source={{ uri: image }}
          className="w-full h-52"
          resizeMode="cover"
        />
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-[10px] font-bold text-accent uppercase tracking-widest">
              {carMake} • {year}
            </Text>

            <View className="flex-row items-center bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-md">
              <Ionicons name="star" size={12} color="#fbbf24" />
              <Text className="ml-1 text-xs font-bold text-amber-700 dark:text-amber-500">
                {rating}
              </Text>
            </View>
          </View>

          <Text className="text-xl font-bold text-primary">{title}</Text>
        </View>
      </View>
    </Pressable>
  );
}
