import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 60 })
    name: string;

    @Column({ type: 'text', nullable: true })
    icon: string | null;

    @Column({ name: 'display_order', type: 'integer', default: 0 })
    displayOrder: number;

    @Column({ type: 'boolean', default: true })
    active: boolean;
}