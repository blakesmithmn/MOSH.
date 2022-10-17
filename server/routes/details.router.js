const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../modules/pool.js')

const API_KEY = process.env.API_KEY;

router.get('/:eventID', (req, res) => {
    let eventID = req.params.eventID;
    console.log('EVENT ID IS:', req.params.eventID);

    axios.get(`https://api.seatgeek.com/2/events?id=${eventID}&client_id=${API_KEY}`)
        .then((searchRes => {
            console.log('Search Results Are:', searchRes.data.events);
            const eventDetails = searchRes.data.events[0]
            const eventID = eventDetails.id
            // 1. Write a SQL query that will tell us if the eventID
            //   value exists in a row in users_events along with
            //   req.user.id = user_id AND
            //   status = true
            const sqlQuery = `
            SELECT "user_id", "event_id", "status" FROM "events"
                JOIN "users_events"
                    ON events.id = users_events.event_id
                JOIN "user"
                    ON users_events.id = "user".id
            WHERE users_events.event_id = $1;
            `
            const sqlValues = [eventID];

            pool.query(sqlQuery, sqlValues)
                .then(eventResponse => {
                    console.log('EVENT RESPONSE IS', eventResponse.rows[0]);
                    const responseObject = eventResponse.rows;

                    if (responseObject.length >= 1) {
                        eventDetails.isGoing = true;
                        res.send(eventDetails);

                    }
                    else {
                        console.log('FALSE')
                        eventDetails.isGoing = false;
                        res.send(eventDetails);
                    }
                })
            // assume we either get back:
            // []  if this, we do eventDetails.isGoing = false
            // [{id, user_id, event_id, status}] if this, we
            //    check to see if status is true, then do eventDetails.isGoing = true
            // 2. If that row exists, we add eventDetails.isGoing = true
            //    else                we add eventDetails.isGoing = false
            // 3. Then send eventDetails to the client, and you can
            //    write your React conditional rendering stuff based on
            //   the isGoing property we added.
        }))
        .catch((error => {
            console.log('/search GET Error', error);
        }));

})


module.exports = router;