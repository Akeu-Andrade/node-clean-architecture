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

    async count(): Promise<number> {
        return await this.prisma.order.count();
    }

    async sum(field: string): Promise<number> {
        const total = await this.prisma.order.aggregate({
            _sum: {
                [field]: true
            }
        });

        return total._sum[field];
    }

    async getTopProductId(): Promise<string> {
        const groupedItems = await this.prisma.orderItem.groupBy({
            by: ['productId'],
            _count: {
                productId: true
            }
        });
    
        if (!groupedItems || groupedItems.length === 0) {
            return '';
        }
    
        const sortedProducts = groupedItems.sort((a, b) => b._count.productId - a._count.productId);
        return sortedProducts[0].productId;
    }
}