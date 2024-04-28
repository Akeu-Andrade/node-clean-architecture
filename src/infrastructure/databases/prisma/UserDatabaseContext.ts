import { PrismaClient, User } from "@prisma/client";
import { IUserDatabaseContext } from "../../../domain/data/IUserDatabaseContext";
import { IUser } from "../../../domain/entities/IUser";

export class UserDatabaseContext implements IUserDatabaseContext {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(document: User): Promise<User> {
        return this.prisma.user.create({ data: document });
    }

    async findOne(query: any): Promise<User | null> {
        return this.prisma.user.findFirst({ where: query });
    }

    async findAll(): Promise<User[]> {
        return this.findAllByQuery({});
    }
    
    async findAllByQuery(query: any): Promise<User[]> {
        return this.prisma.user.findMany({ where: query });
    }
}