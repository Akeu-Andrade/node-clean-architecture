import { ICart } from "../../entities/ICart";
import { IProduct } from "../../entities/IProduct";

export interface IAddProductToCartUseCase {
    execute(cartId: string, product: IProduct, quantity: number): Promise<ICart>;
}