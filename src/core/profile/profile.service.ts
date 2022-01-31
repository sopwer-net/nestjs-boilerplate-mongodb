import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { ProfileRepository } from './profile.repository';
import { FilterParam } from '../base-repository/pagination.params';

@Injectable()
export class ProfileService {

  constructor(private profileRepository : ProfileRepository){

  }

  create(createProfileDto: CreateProfileDto) :Promise<Profile>{
    return this.profileRepository.save({hashedPassword : createProfileDto.password ,...createProfileDto})
  }

  findAll(filterParam : FilterParam) : Promise<Profile[]> {
    return this.profileRepository.find({isActive : true} , new FilterParam())
  }

  async findOne(id: string)  : Promise<Profile>{
    return  this.profileRepository.findOneAndExlcude({_id : id , isActive : true})
  }

  async findOneByEmail(email : string) : Promise<Profile>{
    return this.profileRepository.findOne({email : email , isActive : true})
  }

  update(id: string, updateProfileDto: UpdateProfileDto) : Promise<Profile> {
    return this.profileRepository.findOneAndUpdateExclude({_id : id} ,{hashedPassword:updateProfileDto.password ,...updateProfileDto});
  }



 
}
