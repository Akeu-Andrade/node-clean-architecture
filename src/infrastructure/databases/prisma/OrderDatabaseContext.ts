import { Order, PrismaClient } from "@prisma/client";
import { IOrderDatabaseContext } from "../../../domain/data/IOrderDataBase";

export class OrderDatabaseContext implements IOrderDatabaseContext {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    
    async create(order: Order): Promise<Order> {
        const {orderItems, ...orderWithoutItems } = (order as any);

        const orderData = {
            ...orderWithoutItems,
            orderItems: {
                createMany: {
                    data: orderItems
                }
            }
        };
    
        return await this.prisma.order.create({ data: orderData });
    }
}