import { Injectable, BadRequestException, ConsoleLogger } from '@nestjs/common';
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { EmailOptions } from './email-options.interface';
import { IMailService } from './mail.interface';

@Injectable()
export class MailService implements IMailService {
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
      return await this.mailgunService.createEmail('sandboxa72283f4ff5a480ea7a2833c96fe7672.mailgun.org', option)
    } catch (error) {
      console.log(error);
    }
  }
}
