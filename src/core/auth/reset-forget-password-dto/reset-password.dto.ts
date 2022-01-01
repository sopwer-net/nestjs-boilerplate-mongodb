import { IsString, MinLength } from "class-validator";

export class ResetPassword{
    @MinLength(8)
    password:string
} 