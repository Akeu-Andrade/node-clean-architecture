import { ICart } from "../../entities/ICart";

export interface IGetCartUseCase {
    invoke(id?: string | undefined): Promise<ICart>;
}