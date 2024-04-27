import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepository } from "../repositorys/UserRepository";
import { PrismaDatabaseContext } from "../databases/PrismaDatabaseContext";
import { SaveUserUseCase } from "../../application/useCases/SaveUserUseCase";
import { UserController } from "../../application/controllers/UserController";
import { GetUsersUseCase } from "../../application/useCases/GetUsersUseCase";

container.registerSingleton('IDatabaseContext', PrismaDatabaseContext);

container.registerSingleton('IUserRepository', UserRepository);

container.registerSingleton('ISaveUserUseCase', SaveUserUseCase);
container.registerSingleton('IGetUsersUseCase', GetUsersUseCase);

container.registerSingleton('UserController', UserController);