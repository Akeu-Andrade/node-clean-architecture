import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepository } from "../repositorys/UserRepository";
import { SaveUserUseCase } from "../../application/useCases/user/SaveUserUseCase";
import { UserController } from "../../application/controllers/UserController";
import { GetUsersUseCase } from "../../application/useCases/user/GetUsersUseCase";
import { UserDatabaseContext } from "../databases/prisma/UserDatabaseContext";
import { ProductDatabaseContext } from "../databases/prisma/ProductDatabaseContext";
import { ProductRepository } from "../repositorys/ProductRepository";
import { ProductController } from "../../application/controllers/ProductController";
import { SaveProductUseCase } from "../../application/useCases/product/SaveProductUseCase";
import { GetProductsUseCase } from "../../application/useCases/product/GetProductsUseCase";
import { CreateCartUseCase } from "../../application/useCases/cart/CreateCartuseCase";
import { CartController } from "../../application/controllers/CartController";
import { CartDatabaseContext } from "../databases/prisma/CartDatabaseContext";
import { CartRepository } from "../repositorys/CartRepository";
import { AddProductToCartUseCase } from "../../application/useCases/cart/AddProductToCartUseCase";
import { GetCartUseCase } from "../../application/useCases/cart/GetCartUseCase";
import { OrderDatabaseContext } from "../databases/prisma/OrderDatabaseContext";
import { CompleteOrderUseCase } from "../../application/useCases/order/CompleteOrderUseCase";
import { OrderRepository } from "../repositorys/OrderRepository";
import { OrderController } from "../../application/controllers/OrderController";

container.registerSingleton('IUserDatabaseContext', UserDatabaseContext);
container.registerSingleton('IProductDatabaseContext', ProductDatabaseContext);
container.registerSingleton('ICartDatabaseContext', CartDatabaseContext);
container.registerSingleton('IOrderDatabaseContext', OrderDatabaseContext);

container.registerSingleton('IUserRepository', UserRepository);
container.registerSingleton('IProductRepository', ProductRepository);
container.registerSingleton('ICartRepository', CartRepository);
container.registerSingleton('IOrderRepository', OrderRepository);

container.registerSingleton('ISaveUserUseCase', SaveUserUseCase)
    .registerSingleton('IGetUsersUseCase', GetUsersUseCase);
container.registerSingleton('ISaveProductUseCase', SaveProductUseCase)
    .registerSingleton('IGetProductsUseCase', GetProductsUseCase);
container.registerSingleton('ICreateCartUseCase', CreateCartUseCase)
    .registerSingleton('IAddProductToCartUseCase', AddProductToCartUseCase)
    .registerSingleton('IGetCartUseCase', GetCartUseCase);
container.registerSingleton('ICompleteOrderUseCase', CompleteOrderUseCase);

container.registerSingleton('UserController', UserController);
container.registerSingleton('ProductController', ProductController);
container.registerSingleton('CartController', CartController);
container.registerSingleton('OrderController', OrderController);