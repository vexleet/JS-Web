import React, { Component } from 'react';
import './Register.css';

class Register extends Component {
  render() {
    return (
      <div className="Register">
        <h1>Register</h1>
        <form action="/" onSubmit={(event) => {
          event.preventDefault();

          let target = event.target;
          let username = target.username.value;
          let email = target.email.value;
          let password = target.password.value;

          let user = {
            username,
            email,
            password,
          };

          this.props.registerUser(user);
        }}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username"
            placeholder="Ivan Ivanov" />
          <label htmlFor="email">Email</label>
          <input type="text" id="email"
            placeholder="ivan@gmail.com" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password"
            placeholder="******" />
          <input type="submit" className="submitButton" value="REGISTER" />
        </form>
      </div>
    );
  }
}

export default Register;
