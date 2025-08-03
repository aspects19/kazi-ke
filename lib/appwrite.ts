import { Client, Databases, Account, Storage, Avatars, ID, Query } from 'react-native-appwrite';
import type { Models } from 'react-native-appwrite';

export const config = {
  endpoint: `${process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT}`,
  projectId: `${process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID}`,
  databaseId: '',
  usersCollectionId: '',
  documentCollectionId: '',
  documentBucketId: '',
  collectionId: '',
};

const client: Client = new Client();

client.setEndpoint(config.endpoint).setProject(config.projectId);

export const account: Account = new Account(client);
export const database: Databases = new Databases(client);
export const storage: Storage = new Storage(client);
export const avatars: Avatars = new Avatars(client);
