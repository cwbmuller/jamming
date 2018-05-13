import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';



class App extends Component {



    constructor(props) {
        super(props);
        this.state = {};
        this.state.searchResults = [];
        this.state.playlistName = 'New playlist';
        this.state.playlistTracks = [];
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }
    updatePlaylistName (name) {
        this.setState({
            playlistName : name
        });
        console.log(name);
    }
    addTrack (track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            console.log('Already in Playlist');
            return;
        }
        let tracks = this.state.playlistTracks;
        tracks.push(track);
        this.setState({playlistTracks: tracks});

    }
    removeTrack (track) {
        let currentTracks = this.state.playlistTracks;
        let tracks = currentTracks.filter(savedTrack => savedTrack.id !== track.id);
        this.setState({
            playlistTracks : tracks
        });
    }
    savePlaylist(){
        let trackUris = this.state.playlistTracks.map(currentTrack=> currentTrack.uri);
        Spotify.savePlaylist(this.state.playlistName, trackUris);
        this.setState({
            playlistName: 'New Playlist',
            playlistTracks: []
        });
        console.info(trackUris);

    }
    search(searchTerm){
        Spotify.search(searchTerm).then(songs => {
            this.setState({searchResults: songs});
        })
    }
  render() {
    return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar onSearch={this.search}/>
                <div className="App-playlist">
                    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                    <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onRemove={this.removeTrack} onNameChange = {this.updatePlaylistName} onSave = {this.savePlaylist}/>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
