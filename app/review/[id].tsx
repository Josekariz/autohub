import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { reviews } from "../../data/reviews";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReviewDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const car = reviews.find((r) => r.id === Number(id));

  if (!car)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Car not found!</Text>
      </View>
    );

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image Section */}
        <View className="relative">
          <Image source={{ uri: car.image }} className="w-full h-[450px]" />

          {/* Back Button with better styling */}
          <SafeAreaView className="absolute top-0 left-5">
            <Pressable
              onPress={() => router.back()}
              className="bg-black/20 backdrop-blur-md p-3 rounded-full border border-white/30"
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </Pressable>
          </SafeAreaView>

          {/* Gradient Overlay Effect (Optional tip: you can use LinearGradient here later) */}
        </View>

        {/* Content Section */}
        <View className="px-6 py-8 -mt-10 bg-white rounded-t-[40px]">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-3xl font-black text-gray-900 tracking-tight">
              {car.title}
            </Text>
          </View>

          <Text className="text-blue-600 font-semibold tracking-widest uppercase text-xs mb-6">
            {car.subtitle}
          </Text>

          {/* Overview Section */}
          <View className="mb-8">
            <Text className="text-lg font-bold text-gray-900 mb-2">
              Overview
            </Text>
            <Text className="text-gray-500 leading-7 text-base">
              {car.description}
            </Text>
          </View>

          {/* Owner Notes with a 'Premium' Card feel */}
          <View className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
            <View className="flex-row items-center mb-3">
              <Ionicons name="chatbubble-ellipses" size={20} color="#374151" />
              <Text className="font-bold text-gray-800 ml-2">
                Owner&apos;s Take
              </Text>
            </View>
            <Text className="text-gray-600 italic leading-6">
              &quot;{car.ownerNotes}&quot;
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
