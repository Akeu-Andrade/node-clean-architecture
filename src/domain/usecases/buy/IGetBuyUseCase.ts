import { Buy } from "../../entities/Buy";

export interface IGetBuyUseCase {
    execute(id: string): Promise<Buy>;
}