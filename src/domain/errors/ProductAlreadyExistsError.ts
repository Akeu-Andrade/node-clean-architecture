import { HttpError } from "./HttpError";

export class ProductAlreadyExistsError extends HttpError {
   
    constructor() {
        super(400, "Produto já existe!");
    }
}