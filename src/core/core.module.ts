import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { MailModule } from './mail/mail.module';

@Module({
<<<<<<< HEAD
  imports: [AuthModule, ProfileModule , MailModule]
=======
  imports: [AuthModule, ProfileModule],
  providers: []
>>>>>>> main
})
export class CoreModule {}
