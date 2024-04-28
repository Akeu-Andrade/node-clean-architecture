import { IUserStats } from "../../entities/IUserStats";

export interface IGetUserStatsUseCase {
    execute(userId: string): Promise<IUserStats>;
}