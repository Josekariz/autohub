import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { supabase } from "@/utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAuth() {
    setError(null);
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) setError(signUpError.message);
        else if (!data.session)
          setError("Check your inbox to verify your email.");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) setError(signInError.message);
      }
    } catch (e) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-main">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 px-12 justify-center"
      >
        <View className="mb-10">
          <Text className="text-5xl font-black text-primary tracking-tighter">
            Autohub
          </Text>

          <Text className="text-secondary text-lg mt-2 font-medium leading-6">
            {isSignUp ? "Create your account" : "Welcome back"}
          </Text>
        </View>

        {error && (
          <View className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/30 mb-6 flex-row items-center">
            <Ionicons name="alert-circle" size={20} color="#ef4444" />
            <Text className="text-red-600 dark:text-red-400 ml-3 font-semibold flex-1">
              {error}
            </Text>
          </View>
        )}

        <View className="gap-y-4">
          <TextInput
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError(null);
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
            className="bg-card p-4 rounded-xl border border-subtle text-primary text-lg"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError(null);
            }}
            secureTextEntry
            autoCapitalize="none"
            editable={!loading}
            className="bg-card p-4 rounded-xl border border-subtle text-primary text-lg"
          />
        </View>

        <View className="mt-8 gap-y-4">
          <Pressable
            onPress={handleAuth}
            disabled={loading}
            className="bg-accent p-4 rounded-xl items-center active:opacity-80 shadow-sm"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">
                {isSignUp ? "Create Account" : "Sign In"}
              </Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="items-center mt-2"
          >
            <Text className="text-secondary">
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <Text className="text-accent font-bold">
                {isSignUp ? "Sign In" : "Sign Up"}
              </Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
