import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/utils/supabase";
import { useState } from "react";
import ThemeModal from "@/components/ThemeModal";

export default function ProfileTab() {
  const [themeModalVisible, setThemeModalVisible] = useState(false);

  const user = { name: "John Doe", email: "john@example.com" };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1">
        {/* Header Section */}
        <View className="items-center pt-8 pb-6 px-4">
          <View className="w-24 h-24 rounded-full bg-blue-500 justify-center items-center mb-4">
            <Ionicons name="person" size={48} color="white" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 mt-1">
            {user.email}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="px-4 gap-3">
          {/* Theme/Appearance Button */}
          <TouchableOpacity
            onPress={() => setThemeModalVisible(true)}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg flex-row items-center border border-gray-200 dark:border-gray-700"
          >
            <Ionicons name="color-palette" size={20} color="#2d7cd0" />
            <Text className="text-gray-900 dark:text-white font-semibold ml-3">
              Appearance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white dark:bg-gray-800 p-4 rounded-lg flex-row items-center border border-gray-200 dark:border-gray-700">
            <Ionicons name="settings" size={20} color="#2d7cd0" />
            <Text className="text-gray-900 dark:text-white font-semibold ml-3">
              Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white dark:bg-gray-800 p-4 rounded-lg flex-row items-center border border-gray-200 dark:border-gray-700">
            <Ionicons name="help-circle" size={20} color="#2d7cd0" />
            <Text className="text-gray-900 dark:text-white font-semibold ml-3">
              Help & Support
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-red-500 p-4 rounded-lg flex-row items-center justify-center mt-4"
            onPress={handleSignOut}
          >
            <Ionicons name="log-out" size={20} color="white" />
            <Text className="text-white font-semibold ml-3">Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* The Hidden ModalthemeModalVisible is true */}
        <ThemeModal
          isVisible={themeModalVisible}
          onClose={() => setThemeModalVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
