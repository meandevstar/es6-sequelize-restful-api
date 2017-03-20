export default class UnprocessableEntityError extends Error {
    constructor(message = 'Unprocessable Entity', details = []){
        super(message, details);
        this.name = 'UnprocessableEntityError';
        this.message = message;
        this.details = details;
        this.statusCode = 422;
    }
}
