import React, { Component } from 'react';

class Store extends Component {
    render() {
        let { books } = this.props;

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1 className="jumbotron-heading text-center">Store</h1>
                        <form className="form-inline md-form form-sm active-cyan active-cyan-2"><i className="fa fa-search" aria-hidden="true" /><input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search for the book you are looking for..." aria-label="Search" name="query" defaultValue /></form>
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
                                    <div className="card-footer"><small className="text-muted" /><a type="button" className="btn btn-primary float-right btn-sm" href="/details/5c750355eba4543e800f7ce4">Details</a><button type="button" className="btn btn-warning float-right btn-sm">Order</button></div>
                                </div>
                            )
                        })}

                    </div>
                </div>
                <div className="row space-top">
                    <div className="col-md-12">
                        <ul className="pagination">
                            <li className="page-item disabled"><a className="page-link" href="/store/0">«</a></li>
                            <li className="page-item active"><a className="page-link" href="/store/1">1</a></li>
                            <li className="page-item disabled"><a className="page-link" href="/store/2">»</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Store;