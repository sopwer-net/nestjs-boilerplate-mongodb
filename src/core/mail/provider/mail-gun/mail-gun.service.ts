import { Injectable, BadRequestException, ConsoleLogger } from '@nestjs/common';
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { MailgunEmailModel } from '@nextnm/nestjs-mailgun/dist/nestjs-mailgun/classes/mailgun-email-model';
import { EmailOptions } from '../../email-options.interface';
import { IMailService } from '../../mail.interface';

@Injectable()
export class MailGunService implements IMailService {
  emailOptions: EmailOptions;

  constructor(private mailgunService: MailgunService) {
    this.emailOptions = {
      from: 'keepMyspace@gmail.com',
      to: 'azimemaste@gmail.com',
      subject: 'confirm email',
      text: 'hallo',
      html: '',
      attachment: '',
      'h:X-Mailgun-Variables': '{"key":"value"}',
    };
  }

  async sendEmail(option: EmailOptions): Promise<void> {
    try {
      const data = new MailgunEmailModel(this.emailOptions.from, option.to, option.subject, 'text', option.html);

      await this.mailgunService.createEmail(`${process.env.DOMAIN_MAILGUN}`,data);

    } catch (error) {
      console.log(error);
    }
  }
}
