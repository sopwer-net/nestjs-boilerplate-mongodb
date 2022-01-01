import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor() {
    super({
      clientID: '1001882184595-qeuiuqscorp3utf3rjpfo94ij5ut7rb1.apps.googleusercontent.com',
      clientSecret:'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',
      callbackURL: process.env.CALL_BACK_GOOGLE ,
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos ,id } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      id:id,
      accessToken
    }
    done(null, user);
  }
}