import React, { Component } from 'react';
import './Create.css';

class Create extends Component {
  render() {
    return (
      <div className="Create">
        <h1>Create Movie</h1>
        <form action="/" onSubmit={(event) => {
          event.preventDefault();

          let target = event.target;
          let title = target.title.value;
          let storyLine = target.storyLine.value;
          let trailerUrl = target.trailerUrl.value;
          let poster = target.poster.value;

          let movie = {
            title,
            storyLine,
            trailerUrl,
            poster,
          };
          this.props.createMovie(movie);
        }}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Titanic" />
          <label htmlFor="storyLine">Story Line</label>
          <input type="text" id="storyLine" placeholder="Text" />
          <label htmlFor="trailerUrl">Trailer Url</label>
          <input type="text" id="trailerUrl" placeholder="https://www.youtube.com/watch?v=DNyKDI9pn0Q" />
          <label htmlFor="poster">Movie Poster</label>
          <input type="text" id="poster"
            placeholder="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRzg6o0KjhufKFU1iBNr1zuyi0YDNgCUw4Ky5SNATZDVKaIUkiAA" />
          <input type="submit" className="submitButton" value="Create" />
        </form>
      </div>
    );
  }
}

export default Create;
