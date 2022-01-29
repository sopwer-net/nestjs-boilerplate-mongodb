import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { FileManager } from '../../file-manager/file.response';
import { IsOptional, IsEnum, IsString, IsEmpty } from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PickType(CreateProfileDto,['isVerified' ,'password']) {
    

    @IsOptional()
    isTwoFA: boolean

    @IsOptional()
    fullName : string
    
    @IsEmpty()
    password:string

 

  
}