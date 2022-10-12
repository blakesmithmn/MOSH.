const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log(req.body);
    // req.body should contain all necessary concert details
    const event = req.body;
    const insertEventQuery = `
    INSERT INTO "events" ("event_id", "event_name", "event_venue", "event_artist", "event_datetime", "event_description", "ticket_link")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `

    // RETURNING "id";
    const eventValues = [event.id, event.name, event.venue, event.artist, event.datetime, event.description, event.tickets]
    // FIRST QUERY MAKES MOVIE
    pool.query(insertEventQuery, eventValues)
        .then(result => {
            //     console.log('New  Id:', result.rows[0].id); //ID IS HERE!

            //     const createdMovieId = result.rows[0].id

            //     // Now handle the genre reference
            //     const insertMovieGenreQuery = `
            // INSERT INTO "movies_genres" ("movie_id", "genre_id")
            // VALUES  ($1, $2);
            // `
            //     // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
            //     pool.query(insertMovieGenreQuery, [createdMovieId, 12]).then(result => {
            //         //Now that both are done, send back success!
            res.sendStatus(201);
            // }).catch(err => {
            //     // catch for second query
            //     console.log(err);
            //     res.sendStatus(500)
            // })

            // Catch for first query
        }).catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
})

module.exports = router;
