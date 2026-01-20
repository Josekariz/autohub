import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { View, ActivityIndicator } from "react-native";
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../global.css";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  // Get the color switcher
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    async function initializeApp() {
      try {
        // Load Theme first
        const savedTheme = await AsyncStorage.getItem("app-theme");
        if (savedTheme) {
          setColorScheme(savedTheme as any);
        }

        // Check Auth Session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
      } catch (e) {
        console.error("Initialization error", e);
      } finally {
        setInitialized(true);
      }
    }

    initializeApp();

    // listening for Auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Handles redirects
  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      router.replace("/(auth)/login" as any);
    } else if (session && inAuthGroup) {
      router.replace("/(tabs)" as any);
    }
  }, [session, initialized, segments]);

  // Loading state (Shown while checking memory and Supabase)
  if (!initialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2d7cd0" />
      </View>
    );
  }

  return (
    /* 8. The Root View */
    <View className="flex-1 bg-white dark:bg-gray-900">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </View>
  );
}
