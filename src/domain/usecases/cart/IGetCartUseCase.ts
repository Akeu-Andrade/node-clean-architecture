import { ICart } from "../../entities/ICart";

export interface IGetCartUseCase {
    execute(id: string): Promise<ICart>;
}