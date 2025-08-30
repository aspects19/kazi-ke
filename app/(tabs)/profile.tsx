// app/(tabs)/profile.tsx
import React, { useState } from 'react';                                        // 1
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native'; // 2
// import * as ImagePicker from 'expo-image-picker';                                // 3
// import { ShieldCheck, Star, Phone, Mail } from 'lucide-react-native';            // 4
// import { useUserStore } from '@/store/userStore';                                // 5

export default function ProfileScreen() {                                        // 6
//   const { user, updateUser, logout } = useUserStore();                           // 7
//   const [isEditing, setIsEditing] = useState(false);                             // 8
//   const [name, setName] = useState(user.name);                                   // 9
//   const [phone, setPhone] = useState(user.phone ?? '');                          // 10
//   const [avatar, setAvatar] = useState(user.avatar ?? '');                        // 11

//   const pickAvatar = async () => {                                               // 12
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();   // 13
//     if (status !== 'granted') {                                                  // 14
//       Alert.alert('Permission required', 'Please allow gallery access.');        // 15
//       return;                                                                    // 16
//     }                                                                            // 17

//     const result = await ImagePicker.launchImageLibraryAsync({                   // 18
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,                           // 19
//       allowsEditing: true,                                                       // 20
//       aspect: [1, 1],                                                            // 21
//       quality: 0.8,                                                              // 22
//     });                                                                          // 23

//     if (!result.canceled && result.assets?.[0]?.uri) {                           // 24
//       setAvatar(result.assets[0].uri);                                           // 25
//     }                                                                            // 26
//   };                                                                             // 27

//   const onSave = () => {                                                         // 28
//     if (!name.trim()) {                                                          // 29
//       Alert.alert('Validation', 'Name is required');                            // 30
//       return;                                                                    // 31
//     }                                                                            // 32
//     updateUser({ name: name.trim(), phone: phone.trim(), avatar });              // 33
//     setIsEditing(false);                                                         // 34
//   };                                                                             // 35

//   const onCancel = () => {                                                       // 36
//     setName(user.name);                                                          // 37
//     setPhone(user.phone ?? '');                                                  // 38
//     setAvatar(user.avatar ?? '');                                                // 39
//     setIsEditing(false);                                                         // 40
//   };                                                                             // 41

//   return (                                                                       // 42
//     <View className="flex-1 bg-white dark:bg-gray-900">                          // 43
//       {/* Header / cover */}                                                     // 44
//       <View className="h-36 bg-blue-600 dark:bg-blue-500" />                     // 45

//       <View className="-mt-16 px-6">                                             // 46
//         <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow">      // 47
//           <View className="items-center">                                       // 48

//             <TouchableOpacity onPress={isEditing ? pickAvatar : undefined}>     // 49
//               <Image
//                 source={avatar ? { uri: avatar } : require('@/assets/avatar.png')} // 50
//                 className="w-24 h-24 rounded-full mb-3"
//               />
//             </TouchableOpacity>                                                // 51

//             <View className="flex-row items-center gap-2">                      // 52
//               {isEditing ? (                                                    // 53
//                 <TextInput
//                   value={name}
//                   onChangeText={setName}
//                   className="text-xl font-semibold text-gray-900 dark:text-white"
//                   placeholder="Your name"
//                 />
//               ) : (                                                              // 54
//                 <Text className="text-xl font-semibold text-gray-900 dark:text-white">
//                   {user.name || 'Your Name'}
//                 </Text>
//               )}                                                                 // 55

//               {user.verified && !isEditing && (                                  // 56
//                 <ShieldCheck size={18} className="text-blue-600" />
//               )}                                                                 // 57
//             </View>                                                             // 58

//             <Text className="text-gray-500 dark:text-gray-400">                 // 59
//               {user.role || 'Worker'}
//             </Text>

//             {!!user.rating && (                                                  // 60
//               <View className="flex-row items-center gap-1 mt-2">
//                 <Star size={16} />
//                 <Text className="text-gray-700 dark:text-gray-200">
//                   {user.rating} • {user.reviews ?? 0} reviews
//                 </Text>
//               </View>
//             )}                                                                   // 61
//           </View>                                                               // 62

//           <View className="mt-6 gap-3">                                         // 63
//             <View className="flex-row items-center gap-3">                      // 64
//               <Mail size={18} />
//               <Text className="text-gray-800 dark:text-gray-100">{user.email}</Text>
//             </View>

//             <View className="mt-2">                                             // 65
//               {isEditing ? (                                                    // 66
//                 <View className="flex-row items-center gap-3">
//                   <Phone size={18} />
//                   <TextInput
//                     value={phone}
//                     onChangeText={setPhone}
//                     placeholder="+254 ..."
//                     className="text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 flex-1"
//                   />
//                 </View>
//               ) : (                                                              // 67
//                 user.phone ? (
//                   <View className="flex-row items-center gap-3">
//                     <Phone size={18} />
//                     <Text className="text-gray-800 dark:text-gray-100">{user.phone}</Text>
//                   </View>
//                 ) : null
//               )}                                                                 // 68
//             </View>
//           </View>                                                               // 69

//           <View className="mt-6 flex-row gap-3">                                 // 70
//             {isEditing ? (                                                      // 71
//               <>
//                 <TouchableOpacity className="flex-1 bg-green-600 rounded-xl p-3" onPress={onSave}>
//                   <Text className="text-white text-center font-medium">Save</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity className="flex-1 bg-gray-200 rounded-xl p-3" onPress={onCancel}>
//                   <Text className="text-gray-700 text-center font-medium">Cancel</Text>
//                 </TouchableOpacity>
//               </>
//             ) : (                                                                // 72
//               <>
//                 <TouchableOpacity className="flex-1 bg-blue-600 rounded-xl p-3" onPress={() => setIsEditing(true)}>
//                   <Text className="text-white text-center font-medium">Edit Profile</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity className="flex-1 bg-red-600 rounded-xl p-3" onPress={logout}>
//                   <Text className="text-white text-center font-medium">Log Out</Text>
//                 </TouchableOpacity>
//               </>
//             )}                                                                   // 73
//           </View>                                                               // 74
//         </View>                                                                 // 75
//       </View>                                                                   // 76

//       <View className="mt-6 px-6">                                               // 77
//         <TouchableOpacity className="py-4 border-b border-gray-200 dark:border-gray-700">
//           <Text className="text-gray-800 dark:text-gray-100">Account Settings</Text>
//         </TouchableOpacity>
//         <TouchableOpacity className="py-4 border-b border-gray-200 dark:border-gray-700">
//           <Text className="text-gray-800 dark:text-gray-100">Notifications</Text>
//         </TouchableOpacity>
//         <TouchableOpacity className="py-4">
//           <Text className="text-gray-800 dark:text-gray-100">Privacy Policy</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );                                                                            // 78
// }                                                                              // 79
return(                // 80
  <View className="flex-1 bg-white dark:bg-gray-900 justify-center items-center"> 
    <Text className="text-gray-800 dark:text-gray-100 text-lg">                  
      Profile Screen Under Construction                                        
    </Text>                                                                     
  </View>                                                                      // 85
);                                                                             // 86
}                                                                              // 87