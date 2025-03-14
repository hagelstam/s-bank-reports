export interface Transaction {
  date: Date;
  amount: number;
  recipient: string;
}

export interface Report {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  transactions: Transaction[];
}
