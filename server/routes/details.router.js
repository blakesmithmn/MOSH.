const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.API_KEY;

router.get('/:eventID', (req, res) => {
    let eventID = req.params.eventID;
    console.log('EVENT ID IS:', req.params.eventID);

    axios.get(`https://api.seatgeek.com/2/events?id=${eventID}&client_id=${API_KEY}`)
        .then((searchRes => {
            console.log('Search Results Are:', searchRes.data.events);
            res.send(searchRes.data.events)
        }))
        .catch((error => {
            console.log('/search GET Error', error);
        }));

})


module.exports = router;