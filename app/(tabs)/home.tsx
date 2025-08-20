import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabNavigation } from '@/components/tabNavigator';
import { EmployeeView } from '@/components/employeeView';
import { useUser } from '@/context/user';
import { EmployerView } from '@/components/employerView';


export default function Home() {
  const [activeTab, setActiveTab] = useState<'employee' | 'employer'>('employee');

  return (
    <SafeAreaView className='bg-gray-100 dark:bg-gray-900 p-4 shadow-black/5 flex-1'>
      <View className='bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-gray-800 flex justify-between items-center'>
        <Text className='text-3xl font-bold text-center text-blue-600 dark:text-blue-400 '>
          KaziKE
        </Text>
      </View>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <View style={{ flex: 1, padding: 16 }}>
        {activeTab === 'employer' ? <EmployerView /> : <EmployeeView />}
        {/* <TouchableOpacity
          style={{ marginTop: 20, backgroundColor: '#2563eb', padding: 10, borderRadius: 8 }}
          onPress={() => { logout(); router.navigate('/'); }}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>Log Out</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}
