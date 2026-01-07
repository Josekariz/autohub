import { Image, Modal, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

type ReviewCardProps = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
};

export default function ReviewCard({
  image,
  subtitle,
  title,
}: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);

  return (
    <>
      <Pressable onPress={() => setIsExpanded(true)}>
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

      {/* pop up modal */}
      <Modal
        visible={isExpanded}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsExpanded(false)}
      >
        {/* dark pressable background */}
        <Pressable
          className="flex-1 bg-black/80 justify-center items-center"
          onPress={() => setIsExpanded(false)}
        >

          {/* card */}
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-11/12 overflow-hidden"
            style={{ maxHeight: "80%" }}
          >
            <Image
              source={{ uri: image }}
              className="w-full h-64"
              resizeMode="cover"
            />
            {/* close button */}
            <Pressable
              className="absolute top-4 right-4 bg-white/60 rounded-full p-2"
              onPress={() => setIsExpanded(false)}
            >
              <AntDesign name="close" size={20} color="black" />
            </Pressable>

            <View className="p-6">
              <Text className="text-2xl font-bold text-gray-900">{title}</Text>
              <Text className="text-base text-gray-600 mt-2">{subtitle}</Text>
              <Text className="text-gray-700 mt-4 leading-6">
                This is an amazing vehicle with incredible performance and
                style. More details coming soon!
              </Text>
            {/* upvote button */}
              <Pressable
                className={`rounded-full py-3 px-6 mt-6 flex-row justify-center items-center ${
                  isUpvoted
                    ? "bg-red-50 border-2 border-red-500"
                    : "bg-gray-100 border-2 border-gray-300"
                }`}
                onPress={() => setIsUpvoted(!isUpvoted)}
              >
                <AntDesign
                  name={"heart"}
                  size={20}
                  color={isUpvoted ? "#ef4444" : "#6b7280"}
                />
                <Text
                  className={`font-semibold ml-2 min-w-[60px] text-center ${
                    isUpvoted ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  {isUpvoted ? "Liked" : "Like"}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
