
// app/(tabs)/employer.tsx
import React from "react";
import { ScrollView, SafeAreaView, View } from "react-native";
import { EmployerView } from "@/components/employerView";

export default function EmployerScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <EmployerView />
      </ScrollView>
    </SafeAreaView>
  );
}



