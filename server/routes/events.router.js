const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET route for all Events users are currently attending - maybe for main page?
router.get('/', (req, res) => {
    // GET route code here
});

// GET route for user Profiles - grabbing their specific events 
router.get('/:id', rejectUnauthenticated, (req, res) => {
    // GET route code here
    console.log(req.body);
    const user = req.params.id;

    // SQL to grab a user's events
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
            res.send(response.rows);
        })
        .catch(error => {
            console.log('ERROR GETTING USER EVENTS', error);
            res.sendStatus(500);
        })

});

// POST TO EVENTS AND USERS_EVENTS
router.post('/', rejectUnauthenticated, (req, res) => {
    const event = req.body;
    console.log('POST INFO IS:', req.body);

    // SEARCH EVENTS TABLE FOR API_KEY TO AVOID DUPLICATES
    const sqlFindQuery = `
        SELECT * from "events"
            WHERE events.id = $1
    
    `
    // VALUE TO FIND IN TABLE
    const sqlFindValues = [event.id];
    console.log(sqlFindValues);

    // POOL QUERY TO SEARCH FOR IT
    pool.query(sqlFindQuery, sqlFindValues)

        .then(findRes => {
            // RESPONSE BUT REFERENCING THE SINGLE ITEM WE LOOKED FOR
            const existingevent = findRes.rows.length > 0;
            console.log('existing event is:', existingevent);
            if (existingevent) {
                console.log('Found a match for item:', findRes.rows[0].id); //ID IS HERE!

                const createdEventKey = findRes.rows[0].id;

                // SKIP INSERT INTO EVENTS - INSTEAD JUST ADD TO USERS_EVENTS
                const insertUsersEventsQuery = `
                INSERT INTO "users_events" ("user_id", "event_id", "status")
                VALUES  ($1, $2, $3);
                 `
                // SECOND QUERY ADDS to USERS_EVENTS FOR USER / EVENT / EVENT STATUS

                pool.query(insertUsersEventsQuery, [event.userID, createdEventKey, true])
                    .then(result => {
                        //Now that both are done, send back success!
                        console.log('RESULT IS:', result);
                        res.sendStatus(201);
                    }).catch(err => {
                        // catch for second query
                        console.log(err);
                        res.sendStatus(500)
                    })

            } else {
                // req.body should contain all necessary concert details
                const insertEventQuery = `
                INSERT INTO "events" ("id", "event_name", "event_venue", "event_artist", "event_datetime", "event_description", "ticket_link", "image")
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING "id";
                `

                const eventValues = [event.id, event.name, event.venue, event.artist, event.datetime, event.description, event.tickets, event.image]
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
            }
        })
})

// DELETE ROUTE FOR USERS_EVENTS

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('UserID is:', req.query.userID);
    console.log('EventID is:', req.query.concertID);

    const sqlValues = [req.query.userID, req.query.concertID];
    const sqlQuery = `
    DELETE from "users_events"
        WHERE "event_id" = $2 AND "user_id" = $1;
    `

    pool.query(sqlQuery, sqlValues)
        .then(response => {
            res.sendStatus(200)
        })
        .catch(error => {
            console.log('ERROR IN DELETE:', error);
            res.sendStatus(500);
        })

    // res.sendStatus(201);
})

module.exports = router;
