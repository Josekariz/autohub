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
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prev) => ({ ...prev, image: result.assets[0].uri }));
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
      setFormData((prev) => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  const removeImage = () => setFormData((prev) => ({ ...prev, image: "" }));

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
      {/* main Background */}
      <SafeAreaView className="flex-1 bg-main">
        {/* Header: */}
        <View className="flex-row justify-between items-center px-4 py-4 bg-card border-b border-subtle">
          <Text className="text-xl font-bold text-primary">Add a Review</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-4 py-4">

          {/* Image Selector */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-secondary mb-2">
              Car Photo
            </Text>
            {formData.image ? (
              <View className="relative mb-3">
                <Image
                  source={{ uri: formData.image }}
                  className="w-full h-48 rounded-lg bg-card"
                />
                <TouchableOpacity
                  onPress={removeImage}
                  className="absolute top-2 right-2 bg-red-500 rounded-full p-2"
                >
                  <Ionicons name="trash" size={20} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <View className="bg-card rounded-lg border-2 border-dashed border-subtle p-4 mb-3 items-center justify-center h-48">
                <Ionicons name="image" size={48} color="#9ca3af" />
                <Text className="text-secondary text-sm mt-2">
                  No image selected
                </Text>
              </View>
            )}
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={takePhoto}
                className="flex-1 bg-accent rounded-lg py-2 flex-row items-center justify-center gap-2"
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

          {/* Reusable Input Fields Logic */}
          {[
            {
              label: "Car Make *",
              field: "carMake",
              placeholder: "e.g., Toyota",
            },
            {
              label: "Car Model *",
              field: "carModel",
              placeholder: "e.g., Camry",
            },
            {
              label: "Year *",
              field: "year",
              placeholder: "e.g., 2023",
              keyboard: "number-pad",
            },
            {
              label: "Review Title *",
              field: "title",
              placeholder: "e.g., Reliable and Efficient",
            },
            {
              label: "Subtitle",
              field: "subtitle",
              placeholder: "Brief tagline",
            },
          ].map((item) => (
            <View key={item.field} className="mb-4">
              <Text className="text-sm font-semibold text-secondary mb-2">
                {item.label}
              </Text>
              <TextInput
                className="bg-card border border-subtle rounded-lg px-3 py-2 text-primary"
                placeholder={item.placeholder}
                placeholderTextColor="#9ca3af"
                value={(formData as any)[item.field]}
                onChangeText={(value) => handleChange(item.field, value)}
                keyboardType={(item.keyboard as any) || "default"}
              />
            </View>
          ))}

          {/* Large Text Areas */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-secondary mb-2">
              Description *
            </Text>
            <TextInput
              className="bg-card border border-subtle rounded-lg px-3 py-2 text-primary h-24"
              placeholder="Detailed review of the car"
              placeholderTextColor="#9ca3af"
              value={formData.description}
              onChangeText={(value) => handleChange("description", value)}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Owner Notes */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-secondary mb-2">
              Owner Notes
            </Text>
            <TextInput
              className="bg-card border border-subtle rounded-lg px-3 py-2 text-primary h-20"
              placeholder="Additional notes about ownership"
              placeholderTextColor="#9ca3af"
              value={formData.ownerNotes}
              onChangeText={(value) => handleChange("ownerNotes", value)}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Issues */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-secondary mb-2">
              Issues (comma-separated)
            </Text>
            <TextInput
              className="bg-card border border-subtle rounded-lg px-3 py-2 text-primary h-20"
              placeholder="e.g., Engine knock, Interior rattle"
              placeholderTextColor="#9ca3af"
              value={formData.issues}
              onChangeText={(value) => handleChange("issues", value)}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Rating & Fuel */}
          <View className="mb-4 flex-row gap-4">
            <View className="flex-1">
              <Text className="text-sm font-semibold text-secondary mb-2">
                Fuel Usage
              </Text>
              <TextInput
                className="bg-card border border-subtle rounded-lg px-3 py-2 text-primary"
                placeholder="25 MPG"
                placeholderTextColor="#9ca3af"
                value={formData.fuelUsage}
                onChangeText={(value) => handleChange("fuelUsage", value)}
              />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-secondary mb-2">
                Rating (1-5) *
              </Text>
              <TextInput
                className="bg-card border border-subtle rounded-lg px-3 py-2 text-primary"
                placeholder="5"
                placeholderTextColor="#9ca3af"
                value={formData.rating}
                onChangeText={(value) => handleChange("rating", value)}
                keyboardType="number-pad"
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-accent rounded-xl py-4 mb-10 shadow-lg active:opacity-90"
            onPress={handleSubmit}
          >
            <Text className="text-white font-bold text-center text-lg">
              Submit Review
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
