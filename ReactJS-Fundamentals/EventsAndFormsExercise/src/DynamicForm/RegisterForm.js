import React from 'react';
import './register.css';

class RegisterForm extends React.Component {

    render() {
        return (
            <div className="Register">
                <h1>Sign Up</h1>
                <form onSubmit={(event) => {
                    event.preventDefault();

                    let user = {
                        username: event.target.usernameReg.value,
                        email: event.target.emailReg.value,
                        password: event.target.passwordReg.value,
                    }

                    this.props.registerUser(user);
                }}>
                    <label>Username</label>
                    <input type="text" id="usernameReg"/>
                    <label>Email</label>
                    <input type="text" id="emailReg"/>
                    <label>Password</label>
                    <input type="password" id="passwordReg"/>
                    <input type="submit" value="Sign Up"/>
                </form>
            </div>
        )
    }
}
export default RegisterForm;