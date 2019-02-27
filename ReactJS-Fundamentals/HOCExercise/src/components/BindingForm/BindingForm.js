import React, { Component } from 'react';

class BindingForm extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} method="post">
                {React.Children.map(this.props.children, child => {
                    if (child.type === "input") {
                        return React.cloneElement(child, { onChange: this.handleChange });
                    }
                    return child;
                })}
                <button type="submit">Submit</button>
            </form>

        )
    }
}

export default BindingForm;