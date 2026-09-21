import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GuestCheck } from "../guest-check/guest-check.entity";
import { Product } from "../products/product.entity";
import { OrderItem } from "./entities/order-item.entity";
import { Order } from "./entities/orders.entity";
import { OrderController } from "./orders.controller";
import { OrderService } from "./orders.service";

@Module({
    imports    : [TypeOrmModule.forFeature([GuestCheck, Product, Order, OrderItem])],
    controllers: [OrderController],
    providers  : [OrderService]
})
export class OrdersModule {}