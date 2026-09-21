import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Spot } from '../spots/spot.entity';

export enum GuestCheckStatus {
    OPENED = 'OPENED',
    CLOSED = 'CLOSED'
}

@Entity('guest_check')
export class GuestCheck {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'created_at' })
    createdAt: Date;

    @Column({ 
        type: 'enum', 
        enum: GuestCheckStatus, 
        default: GuestCheckStatus.CLOSED 
    })
    status: GuestCheckStatus;

    @ManyToOne(() => Spot, { nullable: false })
    @JoinColumn({ name: 'spot_id' })
    spot: Spot;
}