import React, { Component } from 'react';

let localState = {
    email: "",
    password: "",
}

class Login extends Component {
    handleSubmit(e) {
        e.preventDefault();

        this.props.loginUser(localState);
    }

    handleChange(e) {
        localState[e.target.name] = e.target.value;
    }

    render() {
        return (
            <div className="form-wrapper">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit.bind(this)} method="post">
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="text" name="email" id="email"
                            placeholder="Enter e-mail" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password"
                            placeholder="Enter password" onChange={this.handleChange} />
                    </div>
                    <input type="submit" defaultValue="Login" />
                </form>
            </div>

        )
    }
}

export default Login;