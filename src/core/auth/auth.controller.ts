import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from '../profile/profile.service';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

class PayloadSignup{
  username: string;
  fullname: string;
  email: string;
  password: string;
  password2: string;
}

class PayloadSignin{
  email: string;
  password: string;
}


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly profileService: ProfileService) {}

  @Post('signup')
  async register(payload: PayloadSignup){
    return await this.profileService.create(payload);
  }

  @Post('signin')
  async login(payload: PayloadSignin){
    const token = await this.authService.validate(payload);
    return {'token': token}
  }
}
