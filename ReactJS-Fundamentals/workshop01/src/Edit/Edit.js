import React, { Component } from 'react';

let localState = undefined;

class Edit extends Component {
    handleSubmit(e) {
        e.preventDefault();
        localState.genres = localState.genres.split(',');
        this[0].props.editBook(localState, this[1]);
        localState.genres = localState.genres.join(',');
    }

    handleChange(e) {
        localState[e.target.name] = e.target.value;
    }

    componentWillUnmount() {
        localState = undefined;
    }

    render() {
        let { books } = this.props;
        let bookId = this.props.match.params.id;
        let book = books.find(x => x._id === bookId);

        if (!book) {
            return <div>Loading...</div>
        }

        if (localState === undefined) {
            localState = {
                title: book.title,
                genres: book.genres.join(","),
                description: book.description,
                image: book.image,
                author: book.author,
                price: book.price,
            }
        }

        return (
            <div className="form-wrapper">
                <h1>Edit Book</h1>
                <form method="post" onSubmit={this.handleSubmit.bind([this, bookId])}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title"
                            placeholder="Enter book title" defaultValue={localState.title} onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genres">Genres</label>
                        <input type="text" name="genres" id="genres"
                            placeholder="Enter genres for the book. Put a comma between them" onChange={this.handleChange.bind(this)} defaultValue={localState.genres} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" id="description"
                            placeholder="Enter book description" defaultValue={localState.description} onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input type="text" name="image" id="image"
                            placeholder="Enter book image URL" defaultValue={localState.image} onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" name="author" id="author"
                            placeholder="Enter book author" defaultValue={localState.author} onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price"
                            placeholder="Enter book price" defaultValue={localState.price} onChange={this.handleChange.bind(this)} />
                    </div>
                    <input type="submit" defaultValue="Create" />
                </form>
            </div>
        )
    }
}

export default Edit;