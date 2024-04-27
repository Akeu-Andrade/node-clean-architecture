import { HttpError } from "./HttpError";

export class EmailAlreadyExistsError extends HttpError {
   
    constructor() {
        super(400, "Email já está em uso!");
    }
}