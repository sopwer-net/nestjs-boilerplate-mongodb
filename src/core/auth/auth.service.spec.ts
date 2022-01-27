import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from '../profile/profile.service';
import { AuthService } from './auth.service';
import { HashService } from './authenticator/hash.service';
import { PayloadSignin, PayloadSignup } from './auth.controller';
import { Profile } from '../profile/entities/profile.entity';
import { JwtService } from '@nestjs/jwt';
import { UpdateProfileDto } from '../profile/dto/update-profile.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let profileService: ProfileService;
  let hashService : HashService ;
  let jwtService : JwtService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide : ProfileService , useFactory:()=>({
            create: jest.fn(()=>{}),
            update: jest.fn(()=>{}),
            findOneByEmail : jest.fn(()=>{})
          })
        },
        {
          provide : HashService , useFactory : ()=>({
            hashPassword : jest.fn(()=>{}),
          })
        },
        {
          provide : JwtService , useFactory :()=>({
            sign : jest.fn(()=>{}),
            verify : jest.fn(()=>{})
          })
        }
      ],
    }).compile();
    
    authService = module.get<AuthService>(AuthService);
    profileService = module.get<ProfileService>(ProfileService)
    hashService = module.get<HashService>(HashService)
    jwtService = module.get<JwtService>(JwtService)
  });

  describe('it called authService.register',()=>{
    it('should called hashedService.hashPassword and profileService.create' ,async()=>{
      const payload : PayloadSignup = {
        "email" :"azim@gmail.com",
        "username" : "azimemaste",
        "phoneNumber" :"+627218739127",
        "passwordConfirm":"azimA123123",
        "password" : "azimA123123",
        "fullName":"azim"
      }
      const profile : Profile = new Profile()

      jest.spyOn(profileService , "create").mockResolvedValue(profile)
      jest.spyOn(hashService , "hashPassword").mockResolvedValue(payload.password)
      const result = await authService.register(payload)
      expect(hashService.hashPassword).toHaveBeenCalledWith(payload.password)
      expect(profileService.create).toHaveBeenCalledWith({isVerified : false  ,...payload})
      expect(jwtService.sign).toHaveBeenCalledWith({idUser : profile.id } , {expiresIn : '999d'})
    })
  })

  describe('it called authService.verificatoin',()=>{
    it('should called jwtService.verify and profileService.update',async()=>{
      const token = 'dsakkfji32ryasjfhjshdfjsdafj'
      const verifyToken = {
        idUser : "123"
      }
      jest.spyOn(jwtService , "verify").mockReturnValue(verifyToken)
      const result = await authService.verification(token)
      expect(jwtService.verify).toHaveBeenCalledWith(token)
      expect(profileService.update).toHaveBeenCalledWith(verifyToken.idUser ,{isVerified : true ,...new UpdateProfileDto()})
    })
  })

  describe('it called authService.validate' ,()=>{
    it('should called profileService.findOneByEmail and jwtService.sign',async()=>{
      const payload : PayloadSignin = {
        email : "azim@gmail.com",
        password : "123"
      }
      const profile = new Profile()
      profile.id = "213"
      profile.email = "azim@gmail.com"
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjIyYzE3NThmYTdlNzk2ZTJkZGY2MSIsImVtYWlsIjoiYnVkYXppbWJ1ZEBnbWFpbC5jb20iLCJpYXQiOjE2NDMyNjY5MzIsImV4cCI6MTY0MzM1MzMzMn0.mG6BYdhiUuEbazQqwm4pEc42m5dV7YA6XRHAoi7URkg'
      jest.spyOn(jwtService , "sign").mockReturnValue(token)
      jest.spyOn(profileService , "findOneByEmail").mockResolvedValue(profile)
      const result = await authService.validate(payload)
      expect(profileService.findOneByEmail).toHaveBeenCalledWith(payload.email)
      expect(jwtService.sign).toHaveBeenCalledWith({id : profile.id , email : profile.email})
    })
  })

});
