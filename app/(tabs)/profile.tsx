
// app/(tabs)/profile.tsx
// app/(tabs)/profile.tsx
import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useUser } from "@/context/user";
import Button from "@/components/Button";
import { router } from "expo-router";

const ProfileScreen: React.FC = () => {
  const { user, setUser } = useUser();

  // State for editable fields
  const [editableUser, setEditableUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [editing, setEditing] = useState(false);

  // Dummy employer comments
  const [comments, setComments] = useState([
    { id: 1, employer: "ABC Corp", text: "Great cover letter!" },
    { id: 2, employer: "XYZ Ltd", text: "Please update your portfolio link." },
  ]);

  const handleInputChange = (field: string, value: string) => {
    setEditableUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setUser({ ...user, ...editableUser });
    Alert.alert("Success", "Profile updated successfully!");
    setEditing(false);
  };

  const handleLogout = () => {
    setUser(null);
    router.replace("/login");
  };

  // Helper to get initials from name
  const getInitials = (name: string) => {
    if (!name) return "?";
    const names = name.trim().split(" ");
    const initials = names.map(n => n[0].toUpperCase()).join("");
    return initials.slice(0, 2); // max 2 letters
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900 p-6">
      {/* Profile Header */}
      <View className="items-center mb-6">
        <View className="w-24 h-24 rounded-full bg-blue-500 items-center justify-center">
          <Text className="text-3xl font-bold text-white">
            {getInitials(editableUser.name)}
          </Text>
        </View>
        <Text className="text-xl font-bold text-gray-900 dark:text-white mt-2">{editableUser.name}</Text>
        <Text className="text-gray-600 dark:text-gray-300">{editableUser.email}</Text>
      </View>

      {/* Edit / Save Button */}
      {!editing ? (
        <Button title="Edit Profile" handlePress={() => setEditing(true)} containerStyles="mb-6 w-full" />
      ) : (
        <>
          {/* Editable Fields */}
          <View className="space-y-4 mb-6">
            <Text className="text-gray-700 dark:text-gray-300">Name</Text>
            <TextInput
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={editableUser.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />

            <Text className="text-gray-700 dark:text-gray-300">Email</Text>
            <TextInput
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={editableUser.email}
              editable={false} // Email not editable
            />

            <Text className="text-gray-700 dark:text-gray-300">Phone</Text>
            <TextInput
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={editableUser.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
            />
          </View>

          <Button title="Save Changes" handlePress={handleSave} containerStyles="mb-6 w-full" />
        </>
      )}

      <Button title="Logout" handlePress={handleLogout} containerStyles="w-full bg-red-500" />

      {/* Employer Comments */}
      <Text className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">Comments from Employers</Text>
      {comments.length === 0 ? (
        <Text className="text-gray-500 dark:text-gray-400">No comments yet.</Text>
      ) : (
        comments.map(comment => (
          <View key={comment.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-3">
            <Text className="font-semibold text-gray-800 dark:text-white">{comment.employer}</Text>
            <Text className="text-gray-700 dark:text-gray-300 mt-1">{comment.text}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default ProfileScreen;
