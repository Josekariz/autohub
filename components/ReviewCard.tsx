import { Image, Pressable, Text, View } from "react-native";

type ReviewCardProps = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
};

export default function ReviewCard({
  id,
  image,
  subtitle,
  title,
}: ReviewCardProps) {
  return (
    <Pressable onPress={()=> alert(`clicked ${title}`)}>
      <View
        key={id}
        className="bg-white rounded-2xl overflow-hidden shadow-sm mb-5"
      >
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
