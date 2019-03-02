import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Cart extends Component {
    removeBook(e) {
        let book = this[0];

        this[1].props.removeBookFromCart(book);
    }

    handleCheckout(e) {
        let books = this[0];

        this[1].props.orderBook(books);
    }

    render() {
        let { cartOrders } = this.props;
        let totalPrice = cartOrders.reduce((sum, { price }) => sum + price, 0);

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
                        {cartOrders.length > 0 ? cartOrders.map(book => {
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
                                <td className="actions" data-th><button className="btn btn-info btn-sm"><i className="fa fa-refresh" /></button><button className="btn btn-danger btn-sm" onClick={this.removeBook.bind([book, this])}><i className="fa fa-trash-o" /></button></td>
                            </tr>
                        }) : <tr><td>No books in cart</td></tr>}

                    </tbody>
                    <tfoot>
                        <tr>
                            <td><Link className="btn btn-warning" to="/store"><i className="fa fa-angle-left" /> Continue Shopping</Link></td>
                            <td colSpan={2} className="hidden-xs" />
                            <td className="hidden-xs text-center"><strong>Total ${totalPrice.toFixed(2)}</strong></td>
                            <td><button className="btn btn-success btn-block" onClick={this.handleCheckout.bind([cartOrders, this])}>Checkout <i className="fa fa-angle-right" /></button></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

export default Cart;