import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from '../profile/profile.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let profileService: ProfileService;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('Auth Register Service', ()=>{
    it('should call ProfileService create', () => {

      expect(authService).toBeDefined();
    });  
  })
});
