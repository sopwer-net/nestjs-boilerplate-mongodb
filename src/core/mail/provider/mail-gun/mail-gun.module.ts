import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MailgunModule } from "@nextnm/nestjs-mailgun";

@Module({
    imports :[
        ConfigModule.forRoot({
            envFilePath: '.development.env',
            isGlobal : true
          }),
        MailgunModule.forRoot({
            username : process.env.USERNAME_MAILGUN,
            key : process.env.KEY_MAILGUN
            }),
    ] ,
    exports : [MailgunModule]
})
export class MailGunModule{

}