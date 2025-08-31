// app/(tabs)/jobseeker.tsx
import React from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { JobSeekerView } from "@/components/jobSeeker";

export default function JobSeekerScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <JobSeekerView />
      </ScrollView>
    </SafeAreaView>
  );
}

