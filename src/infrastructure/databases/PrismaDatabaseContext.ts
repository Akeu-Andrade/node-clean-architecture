import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { IDatabaseContext } from "../../domain/data/IDatabaseContext";

export class PrismaDatabaseContext<T> implements IDatabaseContext<T> {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(document: T): Promise<T> {
        const result = await this.prisma.user.create({ data: document as any });
        return result as any;
    }

    async findOne(query: any): Promise<T | null> {
        const result = await this.prisma.user.findFirst({ where: query as any });
        return result as any;
    }

}