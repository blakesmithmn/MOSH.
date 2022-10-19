const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// const API_KEY = process.env.API_KEY;

router.get('/:artist', (req, res) => {
    console.log('Spotify ReqParams is:', req.params);
    const search = req.params.artist;

    axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${search}&size=1&apikey=nv94v58HDc8cnGXmGG6xGGZsUi62jpdo`)
        .then((searchRes => {
            console.log('Search Results Are:', searchRes.data._embedded.events[0]._embedded.attractions[0].externalLinks.spotify[0].url);
            const spotifyURL = searchRes.data._embedded.events[0]._embedded.attractions[0].externalLinks.spotify[0].url
            res.send(spotifyURL);
        }))
        .catch((error => {
            console.log('/search GET Error', error);
        }));

})





module.exports = router;