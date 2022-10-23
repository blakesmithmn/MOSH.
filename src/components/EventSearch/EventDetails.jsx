import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import EventSearchItem from './EventSearchItem';
import Comments from '../Comments/Comments';
import './EventSearch.css'

// MISC
import Spotify from 'react-spotify-embed';
const { DateTime } = require("luxon");
import swal from 'sweetalert';


// MUI IMPORTS
import { deepOrange, deepPurple, teal, pink, indigo, orange, green, lightBlue, red } from '@mui/material/colors';
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, IconButton, Stack } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';



function EventDetails() {
    // NECESSARY VARIABLES
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    // REDUX STUFF
    const user = useSelector((store) => store.user);
    const eventDetails = useSelector((store) => store.details);
    const links = useSelector((store) => store.links);

    const events = useSelector((store) => store.events.userEvents);

    // LOCAL STATE
    const [eventStatus, setEventStatus] = useState(false);

    // USE EFFECT TO FETCH EVENT DETAILS / USER EVENTS / CLEAR EVENT DETAILS ON UNLOAD
    useEffect(() => {
        console.log('IN USE EFFECT & ID is:', params.id);
        dispatch({
            type: 'SAGA_FETCH_DETAILS',
            payload: params.id
        })
        dispatch({
            type: 'SAGA_FETCH_USER_EVENTS',
            payload: user.id
        })

        return () => {
            dispatch({
                type: 'CLEAR_EVENT_DETAILS'
            })
            // dispatch({
            //     type: 'CLEAR_SPOTIFY_DETAILS'
            // })
        }
    }, [params.id]);

    // FUNCTION TO RETURN TO USER PAGE
    const handleBack = () => {
        history.push('/user');
    }

    // FUNCTION THAT DISPATCHES TO ADD AN EVENT TO EVENT TABLE
    // AS WELL AS USERS_EVENTS 
    const addToEvents = async () => {
        const userID = user.id;
        const eventID = eventDetails.id;
        const title = eventDetails.title;
        const artist = eventDetails.performers[0].name;
        const venue = eventDetails.venue.name;
        const datetime = eventDetails.datetime_local;
        const description = eventDetails.description;
        const tickets = eventDetails.url;
        const image = eventDetails.performers[0].images.huge;


        await dispatch({
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
        await dispatch({
            type: 'SAGA_FETCH_COMMENTS',
            payload: eventID
        })

        // not currently functional??

        swal({
            title: "Congrats!",
            text: `You're Goin' to ${title} - have fun and be safe!`,
            icon: "success",
        });

    }

    const formatTime = (datetimeString) => {
        const dt = DateTime.fromISO(datetimeString)
        return dt.toLocaleString(DateTime.DATETIME_FULL)
    }

    return (
        <div>
            {eventDetails.id &&

                <>
                    <Grid container spacing={4} className='detailsContainer'>
                        <Grid item xs={12} sm={6} md={4} lg={4} className='DetailsContainer'>
                            <Card className='CardDisplay'>
                                <CardActions>
                                    <Button onClick={handleBack} color='error' edge='start' variant='contained'>
                                        <ArrowBackIosNewIcon />
                                        BACK
                                    </Button>
                                </CardActions>
                                <CardContent>
                                    <Typography variant='h2'>{eventDetails.title}</Typography>
                                    <Typography variant='subtitle2'>{formatTime(eventDetails.datetime_local)}</Typography>
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
                                    {eventDetails.isGoing ?
                                        <Button variant='contained' id='button' disabled>You're Going</Button>
                                        :
                                        <Button variant='contained' onClick={addToEvents} id='button' >+ADD EVENT</Button>
                                    }
                                    {/* needs conditional rendering so that users can't double add an event */}


                                </CardActions>

                            </Card>

                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                            <Grid item xs={12} sm={6} md={8} >
                                <Card className='SocialLinks'>
                                    <CardContent>
                                        <Typography variant='h3'>SOCIAL LINKS:</Typography>
                                        {links.homepage ?
                                            <IconButton href={links.homepage} target="_blank" variant='contained'>
                                                <InsertLinkIcon sx={{ color: deepOrange[500] }} />
                                            </IconButton>
                                            : null
                                        }

                                        {links.instagram ?
                                            <IconButton href={links.instagram} target="_blank">
                                                <InstagramIcon sx={{ color: pink[500] }} />
                                            </IconButton>
                                            : null
                                        }
                                        {links.twitter ?
                                            <IconButton href={links.twitter} target="_blank" variant='contained'>
                                                <TwitterIcon sx={{ color: lightBlue[500] }} />
                                            </IconButton>
                                            : null
                                        }
                                        {links.youtube ?
                                            <IconButton href={links.youtube} target="_blank" variant='contained'>
                                                <YouTubeIcon sx={{ color: red[500] }} />
                                            </IconButton>
                                            : null
                                        }
                                        {/* SPOTIFY EMBEDS THROUGH A REACT HOOK - JUST NEED SPOTIFY API TO REQUEST THE ARTIST URL */}
                                        {links.spotify ?
                                            <Spotify wide link={links.spotify || 'https://open.spotify.com/artist'} />

                                            : null
                                        }


                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={8} className='CommentSection'>
                                <Comments eventID={eventDetails.id} />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <p>event id:{eventDetails.id}</p>
                    <p>ARTIST ID for DETAILS / EVENTUAL SPOTIFY LINK: {eventDetails.performers[0].id}</p> */}
                </>
            }

        </div >)
}


export default EventDetails;