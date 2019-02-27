import React, { Component } from 'react';
import BindingForm from '../BindingForm/BindingForm';

class ManagedForms extends Component {
    render() {
        return (
            <span>
                <h1>Check console on submit</h1>
                <BindingForm>
                    <h1>Register</h1>
                    Username:
                    <input name="username" type="text"></input>
                    Email:
                    <input name="email" type="text"></input>
                    Password:
                    <input name="password" type="password"></input>
                </BindingForm>

                <BindingForm>
                    <h1>Shipping Address</h1>
                    Name:
                    <input name="name" type="text"></input>
                    Address:
                    <input name="address" type="text"></input>
                    City:
                    <input name="city" type="text"></input>
                    State:
                    <input name="state" type="text"></input>
                    Zip:
                    <input name="zip" type="text"></input>
                </BindingForm>
            </span>
        )
    }
}

export default ManagedForms;