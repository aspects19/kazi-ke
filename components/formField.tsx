import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

const FormField = ({
    
    title, 
    value,
    placeholder,
    handleChangeText,
    additionalStyles,
    ...props
}) => {
    const [showPassword, setshowPassword] = useState(false)
  return (
    <View className={` space-y-2 ${additionalStyles}`}>
        <View className='w-full h-16 px-3 border-red-400 bg-slate-900 border-solid rounded-2xl'>
            <TextInput
            className='flex-1 text-white bg-slate-900 font-semibold text-base'
            placeholder={placeholder}
            placeholderTextColor='#7b7b8b'
            onChangeText={handleChangeText}
            secureTextEntry = {title === "password" && !showPassword}
            />

        </View>
    </View>
  )
}

export default FormField