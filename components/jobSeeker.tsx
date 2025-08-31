// components/jobSeeker.tsx
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { JobCard } from './jobCard';
import { Search, Filter } from 'lucide-react-native';
import { AppwriteException } from 'react-native-appwrite';
import { config, getCollection } from '@/lib/appwrite';
import type { VerboseJobDocument } from '@/types/docuType';
import { formatPostedAt } from '@/utils/formatPostAt';

export const JobSeekerView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [recommendedJobs, setRecommendedJobs] = useState<VerboseJobDocument[]>([]);

 async function fetchRecommendedJobs() {
   try {
    setLoading(true);
    const response = await getCollection(config.jobsCollectionId);
    setRecommendedJobs(
      (response as any[]).map((doc) => ({
        ...doc,
        title: doc.title ?? "",
        posted_at: doc.posted_at ?? "",
        applicants: doc.applicants ?? 0,
        status: doc.status ?? "Active",
        $id: doc.$id,
      }))
    );
   } catch (err) {
     if (err instanceof AppwriteException) {
       Alert.alert(err.message);
     } else console.log(err);
   }
 }

  useEffect(() => {
    fetchRecommendedJobs()
  }, [])
  
  {loading && <></>}

  return (
    <ScrollView className="space-y-4">
      <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#15161eff',
            borderWidth: 1,
            borderColor: '#D1D5DB',
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginTop: 16,
          }}
        >
          <Search size={18} color="#0e4fc0ff" style={{ marginRight: 8 }} />
          
          <TextInput
            placeholder="Search jobs"
            placeholderTextColor="#9CA3AF"
            style={{
              flex: 1,
              color: '#fff',
            }}
          />

          <TouchableOpacity
            style={{
              backgroundColor: '#F3F4F6',
              padding: 6,
              borderRadius: 6,
              marginLeft: 8,
            }}
          >
            <Filter size={18} color="#4B5563" />
          </TouchableOpacity>
        </View>



      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold dark:text-white ">
          Recommended Jobs
        </Text>
        <TouchableOpacity>
          <Text className="text-blue-600 dark:text-blue-400 text-sm font-medium ">
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <View className="space-y-3">
        {recommendedJobs.map((job, idx) => (
          <JobCard
            key={job.$id}
            job={{
              id: idx + 1,
              title: job.title || '',
              company: job.company || 'Unknown Company',
              location: job.location || 'Unknown Location',
              salary: job.salary || 'N/A',
              type: job.type || 'N/A',
              posted: formatPostedAt(job.posted_at) || '',
              logo: job.logo || 'https://via.placeholder.com/50'
            }}
          />
        ))}
      </View>

      <View className="mt-6">
        <Text className="text-lg font-semibold mb-3 dark:text-white ">
          Your Applications
        </Text>
        <View className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 ">
          <Text className="text-center text-gray-500 dark:text-gray-400 py-4 ">
            You haven't applied to any jobs yet.
          </Text>
          <TouchableOpacity className="w-full py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg">
            <Text className="w-full py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium ">
              Browse More Jobs
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
