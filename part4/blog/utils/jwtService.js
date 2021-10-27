const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET;

function signToken(userForToken) {

    return jwt.sign(userForToken, secretKey);
}

function verifyToken(token) {

    return jwt.verify(token, secretKey);

}

function checkJwtFromHeader(request) {

    const authorization = request.get('authorization');

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        return authorization.substring(7);
    }
    return null;
}

module.exports = {
    signToken,
    checkJwtFromHeader,
    verifyToken
};
