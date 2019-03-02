import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                                        {myOrderedBooks.map((order, index) => {
                                            return <tr key={order._id}>
                                                <th>#{index + 1}</th>
                                                <td>{order.date}</td>
                                                <td>$ {order.products.reduce((sum, { price }) => sum + price, 0)}</td>
                                                <td><span className="label label-info">{order.status}</span></td>
                                                <td><Link className="btn btn-outline-warning btn-sm" to={`/orders/details/${order._id}`}>View</Link></td>
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