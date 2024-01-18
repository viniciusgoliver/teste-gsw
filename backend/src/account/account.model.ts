import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Account {
  @Prop({ required: true })
  balance: number;
}

export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);
