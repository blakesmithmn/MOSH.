const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const API_KEY = process.env.API_KEY;

router.get('/:query', rejectUnauthenticated, (req, res) => {
    console.log('ReqParams is:', req.query.zipcode);
    let search = req.params.query;
    console.log('SEARCH IS:', req.query.search);
    let userZipcode = req.query.zipcode;

    // TESTING

    // VARIABLES:
    // PAGE NUMBER
    // ZIP CODE from USER
    // SEARCH Q
    axios.get(`https://api.seatgeek.com/2/events?per_page=100&&page=1&geoip=${userZipcode}&q=${search}&type=concert&client_id=${API_KEY}`)
        .then((searchRes => {
            console.log('Search Results Are:', searchRes.data.events);
            res.send(searchRes.data.events)
        }))
        .catch((error => {
            console.log('/search GET Error', error);
        }));

})


// router.get('/:eventID', (req, res) => {
//     let eventID = req.params.query;
//     console.log('SEARCH IS:', req.params.query);

//     // TESTING

//     axios.get(`https://api.seatgeek.com/2/events?id=${eventID}&per_page=25&client_id=${API_KEY}`)
//         .then((searchRes => {
//             console.log('Search Results Are:', searchRes.data.events);
//             res.send(searchRes.data.events)
//         }))
//         .catch((error => {
//             console.log('/search GET Error', error);
//         }));

// })


module.exports = router;