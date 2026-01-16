import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface AddReviewFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (reviewData: any) => void;
}

export default function AddReviewForm({
  visible,
  onClose,
  onSubmit,
}: AddReviewFormProps) {
  const [formData, setFormData] = useState({
    carMake: "",
    carModel: "",
    year: "",
    title: "",
    subtitle: "",
    description: "",
    ownerNotes: "",
    issues: "",
    fuelUsage: "",
    rating: "5",
    image: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prev) => ({
        ...prev,
        image: result.assets[0].uri,
      }));
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Camera permission is needed to take photos"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prev) => ({
        ...prev,
        image: result.assets[0].uri,
      }));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.carMake ||
      !formData.carModel ||
      !formData.year ||
      !formData.title ||
      !formData.description
    ) {
      Alert.alert(
        "Missing fields",
        "Please fill in all required fields marked with *"
      );
      return;
    }

    const reviewData = {
      ...formData,
      issues: formData.issues
        .split(",")
        .map((issue) => issue.trim())
        .filter((issue) => issue !== ""),
      rating: parseInt(formData.rating),
      year: parseInt(formData.year),
    };

    onSubmit(reviewData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      carMake: "",
      carModel: "",
      year: "",
      title: "",
      subtitle: "",
      description: "",
      ownerNotes: "",
      issues: "",
      fuelUsage: "",
      rating: "5",
      image: "",
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="formSheet"
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row justify-between items-center px-4 py-4 border-b border-gray-200">
          <Text className="text-xl font-bold text-gray-900">Add a Review</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-4 py-4">
          {/* Image Selector */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Car Photo
            </Text>
            {formData.image ? (
              <View className="relative mb-3">
                <Image
                  source={{ uri: formData.image }}
                  className="w-full h-48 rounded-lg bg-gray-200"
                />
                <TouchableOpacity
                  onPress={removeImage}
                  className="absolute top-2 right-2 bg-red-500 rounded-full p-2"
                >
                  <Ionicons name="trash" size={20} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <View className="bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 p-4 mb-3 items-center justify-center h-48">
                <Ionicons name="image" size={48} color="#d1d5db" />
                <Text className="text-gray-600 text-sm mt-2">
                  No image selected
                </Text>
              </View>
            )}
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={takePhoto}
                className="flex-1 bg-blue-500 rounded-lg py-2 flex-row items-center justify-center gap-2"
              >
                <Ionicons name="camera" size={18} color="white" />
                <Text className="text-white font-semibold">Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={pickImage}
                className="flex-1 bg-gray-500 rounded-lg py-2 flex-row items-center justify-center gap-2"
              >
                <Ionicons name="image" size={18} color="white" />
                <Text className="text-white font-semibold">Choose Image</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Car Make */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Car Make *
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              placeholder="e.g., Toyota"
              value={formData.carMake}
              onChangeText={(value) => handleChange("carMake", value)}
            />
          </View>

          {/* Car Model */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Car Model *
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              placeholder="e.g., Camry"
              value={formData.carModel}
              onChangeText={(value) => handleChange("carModel", value)}
            />
          </View>

          {/* Year */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Year *
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              placeholder="e.g., 2023"
              value={formData.year}
              onChangeText={(value) => handleChange("year", value)}
              keyboardType="number-pad"
            />
          </View>

          {/* Title */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Review Title *
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              placeholder="e.g., Reliable and Efficient"
              value={formData.title}
              onChangeText={(value) => handleChange("title", value)}
            />
          </View>

          {/* Subtitle */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Subtitle
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              placeholder="Brief tagline"
              value={formData.subtitle}
              onChangeText={(value) => handleChange("subtitle", value)}
            />
          </View>

          {/* Description */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Description *
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900 h-24"
              placeholder="Detailed review of the car"
              value={formData.description}
              onChangeText={(value) => handleChange("description", value)}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Owner Notes */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Owner Notes
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900 h-20"
              placeholder="Additional notes about ownership"
              value={formData.ownerNotes}
              onChangeText={(value) => handleChange("ownerNotes", value)}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Issues */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Issues (comma-separated)
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900 h-20"
              placeholder="e.g., Engine knock, Interior rattle, Door creak"
              value={formData.issues}
              onChangeText={(value) => handleChange("issues", value)}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Fuel Usage */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Fuel Usage
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              placeholder="e.g., 25 MPG combined"
              value={formData.fuelUsage}
              onChangeText={(value) => handleChange("fuelUsage", value)}
            />
          </View>

          {/* Rating */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Rating (1-5) *
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              placeholder="5"
              value={formData.rating}
              onChangeText={(value) => handleChange("rating", value)}
              keyboardType="number-pad"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-blue-500 rounded-lg py-3 mb-4"
            onPress={handleSubmit}
          >
            <Text className="text-white font-semibold text-center text-base">
              Submit Review
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
