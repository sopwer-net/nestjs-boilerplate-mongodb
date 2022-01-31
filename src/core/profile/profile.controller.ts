import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, Query, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/authentication/jwt-auth.guard';
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

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Param('id')id : string,@Req() request): Promise<Profile> {
    if(id == "me"){
      return  await this.profileService.findOne(request.user.id);
    }
    const profile = await this.profileService.findOne(id)
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
