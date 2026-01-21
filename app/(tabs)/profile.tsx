import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";
import ThemeModal from "@/components/ThemeModal";

export default function ProfileTab() {
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [userData, setUserData] = useState<{
    email: string;
    name: string;
  } | null>(null);

  // 1. Fetch real user data 
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        // Extract name from email 
        const nameFromEmail = user.email?.split("@")[0] || "User";
        setUserData({
          email: user.email || "",
          name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
        });
      }
    }
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // 2. Avatar Initial
  const initial = userData?.name?.charAt(0) || "?";

  return (
    <SafeAreaView className="flex-1 bg-main">
      <ScrollView className="flex-1">
        {/* Header Section */}
        <View className="items-center pt-12 pb-8 px-4">
          
          <View className="w-24 h-24 rounded-full bg-accent justify-center items-center mb-4 shadow-xl shadow-blue-500/40">
            <Text className="text-white text-4xl font-black">{initial}</Text>
          </View>

          <Text className="text-3xl font-black text-primary tracking-tight">
            {userData?.name || "Loading..."}
          </Text>
          <Text className="text-secondary font-medium mt-1">
            {userData?.email}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="px-6 gap-3">
          {/* Appearance Button */}
          <TouchableOpacity
            onPress={() => setThemeModalVisible(true)}
            className="bg-card p-4 rounded-2xl flex-row items-center border border-subtle shadow-sm"
          >
            <View className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg">
              <Ionicons name="color-palette" size={20} color="#2d7cd0" />
            </View>
            <Text className="text-primary font-bold ml-4 text-lg">
              Appearance
            </Text>
            <View className="flex-1" />
            <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
          </TouchableOpacity>

          {/* Other Dummy Buttons */}
          {["Settings", "Help & Support"].map((item, index) => (
            <TouchableOpacity
              key={item}
              className="bg-card p-4 rounded-2xl flex-row items-center border border-subtle shadow-sm"
            >
              <View className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg">
                <Ionicons
                  name={index === 0 ? "settings" : "help-circle"}
                  size={20}
                  color="#2d7cd0"
                />
              </View>
              <Text className="text-primary font-bold ml-4 text-lg">
                {item}
              </Text>
              <View className="flex-1" />
              <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
            </TouchableOpacity>
          ))}

          {/* Sign Out Button */}
          <TouchableOpacity
            className="bg-red-50 dark:bg-red-900/10 p-5 rounded-2xl flex-row items-center justify-center mt-6 border border-red-100 dark:border-red-900/30"
            onPress={handleSignOut}
          >
            <Ionicons name="log-out" size={20} color="#ef4444" />
            <Text className="text-red-500 font-bold ml-3 text-lg">
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        <ThemeModal
          isVisible={themeModalVisible}
          onClose={() => setThemeModalVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
