import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-orders";
import { UpdateOrderStatusDto } from "./dto/update-order-status";
import { Order } from "./entities/orders.entity";
import { OrderService } from "./orders.service";

@Controller('orders')
export class OrderController {

    constructor(
        private readonly orderService: OrderService
    ){}

    @Post()
    create(
        @Body()
        dto: CreateOrderDto
    ): Promise<Order> {
        return this.orderService.create(dto);
    }

    @Get()
    findAll(
        @Query('guestCheckId', new ParseUUIDPipe({ optional: true }))
        guestCheckId?: string
    ): Promise<Order[]> {
        return this.orderService.findAll(guestCheckId);
    }
    
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
        return this.orderService.findOne(id);
    }

    
    @Patch(':id/status')
    updateStatus(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() dto: UpdateOrderStatusDto): Promise<Order> {
        return this.orderService.updateStatus(id, dto);
    }

}