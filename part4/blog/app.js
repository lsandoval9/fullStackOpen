const cors = require("cors");

const express = require("express");

const app = express();

const mongoose = require("mongoose");

const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogsController");
const usersRouter = require("./controllers/usersController");

app.use(express.json());

// app.use(middleware.requestLogger);

logger.info("connecting to database...");

app.use(blogsRouter);

app.use(usersRouter);

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'e2e') {
    const testingRouter = require('./controllers/testingController')
    app.use('/api/testing', testingRouter)
  }

app.use(middleware.errorHandler);

app.use(middleware.unknownEndpoint);

mongoose.connect(config.MONGODB_URI).then(() => {

    logger.info("Database connected successfully");
    
        if (process.env.NODE_ENV !== 'test') {
            app.listen(config.PORT, () => {
                logger.info("Server running on port: ", config.PORT);
            });
        }
    
});

module.exports = app;
