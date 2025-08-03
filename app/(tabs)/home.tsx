import { useUser } from '@/context/user';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


 function Welcome() {

  const {user} = useUser();

  return (
   <SafeAreaView className=' bg-background h-full'>
    <Text>Home</Text>
    {user && <Text>{user.name} Is logged in</Text>}
   </SafeAreaView>
  );
}


export default Welcome;