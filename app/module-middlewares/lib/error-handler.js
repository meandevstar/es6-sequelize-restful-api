export default (err, req, res, next) => {
    let {name, message, statusCode, details} = err;

    statusCode = statusCode || 500;
    message    = message || "Internal Server Error";
    details    = details || [];

    const response = {code: statusCode, name, message, details};

    res.status(statusCode);
    res.send(response);
}
