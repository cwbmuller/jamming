import Cookies from 'universal-cookie';

let accessToken = undefined;

const clientId = '0c3cafaff2e74411a233cbb1abee3d1a';
const redirectUri = 'http://localhost:3001/';
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;


const Spotify = {
    getAccessToken(term){
        if(accessToken){
            return accessToken;
        }
        const accessTokenMatch=window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            const cookies = new Cookies();
            cookies.set('searchTerm', term, { path: '/' });
            console.log(cookies.get('searchTerm')); // Pacman
            window.location = spotifyUrl;
        }
    },
    search(term) {
        const accessToken = this.getAccessToken(term);
        const headers = { Authorization: `Bearer ${accessToken}` };
        const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
        return fetch(searchUrl, {
            headers: headers
        }).then(response => {
                    return response.json();
            }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
            // Code to execute with jsonResponse
            if (!jsonResponse.tracks) {
                return [];
            }
            console.log(jsonResponse);
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    savePlaylist(playlistName, trackUris) {

        // Make sure both input fields are present and set up variables
        if (playlistName === '' || trackUris === '') {
            return
        };
        const userUrl = 'https://api.spotify.com/v1/me';
        const accessToken = this.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;
        let playlistId;
        return fetch(userUrl, {
            headers: headers
        }).then(response => response.json())
            .then(jsonResponse => userId = jsonResponse.id)
            .then(() => {
                const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
                return fetch(createPlaylistUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        name: playlistName
                    })
                })
                    .then(response => response.json())
                    .then(jsonResponse => playlistId = jsonResponse.id)
                    .then(() => {
                        const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
                        fetch(addPlaylistTracksUrl, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify({
                                uris: trackUris
                            })
                        });
                    })
            })
    }



};
export default Spotify;

