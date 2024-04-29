import { IOrderStats } from "../../entities/IOrderStats";

export interface IGetOrdersStatsUseCase {
    invoke(): Promise<IOrderStats>;
}