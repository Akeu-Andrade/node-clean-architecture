import { ICart } from "../../entities/ICart";

export interface IRemoveProductFromCartUseCase {
    execute(cartId: string, productId: string): Promise<ICart>;
}