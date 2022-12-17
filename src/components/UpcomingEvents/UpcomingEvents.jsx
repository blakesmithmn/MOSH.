import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar, IconButton } from '@mui/material';
import EventItem from './EventItem';

function UpcomingEvents(user) {
    const params = useParams();
    // const user = useSelector((store) => store.user);
    const events = useSelector((store) => store.events);

    const dispatch = useDispatch();

    return (
        <>
            <Typography variant='h4' sx={{ color: "#FFFFFF" }} mb={1}>Upcoming Events:</Typography>
            <Grid container spacing={4}>

                {events[0] && events.map(concert => {
                    return (
                        <Grid item xs={12} sm={6} md={6} lg={4} key={concert.id}>
                            <Card>
                                <EventItem concert={concert} />
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

        </>
    )
}

export default UpcomingEvents;