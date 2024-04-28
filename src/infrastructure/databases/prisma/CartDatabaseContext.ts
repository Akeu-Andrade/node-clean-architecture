import { Cart, PrismaClient } from "@prisma/client";
import { ICartDatabaseContext } from "../../../domain/data/ICartDatabaseContext";

export class CartDatabaseContext implements ICartDatabaseContext {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(cart: Cart): Promise<Cart> {
        return await this.prisma.cart.create({ data: cart });
    }

    async findById(id: string): Promise<Cart | null> {
        return await this.prisma.cart.findUnique({ where: { id } });
    }

    async update(id: string, updatedCart: Cart): Promise<Cart> {
        return await this.prisma.cart.update({ where: { id }, data: updatedCart });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.cart.delete({ where: { id } });
    }

    async findOne(filter: any): Promise<Cart | null> {
        return await this.prisma.cart.findFirst({ where: filter });
    }
}