import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { ObjectId } from 'mongodb';
import { FileManager } from "../../../core/file-manager/file.response";

export type ProfileDocument = Profile & Document


@Schema({timestamps : true})
export class Profile {
    id: string;

    @Prop({ required: true })
    fullName: string;
  
    @Prop({ unique: true, required: true })
    email: string;
  
    @Prop({ required: true })
    hashedPassword: string;
  
    @Prop({ required: true })
    phoneNumber: string;
  
    @Prop({ required: true })
    @Exclude()
    isVerified: boolean;
  
    @Prop()
    lastLoginDate: Date;
  
    @Prop({default : true})
    isActive : boolean
  
  
    @Prop( {default : { id : new ObjectId() , url : '' , fileName : ''}})
    image: FileManager;
  
    @Prop({default : `idauthy`})
    idAuthy: string;
  
    @Prop({ type: Boolean, default: false })
    isTwoFA: boolean;
  
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)