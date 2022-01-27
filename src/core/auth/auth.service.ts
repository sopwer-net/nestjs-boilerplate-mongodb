import { ConflictException, Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ProfileService } from '../profile/profile.service';
import { PayloadSignin, PayloadSignup } from './auth.controller';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { HashService } from './authenticator/hash.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateProfileDto } from '../profile/dto/update-profile.dto';

@Injectable()
export class AuthService {

  private logger : Logger = new Logger(AuthService.name)

  constructor(
    private readonly profileService: ProfileService,
    private readonly hashService : HashService,
    private readonly jwtService : JwtService
  ){}

  async validate(payload : PayloadSignin) : Promise<string>{
    const profile = await this.profileService.findOneByEmail(payload.email);
    return this.jwtService.sign({id : profile.id , email : profile.email})
  }
  

  async register(payload : PayloadSignup) {

    try{

      payload.password = await this.hashService.hashPassword(payload.password)

      const profile =  await this.profileService.create({isVerified : false ,...payload});
  
      return this.jwtService.sign({idUser : profile.id } ,{expiresIn : '999d'});


    }catch(error){
      this.logger.error(error)
      throw new ConflictException('youve been using that email')

    }
    
  }

  async verification(token : string){

    try{

      const verifyToken :any = await this.jwtService.verify(token)
    
      return this.profileService.update(verifyToken.idUser ,{isVerified : true ,...new UpdateProfileDto()} )

    }catch(error){
      this.logger.error(error)
      throw new BadRequestException('you cant verify ')
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
