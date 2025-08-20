import React from 'react';
import { BookmarkIcon } from 'lucide-react-native';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

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
            <Text className="font-medium dark:text-white transition-colors duration-200">
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
        <TouchableOpacity className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 py-1.5 px-4 rounded-lg ">
          <Text className='text-white text-sm font-medium'>
            Apply Now
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm py-1.5 px-4 rounded-lg">
          <Text className='text-gray-700 dark:text-gray-300 text-sm'>
            Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logoTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    resizeMode: 'cover',
  },
  titleBlock: {
    marginLeft: 12,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 2,
  },
  company: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 1,
  },
  location: {
    fontSize: 12,
    color: '#6b7280',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  typeTag: {
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginRight: 8,
  },
  salaryTag: {
    backgroundColor: '#f9fafb',
    color: '#374151',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginRight: 8,
  },
  postedTag: {
    backgroundColor: '#f9fafb',
    color: '#374151',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  applyBtn: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  applyBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  detailsBtn: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  detailsBtnText: {
    color: '#374151',
    fontSize: 14,
  },
});
