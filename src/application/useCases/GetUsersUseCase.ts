import { inject, injectable } from 'tsyringe';
import { IUser } from '../../domain/entities/IUser';
import { IUserRepository } from '../../domain/repositorys/IUserRepository';
import { ISaveUserUseCase } from '../../domain/usecases/user/ISaveUserUseCase';
import { EmailAlreadyExistsError } from '../../domain/errors/EmailAlreadyExistsError';
import { IGetUsersUseCase } from '../../domain/usecases/user/IGetUsersUseCase';

@injectable()
export class GetUsersUseCase implements IGetUsersUseCase {
    constructor(
        @inject("IUserRepository") private userRepository: IUserRepository
    ) {}

    async invoke(): Promise<IUser[]> {
        try {
            return await this.userRepository.getUsers();
        } catch (error) {
            throw error;
        }
    }
}