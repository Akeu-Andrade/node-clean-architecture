import { PrismaClient, Product } from "@prisma/client";
import { IProductDatabaseContext } from "../../../domain/data/IProductDatabaseContext";

export class ProductDatabaseContext implements IProductDatabaseContext {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(document: Product): Promise<Product> {
        return this.prisma.product.create({ data: document });
    }

    async findAllByQuery(query: any): Promise<Product[]> {
        return this.prisma.product.findMany({ where: query });
    }

    async findAll(): Promise<Product[]> {
        return this.prisma.product.findMany({});
    }

    async findById(id: string): Promise<Product | null> {
        return this.prisma.product.findUnique({ where: { id } });
    }
    
}

