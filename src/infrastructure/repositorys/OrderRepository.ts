import { inject, injectable } from "tsyringe";
import { IOrderDatabaseContext } from "../../domain/data/IOrderDataBase";
import { IOrder } from "../../domain/entities/IOrder";
import { IOrderRepository } from "../../domain/repositorys/IOrderRepository";

@injectable()
export class OrderRepository implements IOrderRepository {

    private dbContext: IOrderDatabaseContext;

    constructor(
        @inject("IOrderDatabaseContext") dbContext: IOrderDatabaseContext
    ) {
        this.dbContext = dbContext;
    }

    async createOrder(order: IOrder): Promise<IOrder> {
        try {
            const newOrder = await this.dbContext.create(order);
            return newOrder;
        } catch (error) {
            throw error;
        }
    }
}