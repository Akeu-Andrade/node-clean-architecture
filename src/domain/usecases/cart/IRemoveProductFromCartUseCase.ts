import { ICart } from "../../entities/ICart";

export interface IRemoveProductFromCartUseCase {
    invoke(cartId: string, productId: string, quantity: number): Promise<ICart>;
}