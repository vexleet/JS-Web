import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Register from '../Authorization/Register';
import Login from '../Authorization/Login';
import Home from './Home';
import CreateBook from '../Book/CreateBook';
import Cart from '../Cart/Cart';
import Store from '../Store/Store';
import MyOrders from '../Orders/MyOrders';
import PendingOrders from '../Orders/PendingOrders';
import ViewOrder from '../ViewOrder/ViewOrder';
import Edit from '../Edit/Edit';

class Page extends Component {
    render() {
        const { registerUser, loginUser, createBook,
            books, addBookToCart, myOrderedBooks, cartOrders,
            removeBookFromCart, orderBook, approveBook,
            isAdmin, deleteBook, user, editBook } = this.props;

        return (
            <div>
                <Route exact path='/' render={() => <Home books={books}
                    isAdmin={isAdmin} addBookToCart={addBookToCart} deleteBook={deleteBook} user={user} />} />
                <Route path='/cart' render={() => <Cart cartOrders={cartOrders}
                    removeBookFromCart={removeBookFromCart} orderBook={orderBook} />} />
                <Route path='/store' render={() => <Store books={books} addBookToCart={addBookToCart}
                    deleteBook={deleteBook} isAdmin={isAdmin} />} />
                <Route exact path='/orders' render={() => <MyOrders myOrderedBooks={myOrderedBooks} />} />
                <Route exact path='/admin/orders' render={() => <PendingOrders myOrderedBooks={myOrderedBooks}
                    approveBook={approveBook} />} />
                <Route path='/createBook' render={() => <CreateBook createBook={createBook} />} />
                <Route path='/login' render={() => <Login loginUser={loginUser} />} />
                <Route path='/register' render={() => <Register registerUser={registerUser} />} />
                <Route path='/orders/details/:id'
                    render={(props) => <ViewOrder {...props} myOrderedBooks={myOrderedBooks} />} />
                <Route path='/edit/:id' render={(props) => <Edit {...props} editBook={editBook} books={books} />} />
            </div>
        )
    }
}

export default Page;