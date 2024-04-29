import { HttpError } from "./HttpError";

export class InvalidUserIdError extends HttpError {
    constructor() {
        super(400, "Id de usuário inválido!");
    }
}