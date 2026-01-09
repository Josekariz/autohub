import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, Pressable, ScrollView, Modal } from "react-native";
import { reviews } from "../../data/reviews";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReviewDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [fullScreenModalVisible, setFullScreenModalVisible] = useState(false);
  const car = reviews.find((r) => r.id === Number(id));

  if (!car)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <View className="items-center">
          <Ionicons
            name="alert-circle-outline"
            size={48}
            color="#ef4444"
            style={{ marginBottom: 12 }}
          />
          <Text className="text-xl font-bold text-gray-900">
            Car not found!
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="mt-6 bg-blue-600 px-6 py-3 rounded-xl"
          >
            <Text className="text-white font-semibold">Go Back</Text>
          </Pressable>
        </View>
      </View>
    );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image Section */}
        <View className="relative shadow-lg">
          <Pressable onPress={() => setFullScreenModalVisible(true)}>
            <Image source={{ uri: car.image }} className="w-full h-[400px]" />
            {/* Tap Indicator */}
            <View className="absolute bottom-3 right-6 bg-black/40 backdrop-blur-md p-3 rounded-full">
              <Ionicons name="expand-outline" size={18} color="white" />
            </View>
          </Pressable>

          {/* Back Button */}
          <SafeAreaView className="absolute top-0 left-4">
            <Pressable
              onPress={() => router.back()}
              className="bg-black/30 backdrop-blur-md p-3 rounded-full border border-white/40 active:bg-black/50"
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </Pressable>
          </SafeAreaView>
        </View>

        {/* Content Section */}
        <View className="px-6 pt-8 pb-8 bg-white rounded-t-[32px] shadow-sm">
          {/* Title Section */}
          <View className="mb-6">
            <Text className="text-4xl font-black text-gray-900 tracking-tight mb-2">
              {car.title}
            </Text>
            <Text className="text-blue-600 font-semibold tracking-widest uppercase text-xs">
              {car.subtitle}
            </Text>
          </View>

          {/* Divider */}
          <View className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8" />

          {/* Overview Section */}
          <View className="mb-8">
            <View className="flex-row items-center mb-3">
              <View className="w-1 h-6 bg-blue-600 rounded-full mr-3" />
              <Text className="text-lg font-bold text-gray-900">Overview</Text>
            </View>
            <Text className="text-gray-600 leading-7 text-base pl-4">
              {car.description}
            </Text>
          </View>

          {/* Owner Notes Card */}
          <View className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
            <View className="flex-row items-center mb-4">
              <View className="bg-blue-600 p-2.5 rounded-lg mr-3">
                <Ionicons name="chatbubble-ellipses" size={18} color="white" />
              </View>
              <Text className="font-bold text-gray-900 text-lg">
                Owner&apos;s Take
              </Text>
            </View>
            <Text className="text-gray-700 italic leading-6 text-base pl-1">
              &quot;{car.ownerNotes}&quot;
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Full Screen Image Modal */}
      <Modal
        visible={fullScreenModalVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View className="flex-1 bg-black">
          {/* Full Screen Image */}
          <Pressable
            onPress={() => setFullScreenModalVisible(false)}
            className="flex-1 justify-center items-center"
          >
            <Image
              source={{ uri: car.image }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </Pressable>

          {/* Car Info at Bottom */}
          <SafeAreaView className="bg-gradient-to-t from-black via-black/70 to-transparent px-6 py-6">
            <Text className="text-white text-2xl font-black">{car.title}</Text>
            <Text className="text-blue-400 font-semibold text-sm tracking-widest uppercase mt-1">
              {car.subtitle}
            </Text>
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
