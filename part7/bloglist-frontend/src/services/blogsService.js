import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
    const request = await axios.get(baseUrl);

    console.log(request.data);

    return request.data;
};

const updateBlog = async (updatedBlog, blog) => {
    return await axios.put(`${baseUrl}/${blog.id}`, updatedBlog);
};

const createBlog = async (newBlog, config) => {
    return await axios.post(`${baseUrl}`, newBlog, config);
};

const deleteBlog = async (blog, config) => {
    return await axios.delete(`${baseUrl}/${blog.id}`, config);
};

const getBlogComments = async (blogID, token) => {
    return axios.get(`${baseUrl}/${blogID}/comments`, { headers: { Authorization: `Bearer ${token}` } });
};

const postBlogComment = async (blogID, comment, token) => {
    return axios.post(`${baseUrl}/${blogID}/comments`, {comment}, { headers: { Authorization: `Bearer ${token}` } });
};

export default {
    getAll,
    updateBlog: updateBlog,
    createBlog,
    deleteBlog,
    getBlogComments,
    postBlogComment,
};
