import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Home extends Component {
    handleDelete(e) {
        let bookId = this[0];

        this[1].props.deleteBook(bookId);
    }

    handleOrder(e) {
        let book = this[0];

        this[1].props.addBookToCart(book);
    }

    render() {
        let { books, isAdmin, user } = this.props;

        return (
            <div className="welcome-wrapper">
                {user ?
                    <div className="welcome">
                        <h1>Welcome to our book store, {user} !</h1>
                        <p><Link to="/store">Go To Store</Link><Link to="/orders">View your orders</Link></p>
                    </div> :
                    <div className="welcome">
                        <h1>Welcome to our book store!</h1>
                        <p>Your favourite book is just a few click away. Register now and choose from our store.</p>
                        <p><Link to="/store">Go To Store</Link><Link to="/register">Register</Link></p>
                    </div>}
                <h2>Top Rated</h2>
                <div className="row">
                    <div className="card-deck space-top">
                        {books.map(book => {
                            return (
                                <div className="card col-4" key={book._id}>
                                    <img className="card-img-top card-image" src={book.image} alt={book.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{book.title}</h5>
                                        <p className="card-text">{book.description}</p>
                                    </div>

                                    {isAdmin ?
                                        <div className="card-footer">
                                            <small className="text-muted" />
                                            <Link type="button" className="btn btn-primary float-right btn-sm" to={`/edit/${book._id}`}>Edit</Link>
                                            <button type="button" className="btn btn-danger float-right btn-sm" onClick={this.handleDelete.bind([book._id, this])} >Delete</button>
                                        </div>
                                        : <div className="card-footer">
                                            <small className="text-muted" />
                                            <a type="button" className="btn btn-primary float-right btn-sm" href="/details/5c750355eba4543e800f7ce4">Details</a>
                                            <button type="button" className="btn btn-warning float-right btn-sm" onClick={this.handleOrder.bind([book, this])} >Order</button>
                                        </div>}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;