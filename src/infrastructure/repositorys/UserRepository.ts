import { inject, injectable } from "tsyringe";
import { IUserDatabaseContext } from "../../domain/data/IUserDatabaseContext";
import { IUser } from "../../domain/entities/IUser";
import { IUserRepository } from "../../domain/repositorys/IUserRepository";

@injectable()
export class UserRepository implements IUserRepository {

    private dbContext: IUserDatabaseContext;

    constructor(@inject("IUserDatabaseContext") dbContext: IUserDatabaseContext) {
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

    async getUsers(): Promise<IUser[]> {
        try {
            const users = await this.dbContext.findAll();
            return users;
        } catch (error) {
            console.error('Error ao todos usuarios:', error);
            throw error;
        }
    }

    async findByUserId(id: string): Promise<IUser | null> {
        try {
            const user = await this.dbContext.findOne({ id });
            return user;
        } catch (error) {
            console.error('Error ao buscar usuario:', error);
            throw error;
        }
    }
}