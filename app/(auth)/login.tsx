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

        if (signUpError) {
          setError(signUpError.message);
        } else if (!data.session) {
          // only shows if'Confirm Email' ON
          setError("Check your inbox to verify your email.");
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message);
        }
      }
    } catch (e) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 px-12 justify-center"
      >
        <View className="mb-10">
          <Text className="text-5xl font-black text-gray-900 tracking-tighter">
            Autohub
          </Text>
          <Text className="text-gray-500 text-lg mt-2 font-medium leading-6">
            {isSignUp ? "Create your account" : "Welcome back"}
          </Text>
        </View>

        
        {error && (
          <View className="bg-red-50 p-4 rounded-xl border border-red-100 mb-6 flex-row items-center">
            <Ionicons name="alert-circle" size={20} color="#ef4444" />
            <Text className="text-red-600 ml-3 font-semibold flex-1">
              {error}
            </Text>
          </View>
        )}

        <View className="gap-y-4">
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError(null);
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
            className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-lg"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError(null);
            }}
            secureTextEntry
            autoCapitalize="none"
            editable={!loading}
            className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-lg"
          />
        </View>

        <View className="mt-8 gap-y-4">
          <Pressable
            onPress={handleAuth}
            disabled={loading}
            className="bg-blue-600 p-4 rounded-xl items-center active:bg-blue-700 shadow-sm"
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
            <Text className="text-gray-500">
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <Text className="text-blue-600 font-bold">
                {isSignUp ? "Sign In" : "Sign Up"}
              </Text>
            </Text>
          </Pressable>
        </View>

        <View className="mt-12">
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-4 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
              Or
            </Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          <Pressable
            disabled={loading}
            className="flex-row items-center border border-gray-200 p-4 rounded-xl w-full justify-center active:bg-gray-50"
          >
            <Ionicons name="logo-google" size={20} color="#EA4335" />
            <Text className="ml-3 font-bold text-gray-700">
              Continue with Google
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
