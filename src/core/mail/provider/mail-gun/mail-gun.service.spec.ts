import { EmailOptions } from '../../email-options.interface';
import { MailService } from '../../mail.service';
import { Test } from '@nestjs/testing';
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { MailGunService } from './mail-gun.service';
import { MailgunEmailModel } from '@nextnm/nestjs-mailgun/dist/nestjs-mailgun/classes/mailgun-email-model';
describe('mailService',()=>{
    let mailGunService : MailGunService
    let mailgunService : MailgunService

    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            providers:[MailGunService,
                {
                    provide:MailgunService , useFactory:()=>({
                        createEmail : jest.fn(()=>{})
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

            const data = new MailgunEmailModel(option.from, option.to, option.subject, 'text', option.html);


            expect(mailgunService.createEmail).toHaveBeenCalledWith(`${process.env.DOMAIN_MAILGUN}`,data)
        })
    })
})