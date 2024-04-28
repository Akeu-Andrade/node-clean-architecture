import { inject, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { ICreateCartUseCase } from "../../domain/usecases/cart/ICreateCartUseCase";
import { AddProductToCartUseCase } from "../useCases/cart/AddProductToCartUseCase";
import { IGetCartUseCase } from "../../domain/usecases/cart/IGetCartUseCase";

@injectable()
export class CartController {
    private createCartUseCase: ICreateCartUseCase;
    private addProductToCartUseCase: AddProductToCartUseCase;
    private getCartUseCase: IGetCartUseCase;

    constructor(
        @inject("ICreateCartUseCase") createCartUseCase: ICreateCartUseCase,
        @inject("IAddProductToCartUseCase") addProductToCartUseCase: AddProductToCartUseCase,
        @inject("IGetCartUseCase") getCartUseCase: IGetCartUseCase
    ) {
        this.createCartUseCase = createCartUseCase;
        this.addProductToCartUseCase = addProductToCartUseCase;
        this.getCartUseCase = getCartUseCase;
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

    addProductToCart = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { productId, quantity } = request.body;
            const { cartId } = request.params;
            const cart = await this.addProductToCartUseCase.invoke(cartId, productId, quantity);
            response.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    }

    getCart = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { cartId } = request.body;
            const cart = await this.getCartUseCase.invoke(cartId);
            response.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    }

}