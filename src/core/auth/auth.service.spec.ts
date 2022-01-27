import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from '../profile/profile.service';
import { AuthService } from './auth.service';
import { HashService } from './authenticator/hash.service';
import { PayloadSignup } from './auth.controller';
import { Profile } from '../profile/entities/profile.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let profileService: ProfileService;
  let hashService : HashService ;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide : ProfileService , useFactory:()=>({
            create: jest.fn(()=>{})
          })
        },
        {
          provide : HashService , useFactory : ()=>({
            hashPassword : jest.fn(()=>{})
          })
        }
      ],
    }).compile();
    
    authService = module.get<AuthService>(AuthService);
    profileService = module.get<ProfileService>(ProfileService)
    hashService = module.get<HashService>(HashService)
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
      expect(profileService.create).toHaveBeenCalledWith({isVerified : false , ...payload})
    })
  })

});
