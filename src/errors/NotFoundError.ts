import { BaseError } from "./BaseError"

export class NotFoundError extends BaseError {
    constructor(message: string = "Not found: recurso não encontrado!") {
        super(404, message)
    }
}