import { AuthMailService } from './send-verification.service';
import { MailService } from '../../mail/mail.service';
import { Test } from '@nestjs/testing';
import { TemplateEmail } from '../../mail/template.mail';
describe('sendVerificationEmail',()=>{
    let authMailService: AuthMailService
    let mailService : MailService

    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            providers : [AuthMailService,
                {
                    provide : MailService , useFactory:()=>({
                        sendEmail : jest.fn()
                    })
                }
            ]
        }).compile()

        authMailService = module.get<AuthMailService>(AuthMailService)
        mailService = module.get<MailService>(MailService)

    })

    describe('authmailservice.sendemailverification',()=>{
        it('should called mailService.sendEmail',async()=>{
            const token = "token"
            const email = "email"
            const result = await authMailService.sendEmailVerification(token , email)
            expect(mailService.sendEmail).toHaveBeenCalled()
        })
    })


    describe('authmailservice.sendemailforgetpassword',()=>{
        it('should called mailService.sendEmail',async()=>{
            const token = "token"
            const email = "email"
            const result = await authMailService.sendEmailVerification(token , email)
            expect(mailService.sendEmail).toHaveBeenCalled()
        })
    })
})