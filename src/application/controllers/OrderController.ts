import { inject, injectable } from "tsyringe";
import { ICompleteOrderUseCase } from "../../domain/usecases/order/ICompleteOrderUseCase";
import { NextFunction, Request, Response } from "express";
import { IGetOrdersStatsUseCase } from "../../domain/usecases/order/IGetOrdersStatsUseCase";

@injectable()
export class OrderController {

    private completeOrderUseCase: ICompleteOrderUseCase;
    private getStatsUseCase: IGetOrdersStatsUseCase;

    constructor(
        @inject("ICompleteOrderUseCase") completeOrderUseCase: ICompleteOrderUseCase,
        @inject("IGetOrdersStatsUseCase") getStatsUseCase: IGetOrdersStatsUseCase
    ) {
        this.completeOrderUseCase = completeOrderUseCase;
        this.getStatsUseCase = getStatsUseCase;
    }

    createOrder = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { cartId } = request.params;
            const order = await this.completeOrderUseCase.invoke(cartId);
            response.status(201).json(order);
        } catch (error) {
            next(error);
        }
    }

    getStats = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const stats = await this.getStatsUseCase.invoke();
            response.status(200).json(stats);
        } catch (error) {
            next(error);
        }
    }
    
}