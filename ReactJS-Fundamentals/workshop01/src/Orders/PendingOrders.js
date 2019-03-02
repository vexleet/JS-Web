import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PendingOrders extends Component {
    handleApprove(e) {
        let id = this[0];

        this[1].props.approveBook(id);
    }

    render() {
        let { myOrderedBooks } = this.props;

        return (
            <div className="container" style={{ paddingTop: '25px' }}>
                <h1 className="text-center">Pending Orders</h1>
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
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myOrderedBooks.length > 0 ? myOrderedBooks.map((order, index) => {
                                            return <tr key={order._id}>
                                                <th>#{index + 1}</th>
                                                <td>{order.date}</td>
                                                <td>$ {order.products.reduce((sum, { price }) => sum + price, 0)}</td>
                                                <td><span className="label label-info">{order.status}</span></td>
                                                <td><Link className="btn btn-outline-warning btn-sm" to={`/orders/details/${order._id}`}>View</Link></td>
                                                <td><button className="btn btn-outline-success btn-sm" onClick={this.handleApprove.bind([order._id, this])}>Approve</button></td>
                                            </tr>
                                        }) : <tr><td>No books in cart</td></tr>}

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

export default PendingOrders;