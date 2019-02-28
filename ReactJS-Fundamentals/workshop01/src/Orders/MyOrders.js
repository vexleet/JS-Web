import React, { Component } from 'react';

class MyOrder extends Component {
    render() {
        let { myOrderedBooks } = this.props;

        if (!myOrderedBooks) {
            return <div>Loading...</div>
        }

        return (
            <div className="container" style={{ paddingTop: '25px' }}>
                <h1 className="text-center">My Orders</h1>
                <div className="row" style={{ paddingTop: '25px' }}>
                    <div className="col-md-12" id="customer-orders">
                        <div className="box">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Order</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myOrderedBooks.map((book, index) => {
                                            return <tr key={book._id}>
                                                <th>#{index + 1}</th>
                                                <td>{book.date}</td>
                                                <td>$ {book.products[0].price}</td>
                                                <td><span className="label label-info">{book.status}</span></td>
                                                <td><a className="btn btn-outline-warning btn-sm" href="/orders/details/5c76a2aa157aaa2c6084dc54">View</a></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyOrder;