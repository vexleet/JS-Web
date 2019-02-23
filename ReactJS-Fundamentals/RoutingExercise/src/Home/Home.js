import React, { Component } from 'react';
import './Home.css'

class Home extends Component {
  render() {
    let movies = this.props.movies;
    let user = this.props.user;

    if (movies.length === 0) {
      return <h1>No movies at the moment</h1>
    }

    return (
      <div className="Home">
        <h1>All movies</h1>
        <ul className="movies">
          {
            movies.map((movie) => {
              return <li className="movie" key={movie._id}>
                <h2>{movie.title}</h2>
                <img alt='' src={movie.poster} />
                {
                  user ?
                    <span>
                      <button className="submitButton">View Trailer</button>
                      <button className="submitButton">View Story Line</button>
                    </span>
                    : ''
                }
              </li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default Home;
