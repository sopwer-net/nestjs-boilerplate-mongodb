import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, Query, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/authenticator/jwt-auth.guard';
import { Profile } from './entities/profile.entity';
import { FilterParam } from '../base-repository/pagination.params';

@Controller('profiles')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

 

  @Get()
  findAll(@Query()filterParam : FilterParam) {
    return this.profileService.findAll(filterParam);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() request): Promise<Profile> {
    console.log(request.user)
    const profile = await this.profileService.findOne(request.user.id);
    if (!profile){
      throw new BadRequestException('Profile Not Found')
    }
    return profile;
  }

  @Patch('/me')
  async patchProfile(@Req() request,@Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(request.user.id, updateProfileDto);
  }

 
}
