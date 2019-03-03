import React, { Component } from 'react';

let localState = {
    title: "",
    genres: "",
    description: "",
    imageUrl: "",
    author: "",
    price: 0,
}

class CreateBook extends Component {
    handleSubmit(e) {
        e.preventDefault();
        localState.genres = localState.genres.split(',');

        this.props.createBook(localState);
    }

    handleChange(e) {
        localState[e.target.name] = e.target.value;
    }

    render() {
        return (
            <div className="form-wrapper">
                <h1>Create New Book</h1>
                <form method="post" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title"
                            placeholder="Enter book title" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genres">Genres</label>
                        <input type="text" name="genres" id="genres"
                            placeholder="Enter genres for the book. Put a comma between them" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" id="description"
                            placeholder="Enter book description" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input type="text" name="image" id="image"
                            placeholder="Enter book image URL" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" name="author" id="author"
                            placeholder="Enter book author" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price"
                            placeholder="Enter book price" onChange={this.handleChange.bind(this)} />
                    </div>
                    <input type="submit" defaultValue="Create" />
                </form>
            </div>

        )
    }
}

export default CreateBook;