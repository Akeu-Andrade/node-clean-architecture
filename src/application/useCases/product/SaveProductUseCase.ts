import { inject, injectable } from "tsyringe";
import { ISaveProductUseCase } from "../../../domain/usecases/product/ISaveProductUseCase";
import { IProductRepository } from "../../../domain/repositorys/IProductRepository";
import { IProduct } from "../../../domain/entities/IProduct";

@injectable()
export class SaveProductUseCase implements ISaveProductUseCase {
    private productRepository: IProductRepository;

    constructor(
        @inject("IProductRepository") productRepository: IProductRepository
    ) {
        this.productRepository = productRepository;
    }

    async invoke(product: IProduct): Promise<IProduct> {
        try {
            return await this.productRepository.createProduct(product);
        } catch (error) {
            throw error;
        }
    }
}