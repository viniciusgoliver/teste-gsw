import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './transaction/transaction.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:mongo@mongo:27017/gws'),
    TransactionModule,
    AccountModule,
  ],
})
export class AppModule {}
