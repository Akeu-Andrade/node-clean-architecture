import { inject, injectable } from "tsyringe";
import { ICompleteOrderUseCase } from "../../domain/usecases/order/ICompleteOrderUseCase";
import { NextFunction, Request, Response } from "express";

@injectable()
export class OrderController {

    private completeOrderUseCase: ICompleteOrderUseCase;

    constructor(
        @inject("ICompleteOrderUseCase") completeOrderUseCase: ICompleteOrderUseCase
    ) {
        this.completeOrderUseCase = completeOrderUseCase;
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

    
}