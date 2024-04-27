import { Cart } from "../../entities/Cart";

export interface IGetCartUseCase {
    execute(id: string): Promise<Cart>;
}