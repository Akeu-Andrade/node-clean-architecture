import { HttpError } from "./HttpError";

export class ObjectNotFoundError extends HttpError { 
   
    constructor(mensage?: string) {
        super(400, mensage ? mensage : "Um ou mais objetos não foram encontrados!") 
    }
}