import blogsService from "../../../services/blogsService";
import notificationActions from "../../notification/actions/notificationActions";

const getBlogs = () => {

    return async dispatch => {
        try {
            const blogs = await blogsService.getAll();
            console.log(blogs)
            

            dispatch({
                type: "GET_BLOGS",
                payload: blogs,
            });
        } catch (error) {
            console.dir(error)
        }
    };
};

const createBlog = (title, author, url) => {
    return async (dispatch) => {

        const token = window.localStorage.getItem('token');

        try {
            const result = await blogsService.createBlog(
                {
                    title,
                    author,
                    url,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (result.status === 201) {
                /* toggleNotification(
                    `a new blog "${title}" by "${author}" added`
                ); */

                dispatch(getBlogs())
                
            }
        } catch (error) {
            console.dir(error);
        }
    };
};


const updateBlog = (blog, updatedBlog) => {

    return async dispatch => {

        try {

            await blogsService.updateBlog({
      
              ...blog,
              ...updatedBlog
      
            }, blog)
      
            dispatch(getBlogs())
      
          } catch (error) {
      
            console.dir(error)
          }

    }

}


const deleteBlog = (blog) => {

    return async dispatch => {

        const token = window.localStorage.getItem('token');

        try {

            const response = await blogsService.deleteBlog(blog, { headers: { Authorization: `Bearer ${token}` } })

            console.log(response)
      
            dispatch(getBlogs())

            return response;

          } catch(error) {
            console.dir(error)
            return error.response;
          }

    }

}

const blogsActions = {
    getBlogs,
    createBlog,
    deleteBlog,
    updateBlog
};

export default blogsActions;
