import { User } from "../../entities/User";

export interface IGetUserUseCase {
    invoke(): Promise<User>;
}