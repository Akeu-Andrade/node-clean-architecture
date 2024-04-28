import { ICart } from "../../entities/ICart";

export interface IAddProductToCartUseCase {
    invoke(cartId: string, product: string, quantity: number): Promise<ICart>;
}