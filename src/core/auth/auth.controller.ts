import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IsString, Min, IsEmail, MinLength, MaxLength, Matches, IsPhoneNumber } from 'class-validator';
import { ProfileService } from '../profile/profile.service';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Match } from './match.decorator';

export class PayloadSignup{
  @IsString()
  @MinLength(4)
  username: string;
  @IsString()
  fullName: string;
  @IsEmail()
  email: string;
  @IsPhoneNumber()
  phoneNumber
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password: string;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password' ,{message :"its not assignable"})
  passwordConfirm: string;
}


export class PayloadSignin{
  email: string;
  password: string;
}


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async register(@Body()payload: PayloadSignup){
    return await this.authService.register(payload);
  }

  @Post('signin')
  async login(payload: PayloadSignin){
    const token = await this.authService.validate(payload);
    return {'token': token}
  }
}
