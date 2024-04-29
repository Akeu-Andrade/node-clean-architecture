import { IUser } from "../../entities/IUser";

export interface ISaveUserUseCase {
    invoke(user: IUser): Promise<IUser>;
}