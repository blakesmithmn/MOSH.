import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import './Profile.css';

import { Paper, Card, CardContent, Typography, Button, ButtonGroup, ButtonBase, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar, IconButton } from '@mui/material';
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
            <Grid container spacing={2} className='profileHeader'>
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Avatar sx={{ bgcolor: teal[500], width: 200, height: 200, fontSize: 100 }}>{user.first_name[0]}{user.last_name[0]}</Avatar>
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h3" component="div">
                                {user.first_name} {user.last_name}
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                {user.username}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {user.about_me}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' color='secondary' onClick={() => pushToEdit(user)}>EDIT PROFILE</Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="div" className='zipcode'>
                            {user.zipcode}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <UpcomingEvents />
            </Grid>

        </>
    )
}

export default Profile;