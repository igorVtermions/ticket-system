export interface Ticket {
  id: number;
  title: string;
  status: string;
  lastUpdated: string;
  description: string;
  creator: string;
  createdAt: string;
  comments: {
    createdAt: string;
    text: string;
  }[];
}
