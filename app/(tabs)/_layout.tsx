

// app/(tabs)/_layout.tsx
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Platform, View } from "react-native";
import { StatusBar } from "react-native";

export default function TabsLayout() {
  StatusBar.setHidden(true);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#2563EB", // tailwind blue-600
          tabBarInactiveTintColor: "#6B7280", // gray-500
          tabBarStyle: {
            position: "absolute",
            bottom: 5,
            left: 16,
            right: 16,
            height: 70,
            paddingBottom: 5,
            backgroundColor: "black",
            borderRadius: 25,
            elevation: 5,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 10,
          },
        }}
      >
        <Tabs.Screen
          name="jobseeker"
          options={{
            title: "Find Jobs",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="search" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="employer"
          options={{
            title: "Hire",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="briefcase" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen name="apply" options={{ href: null }} />
      </Tabs>
    </SafeAreaView>
  );
}
