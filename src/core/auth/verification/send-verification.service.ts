import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TemplateEmail } from '../../../core/mail/template.mail';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class AuthMailService {
  constructor(private mailService: MailService) {}

  @OnEvent('user.forgetpassword')
  async sendEmailforget(email: string, token: string) {
  
    await this.mailService.sendEmail({to : email ,subject : 'Verifikasi email' ,html : TemplateEmail({
      url: `${process.env.URL_RESET_PASSWORD}/${token}`,
      title: 'Reset Password',
      message: 'please click Button Bellow for Reset Email ',
    })});
  }

  @OnEvent('user.created')
  async sendEmailVerification(email: string, token: string) {
    await this.mailService.sendEmail({to : email ,subject : 'Verifikasi email' ,html:TemplateEmail({
      url: `${process.env.URL_CONFIRM_ACCOUNT}/${token}`,
      title: 'Confirm email',
      message: 'Click bellow for confirm email',
    })
 });
  }
}
