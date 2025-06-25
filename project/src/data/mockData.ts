import { Transaction, Budget, Goal, Account, Investment } from '../types/finance';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 3200,
    description: 'Salary',
    category: 'Income',
    date: '2024-01-15',
    type: 'income',
    account: 'checking'
  },
  {
    id: '2',
    amount: -1200,
    description: 'Rent Payment',
    category: 'Housing',
    date: '2024-01-01',
    type: 'expense',
    account: 'checking'
  },
  {
    id: '3',
    amount: -85.50,
    description: 'Grocery Shopping',
    category: 'Food',
    date: '2024-01-14',
    type: 'expense',
    account: 'checking'
  },
  {
    id: '4',
    amount: -45.00,
    description: 'Gas Station',
    category: 'Transportation',
    date: '2024-01-13',
    type: 'expense',
    account: 'checking'
  },
  {
    id: '5',
    amount: -120.00,
    description: 'Electric Bill',
    category: 'Utilities',
    date: '2024-01-12',
    type: 'expense',
    account: 'checking'
  },
  {
    id: '6',
    amount: -25.99,
    description: 'Netflix Subscription',
    category: 'Entertainment',
    date: '2024-01-10',
    type: 'expense',
    account: 'checking'
  },
  {
    id: '7',
    amount: 500,
    description: 'Freelance Work',
    category: 'Income',
    date: '2024-01-08',
    type: 'income',
    account: 'checking'
  },
  {
    id: '8',
    amount: -75.00,
    description: 'Restaurant Dinner',
    category: 'Food',
    date: '2024-01-07',
    type: 'expense',
    account: 'credit'
  }
];

export const mockBudgets: Budget[] = [
  {
    id: '1',
    category: 'Food',
    limit: 400,
    spent: 160.50,
    period: 'monthly'
  },
  {
    id: '2',
    category: 'Transportation',
    limit: 200,
    spent: 45.00,
    period: 'monthly'
  },
  {
    id: '3',
    category: 'Entertainment',
    limit: 150,
    spent: 25.99,
    period: 'monthly'
  },
  {
    id: '4',
    category: 'Utilities',
    limit: 300,
    spent: 120.00,
    period: 'monthly'
  },
  {
    id: '5',
    category: 'Shopping',
    limit: 250,
    spent: 0,
    period: 'monthly'
  }
];

export const mockGoals: Goal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 6500,
    deadline: '2024-12-31',
    category: 'Savings'
  },
  {
    id: '2',
    name: 'Vacation to Europe',
    targetAmount: 5000,
    currentAmount: 2300,
    deadline: '2024-08-15',
    category: 'Travel'
  },
  {
    id: '3',
    name: 'New Car Down Payment',
    targetAmount: 8000,
    currentAmount: 3200,
    deadline: '2024-10-01',
    category: 'Transportation'
  }
];

export const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Main Checking',
    type: 'checking',
    balance: 2847.50,
    currency: 'USD'
  },
  {
    id: '2',
    name: 'High Yield Savings',
    type: 'savings',
    balance: 12500.00,
    currency: 'USD'
  },
  {
    id: '3',
    name: 'Credit Card',
    type: 'credit',
    balance: -1250.00,
    currency: 'USD'
  },
  {
    id: '4',
    name: 'Investment Account',
    type: 'investment',
    balance: 25600.00,
    currency: 'USD'
  }
];

export const mockInvestments: Investment[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 50,
    currentPrice: 185.50,
    purchasePrice: 165.00,
    purchaseDate: '2023-10-15'
  },
  {
    id: '2',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 25,
    currentPrice: 420.00,
    purchasePrice: 380.00,
    purchaseDate: '2023-11-20'
  },
  {
    id: '3',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 15,
    currentPrice: 140.50,
    purchasePrice: 125.00,
    purchaseDate: '2023-12-05'
  }
];