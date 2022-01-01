import { IsEmail, MinLength } from "class-validator";

export class ForgetPassword{
    @IsEmail()
    email:string
}