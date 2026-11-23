import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    name?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    icon?: string | null

    @IsOptional()
    @IsInt()
    @Min(0)
    displayOrder?: number;
    
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}