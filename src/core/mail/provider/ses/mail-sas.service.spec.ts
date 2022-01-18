import { EmailOptions } from '../../email-options.interface';
import { MailService } from '../../mail.service';
import { Test } from '@nestjs/testing';
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { MailSasService } from './mail-ses.service';
import { SesService } from '@nextnm/nestjs-ses';
describe('mailService',()=>{
    let sesService :SesService
    let mailSasService : MailSasService

    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            providers:[MailSasService,
                {
                    provide:SesService , useFactory:()=>({
                        sendEmail : jest.fn(()=>{})
                    })
                }
            ]
        }).compile()

        sesService = await module.get<SesService>(SesService)
        mailSasService = await module.get<MailSasService>(MailSasService)
    })

    describe('it called MailService.sendEmail',()=>{
        it('should called MailGunService.sendEmail',async()=>{
            const option = {
                "from":"noreply@keepmy.space",
                "to":"",
                "subject":"",
                "html":""
            }

            const result = await sesService.sendEmail(option)

            expect(sesService.sendEmail).toHaveBeenCalledWith(option)
        })
    })
})