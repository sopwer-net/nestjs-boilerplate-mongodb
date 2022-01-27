import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './entities/profile.entity';
import { Account, AccountSchema } from './entities/account.entity';
import { ProfileRepository } from './profile.repository';

@Module({
  imports :[
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService , ProfileRepository] ,
  exports : [ProfileService]
})
export class ProfileModule {}
