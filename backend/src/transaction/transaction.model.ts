import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Transaction {
  @Prop({ required: true })
  type: 'saque' | 'deposito';

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  accountId: string;

  @Prop({ default: Date.now })
  date: Date;
}

export type TransactionDocument = Transaction & Document;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
