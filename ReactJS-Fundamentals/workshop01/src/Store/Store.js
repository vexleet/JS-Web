import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Store extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleDelete(e) {
        let bookId = this[0];

        this[1].props.deleteBook(bookId);
    }

    handleOrder(e) {
        let book = this[0];

        this[1].props.addBookToCart(book);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        let { books, isAdmin, user } = this.props;
        let query = this.state.query;

        if (query !== '') {
            books = books.filter(b => b.title.toLowerCase().includes(query.toLowerCase()))
        }

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1 className="jumbotron-heading text-center">Store</h1>
                        <form className="form-inline md-form form-sm active-cyan active-cyan-2">
                            <i className="fa fa-search" aria-hidden="true" />
                            <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search for the book you are looking for..." aria-label="Search"
                                name="query" onChange={this.handleChange} />
                        </form>
                    </div>
                </div>
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
                                    {isAdmin &&
                                        <div className="card-footer">
                                            <small className="text-muted" />
                                            <Link type="button" className="btn btn-primary float-right btn-sm" to={`/edit/${book._id}`}>Edit</Link>
                                            <button type="button" className="btn btn-danger float-right btn-sm" onClick={this.handleDelete.bind([book._id, this])} >Delete</button>
                                        </div>}
                                    {user && !isAdmin && <div className="card-footer">
                                        <small className="text-muted" />
                                        <Link type="button" className="btn btn-primary float-right btn-sm" to={`/details/${book._id}`}>Details</Link>
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

export default Store;