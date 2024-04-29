import { IOrder } from "../entities/IOrder";
import { IOrderStats } from "../entities/IOrderStats";

export interface IOrderRepository {
    createOrder(order: IOrder): Promise<IOrder>;
    getStats(): Promise<IOrderStats>;
}