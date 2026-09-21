import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Spot } from "../spots/spot.entity";
import { GuestCheckController } from "./guest-check.controller";
import { GuestCheck } from "./guest-check.entity";
import { GuestCheckService } from "./guest-check.service";

@Module({
    imports    : [TypeOrmModule.forFeature([Spot, GuestCheck])],
    controllers: [GuestCheckController],
    providers  : [GuestCheckService],
    exports    : [GuestCheckService],
})
export class GuestCheckModule {}