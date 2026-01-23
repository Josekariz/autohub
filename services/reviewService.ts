import { supabase } from "@/utils/supabase";

export const createReview = async (reviewData: any) => {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("User must be authenticated to submit a review");
    }

    
    const dbData = {
      car_make: reviewData.carMake,
      car_model: reviewData.carModel,
      year: reviewData.year,
      title: reviewData.title,
      subtitle: reviewData.subtitle,
      description: reviewData.description,
      owner_notes: reviewData.ownerNotes,
      issues: reviewData.issues,
      fuel_usage: reviewData.fuelUsage,
      rating: reviewData.rating,
      image: reviewData.image, // filename from storage
      author: user.id, 
      votes: 1, //pass one vote for creator
      
    };

    const { data, error } = await supabase
      .from("reviews")
      .insert([dbData])
      .select()
      .single();

    if (error) {
      console.error("Database insert error:", error);
      throw new Error(`Failed to create review: ${error.message}`);
    }

    console.log("Review created successfully:", data);
    return data;
  } catch (error) {
    console.error("Create review exception:", error);
    throw error;
  }
};
