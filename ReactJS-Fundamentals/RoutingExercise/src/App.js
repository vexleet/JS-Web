import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Create from './Create/Create';
import './App.css';
import './Toastr.css';
import toastr from 'toastr';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      movies: [],
      isAdmin: undefined,
      redirectToReferrer: false,
      storyLine: undefined,
      movieName: undefined,
      trailerUrl: undefined,
    };

    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logout = this.logout.bind(this);
    this.createMovie = this.createMovie.bind(this);
    this.viewStoryLine = this.viewStoryLine.bind(this);
    this.viewTrailer = this.viewTrailer.bind(this);
  }

  async registerUser(user) {
    await fetch('http://localhost:9999/auth/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Please fill up all fields!");
        }
        return res.json();
      })
      .then(() => {
        toastr.success("Successfully registered");
        this.loginUser({ username: user.username, password: user.password });
      })
      .catch((error) => {
        toastr.error(error.message, '', {
          closeButton: true
        });
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
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid credentials.");
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          user: data.username,
          isAdmin: data.isAdmin,
          redirectToReferrer: true,
        });

        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('isAdmin', data.isAdmin);

        toastr.success('Login successful');
      })
      .catch((error) => {
        toastr.error(error.message, '', {
          closeButton: true
        })
      });
  }

  logout() {
    sessionStorage.clear();

    this.setState({
      user: null,
      isAdmin: undefined,
      redirectToReferrer: true,
      storyLine: undefined,
      movieName: undefined,
      trailerUrl: undefined,
    });

    toastr.success('Logout successful');
  }

  async createMovie(movie) {
    await fetch('http://localhost:9999/feed/movie/create', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Please fill up all fields.");
        }

        toastr.success('Movie added successfully.');
        fetch('http://localhost:9999/feed/movies')
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              movies: data.movies,
              redirectToReferrer: true,
            })
          });
      })
      .catch((error) => {
        toastr.error(error.message);
      });
  }

  viewStoryLine(storyLine, movieName) {
    this.setState({
      storyLine: storyLine,
      movieName: movieName,
      trailerUrl: undefined,
      redirectToReferrer: true,
    });
  }

  viewTrailer(trailerUrl, movieName) {
    this.setState({
      storyLine: undefined,
      movieName: movieName,
      trailerUrl: trailerUrl,
      redirectToReferrer: true,
    });
  }

  render() {
    const { redirectToReferrer, movies, user,
      storyLine, movieName, trailerUrl, isAdmin } = this.state;

    if (redirectToReferrer) {
      this.setState({
        redirectToReferrer: false,
      });
      window.scrollTo(0, 0)

      return <Redirect to='/' />
    }

    return (
      <Router>
        <div className="App">
          <header>
            <Link to="/" className="logo">Interactive IMDB</Link>
            <div className="header-right">
              <Link to="/">Home</Link>
              {isAdmin && <span><Link to="/create">Create</Link></span>}
              {
                user ?
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
          <Route exact path='/' render={() => <Home movies={movies} user={user}
            storyLine={storyLine} viewStoryLine={this.viewStoryLine}
            movieName={movieName} viewTrailer={this.viewTrailer} trailerUrl={trailerUrl} />} />
          <Route path='/register' render={() => <Register registerUser={this.registerUser} />} />
          <Route path='/login' render={() => <Login loginUser={this.loginUser} />} />
          <Route path='/create' render={() => <Create createMovie={this.createMovie} />} />
        </div>
      </Router>
    );
  }

  componentDidMount() {
    let token = sessionStorage.getItem('token') !== null;

    if (token) {
      let user = sessionStorage.getItem('username');
      let isAdmin = sessionStorage.getItem('isAdmin') === 'true';
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
