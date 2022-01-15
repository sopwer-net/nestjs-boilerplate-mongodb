import { Module } from "@nestjs/common";
import { MailgunModule } from "@nextnm/nestjs-mailgun";

@Module({
    imports :[
        MailgunModule.forRoot({
            username: 'string',
            key: 'string',
            public_key: 'string', // OPTIONAL
            timeout: 0, // OPTIONAL
            url: 'string', // OPTIONAL // default: 'api.mailgun.net'. Note that if you are using the EU region the host should be set to 'api.eu.mailgun.net'
          }),
    ] 
})
export class MailGunModule{

}