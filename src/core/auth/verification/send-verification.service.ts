import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TemplateEmail } from '../../../core/mail/template.mail';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class AuthMailService {
  constructor(private mailService: MailService) {}

  @OnEvent('send.tokenForget')
  async sendEmailforget(email: string, token: string) {
    this.mailService.emailOptions.subject = 'Reset password';

    this.mailService.emailOptions.to = email;

    this.mailService.emailOptions.html = TemplateEmail({
      url: `${process.env.URL_RESET_PASSWORD}/${token}`,
      title: 'Reset Password',
      message: 'please click Button Bellow for Reset Email ',
    });

    await this.mailService.sendEmail(this.mailService.emailOptions);
  }

  @OnEvent('send.token')
  async sendEmailVerification(email: string, token: string) {
    console.log(token)
    this.mailService.emailOptions.subject = 'Verifikasi email';

    this.mailService.emailOptions.to = email;

    this.mailService.emailOptions.html = TemplateEmail({
      url: `${process.env.URL_CONFIRM_ACCOUNT}/${token}`,
      title: 'Confirm email',
      message: 'Click bellow for confirm email',
    });

    await this.mailService.sendEmail(this.mailService.emailOptions);
  }
}
