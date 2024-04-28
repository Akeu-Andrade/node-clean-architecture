import { ICart } from "../entities/ICart";

export interface ICartDatabaseContext {
    create(cart: ICart): Promise<ICart>;
    findById(id: string): Promise<ICart | null>;
    update(id: string, updatedCart: ICart): Promise<ICart>;
    delete(id: string): Promise<void>;
    findOne(filter: any): Promise<ICart | null>;
}