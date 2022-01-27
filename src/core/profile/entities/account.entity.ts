import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Profile } from './profile.entity';
export type AccountDocument = Account & Document

@Schema({timestamps:true})
export class Account {

    @Prop({unique:true})
    idAccount:string

    @Prop()
    provider:string

    @Prop()
    accessToken:string

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:()=>Profile})
    @Type(()=>Profile)
    user:Profile

    

}

export const AccountSchema = SchemaFactory.createForClass(Account)