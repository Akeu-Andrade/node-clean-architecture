export interface IProductDatabaseContext<T> {
    create(document: T): Promise<T>;
    findAllByQuery(query: any): Promise<T[]>;
    findAll(): Promise<T[]>;
}