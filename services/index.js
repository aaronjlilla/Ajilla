const express = require("express");
const request = require('request');
const fs = require('fs');
const app = express();
const port = 4000;
const TwitchApi = require("node-twitch");
const cors = require('cors');
var SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');

app.use(cors());
 
const api = new TwitchApi({
    client_id: "7w1vpycr7731xproqy4o9vr7u5082r",
    client_secret: "ests9r2setwqykxoh9yjdzbh8mq4xq",
    isApp: true
});

let viewcount = 0;
 
api.on("ready", () => {
    setInterval(function() {
      const options = {
        channels: "ajilla"
      }
      api.getStreams(options, (body, response) => {
        if (body.data && body.data[0]["viewer_count"]) {
          viewcount = body.data[0]["viewer_count"];
        }
        else {
          viewcount = 0;
        }
      });
    }, 15000)
});

app.get('/viewcount', function (req, res) {
  res.send(String(viewcount));
});

var credentials = {
  clientId: '2a8c0820548445999bfcfb3424f2029e',
  clientSecret: '9b1721ee718141c1b590aaed215eb591',
  redirectUri: 'https://example.com/callback'
};

var spotifyApi = new SpotifyWebApi(credentials);

var code = 'AQBIHf2O1U8c4npp46fNneXkQkRkrtkSgUP12OHq7dENuSuSHebR3AbwMI3WC3z73NArIe_7BmOey0D8e0fUt_4zU0fLHQrS7k4v9eTJ5xGP6Pttekng6XkofH-DKiimoQeRL77f7MykM7bpQi59kiUXY-6MnfEbb3_Oxiz1xyqZ5tGa_lF1DNoc3-bnkjzy7ratkmmeChkFBeUi_mu4aAir-c5e6zd01FOg07-UVCaBSWibUn2X3KKSCWz60ok4GIREgRTnicSpwgxk_DghZzXoYLvax6BUj1wLxNrFUDUNlIZHelGGJasUn7_n1FqAl-jwVXlI48i_GHckHyj0DAYawngTUDLxDm0UnuekoLXVyb1Ccm0girpHdOjWf4LZD-2M6pLzBIZK3-ZT1qGRw1MQvFmxV-VUa79I2JlKLuYnZFHoPnF0GcDETwBiICOH';

spotifyApi.authorizationCodeGrant(code).then(
  function(data) {
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']);

    // Set the access token on the API object to use it in later calls
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
  },
  function(err) {
    if (err) throw err;
  }
)

app.get('/refreshtoken', function(req, res) {
  spotifyApi.refreshAccessToken().then(
    function(data) {
      let d = new Date();
      console.log("Refresh token requested and parsed at " + d);
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      if (err) throw err;
    }
  );
});

app.get('/getcurrentlyplaying', function(req, res) {
    axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Accept: "application/json",
      Authorization: 'Bearer ' + spotifyApi.getAccessToken()
    }
    }).then((response) => {
      if (response.data["item"]) {
        res.json({artist: response.data["item"]["artists"][0]["name"], song: response.data["item"]["name"]})
      }
    })
});


app.get('/generatetoken', function(req, res) {
  var scopes = ['user-read-private', 'user-read-email', 'user-modify-playback-state', 'user-read-playback-state', 'user-read-currently-playing', 'app-remote-control', 'streaming', 'user-library-modify', 'user-library-read']
  redirectUri = 'https://example.com/callback',
  clientId = '2a8c0820548445999bfcfb3424f2029e'

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId
});

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes);

// https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
res.send(authorizeURL);
})

app.get('/spotifytoken', function(req, res) {
  let token = "";
  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token is ' + data.body['access_token']);
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong!', err);
    }
  ).then(function() {
    token = spotifyApi.getAccessToken();
  })

  // let tokenjson = JSON.parse(token);
  res.json({accesstoken: spotifyApi.getAccessToken()});
})


app.listen(port, () => {
    console.log(`Server currently running on ${port}`)
})