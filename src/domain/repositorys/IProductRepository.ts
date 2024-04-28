import { IProduct } from "../entities/IProduct";

export interface IProductRepository {
    findByName(name: string): Promise<IProduct[]>;
    findProducts(): Promise<IProduct[]>;
    createProduct(product: IProduct): Promise<IProduct>;
    getProductById(productId: string): Promise<IProduct | null>;
}