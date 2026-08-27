export interface DocumentData {
  title: string;
  image: string;
  body: string;
  tags: string[];
  createdBy: string;
  createdAt?: { seconds: number };
}
