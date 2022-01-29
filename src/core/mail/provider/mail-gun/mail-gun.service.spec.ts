import { EmailOptionsDto } from '../../email-options.interface';
import { MailService } from '../../mail.service';
import { Test } from '@nestjs/testing';
import { EmailOptions, MailgunService } from '@nextnm/nestjs-mailgun';
import { MailGunService } from './mail-gun.service';
describe('mailService',()=>{
    let mailGunService : MailGunService
    let mailgunService : MailgunService

    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            providers:[MailService,
                {
                    provide:MailgunService , useFactory:()=>({
                        sendEmail : jest.fn(()=>{})
                    })
                }
            ]
        }).compile()

        mailgunService = await module.get<MailgunService>(MailgunService)
        mailGunService = await module.get<MailGunService>(MailGunService)
    })

    describe('it called MailService.sendEmail',()=>{
        it('should called MailGunService.sendEmail',async()=>{
            const option : EmailOptions = {
                from: 'budazimbud@gmail.com',
                to: '',
                subject: 'confirm email',
                text: 'hallo',
                html: '',
                attachment:'',
                'h:X-Mailgun-Variables': '{"key":"value"}'
            }

            const result = await mailGunService.sendEmail(option)

            expect(mailgunService.createEmail).toHaveBeenCalledWith(option)
        })
    })
})