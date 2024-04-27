import { IProduct } from "../../entities/IProduct";

export interface IGetProductsUseCase {
    invoke(name?: string | null): Promise<IProduct[]>;
}