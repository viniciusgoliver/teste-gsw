import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from '../transaction/transaction.module';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { Account, AccountSchema } from './account.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    TransactionModule,
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
