import "expo-sqlite/localStorage/install";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error("Supabase environment variables are not set properly.");
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const mapReviewData = (row: any) => ({
  id: row.id,
  carMake: row.car_make,
  carModel: row.car_model,
  year: row.year,
  title: row.title,
  subtitle: row.subtitle,
  image: row.image,
  description: row.description,
  ownerNotes: row.owner_notes,
  issues: row.issues || [],
  fuelUsage: row.fuel_usage,
  rating: Number(row.rating),
  votes: row.votes,
  author: row.author,
});
