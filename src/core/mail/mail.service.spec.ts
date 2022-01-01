import { EmailOptions } from './email-options.interface';
import { MailService } from './mail-gun.service';
import { Test } from '@nestjs/testing';
import { MailgunService } from '@nextnm/nestjs-mailgun';
describe('mailService',()=>{
    let mailService : MailService
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

        mailService = await module.get<MailService>(MailService)
        mailgunService = await module.get<MailgunService>(MailgunService)
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

            const result = await mailService.sendEmail(option)

            expect(mailgunService.sendEmail).toHaveBeenCalledWith(option)
        })
    })
})