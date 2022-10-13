const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for all Events users are currently attending - maybe for main page?
router.get('/', (req, res) => {
    // GET route code here
});

// GET route for user Profiles - grabbing their specific events 
router.get('/:id', (req, res) => {
    // GET route code here
    console.log(req.body);
    const user = req.params.id;

    const sqlQuery = `
    SELECT * from "user"
        JOIN users_events
           ON "user".id = users_events.user_id
        JOIN events
           ON users_events.event_id = events.id
        WHERE "user".id = $1;
    `
    const sqlValues = [user];

    pool.query(sqlQuery, sqlValues)
        .then(response => {
            console.log('RESPONSE IS:', response.rows);
            res.send(response.rows);
        })
        .catch(error => {
            console.log('ERROR GETTING USER EVENTS', error);
            res.sendStatus(500);
        })

});

// POST TO EVENTS AND USERS_EVENTS
router.post('/', async (req, res) => {
    console.log(req.body);
    // req.body should contain all necessary concert details
    const event = req.body;
    const insertEventQuery = `
    INSERT INTO "events" ("API_key", "event_name", "event_venue", "event_artist", "event_datetime", "event_description", "ticket_link")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING "id";
    `

    const eventValues = [event.id, event.name, event.venue, event.artist, event.datetime, event.description, event.tickets]
    // FIRST QUERY MAKES EVENT ROW
    pool.query(insertEventQuery, eventValues)
        .then(result => {
            console.log('New  Id:', result.rows[0].id); //ID IS HERE!

            const createdEventKey = result.rows[0].id

            // Now handle the genre reference
            const insertUsersEventsQuery = `
            INSERT INTO "users_events" ("user_id", "event_id", "status")
            VALUES  ($1, $2, $3);
            `
            // SECOND QUERY ADDS to USERS_EVENTS FOR USER / EVENT / EVENT STATUS

            pool.query(insertUsersEventsQuery, [event.userID, createdEventKey, true])
                .then(result => {
                    //Now that both are done, send back success!
                    res.sendStatus(201);
                }).catch(err => {
                    // catch for second query
                    console.log(err);
                    res.sendStatus(500)
                })

            // Catch for first query
        }).catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
})

module.exports = router;
