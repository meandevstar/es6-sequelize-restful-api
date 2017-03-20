import Joi from 'joi';

export default function (schema) {
    return (req, res, next) => {
        const payload = Object.assign({}, req.body, req.params, req.query);
        const options = {
            allowUnknown: true
        };

        Joi.validate(payload, schema, options, (err) => {
            if(err){
                err.statusCode = 422;
                return next(err);
            }
            next();
        });
    }
}