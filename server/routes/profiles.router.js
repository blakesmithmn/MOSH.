const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GETTING ALL PROFILES
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('GET /api/profiles');
    const sqlQuery = `SELECT * from "user"`

    // GET route code here

    pool.query(sqlQuery)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log('FAILIURE in GETTING PROFILES', error)
            res.sendStatus(500);
        })
});
// GETTING SINGLE PROFILE INFORMATION
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('GET /api/profiles/:id');
    const sqlQuery = `SELECT * from "user" WHERE id = $1`
    const sqlValues = [req.params.id];
    // GET route code here

    pool.query(sqlQuery, sqlValues)
        .then(response => {
            res.send(response.rows[0]);
        })
        .catch(error => {
            console.log('FAILIURE in GETTING PROFILE', error)
            res.sendStatus(500);
        })
});



// SENDING UPDATED PROFILE INFORMATION TO DB
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('PUT /profile/edit/:id');
    console.log(req.body);

    const profile = req.body;
    const sqlQuery =
        `
    UPDATE "user"
        SET 
            first_name = $1,
            last_name = $2,
            zipcode = $3,
            about_me = $4,
            color = $6
    WHERE
        id = $5
    `;

    const sqlValues = [profile.first_name, profile.last_name, profile.zipcode, profile.about_me, profile.id, profile.color];


    pool.query(sqlQuery, sqlValues)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error making DB query for Profile update', error);
            res.sendStatus(500);
        })
});

module.exports = router;
