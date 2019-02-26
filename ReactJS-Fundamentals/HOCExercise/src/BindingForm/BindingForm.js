import React, { Component } from 'react';

class BindingForm extends Component {
    // constructor(props){
    //     super(props);

    //     this.state = {

    //     }
    // }

    handleChange(e) {
        console.log(e)
    }

    render() {
        console.log(React.Children);
        return (
            React.Children.map(this.props.children, child => {
                if (child.type === "input") {
                    for (let prop in child.props) {
                        if (prop === "name") {
                            let test = child.props[prop]
                            child._self.state[test] = '';
                        }
                    }
                    console.log(child);
                }
                return child;
            })
        )
    }
}

export default BindingForm;