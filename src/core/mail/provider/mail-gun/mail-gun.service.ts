import { Injectable, BadRequestException, ConsoleLogger } from '@nestjs/common';
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { MailgunEmailModel } from '@nextnm/nestjs-mailgun/dist/nestjs-mailgun/classes/mailgun-email-model';
import { IMailService } from '../../mail.interface';
import { EmailOptions } from '@nextnm/nestjs-mailgun'
import { EmailOptionsDto } from '../../email-options.interface';
@Injectable()
export class MailGunService implements IMailService {
  private emailOptions: EmailOptions;

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

  async sendEmail(option: EmailOptionsDto): Promise<void> {
    try {
      const data = new MailgunEmailModel(this.emailOptions.from, option.to, option.subject, 'text', option.html);

      await this.mailgunService.createEmail(`${process.env.DOMAIN_MAILGUN}`,data);

    } catch (error) {
      console.log(error);
    }
  }
}
