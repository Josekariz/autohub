import { supabase } from "@/utils/supabase";

export const uploadCarImage = async (imageUri: string, reviewId: string) => {
  try {
    // Convert image URI to blob
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Generate unique filename: reviewId + timestamp + random
    const filename = `${reviewId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`;

    // console.log("Uploading image:", filename);

    // Upload to Supabase storage bucket named 'car-images'
    const { data, error } = await supabase.storage
      .from("car-images")
      .upload(filename, blob, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Image upload error:", error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    // console.log("Image uploaded successfully:", data);

    // Return the filename so we can store it in database
    return filename;
  } catch (error) {
    console.error("Image upload exception:", error);
    throw error;
  }
};
