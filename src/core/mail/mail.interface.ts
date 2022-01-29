import { EmailOptionsDto } from "./email-options.interface";

export interface IMailService{
    sendEmail(option:EmailOptionsDto):Promise<void>
}