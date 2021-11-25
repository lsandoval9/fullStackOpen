import React, { useState } from "react";
import { useHistory } from "react-router";
import useField from "../hooks/useField";

const CreateNew = (props) => {

    const content  = useField("text");
    const author  = useField("text");
    const info  = useField("text");


    const history = useHistory();


    const {addNew, notificate} = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0,
        });

        notificate(`Successfully created "${content}" by "${author}"`, 10)

        history.replace("/");

    };

    const clearFields = (e) => {

        e.preventDefault();

        content.clear();
        info.clear();
        author.clear();

    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input
                        name="content"
                        value={content.value}
                        type={content.type}
                        onChange={content.onChange}
                    />
                </div>
                <div>
                    author
                    <input
                        name="author"
                        value={author.value}
                        type={author.type}
                        onChange={author.onChange}
                    />
                </div>
                <div>
                    url for more info
                    <input
                        name="info"
                        type={info.type}
                        value={info.value}
                        onChange={info.onChange}
                    />
                </div>
                <button>create</button>
                <button onClick={clearFields}>clear</button>
            </form>
        </div>
    );
};

export default CreateNew;
