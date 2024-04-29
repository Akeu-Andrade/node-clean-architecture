import { inject, injectable } from "tsyringe";
import { IGetCartUseCase } from "../../../domain/usecases/cart/IGetCartUseCase";
import { ICartRepository } from "../../../domain/repositorys/ICartRepository";
import { ICart } from "../../../domain/entities/ICart";
import { ObjectNotFoundError } from "../../../domain/errors/ObjectNotFoundError";
import { InvalidParametersError } from "../../../domain/errors/InvalidParametersError";

@injectable()
export class GetCartUseCase implements IGetCartUseCase {
    private cartRepository: ICartRepository;

    constructor(
        @inject("ICartRepository") cartRepository: ICartRepository
    ) {
        this.cartRepository = cartRepository;
    }

    async invoke(id: string): Promise<ICart> {
        try {

            if (!id) {
                throw new InvalidParametersError()
            }

            const cart = await this.cartRepository.getCartById(id);
            
            if (!cart) {
                throw new ObjectNotFoundError("Carrinho não encontrado");
            }

            return cart;
        } catch (error) {
            console.error(`Error while getting cart: ${error}`);
            throw error;
        }
    }
}