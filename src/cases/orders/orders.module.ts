import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GuestCheckModule } from "../guest-check/guest-check.module";
import { ProductModule } from "../products/product.module";
import { OrderItem } from "./entities/order-item.entity";
import { Order } from "./entities/orders.entity";
import { OrderController } from "./orders.controller";
import { OrderService } from "./orders.service";

@Module({
    imports    : [
        TypeOrmModule.forFeature([Order, OrderItem]),
        GuestCheckModule,
        ProductModule,
    ],
    controllers: [OrderController],
    providers  : [OrderService]
})
export class OrdersModule {}
