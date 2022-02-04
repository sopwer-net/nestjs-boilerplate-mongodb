import { Test, TestingModule } from '@nestjs/testing';
import { AuthController, PayloadSignup, PayloadReset } from './auth.controller';
import { AuthService } from './auth.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from './authentication/local-auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let eventEmitter : EventEmitter2  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: EventEmitter2,
          useFactory: () => ({
            emit: jest.fn(() => ({})),
          }),
        },      {
          provide: AuthService,
          useFactory: () => ({
            validate: jest.fn(() => ({})),
            register : jest.fn(()=>{}),
            verification : jest.fn(()=>{}),
            forgetPassword: jest.fn(()=>{}),
            resetPassword : jest.fn(()=>{})

          }),
        }
        
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2)
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
      const token = "eashfsuajhfay378627tafgashjfgjasfghjsgdhfjgsahjfgjsahfghsdayuewfasdf"
      jest.spyOn(authService , "register").mockResolvedValue(token)
      const result = await controller.register(payload)
      expect(authService.register).toHaveBeenCalledWith(payload);
      expect(eventEmitter.emit).toHaveBeenCalledWith('user.created' ,payload.email , token)
      expect(result).toEqual( {
        message : "check your email"
      })
    });
  });

  describe('user login', ()=>{
    it("should call login auth service", async()=>{
      const payload = {
        'email': 'xhijack@gmail.com',
        'password': 'WakanDaForever',
        'id' : 'id'
      }

      const req = {
        user : {
          'email': 'xhijack@gmail.com',
          'id' : 'id',
        'password': 'WakanDaForever',

        }
      }
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjIyYzE3NThmYTdlNzk2ZTJkZGY2MSIsImVtYWlsIjoiYnVkYXppbWJ1ZEBnbWFpbC5jb20iLCJpYXQiOjE2NDMyNjY5MzIsImV4cCI6MTY0MzM1MzMzMn0.mG6BYdhiUuEbazQqwm4pEc42m5dV7YA6XRHAoi7URkg"
      jest.spyOn(authService , "validate").mockResolvedValue(token)
      const result = await controller.login(payload , req);
      expect(authService.validate).toHaveBeenCalledWith(payload);
      expect(result).toEqual({
        accessToken : token,
        message : 'OK',
        status : HttpStatus.OK
      })
    })

    it('authController.login have decorator localguard',async()=>{
      const guards = Reflect.getMetadata('__guards__', AuthController.prototype.login)
      const guard = new (guards[0])

      expect(guard).toBeInstanceOf(LocalAuthGuard)
    })
  })

  describe('it called authController.verification',()=>{
    it('should called authService.verification' , async()=>{
      const token = "dsahfjksahflsdjfjkhsakhfkjsdahfjkdsahfjkhasjkhf"
      const result = await controller.verification(token)
      expect(authService.verification).toHaveBeenCalledWith(token)
    })
  })

  describe('it called authController.forgetPassword' ,()=>{
    it('should called authService.forgetPassword and eventEmitter.emit ',async ()=>{
      const email = "azim@gmail.com"
      const token = "asdhfjsahfjsadhfjsafgjhsdahfgs"
      jest.spyOn(authService , "forgetPassword").mockResolvedValue(token)
      const result = await controller.forgetPassword(email)
      expect(authService.forgetPassword).toHaveBeenCalledWith(email)
      expect(eventEmitter.emit).toHaveBeenCalledWith('user.forgetpassword' ,email , token)
      expect(result).toEqual({
        message : "check your email"
      })
    })
  })

  describe('it called authController.resetPassowrd' ,()=>{
    it('should called authService.resetPassword',async()=>{
      const token = "token"
      const payloadReset : PayloadReset = {
        password :"azim!akjfkd",
        passwordConfirm : "azim!akjfkd"
      }
      const result = await controller.resetPassword(token , payloadReset)
      expect(authService.resetPassword).toHaveBeenCalledWith(token , payloadReset)
    })
  })

});
