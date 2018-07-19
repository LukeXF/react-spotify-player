import React, {Component} from 'react';
import './App.css'
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap'
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'http://localhost:3001/spotify';
    let FETCH_URL = `${BASE_URL}/${this.state.query}`;
    const ALBUM_URL = 'http://localhost:3001/spotifyArtist';

    console.log('FETCH+URL', FETCH_URL);

    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      console.log('artist', artist);
      this.setState({artist});

      FETCH_URL = `${ALBUM_URL}/${artist.id}`;

      fetch(FETCH_URL, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
        console.log('track', json)
        //const tracks = json.tracks;
        const { tracks } = json;
        this.setState({tracks});
      })
    })
  }

  render() {
    return (<div className="App">
      <div className="App-title">Luke's Music Player</div>
      <FormGroup>
        <InputGroup>
          <FormControl
              type="text"
              placeholder="search for an artist"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search()
                }
              }}
            />
          <InputGroup.Addon onClick={() => this.search()}>
            <Glyphicon glyph="search"></Glyphicon>
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>

      {
        this.state.artist !== null
        ?
        <div>
          <Profile artist={this.state.artist} />

          <Gallery
            tracks={this.state.tracks}
          />
        </div>

        : <div></div>
      }
    </div>)
  }
}

export default App;
