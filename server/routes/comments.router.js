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
    console.log('EVENT ID IN COMMENTS GET IS:', req.params.eventID);

    const eventID = req.params.eventID;

    const sqlQuery = `
    SELECT * from "event_comments"
		JOIN "user"
			ON user_id = "user".id
		JOIN "events" 
			ON event_id = "events".id
		WHERE "API_key" = $1;
    `
    const sqlValues = [eventID];

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
/**
 * POST route template
 */
router.put('/', (req, res) => {
    // POST route code here
});

module.exports = router;
