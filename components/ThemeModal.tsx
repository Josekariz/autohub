import React from "react";
import { View, Text, Modal, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function ThemeModal({ isVisible, onClose }: ThemeModalProps) {
  const { colorScheme, setColorScheme } = useColorScheme();

  const options = [
    { id: "light", label: "Light Mode", icon: "sunny-outline" },
    { id: "dark", label: "Dark Mode", icon: "moon-outline" },
    { id: "system", label: "System Default", icon: "settings-outline" },
  ];

  const handleThemeChange = async (themeId: "light" | "dark" | "system") => {
    // 1. Change the theme in the UI immediately
    setColorScheme(themeId);
    // 2. Save it to the phone's memory so it's remembered after restart
    await AsyncStorage.setItem("app-theme", themeId);
    // 3. Close the popup
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      {/* Pressable backdrop: If you click outside the modal, it closes */}
      <Pressable className="flex-1 bg-black/50 justify-end" onPress={onClose}>
        {/*Modal Container */}
        <View className="bg-white dark:bg-gray-800 p-6 rounded-t-3xl border-t border-gray-200 dark:border-gray-700">
          {/* Header Area */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold dark:text-white">
              Appearance
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={28} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          {/* Loop through the options (Light, Dark, System) */}
          {options.map((option) => {
            const isActive = colorScheme === option.id;

            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleThemeChange(option.id as any)}
                className={`flex-row items-center p-4 rounded-xl mb-2 ${
                  isActive ? "bg-blue-50 dark:bg-blue-900/20" : ""
                }`}
              >
                <Ionicons
                  name={option.icon as any}
                  size={22}
                  color={isActive ? "#2d7cd0" : "#9ca3af"}
                />

                <Text
                  className={`flex-1 ml-4 font-semibold text-lg ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {option.label}
                </Text>

                {isActive && (
                  <Ionicons name="checkmark-circle" size={22} color="#2d7cd0" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Pressable>
    </Modal>
  );
}
