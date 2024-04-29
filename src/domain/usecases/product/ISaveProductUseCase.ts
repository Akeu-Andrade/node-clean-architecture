import { Product } from "../../entities/IProduct";

export interface ISaveProductUseCase {
    invoke(product: Product): Promise<Product>;
}