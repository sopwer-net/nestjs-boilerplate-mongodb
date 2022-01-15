import { Logger } from "@nestjs/common";
import { MailGunModule } from "./mail-gun/mail-gun.module";
import { SimpleEmailServiceModule } from "./ses/simple-email-service.module";

export class MailFactory{

    private static readonly logger : Logger = new Logger(MailFactory.name)

    static getProvider(typeProvider : string){
        switch(typeProvider){
            case "SES":
                return SimpleEmailServiceModule
            case "MAILGUN":
                return MailGunModule
            default :
            this.logger.error('you cant using that module')
                
        }
    }
}