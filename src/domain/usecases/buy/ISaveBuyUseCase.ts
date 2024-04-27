import { Buy } from "../../entities/Buy";

export interface ISaveBuyUseCase {
    execute(buy: Buy): Promise<Buy>;
}