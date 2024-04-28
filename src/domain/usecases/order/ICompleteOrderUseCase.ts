import { IOrder } from "../../entities/IOrder";

export interface ICompleteOrderUseCase {
    invoke(cartId: string): Promise<IOrder>;
}