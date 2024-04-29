import { ICart } from "../entities/ICart";
import { IProduct } from "../entities/IProduct";

export interface ICartRepository {
    createCart(card: ICart): Promise<ICart>;
    addProductToCart(cartId: string, productId: string, quantity: number): Promise<ICart>;
    getCartById(cartId: string): Promise<ICart | null>;
    deleteCart(cartId: string): Promise<void>;
    getCartByUserId(userId: string): Promise<ICart | null>;
    clearCart(cartId: string): Promise<void>;
    updateProductInCart(cart: ICart, product: IProduct, quantity: number): Promise<ICart>;
}