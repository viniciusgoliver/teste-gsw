import { Injectable, BadRequestException } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { Transaction } from '../transaction/transaction.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  async getBalance(): Promise<string> {
    const balance = await this.accountRepository.getBalance();

    if (balance <= 0) {
      throw new BadRequestException('Você não possui saldo na conta.');
    }

    return Number(balance).toFixed(2).replace('.', ',');
  }

  async withdraw(
    amount: number,
    balance?: number,
  ): Promise<{ success: boolean; totalAmount?: number; notes?: number[] }> {
    try {
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const newAmount = Number(amount);
    const currentBalance =
      balance !== undefined
        ? balance
        : await this.accountRepository.getBalance();

    const validNotes = [100, 50, 20, 10];

    if (newAmount <= 0 || newAmount % 10 !== 0) {
      throw new BadRequestException(
        'Valor de saque inválido. Somente notas de R$ 100,00, R$ 50,00, R$ 20,00 ou R$ 10,00 em quantidades múltiplos de 10 são permitidas.',
      );
    }

    const withdrawalHistory = this.calculateWithdrawal(newAmount);

    if (
      withdrawalHistory.length === 0 ||
      withdrawalHistory.some((note) => !validNotes.includes(note))
    ) {
      throw new BadRequestException('Combinação de notas inválida para saque.');
    }

    if (newAmount > currentBalance) {
      throw new BadRequestException(
        'Saldo insuficiente para realizar o saque.',
      );
    }

    await this.accountRepository.updateAccount({
      balance: currentBalance - newAmount,
    });

    const accountId = await this.accountRepository.getAccountId();

    this.addTransaction('saque', newAmount, accountId);

    return { success: true, totalAmount: newAmount, notes: withdrawalHistory };
  }

  async setBalance(initialBalance: number): Promise<{ message: string }> {
    if (initialBalance <= 0) {
      throw new BadRequestException(
        'Não é possível definir um valor negativo para o saldo inicial.',
      );
    }

    const convertInitialBalance = Number(initialBalance);
    const currentBalance = await this.accountRepository.getBalance();
    const finalBalance =
      Number(currentBalance.toFixed(2)) +
      Number(convertInitialBalance.toFixed(2));

    await this.accountRepository.updateAccount({
      balance: finalBalance,
    });

    if (initialBalance <= 0) {
      throw new BadRequestException(
        'Não é possível definir um valor negativo para o saldo inicial.',
      );
    }

    const accountId = await this.accountRepository.getAccountId();
    await this.addTransaction('deposito', initialBalance, accountId);

    return {
      message: `Depósito no valor de R$ ${Number(initialBalance)
        .toFixed(2)
        .toString()
        .replace('.', ',')} realizado com sucesso.`,
    };
  }

  private calculateWithdrawal(amount: number): number[] {
    const notes = [100, 50, 20, 10];
    const withdrawalHistory = [];

    for (const note of notes) {
      const count = Math.floor(amount / note);
      withdrawalHistory.push(...Array(count).fill(note));
      amount %= note;
    }

    return withdrawalHistory;
  }

  async getTransactionHistory(page: number, limit: number): Promise<any> {
    const accountId = await this.accountRepository.getAccountId();
    const totalTransactions = await this.transactionModel.countDocuments({});
    const transactions = await this.transactionModel
      .find({ accountId })
      .sort({ date: 'desc' })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalPages = Math.ceil(totalTransactions / limit);

    return { transactions, totalPages };
  }

  async addTransaction(
    type: 'saque' | 'deposito',
    amount: number,
    accountId: string,
  ): Promise<void> {
    const transaction = new this.transactionModel({ type, amount, accountId });
    await transaction.save();
  }
}
