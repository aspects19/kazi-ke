import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import FormField from '@/components/formField';
import Button from '@/components/Button';
import { Link } from 'expo-router';

function SignUp() {
const [form, setForm] = useState({
  username: '',
  email: '',
  password: '',
   
})

  return (
    <View  className='bg-[#0b0b1d] h-full flex items-center justify-center text-white'>

      <View>

        <FormField
          title="Name"
          value={form.username}
          handleChangeText={(e: any) => setForm({ ...form, username: e })}
          additionalStyles=" mt-7 w-80"
          keyBoardType="text" placeholder={"Name"}        
        />

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e: any) => setForm({ ...form, email: e })}
          additionalStyles=" mt-7 w-80"
          keyBoardType="email-address" placeholder={"Email"}        
        />

        <FormField
          title="password"
          value={form.password}
          handleChangeText={(e: any) => setForm({ ...form, password: e })}
          additionalStyles=" mt-7"
          keyBoardType="password" placeholder={"Password"}        
        />
        
        <Button 
          title="Sign Up"
          handlePress={() => {}}
          containerStyles=""
          textStyles=""
        />
        <View className='flex flex-row'>
          <Text className='text-white'>
            Already have an account
           
          </Text>
           <Link className='text-primary ml-3' href={'/login'}>
            Log in
          </Link>
        </View>

      </View>
    </View>

  )
}

export default SignUp;