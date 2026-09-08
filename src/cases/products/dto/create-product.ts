import { MaxLength, IsOptional, IsNotEmpty, IsString, IsNumber, Min, IsUUID, IsBoolean, IsUrl } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    name: string

    @IsOptional()
    @IsString()
    description?: string

    @IsNumber( { maxDecimalPlaces: 2 } )
    @Min(0)
    price: number

    @IsOptional()
    @IsUUID()
    category_id?: string

    @IsOptional()
    @IsBoolean()
    active?: boolean

    @IsOptional()
    @IsUrl({ require_protocol: true })
    picture_url?: string
    
}