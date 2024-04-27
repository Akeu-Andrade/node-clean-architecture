export interface IDatabaseContext<T> {
    create(document: T): Promise<T>;
    findOne(query: any): Promise<T | null>;
}