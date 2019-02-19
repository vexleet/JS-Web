import React from 'react';

const CreateForm = (props) => {

    return (
        <div className="create-form">
            <h1>Create game</h1>
            <form onSubmit={(event) => {
                event.preventDefault();

                let game = {
                    title: event.target.title.value,
                    description: event.target.description.value,
                    imageUrl: event.target.imageUrl.value,
                }

                props.createGame(game);
            }}>
                <label>Title</label>
                <input type="text" id="title"/>
                <label>Description</label>
                <textarea type="text" id="description"/>
                <label>ImageUrl</label>
                <input type="text" id="imageUrl"/>
                <input type="submit" value="Create"/>
            </form>
        </div>
    )
};

export default CreateForm;

