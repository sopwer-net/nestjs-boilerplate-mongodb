import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from '../base-repository/base-repository.service';
import { Profile, ProfileDocument } from './entities/profile.entity';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';
import { FilterParam } from "../base-repository/pagination.params";

@Injectable()
export class ProfileRepository extends BaseRepository<ProfileDocument>{
    constructor(@InjectModel(Profile.name) private profileModel : Model<ProfileDocument>){
        super(profileModel)
    }

    async find(entityFilterQuery?: FilterQuery<ProfileDocument>, filterParam?:FilterParam): Promise<ProfileDocument[] | null>{

        return this.entityModel.find(entityFilterQuery).limit(filterParam.limit)
        .select('fullName').select('email').select('phoneNumber').select('image');
        
    }


    async findOneAndExlcude(
        entityFilterQuery: FilterQuery<ProfileDocument>,
        projection?: Record<string, unknown>
    ): Promise<ProfileDocument | null>{

        return this.entityModel.findOne(entityFilterQuery, {})
        .select('fullName').select('email').select('phoneNumber').select('image');
    }

    async findOneAndUpdateExclude(entityFilterQuery: FilterQuery<ProfileDocument>, updateEntityData: UpdateQuery<unknown>): Promise<ProfileDocument | null>{
        return this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, {new: true})
        .select('fullName').select('email').select('phoneNumber').select('image');
    }

}