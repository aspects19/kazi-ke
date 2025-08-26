import {
  Client,
  Databases,
  Account,
  Storage,
  Avatars,
  ID,
  Query,
} from "react-native-appwrite";
import type { Models } from "react-native-appwrite";
import { useUser } from "@/context/user";

export const config = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "688c52fc0034a4f78b3d",
  databaseId: "6890b5bc001700145349",
  usersCollectionId: "6890b5cc00091a311a6c",
  jobsCollectionId: "6890b7c700256c376329",
  applicationsCollectionId: "6890b908000f06b4a0eb",
  resumeBucketId: "6890ba6f0031dfde25d7",
};

const client: Client = new Client();

client.setEndpoint(config.endpoint).setProject(config.projectId);

export const account: Account = new Account(client);
export const database: Databases = new Databases(client);
export const storage: Storage = new Storage(client);
export const avatars: Avatars = new Avatars(client);

export const getCollection = async (
  collection: string,
  query: string = "",
  limit: number = 10
): Promise<Models.Document[]> => {
  const queries = [Query.limit(limit)];
  if (query && query.trim() !== "") {
    queries.push(Query.search("title", query));
  }

  const posts = await database.listDocuments(
    config.databaseId,
    collection,
    queries
  );
  return posts.documents;
};

export const postJob = async (
  title: String,
  description: String,
  employmentType: String,
  user_id : String
) => {
  await database.createDocument(config.databaseId, 
    config.jobsCollectionId, 
    ID.unique(), 
    {
      job_id: ID.unique(),
      title: title,
      description: description,
      employment_type: employmentType,
      posted_by: user_id,
      posted_at: new Date()
    }
  )
}
