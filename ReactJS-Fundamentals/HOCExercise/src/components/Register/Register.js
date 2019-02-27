import React from 'react';

const Register = () => {
    return (
        <div>
            <header><span className="title">Register</span></header>
            <form>
                Username:
                <input type="text" /><br />
                Email:
                <input type="text" /><br />
                Password:
                <input type="password" /><br />
                Repeat Password:
                <input type="password" /><br />
                <input type="submit" defaultValue="Register" />
            </form>
        </div>
    )
};

export default Register;