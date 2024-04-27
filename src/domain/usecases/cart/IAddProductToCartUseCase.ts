import { Cart } from "../../entities/Cart";
import { Product } from "../../entities/Product";

export interface IAddProductToCartUseCase {
    execute(cartId: string, product: Product, quantity: number): Promise<Cart>;
}