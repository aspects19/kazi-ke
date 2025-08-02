import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect } from 'expo-router'

const index = () => {
  return (
    <SafeAreaView className='bg-background h-full flex text-white'>
      <Redirect href={'/(auth)/login'}/>
    </SafeAreaView>
  )
}

export default index