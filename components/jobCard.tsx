import React from 'react';
import { BookmarkIcon } from 'lucide-react-native';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';

interface JobCardProps {
  job: {
    id: number
    title: string
    company: string
    location: string
    salary: string
    type: string
    posted: string
    logo: string
  }
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <View className='bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm dark:shadow-gray-900'>
      <View  className=' flex justify-between flex-row'>
        <View className='flex-row items-center'>
          <Image
            source={{ uri: job.logo }}
            className='w-12 h-12 rounded-lg p-4 m-1 border border-gray-200 dark:border-gray-700'
          />
          <View className="ml-3">
            <Text className="font-medium dark:text-white ">
              {job.title}
            </Text>
            <Text  className="text-sm text-gray-600 dark:text-gray-300">
              {job.company}
            </Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              {job.location}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <BookmarkIcon size={18} color="#9ca3af" />
        </TouchableOpacity>
      </View>
      <View className="mt-3 flex flex-row flex-wrap gap-2">
        <Text className="bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
          {job.type}
          </Text>
        <Text className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
          {job.salary}
        </Text>
        <Text className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full ">
          {job.posted}
        </Text>
      </View>
      <View className="mt-3 flex  flex-row justify-between">
        <Link className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 py-1.5 px-4 rounded-lg "
          href={{
            pathname: '/apply',
            params: {
              title: job?.title || 'Ux Designer',
              company: job.company || 'New job',
              location: job.location || 'Nairobi'
          }
          }}>
          <Text className='text-white text-sm font-medium'>
            Apply Now
          </Text>
        </Link>
      </View>
    </View>
  );
};

