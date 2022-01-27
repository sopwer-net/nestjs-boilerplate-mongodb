import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from '../base-repository/base-repository.service';
import { Profile, ProfileDocument } from './entities/profile.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProfileRepository extends BaseRepository<ProfileDocument>{
    constructor(@InjectModel(Profile.name) private profileModel : Model<ProfileDocument>){
        super(profileModel)
    }
}