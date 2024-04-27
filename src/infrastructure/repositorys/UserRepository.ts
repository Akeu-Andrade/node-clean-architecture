import { IDatabaseContext } from "../../domain/data/IDatabaseContext";
import { IUser } from "../../domain/entities/IUser";
import { IUserRepository } from "../../domain/repositorys/IUserRepository";

export class UserRepository implements IUserRepository {

    private dbContext: IDatabaseContext;

    constructor(dbContext: IDatabaseContext) {
        this.dbContext = dbContext;
    }

    async createUser(user: IUser): Promise<IUser> {
        const newUser = await this.dbContext.create('User', user);
        return newUser as IUser;
    }
}