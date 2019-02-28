import React, { Component } from 'react';

class Cart extends Component {
    render() {
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
                        <tr>
                            <td data-th="Product">
                                <div className="row">
                                    <div className="col-sm-4 hidden-xs"><img src="https://images-na.ssl-images-amazon.com/images/I/51fonMmNpnL.jpg" alt="..." className="cart-image" /></div>
                                    <div className="col-sm-8">
                                        <h4 className="nomargin">Harry Potter</h4>
                                        <p>fantasy, adventure, kids</p>
                                    </div>
                                </div>
                            </td>
                            <td data-th="Price">$10.00</td>
                            <td data-th="Subtotal" className="text-center">$10.00</td>
                            <td className="actions" data-th><button className="btn btn-info btn-sm"><i className="fa fa-refresh" /></button><button className="btn btn-danger btn-sm"><i className="fa fa-trash-o" /></button></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><a className="btn btn-warning" href="/store"><i className="fa fa-angle-left" /> Continue Shopping</a></td>
                            <td colSpan={2} className="hidden-xs" />
                            <td className="hidden-xs text-center"><strong>Total $10.00</strong></td>
                            <td><button className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right" /></button></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

export default Cart;