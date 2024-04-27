import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepository } from "../repositorys/UserRepository";
import { PrismaDatabaseContext } from "../databases/PrismaDatabaseContext";
import { SaveUserUseCase } from "../../application/useCases/SaveUserUseCase";
import { UserController } from "../../application/controllers/UserController";

container.registerSingleton('IDatabaseContext', PrismaDatabaseContext);

container.registerSingleton('IUserRepository', UserRepository);

container.registerSingleton('ISaveUserUseCase', SaveUserUseCase);

container.registerSingleton('UserController', UserController);