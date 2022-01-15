import { Module } from '@nestjs/common';
import { MailgunModule } from '@nextnm/nestjs-mailgun';
import { SesModule } from '@nextnm/nestjs-ses';
import { MailService } from './mail.service';
import { MailProviderService } from './provider/mail-provider.service';

@Module({
    imports:[
      MailProviderService.getMailProvider('SES')
    ],
    providers: [MailService],
    exports:[MailService]
})
export class MailModule {}
