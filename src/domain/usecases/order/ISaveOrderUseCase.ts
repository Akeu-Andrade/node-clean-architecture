import { IOrder } from "../../entities/IOrder";

export interface ISaveOrderUseCase {
    execute(order: IOrder): Promise<IOrder>;
}