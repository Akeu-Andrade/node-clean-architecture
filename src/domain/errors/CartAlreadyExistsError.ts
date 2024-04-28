import { HttpError } from "./HttpError";

export class CartAlreadyExistsError extends HttpError {
    constructor() {
        super(409, "Um carrinho já existe para este usuário!");
    }
}