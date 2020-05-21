import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

enum Type {
  income = 'income',
  outcome = 'outcome',
}

interface Request {
  title: string;
  value: number;
  type: Type;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
