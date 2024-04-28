import { inject, injectable } from 'tsyringe';
import { IUser } from '../../../domain/entities/IUser';
import { IUserRepository } from '../../../domain/repositorys/IUserRepository';
import { ISaveUserUseCase } from '../../../domain/usecases/user/ISaveUserUseCase';
import { EmailAlreadyExistsError } from '../../../domain/errors/EmailAlreadyExistsError';

@injectable()
export class SaveUserUseCase implements ISaveUserUseCase {
    private userRepository: IUserRepository;
    
    constructor(
        @inject("IUserRepository") userRepository: IUserRepository
    ) {
        this.userRepository = userRepository;
    }

    async invoke(user: IUser): Promise<IUser> {
        try {
            const existingUser = await this.userRepository.findByEmail(user.email);
            if (existingUser) {
                throw new EmailAlreadyExistsError
            }

            return await this.userRepository.createUser(user);
        } catch (error) {
            throw error;
        }
    }
}