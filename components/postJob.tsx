
// components/postJob.tsx
import { useState } from "react";
import { Alert, Modal, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import FormField from "./formField";
import Button from "./Button";
import { postJob } from "@/lib/appwrite";
import { AppwriteException } from "react-native-appwrite";
import { useUser } from "@/context/user";

type PostJobModalProps = {
  visible: boolean;
  onClose: () => void;
  onJobPosted?: () => void; // Optional callback to refresh job list
};

const PostJobModal = ({ visible, onClose }: PostJobModalProps) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    employmentType: "full-time",
  });

  const { user } = useUser();

  const handlePost = async () => {
    try {
      await postJob(
        form.title,
        form.description,
        form.employmentType,
        user ? user?.$id : "" // Could introduce bugs if not handled better
      );
      Alert.alert("Success", "Job posted successfully!");
      if (onJobPosted) onJobPosted();
    } catch (err) {
      if (err instanceof AppwriteException) {
        Alert.alert(err.message);
      } else console.log(err);
    } finally {
      onClose(); // Close modal after posting
    }
  };

  return (
    <SafeAreaView className="content-center items-center my-auto ">
      <Modal
        animationType="fade"
        transparent={false}
        visible={visible}
        onRequestClose={onClose}
      >
        <View className="flex-1 justify-center items-center dark:bg-gray-900 bg-gray-900">
        <View className="items-center content-center m-auto w-[80%] dark:bg-gray-800 rounded-3xl bg-gray-900 border border-solid border-gray-600">
          <Text className="dark:text-gray-300 mt-6 text-xl">Post a job</Text>

          <FormField
            title="Title"
            value={form.title}
            handleChangeText={(e: any) => setForm({ ...form, title: e })}
            additionalStyles=" mt-7 w-80"
            placeholder={"Title"}
          />

          <FormField
            title="Description"
            value={form.description}
            handleChangeText={(e: any) => setForm({ ...form, description: e })}
            additionalStyles=" mt-7 w-80"
            placeholder={"Description"}
          />

          <View className="mx-10 my-3 w-[80%] bg-white dark:bg-slate-900 border-solid rounded-4xl">
            <View className="rounded-2xl">
              <Picker
                style={{ backgroundColor: "#0f172a" }}
                dropdownIconColor="#fff"
                mode="dropdown"
                selectedValue={form.employmentType}
                onValueChange={(item) =>
                  setForm({ ...form, employmentType: item })
                }
              >
                <Picker.Item
                  style={{ backgroundColor: "#0f172a", color: "#fff" }}
                  label="full-time"
                  value={"full-time"}
                />
                <Picker.Item
                  style={{ backgroundColor: "#0f172a", color: "#fff" }}
                  label="part-time"
                  value={"part-time"}
                />
                <Picker.Item
                  style={{ backgroundColor: "#0f172a", color: "#fff" }}
                  label="remote"
                  value={"remote"}
                />
              </Picker>
            </View>
          </View>

          <View className="flex flex-row w-full justify-around mb-6">
            <Button
              containerStyles="w-[40%]"
              title="Post"
              handlePress={handlePost}
            />
            <Button
              containerStyles="w-[40%]"
              title="Cancel"
              handlePress={onClose}
            />
          </View>
        </View>
      </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PostJobModal;
