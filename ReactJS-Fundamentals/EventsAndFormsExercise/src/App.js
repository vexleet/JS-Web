import React, { Component } from 'react';
import './App.css';
import AppHeader from "./App/AppHeader";
import AppContent from "./App/AppContent";
import AppFooter from "./App/AppFooter";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            games: [],
            hasFetched: false,
            loginForm: false,
        }
    }

    registerUser(user) {
        fetch('http://localhost:9999/auth/signup', {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        }).then(() => {
            this.loginUser({ username: user.username, password: user.password })
        });
    }

    loginUser(user) {
        fetch('http://localhost:9999/auth/signin', {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        }).then((res) => {
            return res.json();
        }).then((data) => {
            this.setState({
                user: data.username,
            });
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('token', data.token);
        });
    }

    logout(event) {
        event.preventDefault();

        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');

        this.setState({
            user: null,
        });
    }

    componentWillMount() {
        let loggedInUser = sessionStorage.getItem('token') !== null;

        if (loggedInUser) {
            this.setState({
                user: sessionStorage.getItem('username')
            });
        }

        fetch("http://localhost:9999/feed/games")
            .then((res) => {
                return res.json();
            }).then((data) => {
                this.setState({
                    games: data.games,
                })
            });
    }

    createGame(data) {
        fetch("http://localhost:9999/feed/game/create", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(() => {
            fetch("http://localhost:9999/feed/games")
                .then((res) => {
                    return res.json();
                }).then((data) => {
                    this.setState({
                        games: data.games,
                    })
                });
        });
    }

    switchForm() {
        this.setState({
            loginForm: !this.state.loginForm,
        })
    }

    render() {
        return (
            <main>
                <AppHeader
                    user={this.state.user}
                    logout={this.logout.bind(this)}
                    switchForm={this.switchForm.bind(this)}
                    loginForm={this.state.loginForm}
                />
                <AppContent
                    registerUser={this.registerUser.bind(this)}
                    loginUser={this.loginUser.bind(this)}
                    games={this.state.games}
                    createGame={this.createGame.bind(this)}
                    user={this.state.user}
                    loginForm={this.state.loginForm}
                />
                <AppFooter />
            </main>
        )
    }
}

export default App;


