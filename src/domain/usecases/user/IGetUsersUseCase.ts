import { IUser } from "../../entities/IUser";

export interface IGetUsersUseCase {
    invoke(): Promise<IUser[]>;
}