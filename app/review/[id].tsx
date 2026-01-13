import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { supabase, mapReviewData } from "@/utils/supabase";
import { Review } from "../../data/reviews";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReviewDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [car, setCar] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullScreenModalVisible, setFullScreenModalVisible] = useState(false);

  useEffect(() => {
    async function fetchCar() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("id", id)
          .single();

        if (data) {
          setCar(mapReviewData(data));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

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
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative shadow-lg">
          <Pressable onPress={() => setFullScreenModalVisible(true)}>
            <Image source={{ uri: car.image }} className="w-full h-[400px]" />
            <View className="absolute bottom-3 right-6 bg-black/40 backdrop-blur-md p-3 rounded-full">
              <Ionicons name="expand-outline" size={18} color="white" />
            </View>
          </Pressable>

          <SafeAreaView className="absolute top-0 left-4">
            <Pressable
              onPress={() => router.back()}
              className="bg-black/30 backdrop-blur-md p-3 rounded-full border border-white/40 active:bg-black/50"
            >
              <Ionicons name="chevron-back" size={20} color="white" />
            </Pressable>
          </SafeAreaView>
        </View>

        <View className="px-6 pt-8 pb-8 bg-white rounded-t-[32px] shadow-sm">
          <View className="mb-6">
            <View className="flex-row items-start justify-between mb-2">
              <View className="flex-1">
                <Text className="text-4xl font-black text-gray-900 tracking-tight">
                  {car.title}
                </Text>
              </View>
              {car.rating && (
                <View className="bg-amber-100 px-3 py-1.5 rounded-xl flex-row items-center ml-2">
                  <Ionicons name="star" size={14} color="#fbbf24" />
                  <Text className="ml-1 font-bold text-amber-700 text-sm">
                    {car.rating}
                  </Text>
                </View>
              )}
            </View>
            <Text className="text-blue-600 font-semibold tracking-widest uppercase text-xs">
              {car.subtitle}
            </Text>
          </View>

          <View className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8" />

          {(car.fuelUsage || car.votes || car.author) && (
            <View className="flex-row justify-between mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              {car.fuelUsage && (
                <View className="items-center flex-1">
                  <Ionicons
                    name="speedometer-outline"
                    size={18}
                    color="#6b7280"
                  />
                  <Text className="text-[10px] text-gray-400 uppercase mt-1">
                    Fuel
                  </Text>
                  <Text className="text-sm font-bold text-gray-900">
                    {car.fuelUsage}
                  </Text>
                </View>
              )}
              {car.fuelUsage && car.votes && (
                <View className="w-px h-8 bg-gray-200 self-center" />
              )}
              {car.votes && (
                <View className="items-center flex-1">
                  <Ionicons name="people-outline" size={18} color="#6b7280" />
                  <Text className="text-[10px] text-gray-400 uppercase mt-1">
                    Votes
                  </Text>
                  <Text className="text-sm font-bold text-gray-900">
                    {car.votes}
                  </Text>
                </View>
              )}
              {car.votes && car.author && (
                <View className="w-px h-8 bg-gray-200 self-center" />
              )}
              {car.author && (
                <View className="items-center flex-1">
                  <Ionicons
                    name="person-circle-outline"
                    size={18}
                    color="#6b7280"
                  />
                  <Text className="text-[10px] text-gray-400 uppercase mt-1">
                    Author
                  </Text>
                  <Text
                    className="text-sm font-bold text-gray-900"
                    numberOfLines={1}
                  >
                    {car.author}
                  </Text>
                </View>
              )}
            </View>
          )}

          <View className="mb-8">
            <View className="flex-row items-center mb-3">
              <View className="w-1 h-6 bg-blue-600 rounded-full mr-3" />
              <Text className="text-lg font-bold text-gray-900">Overview</Text>
            </View>
            <Text className="text-gray-600 leading-7 text-base pl-4">
              {car.description}
            </Text>
          </View>

          {car.issues && car.issues.length > 0 && (
            <View className="mb-8">
              <View className="flex-row items-center mb-3">
                <View className="w-1 h-6 bg-red-500 rounded-full mr-3" />
                <Text className="text-lg font-bold text-gray-900">
                  Common Issues
                </Text>
              </View>
              <View className="pl-4">
                {car.issues.map((issue, index) => (
                  <View key={index} className="flex-row items-center mb-2">
                    <Ionicons
                      name="alert-circle-outline"
                      size={14}
                      color="#ef4444"
                    />
                    <Text className="text-gray-600 ml-2 text-base">
                      {issue}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

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

      <Modal
        visible={fullScreenModalVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View className="flex-1 bg-black">
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

          <View className="bg-gradient-to-t from-black via-black/70 to-transparent px-6 py-6">
            <Text className="text-white text-2xl font-black">{car.title}</Text>
            <Text className="text-blue-400 font-semibold text-sm tracking-widest uppercase mt-1">
              {car.subtitle}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
