import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar, IconButton } from '@mui/material';
import EventItem from './EventItem';

function UpcomingEvents(userID) {

    // needs a get dispatch for user specific events


    // on edit page maybe delete routes?
    return (
        <>
            <Typography variant='h4'>Upcoming Events:</Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6} lg={4} >

                    <Card>
                        <EventItem />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} >

                    <Card>
                        <EventItem />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} >

                    <Card>
                        <EventItem />
                    </Card>
                </Grid>
            </Grid>


        </>
    )
}

export default UpcomingEvents;