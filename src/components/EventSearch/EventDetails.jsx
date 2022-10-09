import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import EventSearchItem from './EventSearchItem';
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container } from '@mui/material';


function EventDetails() {
    const eventDetails = useSelector((store) => store.eventDetails.eventDetails);


    return (

        <div>
            {eventDetails.map(concert => (

                <>
                    <h1>Event Details:</h1>
                    <h4>{concert.name}</h4>
                    <a href={concert.url}>Tickets</a>
                    <p>{concert.venue.address} {concert.venue.extended_address}</p>
                    <h4>TICKET DETAILS:</h4>
                    <p>Average Ticket Price:{concert.stats.average_price}</p>
                    <p>Lowest Ticket Price:{concert.stats.lowest_price}</p>
                    <p>Highest Ticket Price:{concert.stats.highest_price}</p>

                    <p>CONCERT ID for DETAILS: {concert.id}</p>
                    <p>ARTIST ID for DETAILS / EVENTUAL SPOTIFY LINK: {concert.performers[0].id}</p>
                </>
            ))}




        </div>
    )
}

export default EventDetails;