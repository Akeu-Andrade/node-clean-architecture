import { Cart } from "../../entities/Cart";
import { Product } from "../../entities/IProduct";

export interface IAddProductToCartUseCase {
    execute(cartId: string, product: Product, quantity: number): Promise<Cart>;
}