import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {  SesService } from '@nextnm/nestjs-ses';
import { IMailService } from '../../mail.interface';
import { SesEmailOptions } from '@nextnm/nestjs-ses'
import { EmailOptionsDto } from '../../email-options.interface';


@Injectable()
export class MailSasService implements IMailService{

        private emailOptions : SesEmailOptions 
        logger : Logger = new Logger(MailSasService.name)
        constructor(private sesService: SesService) {
           this.emailOptions = {
               "from":"noreply@keepmy.space",
               "to":"",
               "subject":"",
               "html":""
           }
        }

        async sendEmail(option: EmailOptionsDto): Promise<any> {
            try{
                Object.assign(this.emailOptions , option)
                await this.sesService.sendEmail(this.emailOptions);

            }catch(error){
                this.logger.error(error)
            }
        

        }

      

}
