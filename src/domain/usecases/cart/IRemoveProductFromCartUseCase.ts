import { Cart } from "../../entities/Cart";

export interface IRemoveProductFromCartUseCase {
    execute(cartId: string, productId: string): Promise<Cart>;
}