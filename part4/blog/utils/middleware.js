const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method);
    logger.info("Path:  ", request.path);
    logger.info("Body:  ", request.body);
    logger.info("---");
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {

    console.dir(error)

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: error.message });
    }

    next(error);
};

const tokenExtractor = (request, response, next) => {



    let authorization = request.get('authorization');

    console.log(authorization)

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        authorization = authorization.substring(7);
    } else {
        return response.status(401).send({error: "Invalid or not present token"})
    }
    
    request.token = jwt.verify(authorization, process.env.SECRET);

    console.log(request.token)

    next();
};

const userExtractor  = (request, response, next) => {

    request.user = request.token.username;
    request.userId = request.token.id;

    next();

}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
};
