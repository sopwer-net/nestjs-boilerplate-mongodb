import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { ProfileService } from '../profile/profile.service';
import { PayloadSignup } from './auth.controller';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { HashService } from './authenticator/hash.service';

@Injectable()
export class AuthService {

  private logger : Logger = new Logger(AuthService.name)

  constructor(
    private readonly profileService: ProfileService,
    private readonly hashService : HashService
  ){}
  validate(payload: CreateAuthDto) {
    return {'message': 'success'}
  }

  async register(payload : PayloadSignup) {
    try{
      payload.password = await this.hashService.hashPassword(payload.password)
      await this.profileService.create({isVerified : false ,...payload});
  
      return {
         message : "check your email"
      }

    }catch(error){
      this.logger.error(error)
      throw new ConflictException('youve been using that email')

    }
    
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
