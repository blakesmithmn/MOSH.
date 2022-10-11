import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import EventSearchItem from './EventSearchItem';
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';



function EventDetails() {
    const params = useParams();
    const eventDetails = useSelector((store) => store.events.eventDetails);
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
        history.push('/search');
    }


    return (
        <div>
            {eventDetails.id &&



                <>
                    <button onClick={handleBack}>BACK</button>
                    <h1>Event Details:</h1>
                    <h4>{eventDetails.title}</h4>
                    <img src={eventDetails.performers[0].image} alt="" />
                    <a href={eventDetails.url}>Tickets</a>
                    <p>{eventDetails.venue.address} {eventDetails.venue.extended_address}</p>
                    <h4>TICKET DETAILS:</h4>
                    <p>Average Ticket Price:{eventDetails.stats.average_price}</p>
                    <p>Lowest Ticket Price:{eventDetails.stats.lowest_price}</p>
                    <p>Highest Ticket Price:{eventDetails.stats.highest_price}</p>

                    <p>eventDetails ID for DETAILS: {eventDetails.id}</p>
                    <p>ARTIST ID for DETAILS / EVENTUAL SPOTIFY LINK: {eventDetails.performers[0].id}</p>
                </>
            }

        </div>)
}


export default EventDetails;