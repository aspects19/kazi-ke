import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import FormField from '@/components/formField';
import Button from '@/components/Button';
import { Link, Redirect, router } from 'expo-router';
import { useUser } from '@/context/user';
import { AppwriteException } from 'react-native-appwrite';
import { account } from '@/lib/appwrite';


export default function Login() {
  //Fix use user called outside component error
  const { login, user } = useUser();

const [form, setForm] = useState({
   email: '',
   password: '',
   username: ''
});


  async function handleLogin() {
    try {
      await login(form.email, form.password);
      router.replace('/');
    } catch (err) {
      if (err instanceof AppwriteException) {
        // Alert.alert(err.name, err.message)
        console.log(err.message)
      }
    }
  }

  if (user) {
    return <Redirect href={'/home'}/>
  }

  return (
    <View  className='bg-[#0b0b1d] h-full flex items-center justify-center text-white'>

      <View>

        <FormField
          title="email"
          value={form.email}
          handleChangeText={(e: any) => setForm({ ...form, email: e })}
          additionalStyles=" mt-7 w-80"
          placeholder={"Email"}  
          keyboardType= 'email-address'     
        />

        <FormField
          title="password"
          value={form.password}
          handleChangeText={(e: any) => setForm({ ...form, password: e })}
          additionalStyles=" mt-7"
          keyBoardType="password" placeholder={"Password"}    
        />
        
        <Button 
          title="Log in"
          handlePress={handleLogin}
          containerStyles=""
          textStyles=""
        />
        <View className='flex flex-row'>
          <Text className='text-white'>
            Don't have an account
           
          </Text>
           <Link className='text-primary ml-3' href={'/(auth)/signup'}>
            Sign up
          </Link>
        </View>

      </View>
    </View>

  )
}
