import { Body, Controller, Get, Param, ParseEnumPipe, ParseUUIDPipe, Patch, Post, Query } from "@nestjs/common";
import { CreateGuestCheckDto } from "./dto/create-guest-check";
import { GuestCheck, GuestCheckStatus } from "./guest-check.entity";
import { GuestCheckService } from "./guest-check.service";

@Controller('guest-check')
export class GuestCheckController {

    constructor(
        private readonly guestCheckService: GuestCheckService
    ){}

    @Get()
    findAll(
        @Query('status', new ParseEnumPipe(GuestCheckStatus, { optional: true }))
        status?: GuestCheckStatus,
    ) {
        return this.guestCheckService.findAll(status);
    }

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