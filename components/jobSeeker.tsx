import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { JobCard } from './jobCard'
import { Search, Filter } from 'lucide-react-native'

export const JobSeekerView: React.FC = () => {
  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      salary: '$90,000 - $120,000',
      type: 'Full-time',
      posted: '2 days ago',
      logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'Creative Minds',
      location: 'Remote',
      salary: '$85,000 - $110,000',
      type: 'Full-time',
      posted: '1 day ago',
      logo: 'https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
    },
    {
      id: 3,
      title: 'Mobile Developer',
      company: 'App Innovators',
      location: 'Austin, TX',
      salary: '$95,000 - $130,000',
      type: 'Contract',
      posted: '3 days ago',
      logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
    },
  ]

  return (
    <ScrollView className="space-y-4">
      <View className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />
        <TextInput
          placeholder="Search jobs, skills, companies"
          placeholderTextColor="#9CA3AF"
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
        />
        <TouchableOpacity className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 dark:bg-gray-700 p-1 rounded transition-colors duration-200">
          <Filter size={18} className="text-gray-600 dark:text-gray-300" />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold dark:text-white transition-colors duration-200">
          Recommended Jobs
        </Text>
        <TouchableOpacity>
          <Text className="text-blue-600 dark:text-blue-400 text-sm font-medium transition-colors duration-200">
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <View className="space-y-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </View>

      <View className="mt-6">
        <Text className="text-lg font-semibold mb-3 dark:text-white transition-colors duration-200">
          Your Applications
        </Text>
        <View className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <Text className="text-center text-gray-500 dark:text-gray-400 py-4 transition-colors duration-200">
            You haven't applied to any jobs yet.
          </Text>
          <TouchableOpacity className="w-full py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg">
            <Text className="w-full py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200">
              Browse More Jobs
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
