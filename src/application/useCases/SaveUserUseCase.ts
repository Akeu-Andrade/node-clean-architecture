import { inject, injectable } from 'tsyringe';
import { IUser } from '../../domain/entities/IUser';
import { IUserRepository } from '../../domain/repositorys/IUserRepository';
import { ISaveUserUseCase } from '../../domain/usecases/user/ISaveUserUseCase';

@injectable()
export class SaveUserUseCase implements ISaveUserUseCase {
    constructor(
        @inject("IUserRepository") private userRepository: IUserRepository
    ) {}

    async invoke(user: IUser): Promise<IUser> {
        return await this.userRepository.createUser(user);
    }
}