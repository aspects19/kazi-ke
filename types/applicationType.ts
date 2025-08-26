import { Models } from "react-native-appwrite"

export interface ApplyDocument extends Models.Document {
  name: string
  role: string
  experience?: string
  status?: string
  avatar: string
}