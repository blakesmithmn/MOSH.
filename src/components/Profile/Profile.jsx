import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import './Profile.css';
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, ButtonBase, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar, IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import MobileProfile from './MobileProfile';
import Avatars from '../Avatar/Avatar';
import { deepOrange, deepPurple, teal, pink, indigo, orange, green, lightBlue } from '@mui/material/colors';


function Profile() {
    const params = useParams();
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const profile = useSelector((store) => store.userProfiles)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_USER_PROFILE',
            payload: Number(params.id)
        })
        dispatch({
            type: 'SAGA_FETCH_USER_EVENTS',
            payload: Number(params.id)
        })
        console.log('PARAMS ID IS:', Number(params.id))
        return () => {
            dispatch({
                type: 'CLEAR_PROFILE_DETAILS'
            })
        }
    }, [params.id]);

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
        <>
            <MobileProfile user={user} />
            <Grid container spacing={10} className='profileHeader' justifyContent="center" >
                <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'inline' } }}>
                    <Avatar sx={{ bgcolor: getUserColor(profile), width: 200, height: 200, fontSize: 100 }}>{profile.id && <p>{profile.first_name[0]}</p>} {profile.id && <p>{profile.last_name[0]}</p>}</Avatar>
                </Grid>
                <Grid item xs sm container sx={{ display: { xs: 'none', sm: 'none', md: 'inline' } }}>
                    <Grid item xs container direction="column" spacing={4}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h3" component="div" sx={{ color: 'white' }}>
                                {profile.first_name} {profile.last_name}
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom sx={{ color: 'white' }}>
                                {profile.username}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ color: 'white' }}>
                                {profile.about_me}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="subtitle1" component="div" className='zipcode' sx={{ color: 'white' }}>
                                {profile.zipcode}
                            </Typography>
                        </Grid>

                        {/* conditional rendering for edit button */}
                        {Number(params.id) === Number(user.id) ?

                            <Grid item >
                                <Button variant='contained' color='secondary' onClick={() => pushToEdit(user)}>EDIT PROFILE</Button>
                            </Grid>
                            : null}
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <UpcomingEvents user={params.id} />
            </Grid>

        </>
    )
}

export default Profile;