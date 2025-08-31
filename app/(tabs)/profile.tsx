
// app/(tabs)/profile.tsx
import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { useUser } from "@/context/user";
import Button from "@/components/Button";
import { router } from "expo-router";
import { Camera, Edit2 } from "lucide-react-native";

const ProfileScreen: React.FC = () => {
  const { user, setUser } = useUser();

  const [editableUser, setEditableUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // Track whether we are in edit mode
  const [isEditing, setIsEditing] = useState(false);

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
    setIsEditing(false); // Exit edit mode
  };

  const handleLogout = () => {
    setUser(null);
    router.replace("/login");
  };

  const handleChangePhoto = () => {
    Alert.alert("Change Photo", "Photo upload functionality to be implemented.");
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900 p-6">
      {/* Profile Header */}
      <View className="items-center mb-6">
        <TouchableOpacity onPress={handleChangePhoto}>
          <View className="relative">
            <Image
              source={{ uri: user?.avatar || "https://i.pravatar.cc/150" }}
              className="w-24 h-24 rounded-full bg-gray-300"
            />
            <Camera className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1" size={20} color="#fff"/>
          </View>
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 dark:text-white mt-2">{editableUser.name}</Text>
        <Text className="text-gray-600 dark:text-gray-300">{editableUser.email}</Text>
      </View>

      {/* Editable Fields or View Mode */}
      <View className="space-y-4 mb-6">
        {isEditing ? (
          <>
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
              editable={false}
            />

            <Text className="text-gray-700 dark:text-gray-300">Phone</Text>
            <TextInput
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={editableUser.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
            />

            <Button title="Save Changes" handlePress={handleSave} containerStyles="mb-6 w-full" />
          </>
        ) : (
          <>
            <View className="flex-row justify-between">
              <Text className="text-gray-700 dark:text-gray-300 font-semibold">Name:</Text>
              <Text className="text-gray-900 dark:text-white">{editableUser.name}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-700 dark:text-gray-300 font-semibold">Email:</Text>
              <Text className="text-gray-900 dark:text-white">{editableUser.email}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-700 dark:text-gray-300 font-semibold">Phone:</Text>
              <Text className="text-gray-900 dark:text-white">{editableUser.phone || "Not provided"}</Text>
            </View>

            <Button
              title="Edit"
              handlePress={() => setIsEditing(true)}
              containerStyles="mb-6 w-full bg-blue-500"
            />
          </>
        )}
      </View>

      {/* Logout Button */}
      <Button title="Logout" handlePress={handleLogout} containerStyles="w-full bg-red-500 mb-6" />

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
