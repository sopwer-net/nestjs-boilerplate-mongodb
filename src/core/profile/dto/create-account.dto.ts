import { IsEmpty } from "class-validator"
import { CreateProfileDto } from './create-profile.dto';

export class CreateAccountDto implements CreateProfileDto{
    password: string;
    phoneNumber: string;
    isVerified: boolean;
    idAuthy: string;
    @IsEmpty()
    idAccount:string

    @IsEmpty()
    provider:string

    @IsEmpty()
    accessToken:string

    @IsEmpty()
    email:string

    @IsEmpty()
    fullName:string
    
   

}