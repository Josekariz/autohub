import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileTab() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="items-center pt-8 pb-6 px-4">
          <View className="w-24 h-24 rounded-full bg-blue-500 justify-center items-center mb-4">
            <Ionicons name="person" size={48} color="white" />
          </View>
          <Text className="text-2xl font-bold text-gray-900">{user.name}</Text>
          <Text className="text-gray-600 mt-1">{user.email}</Text>
        </View>

        {/* Action Buttons */}
        <View className="px-4 gap-3">
          <TouchableOpacity className="bg-white p-4 rounded-lg flex-row items-center border border-gray-200">
            <Ionicons name="settings" size={20} color="#2d7cd0" />
            <Text className="text-gray-900 font-semibold ml-3">Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white p-4 rounded-lg flex-row items-center border border-gray-200">
            <Ionicons name="bookmark" size={20} color="#2d7cd0" />
            <Text className="text-gray-900 font-semibold ml-3">
              Saved Items
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white p-4 rounded-lg flex-row items-center border border-gray-200">
            <Ionicons name="help-circle" size={20} color="#2d7cd0" />
            <Text className="text-gray-900 font-semibold ml-3">
              Help & Support
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-red-500 p-4 rounded-lg flex-row items-center justify-center mt-4">
            <Ionicons name="log-out" size={20} color="white" />
            <Text className="text-white font-semibold ml-3">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
