import SpotifyWebApi from 'spotify-web-api-node';
export default function currentTrack(req, res) {


    var Spotify = require('spotify-web-api-node');
    var s = new Spotify();
    var spotifyApi = new SpotifyWebApi({
        clientId: '8a83aa532729407ca66c24929e6fe046',
        clientSecret: '0c3961a38bf543f5b6e7243942e8a273',
        redirectUri: 'localhost'
});

    spotifyApi.getMyCurrentPlaybackState({}).then(
        function (data) {
            res.json(data);
        });

}
