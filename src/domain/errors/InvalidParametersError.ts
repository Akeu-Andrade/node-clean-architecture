import { HttpError } from "./HttpError";

export class InvalidParametersError extends HttpError {
   
    constructor() {
        super(400, "Parâmetros inválidos!")
    }
}