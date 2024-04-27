import { User } from "../../entities/User";

export interface ISaveCreateUserUseCase {
    invoke(user: User): Promise<User>;
}