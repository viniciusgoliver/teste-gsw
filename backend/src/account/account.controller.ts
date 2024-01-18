// Importe o modelo Transaction do caminho correto
import { Controller, Get, Body, Post, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { Transaction } from '../transaction/transaction.model'; // Ajuste o caminho conforme necessário

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('saldo')
  async getBalance(): Promise<{ balance: string }> {
    const balance = await this.accountService.getBalance();
    return { balance };
  }

  @Post('saque')
  async withdraw(
    @Body() withdrawalData: { amount: number; balance?: number },
  ): Promise<{
    message: string;
    success: boolean;
    totalAmount?: number;
    notes?: number[];
  }> {
    const { amount, balance } = withdrawalData;

    try {
      const result = await this.accountService.withdraw(amount, balance);
      return {
        message: `Saque bem-sucedido no valor de R$ ${Number(amount).toFixed(2).replace('.', ',')}. Notas entregues: ${result.notes.join(', ')}.`,
        success: result.success,
        totalAmount: result.totalAmount,
        notes: result.notes,
      };
    } catch (error) {
      return { message: error.message, success: false };
    }
  }

  @Post('deposito')
  async setBalance(
    @Body() data: { initialBalance: number },
  ): Promise<{ message: string }> {
    const { initialBalance } = data;
    return await this.accountService.setBalance(initialBalance);
  }

  @Get('extrato')
  async getTransactionHistory(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<Transaction[]> {
    return this.accountService.getTransactionHistory(page, limit);
  }
}
