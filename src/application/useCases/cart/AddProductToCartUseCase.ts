import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../../../domain/repositorys/ICartRepository";
import { IProductRepository } from "../../../domain/repositorys/IProductRepository";
import { IAddProductToCartUseCase } from "../../../domain/usecases/cart/IAddProductToCartUseCase";
import { ICart } from "../../../domain/entities/ICart";
import { InvalidParametersError } from "../../../domain/errors/InvalidParametersError";
import { ObjectNotFoundError as ItemNotFoundError } from "../../../domain/errors/ObjectNotFoundError";

@injectable()
export class AddProductToCartUseCase implements IAddProductToCartUseCase {
    private cartRepository: ICartRepository;
    private productRepository: IProductRepository;

    constructor(
        @inject("ICartRepository") cartRepository: ICartRepository, 
        @inject("IProductRepository") productRepository: IProductRepository
    ) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    async invoke(cartId: string, productId: string, quantity: number): Promise<ICart> {
        try {

            this.validateParameters(cartId, productId, quantity);

            await this.getCart(cartId);
            await this.getProduct(productId);
            //Todo adicionar regar de somar quantidade caso exista o produto no carrinho

            return await this.cartRepository.addProductToCart(
                cartId,
                productId,
                quantity
            )

        } catch (error) {
            throw error;
        }
    }

    private validateParameters(cartId: string, productId: string, quantity: number): void {
        if (!cartId || !productId || !quantity) {
            throw new InvalidParametersError();
        }
    }

    private async getCart(cartId: string) {
        const cart = await this.cartRepository.getCartById(cartId);
        if (!cart) {
            throw new ItemNotFoundError();
        }
    }

    private async getProduct(productId: string) {
        const product = await this.productRepository.getProductById(productId);
        if (!product) {
            throw new ItemNotFoundError();
        }
    }

}