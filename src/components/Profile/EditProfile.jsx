import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router'
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
// MUI IMPORTS
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { deepOrange, deepPurple, teal } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



function EditProfile() {
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_PROFILE_TO_EDIT',
            payload: params.id
        })
    }, [params.id])

    const history = useHistory();

    const user = useSelector((store) => store.user);
    const profile = useSelector((store) => store.profile);


    // USER to EDIT REDUCER

    const handleApply = (event) => {
        event.preventDefault();
        dispatch({
            type: 'UPDATE_PROFILE',
            payload: profile
        })
        console.log('Applied Changes! User Object is now:');
        history.push(`/profile/${user.id}`);
    }

    const handleCancel = (event) => {
        event.preventDefault();
        history.push(`/profile/${user.id}`);
        console.log('Changed Abandoned!');
    }
    return (
        <>
            <Grid container spacing={10} className='profileHeader' justifyContent="center">
                <Grid item>
                    <Avatar sx={{ bgcolor: teal[500], width: 200, height: 200, fontSize: 100 }}>{user.first_name[0]}{user.last_name[0]}</Avatar>
                </Grid>
                <Grid item xs sm container>
                    <Grid item xs container direction="column" spacing={4}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h3" component="div">
                                <TextField size='small' placeholder='First Name' value={profile.first_name || ''} onChange={(event) => dispatch({ type: 'EDIT_FIRST_NAME', payload: event.target.value })}></TextField>
                                <TextField size='small' placeholder='Last Name' value={profile.last_name || ''} onChange={(event) => dispatch({ type: 'EDIT_LAST_NAME', payload: event.target.value })}></TextField>
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                {user.username}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <TextField size='small' placeholder='About Me' value={profile.about_me || ''} onChange={(event) => dispatch({ type: 'EDIT_ABOUT_ME', payload: event.target.value })} fullWidth></TextField>
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Button variant='contained' onClick={handleApply}>APPLY</Button>
                            <Button variant='contained' color='secondary' onClick={handleCancel}>CANCEL</Button>

                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="subtitle1" component="div" className='zipcode'>
                            <TextField size='small' placeholder='ZipCode' value={profile.zipcode || ''} onChange={(event) => dispatch({ type: 'EDIT_ZIPCODE', payload: event.target.value })}></TextField>
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

export default EditProfile;