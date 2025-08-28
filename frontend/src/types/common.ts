/**
 * Common Application Types
 */

export interface Post {
  id: string;
  title: string;
  image: string;
  body: string;
  tags: string[];
  createdBy: string;
  uid?: string;
  createdAt?: Date | any; // Firestore timestamp
}

export interface FirestoreDocument extends Partial<Post> {
  id: string;
  [key: string]: any; // For other Firestore fields
}