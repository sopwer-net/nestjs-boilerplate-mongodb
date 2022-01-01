import { Module } from '@nestjs/common';
import { MailgunModule } from '@nextnm/nestjs-mailgun';
import { MailService } from './mail-gun.service';

@Module({
    imports:[MailgunModule.forAsyncRoot({
      useFactory: async () => {
        return {
          username: 'string',
          key: 'string',
          public_key: 'string', // OPTIONAL
          timeout: 180, // OPTIONAL
          url: 'string', // OPTIONAL // default: 'api.mailgun.net'. Note that if you are using the EU region the host should be set to 'api.eu.mailgun.net'
        };
      },
    }),],
    providers: [MailService],
    exports:[MailService, MailgunModule]
})
export class MailModule {}
