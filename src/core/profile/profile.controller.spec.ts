import { Test, TestingModule } from '@nestjs/testing';
import { FilterParam } from '../base-repository/pagination.params';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { ExecutionContext, BadRequestException } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { UpdateProfileDto } from './dto/update-profile.dto';
describe('ProfileController', () => {
  let profileController: ProfileController;
  let profileService : ProfileService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileController,
        {
          provide : ProfileService  , useFactory:()=>({
            findAll : jest.fn(()=>{}),
            findOne : jest.fn(()=>{}),
            update : jest.fn(()=>{})
          })
        }
      ],
    }).compile();

    profileController = module.get<ProfileController>(ProfileController);
    profileService = module.get<ProfileService>(ProfileService)
  });

  describe('it called profileController.findAll',()=>{
    it('should called profileService.findAll' ,async ()=>{
      const filterParam = new FilterParam()
      const resultprofile : Profile[] =[]
      jest.spyOn(profileService , "findAll").mockResolvedValue(resultprofile)
      const result  = await profileController.findAll(filterParam)
      expect(profileService.findAll).toHaveBeenCalledWith(filterParam)
      expect(result).toEqual(resultprofile)
    })
  })

  describe('it called profileController.getProfile with me' ,()=>{
    it('should called profileService.findOne' ,async()=>{
      const context = createMock<ExecutionContext>();
      const req  = context.switchToHttp().getRequest()
      req['user'] = {
        id : '123'
      }
      const profile = new Profile()
      const id = "me"
      jest.spyOn(profileService , "findOne").mockResolvedValue(profile)
      const result = await profileController.getProfile(id ,req)
      expect(profileService.findOne).toHaveBeenCalledWith(req['user'].id)
      expect(result).toEqual(profile)
    })
  })

  describe('it called profileController.getProfile with id' ,()=>{
    it('should called profileService.findOne' ,async()=>{
      const context = createMock<ExecutionContext>();
      const req  = context.switchToHttp().getRequest()
      req['user'] = {
        id : '123'
      }
      const profile = new Profile()
      const id = "id"
      jest.spyOn(profileService , "findOne").mockResolvedValue(profile)
      const result = await profileController.getProfile(id ,req)
      expect(profileService.findOne).toHaveBeenCalledWith(id)
      expect(result).toEqual(profile)
    })
  })

  it('should called profileService.findOne and bad request cuz not found' ,async()=>{
    const context = createMock<ExecutionContext>();
    const req  = context.switchToHttp().getRequest()
    req['user'] = {
      id : '123'
    }
    const profile = new Profile()
    try{
      const id = "id"
      const result = await profileController.getProfile(id ,req)
      expect(profileService.findOne).toHaveBeenCalledWith(req['user'].id)
    }catch(error){
      expect(error).toBeInstanceOf(BadRequestException)
    }
  
  })

  describe('it called profileController.patchProfile',()=>{
    it('should called profileService.udpate' ,async()=>{
      const context = createMock<ExecutionContext>();
      const req  = context.switchToHttp().getRequest()
      req['user'] = {
        id : '123'
      }
      const profile = new Profile()
      const updateProfileDto= new UpdateProfileDto()
      jest.spyOn(profileService , "update").mockResolvedValue(profile)
      const result = await profileController.patchProfile(req ,updateProfileDto)
      expect(profileService.update).toHaveBeenCalledWith(req['user'].id ,updateProfileDto)
      expect(result).toEqual(profile)
    })
  })

 

 
});
