import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product";
import { UpdateProductDto } from "./dto/update-product";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ){}

    @Get()
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(
        @Param('id', ParseUUIDPipe)
        id: string
    ): Promise<Product> {
        return this.productService.findOne(id);
    }

    @Post()
    create(
        @Body()
        dto: CreateProductDto
    ): Promise<Product> {
        return this.productService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe)
        id: string,
        @Body()
        dto: UpdateProductDto
    ): Promise<Product> {
        return this.productService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(
        @Param('id', ParseUUIDPipe)
        id: string
    ): Promise<void> {
        return this.productService.remove(id);
    }

}