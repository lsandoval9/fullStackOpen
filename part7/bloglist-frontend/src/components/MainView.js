import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import Blogs from "./Blogs";
import { Link } from "react-router-dom";
import UsersComponent from "./users/UsersComponent";
import credentialsActions from "../store/credentials/actions/credentialsActions";
import User from "./users/User";
import SingleBlog from "./singleBlog/SingleBlog";
import { Button } from "react-bootstrap";

function MainView(props) {
    const {
        isCreateBlogVisible,
        setIsCreateBlogVisible,
    } = props;

    const dispatch = useDispatch();

    const credentials = useSelector(state => state.credentials);

    const onLogout = () => {

        dispatch(credentialsActions.logoutUser());

    };

    return (
        <>
            
            <div className="container-fluid">
                

                <div style={{marginBottom: "10px", 
                backgroundColor: "whitesmoke", padding: "10px"}}>
                    
                    <Link to="/blogs">
                        Home
                    </Link>
                    <Link to="/users" style={{margin: "10px"}}>
                        Users
                    </Link>

                    <span>
                        User <b>{credentials.username}</b> logged in{" "}
                        <Button variant="danger" onClick={onLogout}>Logout</Button>
                    </span>

                </div>

                <h2>Blogs App</h2>

                <Switch>

                    <Route path="/" exact>
                        <Redirect to="/blogs" />
                    </Route>

                    <Route path="/blogs/:id" exact>
                        <SingleBlog />
                    </Route>

                    <Route path="/blogs" exact>
                        <Blogs
                            isCreateBlogVisible={isCreateBlogVisible}
                            setIsCreateBlogVisible={setIsCreateBlogVisible}
                        />
                    </Route>

                    <Route path="/users/:id">
                        <User />
                    </Route>

                    <Route path="/users">
                        <UsersComponent />
                    </Route>
                </Switch>
                
            </div>
        </>
    );
}

MainView.propTypes = {
    isCreateBlogVisible: PropTypes.bool.isRequired,
};

export default MainView;
