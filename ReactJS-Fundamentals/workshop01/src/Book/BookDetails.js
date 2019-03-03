import React, { Component } from 'react';

class BookDetails extends Component {
    likeBook(e) {
        let bookId = this[0];

        this[1].props.likeBook(bookId);
    }

    dislikeBook(e) {
        let bookId = this[0];

        this[1].props.dislikeBook(bookId);
    }

    handleOrder(e) {
        let book = this[0];

        this[1].props.addBookToCart(book);
    }

    render() {
        let { books, user } = this.props;
        let bookId = this.props.match.params.id;
        let book = books.find(x => x._id === bookId);

        if (!book) {
            return <div>Loading...</div>
        }
        let isLiked = book.likes.indexOf(user) === 0;

        return (
            <div className="container">
                <div className="row">
                    <div className="span5">
                        <img src={book.image} className="img-polaroid" alt="Lenovo Desktop" />
                    </div>
                    <div className="span7">
                        <h2>{book.title}</h2>
                        <h4 className="muted">{book.genres.join(",")}</h4>
                        <p>{book.description}</p>
                        <hr />
                        <h4>Author - {book.author}</h4>
                        <h4>Likes - {book.likes.length}</h4>
                        <h3>Price - ${book.price}</h3>
                        <br />
                        <button type="button" className="btn btn-warning btn-large"
                            onClick={this.handleOrder.bind([book, this])} >Order</button>
                        {!isLiked ?
                            <button type="button" className="btn btn-success btn-large margin" onClick={this.likeBook.bind([book._id, this])}>Like</button> :
                            <button type="button" className="btn btn-success btn-large margin" onClick={this.dislikeBook.bind([book._id, this])}>Dislike</button>}

                    </div>
                </div>
            </div>
        )
    }
}

export default BookDetails;