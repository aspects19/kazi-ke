
// app/(tabs)/apply.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useUser } from '@/context/user';
import { useLocalSearchParams, router } from 'expo-router';
import { Upload, ArrowLeft } from 'lucide-react-native';
import Button from '@/components/Button';

const ApplyNowScreen: React.FC = () => {
  const params = useLocalSearchParams();
  const { title, company, location, salary, type } = params;
  const { user } = useUser();
  
  const [formData, setFormData] = useState({
    coverLetter: '',
    resume: '',
    portfolio: '',
    expectedSalary: '',
    availability: '',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = () => {
    Alert.alert('File Upload', 'File upload functionality to be implemented');
  };

  const validateForm = () => {
    if (!formData.coverLetter.trim()) {
      Alert.alert('Error', 'Please write a cover letter');
      return false;
    }
    if (!formData.resume.trim() && !resumeFile) {
      Alert.alert('Error', 'Please provide your resume');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Success!',
        'Your application has been submitted successfully.',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      {/* Header */}
      <View className="bg-slate-500 dark:bg-gray-700 p-6 pt-12 pb-[140px]">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="flex-row items-center mb-4"
        >
          <ArrowLeft size={30} color="white" />
          <Text className="text-white ml-2 text-2xl font-medium">Back</Text>
        </TouchableOpacity>
        
        <Text className="text-2xl font-bold text-white mb-2">
          Apply for {title || 'Job'}
        </Text>
        <Text className="text-blue-100 text-base">
          {company || 'Company'} • {location || 'Location'}
        </Text>
        <View className="flex-row mt-2">
          <Text className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full mr-2">
            {type || 'Full-time'}
          </Text>
          <Text className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            {salary || '$50k-$80k'}
          </Text>
        </View>
      </View>

      {/* Form Content */}
      <View className="p-6 space-y-6">
        {/* User Info Section */}
        <View className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <Text className="text-lg font-semibold mb-3 dark:text-white">Your Information</Text>
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600 dark:text-gray-300">Name</Text>
              <Text className="font-medium dark:text-white">{user?.name || 'Not provided'}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600 dark:text-gray-300">Email</Text>
              <Text className="font-medium dark:text-white">{user?.email || 'Not provided'}</Text>
            </View>
          </View>
        </View>

        {/* Cover Letter */}
        <View>
          <Text className="text-lg font-semibold mb-3 dark:text-white">Cover Letter *</Text>
          <TextInput
            className="h-32 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Tell us why you're the perfect fit for this role..."
            placeholderTextColor="#9ca3af"
            value={formData.coverLetter}
            onChangeText={(text) => handleInputChange('coverLetter', text)}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Resume Upload */}
        <View>
          <Text className="text-lg font-semibold mb-3 dark:text-white">Resume *</Text>
          <TouchableOpacity
            onPress={handleFileUpload}
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 items-center"
          >
            <Upload size={24} color="#9ca3af" />
            <Text className="text-gray-600 dark:text-gray-300 mt-2 font-medium">
              Upload Resume (PDF, DOC, DOCX)
            </Text>
            <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Max 5MB
            </Text>
          </TouchableOpacity>
        </View>

        {/* Portfolio */}
        <View>
          <Text className="text-lg font-semibold mb-3 dark:text-white">Portfolio URL (Optional)</Text>
          <TextInput
            className="h-11 border border-gray-300 dark:border-gray-600 rounded-lg px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="https://your-portfolio.com"
            placeholderTextColor="#9ca3af"
            value={formData.portfolio}
            onChangeText={(text) => handleInputChange('portfolio', text)}
            keyboardType="url"
          />
        </View>

        {/* Expected Salary */}
        <View>
          <Text className="text-lg font-semibold mb-3 dark:text-white">Expected Salary (Optional)</Text>
          <TextInput
            className="h-11 border border-gray-300 dark:border-gray-600 rounded-lg px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="$50,000 - $80,000"
            placeholderTextColor="#9ca3af"
            value={formData.expectedSalary}
            onChangeText={(text) => handleInputChange('expectedSalary', text)}
          />
        </View>

        {/* Availability */}
        <View>
          <Text className="text-lg font-semibold mb-3 dark:text-white">Availability (Optional)</Text>
          <TextInput
            className="h-11 border border-gray-300 dark:border-gray-600 rounded-lg px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="e.g., 2 weeks notice, Immediately available"
            placeholderTextColor="#9ca3af"
            value={formData.availability}
            onChangeText={(text) => handleInputChange('availability', text)}
          />
        </View>

        {/* Additional Notes */}
        <View>
          <Text className="text-lg font-semibold mb-3 dark:text-white">Additional Notes (Optional)</Text>
          <TextInput
            className="h-20 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Any additional information you'd like to share..."
            placeholderTextColor="#9ca3af"
            value={formData.additionalNotes}
            onChangeText={(text) => handleInputChange('additionalNotes', text)}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Submit Button */}
        <Button
          title={isSubmitting ? "Submitting..." : "Submit Application"}
          handlePress={handleSubmit}
          containerStyles="mt-6 w-full"
        />
        
        {isSubmitting && (
          <View className="items-center mt-4">
            <ActivityIndicator size="small" color="#3b82f6" />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ApplyNowScreen;