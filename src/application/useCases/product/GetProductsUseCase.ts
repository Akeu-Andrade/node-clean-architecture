import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../../../domain/repositorys/IProductRepository";
import { IGetProductsUseCase } from "../../../domain/usecases/product/IGetProductsUseCase";

@injectable()
export class GetProductsUseCase implements IGetProductsUseCase {
    private productRepository: IProductRepository;

    constructor(
        @inject("IProductRepository") productRepository: IProductRepository
    ) {
        this.productRepository = productRepository;
    }

    async invoke(name?: string) {
        try {
            if (name) {
                return await this.productRepository.findByName(name);
            } else {
                return await this.productRepository.findProducts();
            }
        } catch (error) {
            console.error(`Error while getting products: ${error}`);
            throw error;
        }
    }
}