import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ISaveProductUseCase } from "../../domain/usecases/product/ISaveProductUseCase";
import { IGetProductsUseCase } from "../../domain/usecases/product/IGetProductsUseCase";

@injectable()
export class ProductController {
    private saveProductUseCase: ISaveProductUseCase;
    private getProductsUseCase: IGetProductsUseCase;

    constructor(
        @inject("ISaveProductUseCase") saveProductUseCase: ISaveProductUseCase,
        @inject("IGetProductsUseCase") getProductsUseCase: IGetProductsUseCase
    ) {
        this.saveProductUseCase = saveProductUseCase;
        this.getProductsUseCase = getProductsUseCase;
    }

    createProduct = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const product = await this.saveProductUseCase.invoke(request.body);
            response.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    getProducts = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { name } = request.body;
            const products = await this.getProductsUseCase.invoke(name);
            response.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }
}