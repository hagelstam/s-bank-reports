export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('fi-FI');
};

export const truncateString = (str: string, maxLength: number): string => {
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
};

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('fi-FI');
};
