import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../../../domain/repositorys/ICartRepository";
import { IProductRepository } from "../../../domain/repositorys/IProductRepository";
import { IAddProductToCartUseCase } from "../../../domain/usecases/cart/IAddProductToCartUseCase";
import { ICart } from "../../../domain/entities/ICart";
import { InvalidParametersError } from "../../../domain/errors/InvalidParametersError";
import { ObjectNotFoundError as ItemNotFoundError } from "../../../domain/errors/ObjectNotFoundError";
import { IProduct } from "../../../domain/entities/IProduct";

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

            const cart = await this.getCart(cartId);
            const product = await this.getProduct(productId);
        
            const exisitProduct = cart!.cartItems?.find(product => product.productId === productId);

            if (exisitProduct) {
                return await this.cartRepository.updateProductInCart(
                    cart,
                    product,
                    exisitProduct.quantity + quantity
                )
            }

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

    private async getCart(cartId: string): Promise<ICart> {
        const cart = await this.cartRepository.getCartById(cartId);
        if (!cart) {
            throw new ItemNotFoundError();
        }

        return cart;
    }

    private async getProduct(productId: string): Promise<IProduct> {
        const product = await this.productRepository.getProductById(productId);
        if (!product) {
            throw new ItemNotFoundError();
        }

        return product;
    }

}