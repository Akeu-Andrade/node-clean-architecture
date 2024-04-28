import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../../../domain/repositorys/ICartRepository";
import { ICart } from "../../../domain/entities/ICart";
import { ICreateCartUseCase } from "../../../domain/usecases/cart/ICreateCartUseCase";
import { InvalidUserIdError } from "../../../domain/errors/InvalidUserIdError";
import { CartAlreadyExistsError } from "../../../domain/errors/CartAlreadyExistsError";
import { IUserRepository } from "../../../domain/repositorys/IUserRepository";

@injectable()
export class CreateCartUseCase implements ICreateCartUseCase {
    private cartRepository: ICartRepository;
    private userRepository: IUserRepository;

    constructor(
        @inject("ICartRepository") cartRepository: ICartRepository,
        @inject("IUserRepository") userRepository: IUserRepository
    ) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }

    async invoke(userId: string): Promise<ICart> {
        try {
            
            if (!userId) {
                throw new InvalidUserIdError();
            }
            
            const user = await this.userRepository.findByUserId(userId);

            if (!user) {
                throw new InvalidUserIdError();
            }

            const existingCart = await this.cartRepository.getCartByUserId(userId);

            if (existingCart) {
                throw new CartAlreadyExistsError();
            }

            const newCart: ICart = {
                userId,
                cartItems: []
            };

            return await this.cartRepository.createCart(newCart);
        } catch (error) {
            throw error;
        }
    }
}