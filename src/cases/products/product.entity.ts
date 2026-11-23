import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 60 })
    name: string;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @Column({ type: 'text', nullable: true })
    description?: string | null;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'text', nullable: true })
    picture?: string | null;

    @Column({ type: 'boolean', default: false })
    vegetarian: boolean;

    @Column({ name: 'is_new', type: 'boolean', default: false })
    isNew: boolean;

    @ManyToOne(() => Category, { nullable: true })
    @JoinColumn({ name: 'category_id' })
    category: Category | null;
}