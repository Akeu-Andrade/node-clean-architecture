import { IUser } from "../entities/IUser";

export interface IUserRepository {
    createUser(user: IUser): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | null>;
    // getUsers(): Promise<User[]>;
}