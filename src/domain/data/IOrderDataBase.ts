import { IOrder } from "../entities/IOrder";

export interface IOrderDatabaseContext {
    create(cart: IOrder): Promise<IOrder>;
}