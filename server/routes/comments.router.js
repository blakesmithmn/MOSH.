const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {

    // GET route code here
});

router.get('/:eventID', (req, res) => {
    // GET route code here
    // console.log('EVENT ID IN COMMENTS GET IS:', req.params.eventID);

    const eventID = req.params.eventID;

    const sqlQuery = `
    SELECT * from "event_comments"
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
router.post('/', (req, res) => {
    console.log(req.body);
    const user = req.body.userID;
    const comment = req.body.comment;
    const event = req.body.eventID;

    const sqlQuery = `
        INSERT INTO "event_comments"
            ("user_id", "comment", "event_id")
        VALUES ($1,$2,$3)
    `

    const sqlValues = [user, comment, event];

    pool.query(sqlQuery, sqlValues)
        .then(postResponse => {
            res.sendStatus(200);
        })
        .catch(postError => {
            console.log('ERROR IN SERVERSIDE POST:', postError);
        })
});

module.exports = router;
