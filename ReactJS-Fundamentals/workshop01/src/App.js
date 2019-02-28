import React, { Component } from 'react';
import './App.css';
import Navigation from './Common/Navigation';
import Footer from './Common/Footer';
import Page from './Common/Page';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      token: null,
      isAdmin: false,
      books: [],
    }

    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logout = this.logout.bind(this);
    this.createBook = this.createBook.bind(this);
  }

  async registerUser(user) {
    await fetch("http://localhost:5000/auth/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  async loginUser(user) {
    await fetch("http://localhost:5000/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          user: data.user.username,
          token: data.token,
          isAdmin: data.user.roles.length > 0 ? true : false
        });

        sessionStorage.setItem("user", data.user.username);
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("isAdmin", data.user.roles.length > 0 ? true : false);
      });
  }

  async createBook(book) {
    await fetch("http://localhost:5000/book/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.state.token}`,
      },
      body: JSON.stringify(book),
    })
      .then(() => {
        fetch("http://localhost:5000/book/all")
          .then((res) => res.json())
          .then((data) => this.setState({ books: data }));
      });
  }

  logout() {
    sessionStorage.clear();

    this.setState({
      user: null,
      token: null,
      isAdmin: false,
    });
  }

  render() {
    let { user, isAdmin, books } = this.state;

    return (
      <div className="App">
        <Navigation user={user} isAdmin={isAdmin} logout={this.logout} />
        <Page registerUser={this.registerUser}
          loginUser={this.loginUser}
          createBook={this.createBook}
          books={books} />
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    let token = sessionStorage.getItem("token") !== null;

    if (token) {
      let user = sessionStorage.getItem("user");
      let isAdmin = sessionStorage.getItem("isAdmin");
      token = sessionStorage.getItem("token");

      this.setState({ user, isAdmin, token })
    }

    fetch("http://localhost:5000/book/all")
      .then((res) => res.json())
      .then((data) => this.setState({ books: data }));
  }
}

export default App;
