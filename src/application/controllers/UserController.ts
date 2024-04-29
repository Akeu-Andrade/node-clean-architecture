import { NextFunction, Request, Response } from "express";
import { ISaveUserUseCase } from "../../domain/usecases/user/ISaveUserUseCase";
import { inject, injectable } from "tsyringe";
import { IGetUsersUseCase } from "../../domain/usecases/user/IGetUsersUseCase";

@injectable()
export class UserController {
    private saveUserUseCase: ISaveUserUseCase;
    private getUsersUseCase: IGetUsersUseCase;

    constructor(
        @inject("ISaveUserUseCase") saveUserUseCase: ISaveUserUseCase,
        @inject("IGetUsersUseCase") getUsersUseCase: IGetUsersUseCase
    ) {
        this.saveUserUseCase = saveUserUseCase;
        this.getUsersUseCase = getUsersUseCase;
    }

    createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newUser = await this.saveUserUseCase.invoke(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    };

    getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await this.getUsersUseCase.invoke();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
}