const exampleBlogs = require("../utils/exampleBlogs");
const listHelper = require("../utils/list_helper");



test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe("total likes", () => {



    test('should equal zero on empty liss', () => {
        
        const result = listHelper.totalLikes([]);

        expect(result).toBe(0);

    })
    

    test("when list has only one blog, equals the likes of that", () => {

        const listWithOneBlog = [
            {
              _id: '5a422aa71b54a676234d17f8',
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
              likes: 5,
              __v: 0
            }
          ]

        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });


    test('of a bigger list is calculated right', () => {
        
        const result = listHelper.totalLikes(exampleBlogs);
        expect(result).toBe(36);

    })
    
});


describe('favorite', () => {

    test('should return the post with most likes', () => {
        
        const mostLiked = {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        };

        const result = listHelper.favoriteBlog(exampleBlogs)

        expect(result).toEqual(mostLiked);

    })

    test('should return undefined on empty lists', () => {
        
        const emptyList = [];

        const result = listHelper.favoriteBlog(emptyList)

        expect(result).toBe(undefined);

    })
    
    

})
