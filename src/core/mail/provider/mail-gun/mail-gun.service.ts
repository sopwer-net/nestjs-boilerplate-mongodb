import { Injectable, BadRequestException, ConsoleLogger } from '@nestjs/common';
import { EmailOptions, MailgunService } from '@nextnm/nestjs-mailgun';
import { IMailService } from '../../mail.interface';

@Injectable()
export class MailGunService implements IMailService {
  emailOptions: EmailOptions;

  constructor(private mailgunService: MailgunService) {
    this.emailOptions = {
      from: 'budazimbud@gmail.com',
      to: '',
      subject: 'confirm email',
      text: 'hallo',
      html: '',
      attachment: '',
      'h:X-Mailgun-Variables': '{"key":"value"}',
    };
  }

  async sendEmail(option: EmailOptions): Promise<void> {
    try {

      await this.mailgunService.createEmail('',option);

    } catch (error) {
      console.log(error);
    }
  }
}
