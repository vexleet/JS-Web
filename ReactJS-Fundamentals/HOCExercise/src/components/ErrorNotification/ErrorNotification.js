import React from 'react';

class ScaryButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            releaseBugs: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            releaseBugs: true
        });
    }

    render() {
        if (this.state.releaseBugs) {
            throw new Error("I crashed!");
        }
        return (
            <button className="btn" onClick={this.handleClick}>
                {"Scary Button!"}
            </button>
        );
    }
}

export default ScaryButton;