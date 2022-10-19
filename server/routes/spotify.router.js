const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

const CLIENT_KEY = process.env.CLIENT_KEY;

router.get('/:artist', (req, res) => {
    console.log('Spotify ReqParams is:', req.params.artist);
    const search = req.params.artist;
    console.log(search);


    axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${search}&size=1&apikey=${CLIENT_KEY}`)
        .then((searchRes => {
            const spotifyURL = searchRes.data._embedded.events[0]._embedded.attractions[0].externalLinks.spotify[0]
            console.log('SPOTIFY URL IS:', spotifyURL);
            res.send(spotifyURL);
        }))
        .catch((error => {
            console.log('/search GET Error', error);
        }));

})





module.exports = router;