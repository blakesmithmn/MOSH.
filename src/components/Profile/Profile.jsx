import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router'

import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar, IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { deepOrange, deepPurple, teal } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';

function Profile() {
    const params = useParams();
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_USER_PROFILE',
            payload: params.id
        })
    }, []);

    const pushToEdit = (user) => {
        console.log(params);
        const id = user.id;
        console.log(id);
        if (Number(params.id) === user.id) {
            history.push(`/profile/edit/${id}`);
        }
    }

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Avatar sx={{ bgcolor: teal[500], width: 200, height: 200, fontSize: 100 }}>{user.first_name[0]}{user.last_name[0]}</Avatar>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Card>
                        <IconButton>
                            <AddCircleIcon color='secondary' />
                        </IconButton>
                        <Typography variant='h5'>{user.first_name} {user.last_name}</Typography>
                        <Button variant='contained' color='secondary' onClick={() => pushToEdit(user)}>EDIT PROFILE</Button>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Card>

                        <p>Current ZipCode: {user.zipcode}</p>
                        <h2>About Me:  </h2>
                        <p>{user.about_me}</p>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <UpcomingEvents />
                </Grid>
            </Grid>
        </>
    )
}

export default Profile;