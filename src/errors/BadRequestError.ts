import { BaseError } from "./BaseError"

export class BadRequestError extends BaseError {
    constructor(message: string = "Bad request: requisição inválida") {
        super(400, message)
    }
}