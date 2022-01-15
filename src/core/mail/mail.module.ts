import { Module } from '@nestjs/common';
import { MailgunModule } from '@nextnm/nestjs-mailgun';
import { SesModule } from '@nextnm/nestjs-ses';
import { MailService } from './mail.service';

@Module({
    imports:[ MailgunModule.forRoot({
        DOMAIN: 'sandboxa72283f4ff5a480ea7a2833c96fe7672.mailgun.org',
        API_KEY: '099a827f465d7a276206ced359c9cebc-2bf328a5-207e7898',
        HOST: 'api.mailgun.net', // default: 'api.mailgun.net'. Note that if you are using the EU region the host should be set to 'api.eu.mailgun.net'
      }),
      SesModule.forRoot({
        SECRET: 'TKjA50XQQ0DItevbrqtVzkVtPXeTg068fLZZAUiJ',
        AKI_KEY: 'AKIA454DOEUVKQ2XB4UZ',
        REGION: 'us-east-2',
      }),
    ],
    providers: [MailService],
    exports:[MailService]
})
export class MailModule {}
