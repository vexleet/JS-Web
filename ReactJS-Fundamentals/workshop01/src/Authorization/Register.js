import React, { Component } from 'react';

let localState = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
}

class Register extends Component {
    handleSubmit(e) {
        e.preventDefault();

        this.props.registerUser(localState);
    }

    handleChange(e) {
        localState[e.target.name] = e.target.value;
        console.log(localState);
    }

    render() {
        return (
            <div className="form-wrapper">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit.bind(this)} method="post">
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="text" name="email" id="email"
                            placeholder="Enter e-mail" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username"
                            placeholder="Enter username" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password"
                            placeholder="Enter password" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword"
                            placeholder="Enter your password again" onChange={this.handleChange} />
                    </div>
                    <input type="submit" defaultValue="Register" />
                </form>
            </div>
        )
    }
}

export default Register;