import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpotController } from "./spot.controller";
import { Spot } from "./spot.entity";
import { SpotService } from "./spot.service";

@Module({
    imports    : [TypeOrmModule.forFeature([Spot])],
    controllers: [SpotController],
    providers  : [SpotService],
    exports    : [SpotService]
})
export class SpotModule {}