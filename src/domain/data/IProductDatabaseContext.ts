import { IProduct } from "../entities/IProduct";

export interface IProductDatabaseContext {
    create(document: IProduct): Promise<IProduct>;
    findAllByQuery(query: any): Promise<IProduct[]>;
    findAll(): Promise<IProduct[]>;
    findById(id: string): Promise<IProduct | null>;
}