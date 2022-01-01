import { EmailOptions } from "./email-options.interface";

export interface IMailService{
    sendEmail(option:EmailOptions):Promise<void>
}