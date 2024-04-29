import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../../../domain/repositorys/ICartRepository";
import { IOrderRepository } from "../../../domain/repositorys/IOrderRepository";
import { ICompleteOrderUseCase } from "../../../domain/usecases/order/ICompleteOrderUseCase";
import { IOrder } from "../../../domain/entities/IOrder";
import { ICart } from "../../../domain/entities/ICart";
import { ObjectNotFoundError } from "../../../domain/errors/ObjectNotFoundError";
import { InvalidParametersError } from "../../../domain/errors/InvalidParametersError";
import { EmptyCartError } from "../../../domain/errors/EmptyCartError";
import { IProductRepository } from "../../../domain/repositorys/IProductRepository";
import { IProduct } from "../../../domain/entities/IProduct";

@injectable()
export class CompleteOrderUseCase implements ICompleteOrderUseCase {
    private cartRepository: ICartRepository;
    private orderRepository: IOrderRepository;
    private productRepository: IProductRepository;

    constructor(
        @inject("ICartRepository") cartRepository: ICartRepository, 
        @inject("IOrderRepository") orderRepository: IOrderRepository,
        @inject("IProductRepository") productRepository: IProductRepository
    ) {
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    async invoke(cartId: string): Promise<IOrder> { 
        try {
            if (!cartId) {
                throw new InvalidParametersError();
            }

            const cart = await this.getCard(cartId);

            const totalPrice = await this.calculateTotalPrice(cart);

            const orderItems = cart.cartItems!.map(({ productId, quantity }) => ({ productId, quantity }));

            const order: IOrder = {
                userId: cart.userId,
                orderItems: orderItems,
                date: new Date(),
                totalPrice: totalPrice
            }

            const newOrder = await this.orderRepository.createOrder(order);

            await this.cartRepository.clearCart(cartId);

            return newOrder;
        } catch (error) {
            throw error;
        }
    }

    private async getCard(cartId: string): Promise<ICart> {
        const cart = await this.cartRepository.getCartById(cartId);

        if (!cart) {
            throw new ObjectNotFoundError("Carrinho não encontrado!");
        }

        if (!cart.cartItems || cart.cartItems.length === 0) {
            throw new EmptyCartError();
        }
        return cart;
    }

    private async calculateTotalPrice(cart: ICart) {
        if (!cart.cartItems) {
            return 0;
        }

        let totalPrice = 0;

        for (const item of cart.cartItems) {
            const product = await this.getProduct(item.productId);

            totalPrice += product.price * item.quantity;
        }

        return totalPrice;
    }

    private async getProduct(productId: string): Promise<IProduct> {
        const product = await this.productRepository.getProductById(productId);

        if (!product) {
            throw new ObjectNotFoundError("Produto não encontrado!");
        }

        return product;
    }
}

