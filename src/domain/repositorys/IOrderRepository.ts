import { IOrder } from "../entities/IOrder";

export interface IOrderRepository {
    createOrder(order: IOrder): Promise<IOrder>;
}