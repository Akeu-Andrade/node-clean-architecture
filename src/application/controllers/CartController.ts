import { inject, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { ICreateCartUseCase } from "../../domain/usecases/cart/ICreateCartUseCase";

@injectable()
export class CartController {
    private createCartUseCase: ICreateCartUseCase;

    constructor(
        @inject("ICreateCartUseCase") createCartUseCase: ICreateCartUseCase,
    ) {
        this.createCartUseCase = createCartUseCase;
    }

    createCart = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId } = request.body;
            const cart = await this.createCartUseCase.invoke(userId ? userId : null);
            response.status(201).json(cart);
        } catch (error) {
            next(error);
        }
    }

}