import { IOrder } from "../../entities/IOrder";

export interface IGetOrderUseCase {
    execute(id: string): Promise<IOrder>;
}