
// components/postJob.tsx
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

const PostJobModal = ({ visible, onClose, onJobPosted }: PostJobModalProps) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    employmentType: "full-time",
    company: "",
    location: "",
    rates: "",
  });

  const { user } = useUser();

  const handlePost = async () => {
  if (!form.title.trim() || !form.location.trim()) {
    Alert.alert("Error", "Title and Description are required");
    return;
  }

  try {
    await postJob(
      form.title,
      form.location, 
      form.description || "",
      form.employmentType || "",
      user ? user?.$id : "",
    
      form.company || "",
      form.rates || ""
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
    <SafeAreaView className="content-center items-center my-auto">
      <Modal
        animationType="fade"
        transparent={false}
        visible={visible}
        onRequestClose={onClose}
      >
        <View className="flex-1 justify-center items-center dark:bg-gray-900 bg-gray-900">
          <View className="items-center content-center m-auto w-[80%] dark:bg-gray-800 rounded-3xl bg-gray-900 border border-solid border-gray-600">
            <Text className="dark:text-gray-300 mt-6 text-xl">Post a Job</Text>

            <FormField
              title="Title"
              value={form.title}
              handleChangeText={(e: any) => setForm({ ...form, title: e })}
              additionalStyles="mt-4 w-80"
              placeholder="Job Title*"
            />
            <FormField
              title="Location"
              value={form.location}
              handleChangeText={(e: any) => setForm({ ...form, location: e })}
              additionalStyles="mt-4 w-80"
              placeholder="Job Location*"
            />
            <FormField
              title="Description"
              value={form.description}
              handleChangeText={(e: any) => setForm({ ...form, description: e })}
              additionalStyles="mt-4 w-80"
              placeholder="Job Description"
            />

            <FormField
              title="Company"
              value={form.company}
              handleChangeText={(e: any) => setForm({ ...form, company: e })}
              additionalStyles="mt-4 w-80"
              placeholder="Company Name"
            />

            

            <FormField
              title="Rates"
              value={form.rates}
              handleChangeText={(e: any) => setForm({ ...form, rates: e })}
              additionalStyles="mt-4 w-80"
              placeholder="Salary or Hourly Rate"
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
                    label="Full-time"
                    value={"full-time"}
                  />
                  <Picker.Item
                    style={{ backgroundColor: "#0f172a", color: "#fff" }}
                    label="Part-time"
                    value={"part-time"}
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
