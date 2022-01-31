import { ProfileRepository } from './profile.repository';
import { BaseRepository } from '../base-repository/base-repository.service';
import { FilterQuery, Model } from 'mongoose';
import { Profile, ProfileDocument } from './entities/profile.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FilterParam } from '../base-repository/pagination.params';

const model = {
    addPagination: jest.fn(), // already tested, can mock
    find: jest.fn(() => model),
    sort: jest.fn(() => model),
    select: jest.fn(() => model),
    limit: jest.fn(() => model),
    skip: jest.fn(() => []),
  };
describe('profileRepository',()=>{
    let profileRepository : ProfileRepository
    let entityModel : Model<ProfileDocument>

    beforeEach(async()=>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [
              { 
                provide: getModelToken(Profile.name) ,
                useValue : model
              },
              ProfileRepository,
            ],
        }).compile()

        profileRepository = module.get<ProfileRepository>(ProfileRepository)
        entityModel = module.get<Model<ProfileDocument>>(getModelToken(Profile.name))
    })
    
    it('should calle entityModel.find' ,async()=>{
        const profile : Profile[] = []
        const filterParam = new FilterParam()
        filterParam.limit =1
        let entityFilterQuery : FilterQuery<ProfileDocument>

        const result = await profileRepository.find(entityFilterQuery , filterParam)
        
        expect(entityModel.find).toHaveBeenCalledWith(entityFilterQuery)
        expect(entityModel.find().limit).toHaveBeenCalledWith(filterParam.limit)
    })

    it('profileRepository extends baseRepository',async()=>{
        const profileRepository = new ProfileRepository(entityModel)
        const isExtends = profileRepository instanceof BaseRepository
        expect(isExtends).toEqual(true)

    })
})