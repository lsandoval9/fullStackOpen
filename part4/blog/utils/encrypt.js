const bcrypt = require("bcrypt");

const salt = 10;

function encrypt(string) {
    return bcrypt.hash(string, salt);
}

function compare(string, hash) {
    return bcrypt.compare(string, hash);
}

module.exports = {
    encrypt,
    compare
};
