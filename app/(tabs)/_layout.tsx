// import React from 'react';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Link, Stack, Tabs } from 'expo-router';
// import { Pressable } from 'react-native';

// import Colors from '@/constants/Colors';

// // You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

// export default function TabLayout() {

//   return (
//     <Stack >
//       <Stack.Screen name="home" options={{ headerShown: false }} />
//       <Stack.Screen name="apply" options={{ headerShown: false }} />
//       <Stack.Screen name="profile" options={{ headerShown: false }} />
//     </Stack>
//   );
// }

// app/(tabs)/_layout.tsx
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Platform } from "react-native";
import { StatusBar } from "react-native";

export default function TabsLayout() {
  StatusBar.setHidden(true);
  return (
  <>
    
    <Tabs
      screenOptions={{

        headerShown: false,
        
        tabBarActiveTintColor: "#2563EB", // tailwind blue-600
        tabBarInactiveTintColor: "#6B7280", // gray-500
        // tabBarStyle: {
        //   height: Platform.OS === "ios" ? 80 : 60,
        //   paddingBottom: Platform.OS === "ios" ? 20 : 8,
        //   backgroundColor: "black",
        // },
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          height: 80,
          paddingBottom: 10,
          backgroundColor: "black",
          borderRadius: 30, // rounded corners
          elevation: 5, // Android shadow
          shadowColor: "#000", // iOS shadow
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
      {/* <Tabs.Screen name="home" options={{ href: null }} /> */}
      <Tabs.Screen name="apply" options={{ href: null }} />


    </Tabs>
  </>
  );
}



