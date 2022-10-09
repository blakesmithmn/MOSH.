import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container } from '@mui/material';
import './EventSearch.css'
import { useHistory } from 'react-router-dom';



function EventSearchItem({ concert }) {

    const [eventID, setEventID] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();

    const requestDetails = (concert) => {

        setEventID(concert)
        console.log(eventID);
        if (eventID !== 0) {
            dispatch({
                type: 'SAGA_FETCH_DETAILS',
                payload: eventID
            })


            history.push(`/details/`);
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
            <h2>RECOMMENDATIONS REQUESTS COULD BE DOPE FOR HOME PAGE</h2>
        </Grid>
    )
}

export default EventSearchItem;