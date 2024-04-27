export interface IDatabaseContext<T> {
    create(document: T): Promise<T>;
}