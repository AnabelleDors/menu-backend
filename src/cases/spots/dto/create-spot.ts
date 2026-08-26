import { MaxLength, IsOptional, IsNotEmpty, IsString } from "class-validator";

export class CreateSpotDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    name: string;
}