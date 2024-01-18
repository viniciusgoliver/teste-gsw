import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './account.model';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async getBalance(): Promise<number> {
    const account = await this.accountModel.findOne().exec();
    return account ? account.balance : 0;
  }

  async updateAccount(accountData: Partial<Account>): Promise<Account> {
    const account = await this.accountModel.findOne().exec();

    if (!account) {
      const newAccount = new this.accountModel(accountData);
      return newAccount.save();
    }

    Object.assign(account, accountData);
    return account.save();
  }

  async getAccountId(): Promise<string> {
    const account = await this.accountModel.findOne().exec();
    return account ? account._id : null;
  }
}
