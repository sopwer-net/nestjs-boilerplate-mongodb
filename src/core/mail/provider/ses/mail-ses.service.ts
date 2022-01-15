import { BadRequestException, Injectable } from '@nestjs/common';
import {  SesService } from '@nextnm/nestjs-ses';
import { IMailService } from '../../mail.interface';
import { SesEmailOptions } from '@nextnm/nestjs-ses'
import { EmailOptions } from '../../email-options.interface';


@Injectable()
export class MailSasService implements IMailService{

        emailOptions : SesEmailOptions 

        constructor(private sesService: SesService) {
           this.emailOptions = {
               "from":"noreply@keepmy.space",
               "to":"",
               "subject":"",
               "html":""
           }
        }

        async sendEmail(option: EmailOptions): Promise<any> {
            try{
                Object.assign(this.emailOptions , option)
                await this.sesService.sendEmail(this.emailOptions);

            }catch(e){
                console.log(e)
            }
        

        }

      

}
