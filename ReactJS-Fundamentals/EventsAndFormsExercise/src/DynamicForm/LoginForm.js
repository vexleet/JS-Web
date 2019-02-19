import React from 'react';
import './login.css';

class LogInForm extends React.Component {

    render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    let user = {
                        username: event.target.usernameLogin.value,
                        password: event.target.passwordLogin.value
                    }

                    this.props.loginUser(user);
                }}>
                    <label>Usersname</label>
                    <input type="text" id="usernameLogin" />
                    <label>Password</label>
                    <input type="password" id="passwordLogin" />
                    <input type="submit" value="Login" />
                </form>
            </div>
        )
    }
}

export default LogInForm;
