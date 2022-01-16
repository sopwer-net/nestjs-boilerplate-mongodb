import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class FilterParam{
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    skip?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(50)
    limit?: number;

    @IsOptional()
    @Type(()=>String)
    @IsString()
    keyword?:string

    @IsOptional()
    @Type(()=>String)
    @IsString()
    lastId?: string
    

}