import React, { Component } from 'react';

class Home extends Component {
    render() {
        let { books } = this.props;

        return (
            <div className="welcome-wrapper">
                <div className="welcome">
                    <h1>Welcome to our book store, tanya !</h1>
                    <p><a href="/store">Go To Store</a><a href="/orders">View your orders</a></p>
                </div>
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
                                    <div className="card-footer"><small className="text-muted" /><a type="button" className="btn btn-primary float-right btn-sm" href="/details/5c75009b6fa7f81b2459134e">Details</a><button type="button" className="btn btn-warning float-right btn-sm">Order</button></div>
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