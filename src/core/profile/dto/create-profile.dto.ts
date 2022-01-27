import { IsEmail, IsEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class CreateProfileDto {

    @IsString()
    fullName:string

    @IsEmail()
    email:string

    @IsString()
    @MinLength(8)
    password:string

    @IsString()
    phoneNumber:string

    @IsEmpty()
    isVerified:boolean

    
  
}
