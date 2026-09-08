import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../categories/category.entity";
import { CreateProductDto } from './dto/create-product';
import { UpdateProductDto } from "./dto/update-product";
import { Product } from "./product.entity";

@Injectable()
export class ProductService {
    
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}

    findAll(): Promise<Product[]> {
        return this.productRepository.find({
            order: {name: 'ASC'},
            relations: { category: true }
        });
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productRepository.findOne( {
            where: { id },
            relations: { category: true }});

        if (!product) {
            throw new NotFoundException('ID do produto ${id} não encontrado');
        }

        return product;
    }

    async create(dto: CreateProductDto): Promise<Product> {
        const category = dto.category_id ? await this.getActiveCategory(dto.category_id) : null;

        const product = this.productRepository.create({
            ...dto,
            name: dto.name.trim(),
            description: dto.description,
            price: dto.price,
            picture: dto.picture_url,
            active: true,
            category
        });
        return this.productRepository.save(product);
    }

    async update(id: string, dto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);

        if (dto.name !== undefined) {
            product.name = dto.name;
        }

        if (dto.description !== undefined) {
            product.description = dto.description;
        }

        if (dto.price !== undefined) {
            product.price = dto.price;
        }

        if (dto.picture_url !== undefined) {
            product.picture = dto.picture_url;
        }

        if (dto.active !== undefined) {
            product.active = dto.active;
        }

        if (dto.category_id !== undefined) {
            product.category = dto.category_id ? await this.getActiveCategory(dto.category_id) : null;
        }

        return this.productRepository.save(product);
    }

    async remove(id: string): Promise<void> {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
    }

    private async getActiveCategory(id: string): Promise<Category> {
        const category = await this.categoryRepository.findOneBy({
            id,
            active: true
        })
        if (!category) {
            throw new NotFoundException('Categoria não encontrada ou inativa');
        }
        return category;
    }

}