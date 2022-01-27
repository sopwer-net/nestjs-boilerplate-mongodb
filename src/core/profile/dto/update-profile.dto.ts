import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { FileManager } from '../../file-manager/file.response';
import { IsOptional, IsEnum } from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PickType(CreateProfileDto,[]) {
    
    image:FileManager

    @IsOptional()
    isTwoFA: boolean

    @IsOptional()
    fullName : string

  
}