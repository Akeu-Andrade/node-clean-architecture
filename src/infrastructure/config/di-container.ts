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

container.registerSingleton('IUserDatabaseContext', UserDatabaseContext);
container.registerSingleton('IProductDatabaseContext', ProductDatabaseContext);

container.registerSingleton('IUserRepository', UserRepository);
container.registerSingleton('IProductRepository', ProductRepository);

container.registerSingleton('ISaveUserUseCase', SaveUserUseCase)
    .registerSingleton('IGetUsersUseCase', GetUsersUseCase);
container.registerSingleton('ISaveProductUseCase', SaveProductUseCase)
    .registerSingleton('IGetProductsUseCase', GetProductsUseCase);

container.registerSingleton('UserController', UserController);
container.registerSingleton('ProductController', ProductController);