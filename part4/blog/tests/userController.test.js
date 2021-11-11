const app = require("../app");

const supertest = require("supertest");
const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const exampleBlogs = require("../utils/exampleBlogs");
const mongoose = require("mongoose");

const api = supertest(app);

describe("userController", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        
    });

    test("should create a valid user", async () => {
        await api
            .post("/api/users")
            .send({
                name: "luis",
                username: "lsandoval9",
                password: "12345",
            })
            .expect(201);
    });

    test("should return 400 when a request without username or password is send", async () => {
        await api
            .post("/api/users")
            .send({
                name: "luis",
                username: "lsandoval9",
            })
            .expect(400);

        await api
            .post("/api/users")
            .send({
                name: "luis",
                password: "12345",
            })
            .expect(400);
    });

    test("should return 400 when a username or password shorter that 3 characters is sent", async () => {

        await api
            .post("/api/users")
            .send({
                name: "luis",
                username: "un",
                password: "12345",
            })
            .expect(400);

            await api
            .post("/api/users")
            .send({
                name: "luis",
                username: "lsandoval9",
                password: "do",
            })
            .expect(400);

    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});
