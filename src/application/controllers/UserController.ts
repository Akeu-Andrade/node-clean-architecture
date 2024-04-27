import { NextFunction, Request, Response } from "express";
import { ISaveUserUseCase } from "../../domain/usecases/user/ISaveUserUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserController {
    private saveUserUseCase: ISaveUserUseCase;

    constructor(
        @inject("ISaveUserUseCase") saveUserUseCase: ISaveUserUseCase
    ) {
        this.saveUserUseCase = saveUserUseCase;
    }

    createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newUser = await this.saveUserUseCase.invoke(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    };
}