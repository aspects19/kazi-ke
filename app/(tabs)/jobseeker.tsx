// app/(tabs)/jobseeker.tsx
import React from "react";
import { View } from "react-native";
import { JobSeekerView } from "@/components/jobSeeker"; // adjust path to your file
export default function JobSeekerScreen() {
  return <View className="flex-1 bg-black">
           <JobSeekerView />
        </View>

}
