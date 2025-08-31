
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { useUser } from '@/context/user';
import { useLocalSearchParams, router } from 'expo-router';
import Button from '@/components/Button';
import { ArrowLeft } from 'lucide-react-native';

const ApplyNowScreen: React.FC = () => {
  const params = useLocalSearchParams();
  const { title, company, location, type, description} = params;
  const { user } = useUser();

  const [formData, setFormData] = useState({
    experience: '',
    expectedRate: '',
    availability: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.experience.trim()) {
      Alert.alert('Error', 'Please enter your experience or skills.');
      return false;
    }
    if (!formData.expectedRate.trim()) {
      Alert.alert('Error', 'Please enter your expected rate.');
      return false;
    }
    if (!formData.availability.trim()) {
      Alert.alert('Error', 'Please specify your availability.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert('Success!', 'Your application has been submitted successfully.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 120 }} 
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity 
          onPress={() => router.back()}
          className="flex-row items-center mb-4 mt-4"
        >
          <ArrowLeft size={24} color="#ebe8e8ff" />
          <Text className="ml-2 text-lg font-medium dark:text-white">Back</Text>
        </TouchableOpacity>

        {/* Job Header */}
        <View className="bg-green-500 dark:bg-green-700 p-6 rounded-lg mb-6">
          <Text className="text-2xl font-bold text-white">{title || 'Job'}</Text>
          <Text className="text-blue-100 text-base">{company || 'Company'} • {location || 'Location'}</Text>
          <Text className="bg-green-700 text-white text-xs px-2 py-1 rounded-full mt-2 w-fit">{type || 'Casual'}</Text>
        </View>

        <View className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
          <Text className="text-lg font-semibold dark:text-white">Description</Text>
          <Text className='text-white text-sm px-2 pb-1 rounded-full mt-2 w-fit'>
            {description}
          </Text>
        </View>

        {/* Applicant Info */}
        <View className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
          <Text className="text-lg font-semibold mb-3 dark:text-white">Your Information</Text>
          <Text className="text-gray-600 dark:text-gray-300">Name: <Text className="font-medium dark:text-white">{user?.name || 'Not provided'}</Text></Text>
          <Text className="text-gray-600 dark:text-gray-300 mt-1">Email: <Text className="font-medium dark:text-white">{user?.email || 'Not provided'}</Text></Text>
          <Text className="text-gray-600 dark:text-gray-300 mt-1">Phone: <Text className="font-medium dark:text-white">{user?.phone || 'Not provided'}</Text></Text>
        </View>

        {/* Experience / Skills */}
        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2 dark:text-white">Experience / Skills *</Text>
          <TextInput
            className="h-20 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Briefly describe your experience..."
            placeholderTextColor="#9ca3af"
            value={formData.experience}
            onChangeText={(text) => handleInputChange('experience', text)}
            multiline
          />
        </View>

        {/* Expected Rate */}
        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2 dark:text-white">Expected Rate (per day/hour) *</Text>
          <TextInput
            className="h-11 border border-gray-300 dark:border-gray-600 rounded-lg px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="$20/day"
            placeholderTextColor="#9ca3af"
            value={formData.expectedRate}
            onChangeText={(text) => handleInputChange('expectedRate', text)}
          />
        </View>

        {/* Availability */}
        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2 dark:text-white">Availability *</Text>
          <TextInput
            className="h-11 border border-gray-300 dark:border-gray-600 rounded-lg px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="e.g., immediately, 1-week notice"
            placeholderTextColor="#9ca3af"
            value={formData.availability}
            onChangeText={(text) => handleInputChange('availability', text)}
          />
        </View>

        {/* Additional Notes */}
        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2 dark:text-white">Additional Notes (Optional)</Text>
          <TextInput
            className="h-20 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Any other info..."
            placeholderTextColor="#9ca3af"
            value={formData.notes}
            onChangeText={(text) => handleInputChange('notes', text)}
            multiline
          />
        </View>

        {/* Submit */}
        <Button
          title={isSubmitting ? "Submitting..." : "Submit Application"}
          handlePress={handleSubmit}
          containerStyles="mt-4 w-full"
        />
        {isSubmitting && (
          <ActivityIndicator size="small" color="#10b981" className="mt-4" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplyNowScreen;
