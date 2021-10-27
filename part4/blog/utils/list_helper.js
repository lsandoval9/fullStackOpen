const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {

    let total = 0;

    blogs.forEach(blog => {

        total += blog.likes;

    })

    return total;
}   

const favoriteBlog = (blogs) => {

    let favorite;

    let count = 0;

    blogs.forEach(blog => {

        if (blog.likes > count) {
            count = blog.likes;
            favorite = blog;
        }

    })

    return favorite;
}

const mostBlogs = (blogs) => {

    let count = 0;

    let authors = {}






}

const mostLikes = () => {



}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};
