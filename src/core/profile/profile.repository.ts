import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from '../base-repository/base-repository.service';
import { Profile, ProfileDocument } from './entities/profile.entity';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';

@Injectable()
export class ProfileRepository extends BaseRepository<ProfileDocument>{
    constructor(@InjectModel(Profile.name) private profileModel : Model<ProfileDocument>){
        super(profileModel)
    }

    async findOneAndExlcude(
        entityFilterQuery: FilterQuery<ProfileDocument>,
        projection?: Record<string, unknown>
    ): Promise<ProfileDocument | null>{

        return this.entityModel.findOne(entityFilterQuery, {}).select('-hashedPassword')
    }

    async findOneAndUpdateExclude(entityFilterQuery: FilterQuery<ProfileDocument>, updateEntityData: UpdateQuery<unknown>): Promise<ProfileDocument | null>{
        return this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, {new: true}).select('-hashedPassword')
    }

}