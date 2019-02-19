import React from "react";
import RegisterForm from "./RegisterForm";
import LogInForm from "./LoginForm";
import CreateForm from "../Games/CreateForm";

class DynamicForm extends React.Component {

    render() {
        let form;
        if (!this.props.user) {
            if (this.props.loginForm) {
                form = <LogInForm loginUser={this.props.loginUser} />;
            }
            else {
                form = <RegisterForm registerUser={this.props.registerUser} />;
            }
        }
        else{
            form = <CreateForm createGame={this.props.createGame}/>;
        }

        return (
            <div>
                <div>
                    {form}
                </div>
            </div>
        )
    }
}

export default DynamicForm