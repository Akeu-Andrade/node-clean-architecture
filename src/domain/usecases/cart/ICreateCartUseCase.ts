import { ICart } from "../../entities/ICart";

export interface ICreateCartUseCase {
    invoke(userId: string | null): Promise<ICart>;
}