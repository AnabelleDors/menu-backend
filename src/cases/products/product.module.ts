import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../categories/category.entity";
import { ProductController } from "./product.controller";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Module({
    imports    : [TypeOrmModule.forFeature([Category, Product])],
    controllers: [ProductController],
    providers  : [ProductService],
    exports    : [ProductService]
})
export class ProductModule {}