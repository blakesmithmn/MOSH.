import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container } from '@mui/material';
import './EventSearch.css'
import { useHistory } from 'react-router-dom';



function EventSearchItem({ concert }) {

    // const [eventID, setEventID] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();

    const requestDetails = (concertID) => {
        // setEventID(concert)
        console.log(concertID);
        if (concertID !== 0) {
            //     dispatch({
            //         type: 'SAGA_FETCH_DETAILS',
            //         payload: concertID
            //     })
            // }

            history.push(`/details/${concertID}`);
        }

    }



    return (
        <Grid item xs={12} sm={12} md={6} lg={4} key={concert.id}>
            <Card key={concert.id} className='EventSearchItem'>
                <CardContent>
                    <Typography variant='h5'>
                        {concert.title}
                    </Typography>
                    <Typography variant='body2' >
                        {concert.venue.name}
                    </Typography>
                    <Typography variant='body2'>
                        Average Ticket Price:{concert.stats.average_price}
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    image={concert.performers[0].image}
                    alt={concert.title}

                    sx={{ width: .90 }}
                />
                <CardContent>
                    <Typography variant='body2'>
                        Concert Time / Date: {concert.datetime_local}
                    </Typography>
                </CardContent>




                <CardActions>
                    <Button onClick={() => { requestDetails(concert.id) }} variant='contained'>DETAILS</Button>
                    <Button variant='contained'>ADD EVENT</Button>
                </CardActions>

            </Card>
        </Grid>
    )
}

export default EventSearchItem;