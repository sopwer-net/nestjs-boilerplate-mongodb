import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {

  constructor(private profileRepository : ProfileRepository){

  }

  create(createProfileDto: CreateProfileDto) :Promise<Profile>{
    return this.profileRepository.save({hashedPassword : createProfileDto.password ,...createProfileDto})
  }

  findAll() {
    return `This action returns all profile`;
  }

  async findOne(id: string)  : Promise<Profile>{
    return new Profile();
  }

  async findOneByEmail(email : string) : Promise<Profile>{
    return this.profileRepository.findOne({email : email})
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return this.profileRepository.findOneAndUpdate({_id : id} ,{hashedPassword:updateProfileDto.password ,...updateProfileDto});
  }


  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
