import { Module } from '@nestjs/common';
import { AuthMailService } from './auth-mail/auth-mail.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashService } from './hashPassword/hash.service';
import { jwtConstants, JwtStrategy } from './jwt-guard/jwt.strategy';
import { LocalStrategy } from './local-auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { FacebookStrategy } from './facebook-auth/facebook.strategy';
import { GoogleStrategy } from './google-auth/google.strategy';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';

@Module({
  imports:[
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    MailModule
    ],
  controllers:[AuthController],
  providers: [
    AuthService,
    HashService,
    AuthMailService,
    JwtStrategy,
    LocalStrategy,
    FacebookStrategy,
    GoogleStrategy,
  ],
  exports:[AuthService]
})
export class AuthModule {}
