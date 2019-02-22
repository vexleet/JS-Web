import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Create from './Create/Create';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      movies: [],
      isAdmin: undefined,
      redirectToReferrer: false,
    };

    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logout = this.logout.bind(this);
    this.createMovie = this.createMovie.bind(this);
  }

  async registerUser(user) {
    await fetch('http://localhost:9999/auth/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(() => {
        this.loginUser({ username: user.username, password: user.password })

      });
  }

  async loginUser(user) {
    await fetch('http://localhost:9999/auth/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          user: data.username,
          isAdmin: data.isAdmin,
          redirectToReferrer: true,
        });

        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('isAdmin', data.isAdmin);
      });
  }

  logout(){
    sessionStorage.clear();

    this.setState({
      user: null,
      isAdmin: undefined,
    });
  }

  async createMovie(movie) {
    await fetch('http://localhost:9999/feed/movie/create', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    })
      .then(() => {
        fetch('http://localhost:9999/feed/movies')
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              movies: data.movies,
              redirectToReferrer: true,
            })
          });
      });
  }

  render() {
    const { redirectToReferrer, movies, user } = this.state;

    if(redirectToReferrer){
      this.setState({
        redirectToReferrer: false,
      });
    }

    return (
      <Router>
        <div className="App">
          <header>
            <a href="#default" className="logo">Interactive IMDB</a>
            <div className="header-right">
              <Link to="/">Home</Link>
              {
                this.state.isAdmin ?
                  <span><Link to="/create">Create</Link></span>
                  : ''
              }
              {
                this.state.user ?
                  <span>
                    <a href="#">Welcome {this.state.user}!</a>
                    <a href="#" onClick={this.logout.bind(this)}>Logout</a>
                  </span>
                  :
                  <span>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                  </span>
              }

            </div>
          </header>
          <Route exact path='/' render={() => <Home movies={movies} user={user} />} />
          <Route path='/register' render={() => <Register registerUser={this.registerUser} redirectToReferrer={redirectToReferrer}/>} />
          <Route path='/login' render={() => <Login loginUser={this.loginUser} redirectToReferrer={redirectToReferrer} />} />
          <Route path='/create' render={() => <Create createMovie={this.createMovie} redirectToReferrer={redirectToReferrer} />} />
        </div>
      </Router>
    );
  }

  componentDidMount() {
    let token = sessionStorage.getItem('token') !== null;

    if (token) {
      let user = sessionStorage.getItem('username');
      let isAdmin = sessionStorage.getItem('isAdmin');
      this.setState({
        user: user,
        isAdmin: isAdmin,
      });
    }
    fetch('http://localhost:9999/feed/movies')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          movies: data.movies,
        });
      })
  }
}

export default App;
