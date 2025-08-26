import { Models } from "react-native-appwrite"

export interface JobDocument extends Models.Document {
  title: string
  posted_at: string
  status?: string
  applicants?: number
}

export interface VerboseJobDocument extends JobDocument {
  company: string
  salary: string
  location?: string
  logo?: string
  type?: string
}