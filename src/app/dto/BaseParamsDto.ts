import { Type } from "class-transformer";
import { IsDefined, IsNumber, IsUUID, Min } from "class-validator";

export class BaseParamsDto {

    @IsUUID()
    @IsDefined()
    public userId: string;
}

export class SearchParamsDto {
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public limit: number;
  
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public offset: number;
  }