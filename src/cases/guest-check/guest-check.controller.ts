import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreateGuestCheckDto } from "./dto/create-guest-check";
import { GuestCheck } from "./guest-check.entity";
import { GuestCheckService } from "./guest-check.service";

@Controller('guest-check')
export class GuestCheckController {

    constructor(
        private readonly guestCheckService: GuestCheckService
    ){}

    @Get(':id')
    findOne(
        @Param('id', ParseUUIDPipe)
        id: string,
    ): Promise<GuestCheck> {
        return this.guestCheckService.findOne(id);
    }

    @Post()
    create(
        @Body()
        dto: CreateGuestCheckDto
    ): Promise<GuestCheck> {
        return this.guestCheckService.create(dto);
    }

    @Patch(':id/close')
    close(
        @Param('id', ParseUUIDPipe)
        id: string,
    ): Promise<GuestCheck> {
        return this.guestCheckService.close(id);
    }

}