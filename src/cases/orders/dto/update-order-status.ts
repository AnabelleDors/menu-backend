import { IsEnum } from "class-validator";
import { OrderStatus } from "../entities/orders.entity";

export class UpdateOrderStatusDto {
    @IsEnum(OrderStatus)
    status: OrderStatus;
}