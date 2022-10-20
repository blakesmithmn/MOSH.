const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {

    // GET route code here
});

router.get('/:eventID', rejectUnauthenticated, (req, res) => {
    // GET route code here
    // console.log('EVENT ID IN COMMENTS GET IS:', req.params.eventID);

    const eventID = req.params.eventID;

    const sqlQuery = `
    SELECT "user_id", "event_id", "comment", "username", "first_name","last_name","color" from "event_comments"
		JOIN "user"
			ON user_id = "user".id
		JOIN "events" 
			ON event_id = "events".id
		WHERE "events".id = $1;
    `
    const sqlValues = [eventID];

    pool.query(sqlQuery, sqlValues)
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('ERROR GETTING USER EVENTS', error);
            res.sendStatus(500);
        })

});


// POST ROUTER FOR USER_COMMENTS
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    const user = req.body.userID;
    const comment = req.body.comment;
    const event = req.body.eventID;

    const sqlQuery = `
        INSERT INTO "event_comments"
            ("user_id", "comment", "event_id")
        VALUES ($1,$2,$3)
        RETURNING "event_id";
    `

    const sqlValues = [user, comment, event];

    pool.query(sqlQuery, sqlValues)
        .then(postResponse => {
            const reseventID = postResponse.rows[0]
            console.log('RES EVENT ID IS:', reseventID);
            res.send(reseventID);
            // res.sendStatus(200);
        })
        .catch(postError => {
            console.log('ERROR IN SERVERSIDE POST:', postError);
        })
});

module.exports = router;
