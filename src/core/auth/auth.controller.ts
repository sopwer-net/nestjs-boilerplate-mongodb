import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IsString, Min, IsEmail, MinLength, MaxLength, Matches, IsPhoneNumber, IsNotEmpty } from 'class-validator';
import { AuthService } from './auth.service';
import { Match } from './match.decorator';
import { LocalAuthGuard } from './authentication/local-auth.guard';

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
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  
  id : string
}

export class PayloadReset{
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


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly eventEmitter : EventEmitter2
  ) {}

  @Post('signup')
  async register(@Body()payload: PayloadSignup ){

    const register =  await this.authService.register(payload);

    await this.eventEmitter.emit('user.created' ,payload.email , register)

    return {
      message : "check your email"
    }

  }

  @Post('signin')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(@Body()payload: PayloadSignin , @Req()request){
    return {
      accessToken : await this.authService.validate(request.user),
      message : 'OK',
      status : HttpStatus.OK
    }
  }

  @Get('confirm/:token')
  async verification(@Param('token') token : string){
    await this.authService.verification(token)
    return {
      message : 'youve been confirm thanks'
    }
  }

  @Post('forget-password')
  async forgetPassword(@Body('email') email :string){
    const token = await this.authService.forgetPassword(email)

    await this.eventEmitter.emit('user.forgetpassword' ,email , token)

    return {
      message : "check your email",
    }
  }

  @Get('reset-password/:token')
  async resetPassword(@Param('token')token : string , @Body() password : PayloadReset){ 
    await this.authService.resetPassword(token , password )
    return {
      message :"ok your password is changed"
    }
  }
}
