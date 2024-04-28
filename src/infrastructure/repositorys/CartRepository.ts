import { inject, injectable } from "tsyringe";
import { ICartDatabaseContext } from "../../domain/data/ICartDatabaseContext";
import { ICart } from "../../domain/entities/ICart";
import { ICartRepository } from "../../domain/repositorys/ICartRepository";

@injectable()
export class CartRepository implements ICartRepository {

    private dbContext: ICartDatabaseContext;

    constructor(
        @inject("ICartDatabaseContext") dbContext: ICartDatabaseContext
    ) {
        this.dbContext = dbContext;
    }

    async createCart(iCart: ICart): Promise<ICart> {
        try {
            const cart = await this.dbContext.create({ userId: iCart.userId });
            return cart;
        } catch (error) {
            console.error('Error ao criar carrinho:', error);
            throw new Error('Não foi possível criar o carrinho');
        }
    }

    async addProductToCart(
        cartId: string, 
        productId: string, 
        quantity: number
    ): Promise<ICart> {
        try {
            const cart = await this.dbContext.findById(cartId);
            if (!cart) {
                throw new Error('Carrinho não encontrado');
            }
            const product = await this.dbContext.addProductToCart(cartId, productId, quantity);
            return product;
        } catch (error) {
            console.error('Error ao adicionar produto ao carrinho:', error);
            throw new Error('Não foi possível adicionar o produto ao carrinho');
        }
    }

    async getCartById(cartId: string): Promise<ICart | null> {
        try {
            const cart = await this.dbContext.findById(cartId);
            return cart;
        } catch (error) {
            console.error('Error ao buscar carrinho:', error);
            throw new Error('Não foi possível buscar o carrinho');
        }
    }

    async deleteCart(cartId: string): Promise<void> {
       
    }

    async getCartByUserId(userId: string): Promise<ICart | null> {
        try {
            const cart = await this.dbContext.findOne({ userId });
            return cart;
        } catch (error) {
            console.error('Error ao buscar carrinho:', error);
            throw new Error('Não foi possível buscar o carrinho');
        }
    }
}