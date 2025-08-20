import React from 'react'
import { BriefcaseIcon, UserIcon } from 'lucide-react-native'
import { View, Text, TouchableOpacity } from 'react-native'

interface TabNavigationProps {
  activeTab: 'employee' | 'employer'
  setActiveTab: (tab: 'employee' | 'employer') => void
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <View className="flex bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-row">
      <TouchableOpacity
        className={`flex items-center justify-center py-3 flex-1 ${activeTab === 'employee' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}
        onPress={() => setActiveTab('employee')}
      >
        <UserIcon size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
        <Text className={` ${activeTab === 'employee' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-100'}`}>
          Find Jobs
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`flex items-center justify-center py-3 flex-1 ${activeTab === 'employer' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}
        onPress={() => setActiveTab('employer')}
      >
        <BriefcaseIcon size={18} className="mr-2" />
        <Text className={` ${activeTab === 'employer' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
          Hire Talent
        </Text>
      </TouchableOpacity>
    </View>
  )
}
