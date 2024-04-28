import { Cart, PrismaClient } from "@prisma/client";
import { ICartDatabaseContext } from "../../../domain/data/ICartDatabaseContext";
import { ObjectNotFoundError } from "../../../domain/errors/ObjectNotFoundError";

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

    async addProductToCart(cartId: string, productId: string, quantity: number): Promise<Cart> {
        const cartItem = await this.prisma.cartItem.create({
            data: {
                quantity,
                cart: {
                    connect: {
                        id: cartId
                    }
                },
                product: {
                    connect: {
                        id: productId
                    }
                }
            }
        });

        const cart = await this.prisma.cart.findUnique({ where: { id: cartId }, include: { cartItems: true } });
    
        if (!cart) {
            throw new ObjectNotFoundError("Carrinho não encontrado");
        }

        return cart;

    }
}