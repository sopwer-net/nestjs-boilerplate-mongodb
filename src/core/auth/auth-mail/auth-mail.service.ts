import { Injectable } from '@nestjs/common';
import { MailService } from '../../mail/mail-gun.service';
import { TemplateEmail } from './template.mail';

@Injectable()
export class AuthMailService {
  constructor(private mailService: MailService) {}

  async sendEmailforget(email: string, token: string) {
    this.mailService.emailOptions.subject = 'Reset password';

    this.mailService.emailOptions.to = email;

    this.mailService.emailOptions.html = TemplateEmail({
      url: `${process.env.URL_RESET_PASSWORD}/${token}`,
      title: 'Reset Password',
      message: 'Silahkan klik button di bawah jika kamu lupa ',
    });

    await this.mailService.sendEmail(this.mailService.emailOptions);
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
