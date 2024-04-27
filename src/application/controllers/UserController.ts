import { IUser } from "../../domain/entities/IUser";
import { Request, Response } from "express";
import { ISaveUserUseCase } from "../../domain/usecases/user/ISaveUserUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserController {
    private saveUserUseCase: ISaveUserUseCase;

    constructor(@inject("ISaveUserUseCase") saveUserUseCase: ISaveUserUseCase) {
        this.saveUserUseCase = saveUserUseCase;
    }

    createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user: IUser = req.body;
            const newUser = await this.saveUserUseCase.invoke(user);
            res.status(201).json(newUser);
        } catch (error) {
            const message = (error as Error).message;
            res.status(500).json({ message });
        }
    };
}