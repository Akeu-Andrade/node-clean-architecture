import { ICart } from "../../entities/ICart";
import { IProduct } from "../../entities/IProduct";

export interface IAddProductToCartUseCase {
    invoke(cartId: string, product: string, quantity: number): Promise<ICart>;
}