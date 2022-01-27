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

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
