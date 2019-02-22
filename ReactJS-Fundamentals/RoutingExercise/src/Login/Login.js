import React, { Component } from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';
class Login extends Component {
  render() {
    if (this.props.redirectToReferrer) {
      return <Redirect to='/' />
    }
    return (
      <div className="Login">
        <h1>Login</h1>
        <form action="/" onSubmit={(event) => {
          event.preventDefault();

          let target = event.target;
          let username = target.usernameLogin.value;
          let password = target.passwordLogin.value;

          let user = {
            username,
            password,
          };
          this.props.loginUser(user);
        }}>
          <label htmlFor="usernameLogin">Username</label>
          <input type="text" id="usernameLogin"
            placeholder="Ivan Ivanov" />
          <label htmlFor="passwordLogin">Password</label>
          <input type="password"
            id="passwordLogin" placeholder="******" />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
