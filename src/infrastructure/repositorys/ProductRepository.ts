import { inject, injectable } from "tsyringe";
import { IProductDatabaseContext } from "../../domain/data/IProductDatabaseContext";
import { IProduct } from "../../domain/entities/IProduct";
import { IProductRepository } from "../../domain/repositorys/IProductRepository";
import { query } from "express";

@injectable()
export class ProductRepository implements IProductRepository {

    private dbContext: IProductDatabaseContext<IProduct>;

    constructor(@inject("IProductDatabaseContext") dbContext: IProductDatabaseContext<IProduct>) {
        this.dbContext = dbContext;
    }

    async findByName(name: string): Promise<IProduct[]> {
        try {
            const product = await this.dbContext.findAllByQuery(
                { 
                    name: { contains: name } 
                }
            );
            return product;
        } catch (error) {
            console.error('Error ao buscar produto:', error);
            throw error;
        }
    }

    async findProducts(): Promise<IProduct[]> {
        try {
            const products = await this.dbContext.findAll();
            return products;
        } catch (error) {
            console.error('Error ao buscar todos produtos:', error);
            throw error;
        }
    }

    async createProduct(product: IProduct): Promise<IProduct> {
        try {
            const newProduct = await this.dbContext.create(product);
            return newProduct;
        } catch (error) {
            console.error('Error ao salvar produto:', error);
            throw error;
        }
    }
}