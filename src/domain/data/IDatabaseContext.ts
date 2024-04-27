import { IUser } from "../entities/IUser";

export interface IDatabaseContext {
    create(collection: string, document: object): Promise<object>;
}