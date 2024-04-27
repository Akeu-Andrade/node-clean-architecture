export interface IUserDatabaseContext<T> {
    create(document: T): Promise<T>;
    findOne(query: any): Promise<T | null>;
    findAll(): Promise<T[]>;
}