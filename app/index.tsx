import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, router } from 'expo-router'
import { useUser } from '@/context/user'

const index = () => {
  const {user} = useUser();

  if (user) router.replace('/home')

  return (
    <SafeAreaView className='bg-background h-full flex text-white'>
      <Redirect href={'/login'}/>
    </SafeAreaView>
  )
}

export default index