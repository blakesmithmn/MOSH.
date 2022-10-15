import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import EventSearchItem from './EventSearchItem';
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Spotify from 'react-spotify-embed';
import Comments from '../Comments/Comments';
const { DateTime } = require("luxon");


function EventDetails() {
    const params = useParams();
    const user = useSelector((store) => store.user);
    const eventDetails = useSelector((store) => store.search.eventDetails);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('IN USE EFFECT & ID is:', params.id);
        dispatch({
            type: 'SAGA_FETCH_DETAILS',
            payload: params.id
        })
        return () => {
            dispatch({
                type: 'CLEAR_EVENT_DETAILS'
            })
        }
    }, [params.id]);

    const handleBack = () => {
        history.push('/login');
    }

    const addToEvents = () => {
        const userID = user.id;
        const eventID = eventDetails.id;
        const title = eventDetails.title;
        const artist = eventDetails.performers[0].name;
        const venue = eventDetails.venue.name;
        const datetime = eventDetails.datetime_local;
        const description = eventDetails.description;
        const tickets = eventDetails.url;
        const image = eventDetails.performers[0].images.huge;

        dispatch({
            type: 'SAGA_ADD_EVENT',
            payload: {
                id: eventID,
                name: title,
                venue: venue,
                artist: artist,
                datetime: datetime,
                description: description,
                tickets: tickets,
                userID: userID,
                image: image,
            }
        })

    }



    return (
        <div>
            {eventDetails.id &&



                <>
                    <Grid container xs={12}>
                        <Grid item xs={12} sm={6} md={6} lg={4} key={eventDetails.id}>
                            <Card className='CardDisplay'>
                                <CardActions>
                                    <Button onClick={handleBack} color='error' edge='start' variant='contained'>
                                        <ArrowBackIosNewIcon />
                                        BACK
                                    </Button>
                                </CardActions>
                                <CardContent>
                                    <Typography variant='h2'>{eventDetails.title}</Typography>
                                    <Typography variant='body2'>{eventDetails.venue.address} {eventDetails.venue.extended_address}</Typography>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    image={eventDetails.performers[0].images.huge}
                                    alt={eventDetails.title}
                                    sx={{ width: .75 }}
                                />
                                <CardContent>
                                    <Typography variant='h4'>Ticket Details:</Typography>
                                    <Typography variant='body2'>${eventDetails.stats.lowest_price} - {eventDetails.stats.highest_price}</Typography>

                                </CardContent>
                                <CardActions>
                                    <Button href={eventDetails.url} target="_blank" variant='contained'>TICKETS</Button>
                                    <ButtonGroup>
                                        <Button variant='contained' onClick={addToEvents}>+ADD EVENT</Button>
                                    </ButtonGroup>
                                </CardActions>

                            </Card>

                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4} key={eventDetails.id} direction='column'>
                            <Grid item xs={12} sm={6} md={6} lg={4} key={eventDetails.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant='h2'>LINKS / SPOTIFY</Typography>
                                        {/* SPOTIFY EMBEDS THROUGH A REACT HOOK - JUST NEED SPOTIFY API TO REQUEST THE ARTIST URL */}
                                        <Spotify wide link="https://open.spotify.com/track/5ihDGnhQgMA0F0tk9fNLlA?si=4472348a63dd4f83" />

                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4} key={eventDetails.id}>
                                <Comments eventID={eventDetails.id} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <p>event id:{eventDetails.id}</p>
                    <p>ARTIST ID for DETAILS / EVENTUAL SPOTIFY LINK: {eventDetails.performers[0].id}</p>
                </>
            }

        </div >)
}


export default EventDetails;