import { inject, injectable } from "tsyringe";
import { IDatabaseContext } from "../../domain/data/IDatabaseContext";
import { IUser } from "../../domain/entities/IUser";
import { IUserRepository } from "../../domain/repositorys/IUserRepository";

@injectable()
export class UserRepository implements IUserRepository {

    private dbContext: IDatabaseContext<IUser>;

    constructor(@inject("IDatabaseContext") dbContext: IDatabaseContext<IUser>) {
        this.dbContext = dbContext;
    }

    async createUser(user: IUser): Promise<IUser> {
        try {
            const newUser = await this.dbContext.create(user);
            return newUser;
        } catch (error) {
            console.error('Error ao criar usuario:', error);
            throw error;
        }
    }

    async findByEmail(email: string): Promise<IUser | null> {
        try {
            const user = await this.dbContext.findOne({ email });
            return user;
        } catch (error) {
            console.error('Error ao buscar usuario:', error);
            throw error;
        }
    }
}