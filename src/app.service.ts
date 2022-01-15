import { Injectable } from '@nestjs/common';
import { MailService } from './core/mail/mail.service';
import { TemplateEmail } from './core/mail/template.mail';

@Injectable()
export class AppService {

  constructor(private mailService : MailService){
    
  }

  async sendEmail(email: string, token: string) {
    this.mailService.emailOptions.subject = 'verifilakasi email';

    this.mailService.emailOptions.to = email;

    this.mailService.emailOptions.html = TemplateEmail({
      url: `${process.env.URL_CONFIRM_ACCOUNT}/${token}`,
      title: 'Konfirmasi Email',
      message: 'pastikan ini adalah email kamu',
    });

    await this.mailService.sendEmail(this.mailService.emailOptions);
  }
}
