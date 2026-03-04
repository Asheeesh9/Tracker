export type TransactionType = 'income' | 'expense';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Transaction {
  _id: string;
  amount: number;
  category: string;
  type: TransactionType;
  date: string;
  description: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
