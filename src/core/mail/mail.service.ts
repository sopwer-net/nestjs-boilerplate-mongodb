import { Injectable, BadRequestException, ConsoleLogger } from '@nestjs/common';
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { EmailOptions } from './email-options.interface';
import { MailGunService } from './provider/mail-gun/mail-gun.service';
import { IMailService } from './mail.interface';
import { MailSasService } from './provider/ses/mail-ses.service';

@Injectable()
export class MailService extends MailSasService {
  
}
