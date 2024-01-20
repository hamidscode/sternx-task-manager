export interface Task {
  id: string;
  parentId?: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
}
