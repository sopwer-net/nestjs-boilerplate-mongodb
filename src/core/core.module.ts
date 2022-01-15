import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [AuthModule, ProfileModule , MailModule]
})
export class CoreModule {}
