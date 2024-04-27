import { Product } from "../../entities/Product";

export interface ISaveProductUseCase {
    execute(product: Product): Promise<Product>;
}