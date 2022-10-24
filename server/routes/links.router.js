const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const CLIENT_KEY = process.env.CLIENT_KEY;

router.get('/:artist', rejectUnauthenticated, (req, res) => {
    console.log('Spotify ReqParams is:', req.params.artist);
    const search = req.params.artist;
    console.log(search);


    axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${search}&size=1&apikey=${CLIENT_KEY}`)
        .then((searchRes => {
            // const spotifyURL = searchRes.data._embedded.events[0]._embedded.attractions[0].externalLinks.spotify[0]
            const linkResults = searchRes.data._embedded.events[0]._embedded.attractions[0].externalLinks;
            const image = searchRes.data._embedded.events[0].images[4]
            // console.log('SPOTIFY URL IS:', spotifyURL);
            console.log('EXTERNAL LINKS:', linkResults);
            const links = {};
            if (linkResults.youtube) {
                links.youtube = linkResults.youtube[0].url
            }
            if (linkResults.twitter) {
                links.twitter = linkResults.twitter[0].url
            }
            if (linkResults.instagram) {
                links.instagram = linkResults.instagram[0].url
            }
            if (linkResults.homepage) {
                links.homepage = linkResults.homepage[0].url
            }
            if (linkResults.spotify) {
                links.spotify = linkResults.spotify[0].url
            }
            if (image.url) {
                links.image = image.url;
            }
            console.log('EXTERNAL LINKS READY TO SEND:', links);
            // IF WE WANT TO ADD EXTERNAL LINKS - DOES IT MAKE MORE SENSE TO CHECK IF THEY EXIST HERE??

            res.send(links);
        }))
        .catch((error => {
            console.log('/search GET Error', error);
        }));

})





module.exports = router;