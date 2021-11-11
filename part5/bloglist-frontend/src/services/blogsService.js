import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const updateBlog = async (updatedBlog, blog) => {
  return await axios.put(`${baseUrl}/${blog.id}`, updatedBlog)
}

const createBlog = async (newBlog, config) => {

  return await axios.post(`${baseUrl}`, newBlog, config)
}


const deleteBlog = async (blog, config) => {

  return await axios.delete(`${baseUrl}/${blog.id}`, config)

}


export default { getAll, updateBlog: updateBlog, createBlog, deleteBlog }
