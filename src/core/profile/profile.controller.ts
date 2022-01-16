import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-guard/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getProfile(): Promise<IProfile> {
    const profile = await this.profileService.findOne(1);
    if (!profile){
      throw new BadRequestException('Profile Not Found')
    }
    return profile;
  }

  @Patch('/me')
  async patchProfile(@Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(1, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
