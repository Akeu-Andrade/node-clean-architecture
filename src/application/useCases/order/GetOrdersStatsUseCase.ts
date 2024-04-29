import { inject, injectable } from "tsyringe";
import { IOrderRepository } from "../../../domain/repositorys/IOrderRepository";
import { IGetOrdersStatsUseCase } from "../../../domain/usecases/order/IGetOrdersStatsUseCase";
import { IOrderStats } from "../../../domain/entities/IOrderStats";

@injectable()
export class GetOrdersStatsUseCase implements IGetOrdersStatsUseCase {
    private orderRepository: IOrderRepository;

    constructor(
        @inject("IOrderRepository") orderRepository: IOrderRepository) {
        this.orderRepository = orderRepository;
    }

    async invoke(): Promise<IOrderStats> {
        try {
            return await this.orderRepository.getStats();
        } catch (error) {
            throw error;
        }
    }

}