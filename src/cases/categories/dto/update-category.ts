import { MaxLength, IsOptional, IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class UpdateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    name: string;

    @IsOptional()
    @IsBoolean()
    active: boolean;
}