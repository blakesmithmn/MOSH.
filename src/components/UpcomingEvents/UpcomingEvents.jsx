import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar, IconButton } from '@mui/material';
import EventItem from './EventItem';

function UpcomingEvents(userID) {
    const params = useParams();
    const user = useSelector((store) => store.user);
    const events = useSelector((store) => store.events.userEvents);

    const dispatch = useDispatch();
    // needs a get dispatch for user specific events

    useEffect(() => {
        dispatch({
            type: 'SAGA_FETCH_USER_EVENTS',
            payload: user.id
        })
    }, []);

    // SQL join from Users to USERS _ EVENTS
    // MAP EVENT ITEMS FROM ARRAY OF UPCOMING EVENTS
    // LINK ON ITEM TO BRING TO EVENT DETAILS PAGE


    // on edit page maybe delete routes?
    return (
        <>
            <Typography variant='h4'>Upcoming Events:</Typography>
            <Grid container spacing={4}>
                {events.map(event => {
                    return (
                        <Grid item xs={12} sm={6} md={6} lg={4} >
                            <Card>
                                <EventItem event={event} />
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

        </>
    )
}

export default UpcomingEvents;