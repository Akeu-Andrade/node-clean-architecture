import { inject, injectable } from "tsyringe";
import { ISaveProductUseCase } from "../../../domain/usecases/product/ISaveProductUseCase";
import { IProductRepository } from "../../../domain/repositorys/IProductRepository";
import { IProduct } from "../../../domain/entities/IProduct";
import { InvalidParametersError } from "../../../domain/errors/InvalidParametersError";
import { ProductAlreadyExistsError } from "../../../domain/errors/ProductAlreadyExistsError";

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
            if (!product.name) {
                throw new InvalidParametersError();
            }

            const productExists = await this.productRepository.findByName(product.name);
            if (productExists.length > 0) {
                throw new ProductAlreadyExistsError();
            }

            return await this.productRepository.createProduct(product);
        } catch (error) {
            throw error;
        }
    }
}