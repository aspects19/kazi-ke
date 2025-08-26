import { Models } from "react-native-appwrite"

export interface JobDocument extends Models.Document {
  title: string
  posted_at: string
  status?: string
  applicants?: number
}