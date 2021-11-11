require('dotenv').config();

const PORT = process.env.PORT;

let MONGODB_URI;

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'e2e') {

MONGODB_URI = process.env.TEST_MONGODB_URI;
  
} else {

   MONGODB_URI = process.env.MONGODB_URI;

}

console.log(MONGODB_URI);

module.exports = {
    PORT,
    MONGODB_URI,
};
