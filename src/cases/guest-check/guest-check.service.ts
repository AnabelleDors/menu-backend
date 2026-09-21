import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Spot } from "../spots/spot.entity";
import { CreateGuestCheckDto } from './dto/create-guest-check';
import { GuestCheck, GuestCheckStatus } from "./guest-check.entity";

@Injectable()
export class GuestCheckService {
    
    constructor(
        @InjectRepository(GuestCheck)
        private readonly guestCheckRepository: Repository<GuestCheck>,
        @InjectRepository(Spot)
        private readonly spotRepository: Repository<Spot>,
    ) {}

    findOpenedBySpotId(spotId: string): Promise<GuestCheck | null> {
        return this.guestCheckRepository.findOne({
        where: {
            spot: { id: spotId },
            status: GuestCheckStatus.OPENED,
        },
        relations: { spot: true },
        });
    }

    async findOrCreateOpened(spotId: string): Promise<GuestCheck> {
    
        const opened = await this.findOpenedBySpotId(spotId);

        if (opened) {
        return opened;
        }

        return this.create({ spotId });
    }

    async findOne(id: string): Promise<GuestCheck> {
            const guestCheck = await this.guestCheckRepository.findOneBy({ id });
    
            if (!guestCheck) {
                throw new NotFoundException('ID da comanda ${id} não encontrado');
            }
    
            return guestCheck;
        }
    

    async create(dto: CreateGuestCheckDto): Promise<GuestCheck> {

        const spot = await this.spotRepository.findOneBy({ id: dto.spotId, active: true });

        if (!spot) {
            throw new NotFoundException('Mesa não encontrada ou inativa');
        }
        
        const opened = await this.guestCheckRepository.exists({ where: { spot: { id: dto.spotId }, status: GuestCheckStatus.OPENED }});

        if (opened) {
            throw new BadRequestException('Já existe uma comanda em aberto para esta mesa');
        }

        const guestCheck = this.guestCheckRepository.create({
            spot,
            status: GuestCheckStatus.OPENED
        });

        return this.guestCheckRepository.save(guestCheck);
    }

    async close(id: string): Promise<GuestCheck> {
        const guestCheck = await this.findOne(id);

        if (!guestCheck) {
            throw new NotFoundException('Comanda não encontrada');
        }

        if (guestCheck.status === GuestCheckStatus.CLOSED) {
            throw new BadRequestException('Comanda já está fechada');
        }

        guestCheck.status = GuestCheckStatus.CLOSED;

        return this.guestCheckRepository.save(guestCheck);
    }

}