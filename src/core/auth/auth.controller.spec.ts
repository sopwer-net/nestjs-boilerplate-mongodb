import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from '../profile/profile.service';
import { AuthController, PayloadSignup } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let profileService: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: ProfileService,
          useFactory: () => ({
            create: jest.fn(() => ({})),
          }),
        },      {
          provide: AuthService,
          useFactory: () => ({
            validate: jest.fn(() => ({})),
          }),
        }
        
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    profileService = module.get<ProfileService>(ProfileService);
  });

  describe('user signup', ()=>{
    it('should call create profile service', async () => {
      const payload  : PayloadSignup = {
        username: 'string',
        fullName: 'string',
        phoneNumber : 'string',
        email: 'string',
        password: 'string',
        passwordConfirm: 'string'
      }
      const result = await controller.register(payload)
      expect(profileService.create).toHaveBeenCalledWith(payload);
    });
  });

  describe('user login', ()=>{
    it("should call login auth service", async()=>{
      const payload = {
        'email': 'xhijack@gmail.com',
        'password': 'WakanDaForever'
      }
      const result = await controller.login(payload);
      expect(authService.validate).toHaveBeenCalledWith(payload);
    })
  })
});
