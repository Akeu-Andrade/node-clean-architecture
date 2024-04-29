import { inject, injectable } from "tsyringe";
import { ICartDatabaseContext } from "../../domain/data/ICartDatabaseContext";
import { ICart } from "../../domain/entities/ICart";
import { ICartRepository } from "../../domain/repositorys/ICartRepository";
import { ObjectNotFoundError } from "../../domain/errors/ObjectNotFoundError";
import { IProduct } from "../../domain/entities/IProduct";

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
                throw new ObjectNotFoundError('Carrinho não encontrado');
            }

            const newCart = await this.dbContext.addProductToCart(cartId, productId, quantity);
            return newCart;

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
        throw new Error("Method not implemented.");
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

    async clearCart(cartId: string): Promise<void> {
        try {
            await this.dbContext.clearCart(cartId);
        } catch (error) {
            console.error('Error ao limpar carrinho:', error);
            throw new Error('Não foi possível limpar o carrinho');
        }
    }

    async updateProductInCart(
        cart: ICart, 
        product: IProduct, 
        quantity: number
    ): Promise<ICart> {
        try {
            const productInCart = cart!.cartItems?.find(it => it.productId === product.id) as any;

            if (!productInCart) {
                throw new ObjectNotFoundError('Produto não encontrado no carrinho');
            }

            await this.dbContext.updateItem(productInCart.id , { quantity });

            const updatedCart = await this.dbContext.findById(cart.id!);

            return updatedCart!;

        } catch (error) {
            console.error('Error ao atualizar produto no carrinho:', error);
            throw new Error('Não foi possível atualizar o produto no carrinho');
        }
    }
}