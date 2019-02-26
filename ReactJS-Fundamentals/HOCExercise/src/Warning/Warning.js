import React, { Component } from 'react';

const Warning = (WrappedComponent) => {
    return class extends Component {
        render() {
            return (
                <div className="alert">
                    <span className="alert-symbol">&#9888;</span>
                    <WrappedComponent />
                </div>
            );
        }
    }
}

export default Warning;