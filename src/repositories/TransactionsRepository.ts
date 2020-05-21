import Transaction from '../models/Transaction';

enum Type {
  income = 'income',
  outcome = 'outcome',
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: Type;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type === Type.income)
      .reduce((accum, curr) => accum + curr.value, 0);

    const outcome = this.transactions
      .filter(transaction => transaction.type === Type.outcome)
      .reduce((accum, curr) => accum + curr.value, 0);

    const total = income - outcome;

    const balance: Balance = { income, outcome, total };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    const { total } = this.getBalance();

    if (type === Type.outcome && total < value) {
      throw Error('Insufficient balance to carry out transaction');
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
