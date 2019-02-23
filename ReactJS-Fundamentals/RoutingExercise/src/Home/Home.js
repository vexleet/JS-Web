import React, { Component } from 'react';
import './Home.css'
import ReactPlayer from 'react-player'

class Home extends Component {

  render() {
    let { movies, user, storyLine,
      movieName, viewStoryLine, trailerUrl, viewTrailer } = this.props;

    if (movies.length === 0) {
      return <h1>No movies at the moment</h1>
    }

    return (
      <div className="Home">
        <h1>All movies</h1>
        {trailerUrl &&
          <ReactPlayer className="trailer" url={trailerUrl} controls />}
        {storyLine &&
          <span><h2>Story Line of {movieName}</h2>
            <p>{storyLine}</p></span>}

        <ul className="movies">
          {
            movies.map((movie) => {
              return <li className="movie" key={movie._id}>
                <h2>{movie.title}</h2>
                <img alt='' src={movie.poster} />
                {
                  user ?
                    <span>
                      <button className="submitButton"
                        onClick={() => viewTrailer(movie.trailerUrl, movie.title)}>View Trailer</button>
                      <button className="submitButton"
                        onClick={() => viewStoryLine(movie.storyLine, movie.title)}>View Story Line</button>
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
