import { IUser } from "../entities/IUser";

export interface IUserDatabaseContext {
    create(document: IUser): Promise<IUser>;
    findOne(query: any): Promise<IUser | null>;
    findAll(): Promise<IUser[]>;
}