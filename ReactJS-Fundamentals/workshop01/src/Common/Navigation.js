import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Navigation extends Component {
    render() {
        let { user, isAdmin, logout } = this.props;

        return (
            <header>
                <nav className="navbar-menu">
                    <NavLink to="/">Book Store</NavLink>
                    <NavLink to="/" activeClassName="active">Home</NavLink>
                    <NavLink to='/store' activeClassName="active">Store</NavLink>
                    {isAdmin && <NavLink to='/createBook' activeClassName="active">Create New Book</NavLink>}
                    {user && !isAdmin && <NavLink to='/myOrders' activeClassName="active">My Orders</NavLink>}
                    {user && !isAdmin && <NavLink to='/cart' activeClassName="active">Cart</NavLink>}
                    {isAdmin && <NavLink to='/pendingOrders' activeClassName="active">Pending Orders</NavLink>}
                    {!user && <NavLink to="/login" activeClassName="active">Login</NavLink>}
                    {!user && <NavLink to="/register" activeClassName="active">Register</NavLink>}
                    {user && <a href="javascript:void(0)" onClick={logout}>Logout</a>}
                </nav>
            </header >
        )
    }
}

export default Navigation;