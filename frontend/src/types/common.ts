import { Timestamp } from 'firebase/firestore';

export interface Post {
  id: string;
  title: string;
  image: string;
  body: string;
  tags: string[];
  createdBy: string;
  uid?: string;
  createdAt?: Date | Timestamp;
}

export interface FirestoreDocument extends Partial<Post> {
  id: string;
  [key: string]: unknown;
}
