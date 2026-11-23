import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    name?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    icon?: string
    
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}