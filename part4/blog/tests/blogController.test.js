const app = require("../app");

const supertest = require("supertest");
const Blog = require("../models/blogSchema");
const exampleBlogs = require("../utils/exampleBlogs");
const mongoose = require("mongoose");
const User = require("../models/userSchema");
const jwtService = require("../utils/jwtService")

const api = supertest(app);

let token;

describe("blogController", () => {
    beforeEach(async () => {

        

        await Blog.deleteMany({});

        await User.deleteMany({});

        const newUser = {
            
                name: "Arto",
                username: "artoHellas",
                password: "1234"
            
        }

        const resultUser = await api.post("/api/users")
        .send(newUser);

       


        token = jwtService.signToken(resultUser.body)
        
        

        await api.post("/api/blogs")
        .send(exampleBlogs)
        .set("Authorization", `Bearer  ${token}`)

    }, 100_000);

    test("should return the correct number of posts", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("should return all the blogs with an unique ID", async () => {
        const result = (await api.get("/api/blogs")).body;

        result.forEach((blog) => {
            expect(blog.id).toBeDefined();
        });
    });

    test("should create a new blog post", async () => {
        const myExampleBlog = {
            title: "FullStackOpenRocks!",
            author: "lsandoval9",
            url: "https://fullstackopen.com/",
            likes: 101
        };

        await api
            .post("/api/blogs")
            .send(myExampleBlog)
            .set("Authorization", `Bearer ${token}`)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const blogs = (await api.get("/api/blogs")).body;

        expect(blogs).toContainEqual(
            expect.objectContaining({
                id: expect.any(String),
                title: "FullStackOpenRocks!",
                author: "lsandoval9",
                url: "https://fullstackopen.com/",
                likes: 101,
            })
        );
    });

    test("should default the likes to 0 if it's missing from the request", async () => {
        const myExampleBlog = {
            title: "FullStackOpenRocks!",
            author: "lsandoval9",
            url: "https://fullstackopen.com/",
        };

        await api
            .post("/api/blogs")
            .send(myExampleBlog)
            .set("Authorization", `Bearer ${token}`)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const blogs = (await api.get("/api/blogs")).body;

        expect(blogs).toContainEqual(
            expect.objectContaining({
                id: expect.any(String),
                title: "FullStackOpenRocks!",
                author: "lsandoval9",
                url: "https://fullstackopen.com/",
                likes: 0,
            })
        );

    }, 100_000);


    test('should return a 400 error BAD REQUEST if the title or the url are missing', 
    async () => {
        const noTitleBlog = {
            author: "lsandoval9",
            url: "https://fullstackopen.com/",
            likes: 101,
        };

        const noUrlBlog = {
            title: "FullStackOpenRocks!",
            author: "lsandoval9",
            likes: 101,
        };

        const noTitleAndUrlBlog = {
            author: "lsandoval9",
            likes: 101,
        };

        await api.post("/api/blogs")
        .send(noTitleBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(400);

        await api.post("/api/blogs")
        .send(noUrlBlog)
        .set("Authorization", `Bearer ${token}`)        
        .expect(400);

        await api.post("/api/blogs")
        .send(noTitleAndUrlBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(400);

    }, 10_000)


    test('should return 401 is a valid token is not provided', async () => {
        
        const anotherBlog = {
            title: "testing express with mongoDB",
            author: "lsandoval9",
            url: "https://fullstackopen.com/en/part4/",
            likes: 101,
        }


        await api.post("/api/blogs")
        .send(anotherBlog)
        .expect(401);


        const exampleInvalidToken = "abcdefg12345";

        await api.post("/api/blogs")
        .send(anotherBlog)
        .set("Authorization", `Bearer ${exampleInvalidToken}`)
        .expect(401);

    })
    
    

    afterAll(async () => {
        await mongoose.connection.close();
    });
});
