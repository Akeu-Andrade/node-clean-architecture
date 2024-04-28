import { IOrder } from "../entities/IOrder";

export interface IOrderDatabaseContext {
    create(cart: IOrder): Promise<IOrder>;
    count(): Promise<number>;
    sum(field: string): Promise<number>;
    getTopProductId(): Promise<string>;
}