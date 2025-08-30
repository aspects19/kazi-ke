// app/(tabs)/employer.tsx
import React from "react";
import { EmployerView } from "@/components/employerView"; // adjust path to your file
import { View } from "react-native";
export default function EmployerScreen() {
  return <View className="flex-1 bg-black">
          <EmployerView />;
          </View>
}
