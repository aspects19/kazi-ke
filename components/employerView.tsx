import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, Pressable, StyleSheet } from 'react-native'
import { Plus, Bell, Menu } from 'lucide-react-native'
import { Avatar } from './avatar'
import { useUser, } from '@/context/user'
import PostJobModal from './postJob'
import { config, getCollection } from '@/lib/appwrite'
import { AppwriteException, Models } from 'react-native-appwrite'
import type {JobDocument} from '@/types/docuType'

export const EmployerView: React.FC = () => {
  const [postedJobs, setpostedJobs] = useState< JobDocument[]>([]);
 
  const {user} = useUser();


async function fetchPostedJobs() {
try {
    const response = await getCollection(config.jobsCollectionId)
    console.log(response)
    setpostedJobs(
      (response as any[]).map((doc) => ({
        ...doc,
        title: doc.title ?? '',
        posted_at: doc.posted_at ?? '',
        applicants: doc.applicants ?? 0,
        status: doc.status ?? 'Active',
        $id: doc.$id,
      }))
    )
} catch (err) {
  if (err instanceof AppwriteException) {
    Alert.alert(err.message)
  } else console.log(err);
  
  
}
}

const  formatPostedAt = (dateString: string) => {
  const postedDate = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - postedDate.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day ago'
  return `${diffDays} days ago`
}

  useEffect(() => {
    fetchPostedJobs()
  }, [])

  const applications = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Frontend Developer',
      experience: '5 years',
      status: 'New',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'UX Designer',
      experience: '3 years',
      status: 'Reviewed',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
    },
    {
      id: 3,
      name: 'Alex Rodriguez',
      role: 'Mobile Developer',
      experience: '4 years',
      status: 'Interviewed',
      avatar:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
    },
  ]

  // const postedJobs = [
  //   {
  //     id: 1,
  //     title: 'Senior Frontend Developer',
  //     applicants: 12,
  //     posted: '5 days ago',
  //     status: 'Active',
  //   },
  //   {
  //     id: 2,
  //     title: 'UX/UI Designer',
  //     applicants: 8,
  //     posted: '3 days ago',
  //     status: 'Active',
  //   },
  // ]

  return (
    <ScrollView className="space-y-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold dark:text-white ">
          Dashboard
        </Text>
        <View className="flex-row space-x-2">
          <TouchableOpacity className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full ">
            <Bell size={18} className="text-gray-600 dark:text-gray-300" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
            <Menu size={18} className="text-gray-600 dark:text-gray-300" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Job Posts */}
      <View className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <View className="flex-row justify-between items-center">
          <Text className="font-semibold dark:text-white">Your Job Posts</Text>
          <TouchableOpacity className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium ">
            <Plus size={16} className="mr-1 text-blue-600 dark:text-blue-400" />
            <Text className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              Post a Job
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-3 space-y-3">
          {postedJobs.map((job) => (
            <View
              key={job.$id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 "
            >
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="font-medium dark:text-white ">
                    {job.title}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400 ">
                    {job.applicants} applicants • {formatPostedAt(job.posted_at)}
                  </Text>
                </View>
                <Text className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full ">
                  {job.status}
                </Text>
              </View>

              <View className="mt-3 flex-row justify-between">
                <TouchableOpacity>
                  <Text className="text-sm text-blue-600 dark:text-blue-400 font-medium ">
                    View Details
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text className="text-sm text-gray-600 dark:text-gray-400  ">
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Applications */}
      <View className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <Text className="font-semibold mb-3 dark:text-white">
          Recent Applications
        </Text>
        <View className="space-y-3">
          {applications.map((applicant) => (
            <View
              key={applicant.id}
              className="flex-row items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <View className="flex-row items-center">
                <Avatar src={applicant.avatar} alt={applicant.name} />
                <View className="ml-3">
                  <Text className="font-medium dark:text-white">
                    {applicant.name}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    {applicant.role} • {applicant.experience}
                  </Text>
                </View>
              </View>
              <Text
                className={`text-xs px-2 py-1 rounded-full ${
                  applicant.status === 'New'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300'
                    : applicant.status === 'Reviewed'
                    ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'
                    : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                }`}
              >
                {applicant.status}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <PostJobModal/>
    </ScrollView>
  )

  
  
}

