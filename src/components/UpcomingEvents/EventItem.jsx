import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar, IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';



function EventItem({ concert }) {
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

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

    const handleDelete = (concertID, userID) => {
        console.log(concertID, userID);
        const deleteInfo = { concertID, userID };
        dispatch({
            type: 'SAGA_DELETE_EVENT',
            payload: deleteInfo
        })
    }

    return (
        <>
            <Card key={concert.id} className='CardDisplay'>
                <CardContent>
                    <Typography variant='h5'>
                        {concert.event_artist}
                    </Typography>
                    <Typography variant='body2' >
                        {concert.event_venue}
                    </Typography>

                </CardContent>
                <CardMedia
                    component="img"
                    image={concert.image}
                    alt={concert.event_name}

                    sx={{ width: .90 }}
                />
                {/* <CardMedia
                        component="img"
                        image={concert.performers[0].image}
                        alt={concert.title}

                        sx={{ width: .90 }}
                    /> */}
                <CardContent>
                    <Typography variant='body2'>
                        Concert Time / Date: {concert.event_datetime}
                    </Typography>
                </CardContent>




                <CardActions>
                    <Button onClick={() => { requestDetails(concert.API_key) }} variant='contained'>DETAILS</Button>
                    <Button onClick={() => handleDelete(concert.id, user.id)} variant='contained' color='error'>
                        <DeleteForeverIcon />
                    </Button>
                </CardActions>

            </Card>

        </>
    )
}

export default EventItem;