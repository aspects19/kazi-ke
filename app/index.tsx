//app/index.tsx
import 'react-native-url-polyfill/auto'
import React, {useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, router } from 'expo-router'
import { useUser } from '@/context/user'

const index = () => {
  const {user} = useUser()

 useEffect(() => {
    if (user) {
      router.replace('/(tabs)/jobseeker');
    }
  }, [user]);

  return (
     <SafeAreaView className="bg-background h-full flex text-white">
      {!user && <Redirect href={'/login'} />}
    </SafeAreaView>
   
  );
}

export default index