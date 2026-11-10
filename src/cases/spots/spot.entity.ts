import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('spots')
export class Spot {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 60 })
    name: string;

    @Column({ type: 'boolean', default: true })
    active: boolean;
}