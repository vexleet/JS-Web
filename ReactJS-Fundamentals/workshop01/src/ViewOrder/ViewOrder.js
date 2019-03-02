import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ViewOrder extends Component {
    render() {
        let { myOrderedBooks } = this.props;

        if (myOrderedBooks.length === 0) {
            return <div>Loading</div>
        }
        let orderId = this.props.match.params.id;
        let order = myOrderedBooks.find(x => x._id === orderId);
        let totalPrice = order.products.reduce((sum, { price }) => sum + price, 0);
        return (
            <div className="container">
                <table id="cart" className="table table-hover table-condensed">
                    <thead>
                        <tr>
                            <th style={{ width: '50px' }}>Product</th>
                            <th style={{ width: '10px' }}>Price</th>
                            <th className="text-center" style={{ width: '22px' }}>Subtotal</th>
                            <th style={{ width: '10px' }} />
                        </tr>
                    </thead>
                    <tbody>
                        {order.products.map(book => {
                            return <tr key={book._id}>
                                <td data-th="Product">
                                    <div className="row">
                                        <div className="col-sm-4 hidden-xs"><img src={book.image} alt="..." className="cart-image" /></div>
                                        <div className="col-sm-8">
                                            <h4 className="nomargin">{book.title}</h4>
                                            <p>{book.genres.join(', ')}</p>
                                        </div>
                                    </div>
                                </td>
                                <td data-th="Price">${book.price.toFixed(2)}</td>
                                <td data-th="Subtotal" className="text-center">${book.price.toFixed(2)}</td>
                            </tr>
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><Link className="btn btn-warning" to="/orders"><i className="fa fa-angle-left" /> Orders</Link></td>
                            <td colSpan={2} className="hidden-xs" />
                            <td className="hidden-xs text-center"><strong>Total ${totalPrice.toFixed(2)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

export default ViewOrder;