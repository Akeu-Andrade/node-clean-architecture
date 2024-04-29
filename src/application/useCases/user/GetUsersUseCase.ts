import { inject, injectable } from 'tsyringe';
import { IUser } from '../../../domain/entities/IUser';
import { IUserRepository } from '../../../domain/repositorys/IUserRepository';
import { IGetUsersUseCase } from '../../../domain/usecases/user/IGetUsersUseCase';

@injectable()
export class GetUsersUseCase implements IGetUsersUseCase {
    private userRepository: IUserRepository;

    constructor(
        @inject("IUserRepository") userRepository: IUserRepository
    ) {
        this.userRepository = userRepository;
    }

    async invoke(): Promise<IUser[]> {
        try {
            return await this.userRepository.getUsers();
        } catch (error) {
            throw error;
        }
    }
}