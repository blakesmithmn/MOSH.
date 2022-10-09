const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.API_KEY;

router.get('/:query', (req, res) => {
    let search = req.params.query;
    console.log('SEARCH IS:', req.params.query);

    // TESTING

    axios.get(`https://api.seatgeek.com/2/events?geoip=55416&q=${search}&type=concert&client_id=${API_KEY}`)
        .then((searchRes => {
            console.log('Search Results Are:', searchRes.data.events);
            res.send(searchRes.data.events)
        }))
        .catch((error => {
            console.log('/search GET Error', error);
        }));

})


router.get('/:eventID', (req, res) => {
    let eventID = req.params.query;
    console.log('SEARCH IS:', req.params.query);

    // TESTING

    axios.get(`https://api.seatgeek.com/2/events?id=${eventID}&per_page=25&client_id=${API_KEY}`)
        .then((searchRes => {
            console.log('Search Results Are:', searchRes.data.events);
            res.send(searchRes.data.events)
        }))
        .catch((error => {
            console.log('/search GET Error', error);
        }));

})


module.exports = router;