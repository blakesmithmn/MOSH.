import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import './Profile.css';
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, ButtonBase, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar, IconButton, Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';

import Avatars from '../ProfilePhoto/ProfilePhoto';
import { deepOrange, deepPurple, teal, pink, indigo, orange, green, lightBlue } from '@mui/material/colors';

function MobileProfile() {
    const user = useSelector((store) => store.user);
    const profile = useSelector((store) => store.userProfiles)
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();

    const getUserColor = (user) => {
        switch (user.color) {
            case 'pink':
                return pink[500];
            case 'deepPurple':
                return deepPurple[500];
            case 'indigo':
                return indigo[500];
            case 'teal':
                return teal[500];
            case 'green':
                return green[500];
            case 'orange':
                return orange[500];
            case 'lightBlue':
                return lightBlue[500];
        }
    };

    const pushToEdit = (user) => {
        console.log(params);
        const id = user.id;
        console.log(id);
        if (Number(params.id) === user.id) {
            history.push(`/profile/edit/${id}`);
        }
    }

    return (
        // <Grid container spacing={1} className='AppHeader' justifyContent="center" >
        <Stack alignItems='center' className='MobileHeader'>
            <Card xs={12} sx={{ display: { xs: 'inline', sm: 'inline', md: 'none' } }} >
                <CardContent>
                    <Avatar sx={{ bgcolor: getUserColor(profile), width: 150, height: 150, fontSize: 75 }}>{profile.id && <p>{profile.first_name[0]}</p>} {profile.id && <p>{profile.last_name[0]}</p>}</Avatar>
                </CardContent>
                <Typography variant="h3" component="div">
                    {profile.first_name} {profile.last_name}
                </Typography>
                <CardContent>
                    <Typography variant="subtitle2" >
                        {profile.username}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {profile.about_me}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="subtitle1" className='zipcode'>
                        {profile.zipcode}
                    </Typography>
                </CardContent>
                <CardActions>
                    {Number(params.id) === Number(user.id) ?
                        <Button variant='contained' color='secondary' onClick={() => pushToEdit(user)}>EDIT PROFILE</Button>

                        : null}
                </CardActions>
            </Card>
        </Stack>
    )
}

export default MobileProfile;