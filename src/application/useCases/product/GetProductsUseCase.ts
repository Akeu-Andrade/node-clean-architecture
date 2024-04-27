import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../../../domain/repositorys/IProductRepository";

@injectable()
export class GetProductsUseCase {
    constructor(
        @inject("IProductRepository") private productRepository: IProductRepository
    ) {}

    async invoke(name?: string) {
        try {
            console.log(name);
            
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