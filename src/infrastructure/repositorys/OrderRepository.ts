import { inject, injectable } from "tsyringe";
import { IOrderDatabaseContext } from "../../domain/data/IOrderDataBase";
import { IOrder } from "../../domain/entities/IOrder";
import { IOrderRepository } from "../../domain/repositorys/IOrderRepository";
import { IOrderStats } from "../../domain/entities/IOrderStats";
import { IProductDatabaseContext } from "../../domain/data/IProductDatabaseContext";

@injectable()
export class OrderRepository implements IOrderRepository {

    private orderDbContext: IOrderDatabaseContext;
    private productDbContext: IProductDatabaseContext;

    constructor(
        @inject("IOrderDatabaseContext") dbContext: IOrderDatabaseContext,
        @inject("IProductDatabaseContext") productDbContext: IProductDatabaseContext
    ) {
        this.orderDbContext = dbContext;
        this.productDbContext = productDbContext;
    }

    async createOrder(order: IOrder): Promise<IOrder> {
        try {
            const newOrder = await this.orderDbContext.create(order);
            return newOrder;
        } catch (error) {
            throw error;
        }
    }

    async getStats(): Promise<IOrderStats> {
        try {
            const totalOrders = await this.orderDbContext.count();
            const totalRevenue = await this.orderDbContext.sum('totalPrice');
            const averageOrderValue = totalRevenue / totalOrders;

            const getTopProduct = await this.getTopProduct();

            return {
                totalOrders,
                totalRevenue,
                averageOrderValue,
                getTopProduct
            }
        } catch (error) {
            throw error;
        }
    }

    private async getTopProduct(): Promise<string> {
        try {
            const productId = await this.orderDbContext.getTopProductId();
            if (!productId) {
                return '';
            }

            const product = await this.productDbContext.findById(productId);
            return product?.name || '';
        } catch (error) {
            throw error;
        }
    }

}