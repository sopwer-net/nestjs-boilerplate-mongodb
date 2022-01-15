import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor() {
    super({
      clientID: `${process.env.CLIENT_ID_FACEBOOK}`,
      clientSecret: `${process.env.SECRET_KEY_FACEBOOK}`,
      callbackURL: `${process.env.URL_BACKEND}/auth/google/redirect`,
      scope: "email",
      profileFields: ["emails", "name"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    const {id, name, emails } = profile;
    const user = {
      email: emails[0].value,
      fullName: name.givenName,
      id:id,
      accessToken,

    };

    const payload = {
      user,
      accessToken
    }
  

    done(null, payload );
  }
}