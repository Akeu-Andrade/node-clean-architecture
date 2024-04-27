import { IUser } from "../entities/IUser";

export interface IUserRepository {
    createUser(user: IUser): Promise<IUser>;
    // getUsers(): Promise<User[]>;
}