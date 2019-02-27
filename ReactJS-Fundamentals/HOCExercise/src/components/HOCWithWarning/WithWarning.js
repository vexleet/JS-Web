import React, { Component } from 'react';
import Article from '../Article/Article';
import Register from '../Register/Register';
import Navigation from '../Navigation/Navigation';
import Warning from '../Warning/Warning';

class WithWarning extends Component {
    render() {
        const ArticleWithWarning = Warning(Article);
        const RegisterWithWarning = Warning(Register);
        const NavigationWithWarning = Warning(Navigation);

        return (
            <span>
                <Article />
                <Register />
                <Navigation />

                <ArticleWithWarning />
                <RegisterWithWarning />
                <NavigationWithWarning />
            </span>
        );
    }
}

export default WithWarning;
