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

class Page extends Component {
    render() {
        const { registerUser, loginUser, createBook, books } = this.props;

        return (
            <div>
                <Route exact path='/' render={() => <Home books={books} />} />
                <Route path='/cart' component={Cart} />
                <Route path='/store' render={() => <Store books={books} />} />
                <Route path='/myOrders' component={MyOrders} />
                <Route path='/pendingOrders' component={PendingOrders} />
                <Route path='/createBook' render={() => <CreateBook createBook={createBook} />} />
                <Route path='/login' render={() => <Login loginUser={loginUser} />} />
                <Route path='/register' render={() => <Register registerUser={registerUser} />} />
            </div>
        )
    }
}

export default Page;