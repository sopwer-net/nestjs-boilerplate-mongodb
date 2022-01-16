import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { FilterParam } from './pagination.params';

export abstract class BaseRepository<T extends Document> {
    constructor(protected readonly entityModel: Model<T>){}

    async findOne(
        entityFilterQuery: FilterQuery<T>,
        projection?: Record<string, unknown>
    ): Promise<T | null>{

        return this.entityModel.findOne(entityFilterQuery, {
            _id: 1,
            __v: 0,
            ...projection
        }).exec();
    }

    async findOneAndPopulate(
        entityFilterQuery: FilterQuery<T>,
        field : string
    ): Promise<T | null>{

        return (await this.entityModel.findOne(entityFilterQuery)).populated(field).exec();
    }

    


    async deleteOne(
        entityFilterQuery: FilterQuery<T>,      
    ){
        return this.entityModel.deleteOne(entityFilterQuery, {
            _id: 1,
            __v: 0
        })
    }

    async findOneAndDelete(
        entityFilterQuery: FilterQuery<T>,      
    ){
        return this.entityModel.findOneAndDelete(entityFilterQuery, {
            _id: 1,
            __v: 0
        })
    }

    async find(entityFilterQuery?: FilterQuery<T>, filterParam?:FilterParam): Promise<T[] | null>{

        return this.entityModel.find(entityFilterQuery).limit(filterParam.limit);
        
    }

   

    async save(createEntityData: any): Promise<T>{
        const entity = new this.entityModel(createEntityData);
        return entity.save();
    }

    async findOneAndUpdate(entityFilterQuery: FilterQuery<T>, updateEntityData: UpdateQuery<unknown>): Promise<T | null>{
        return this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, {new: true})
    }

    async findOneAndUpdateandPopulate(entityFilterQuery: FilterQuery<T>, updateEntityData: UpdateQuery<unknown> , field:string): Promise<T | null>{
        return this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, {new: true}).populate(field)
    }

    async count(entityFilterQuery: FilterQuery<T> , filterParam? : FilterParam){
        return this.entityModel.count(entityFilterQuery).limit(filterParam.limit) 
    }

}
