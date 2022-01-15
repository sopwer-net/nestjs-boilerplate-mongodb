import { Injectable, BadRequestException, ConsoleLogger } from '@nestjs/common';
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { EmailOptions } from './email-options.interface';
import { MailGunService } from './mail-gun.service';
import { IMailService } from './mail.interface';
import { MailSasService } from './mail-sas.service';

@Injectable()
export class MailService extends MailSasService {
  
}
