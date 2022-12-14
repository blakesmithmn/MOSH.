import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import './Profile.css';
import { Paper, Card, CardContent, Typography, Button, ButtonGroup, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container, Avatar, IconButton, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useHistory } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';

import { deepOrange, deepPurple, teal, pink, indigo, orange, green, lightBlue } from '@mui/material/colors';

function MobileEdit() {
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
        <Grid container spacing={10} className='MobileHeader' justifyContent="center">
            <Grid item>
                <Avatar sx={{ bgcolor: getUserColor(user), width: 200, height: 200, fontSize: 100 }}>{user.first_name[0]}{user.last_name[0]}</Avatar>
            </Grid>
            <Grid item xs container spacing={4}>
                <Grid item xs={6}>
                    <TextField size='small' placeholder='First Name' value={profile.first_name || ''} onChange={(event) => dispatch({ type: 'EDIT_FIRST_NAME', payload: event.target.value })}></TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField size='small' placeholder='Last Name' value={profile.last_name || ''} onChange={(event) => dispatch({ type: 'EDIT_LAST_NAME', payload: event.target.value })}></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField size='small' placeholder='About Me' value={profile.about_me || ''} onChange={(event) => dispatch({ type: 'EDIT_ABOUT_ME', payload: event.target.value })} fullWidth></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField size='small' placeholder='ZipCode' value={profile.zipcode || ''} onChange={(event) => dispatch({ type: 'EDIT_ZIPCODE', payload: event.target.value })}></TextField>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <FormControl fullWidth>
                        <InputLabel>Color</InputLabel>
                        <Select
                            value={profile.color || ''}
                            label="Pick a Color"
                            onChange={(event) => dispatch({ type: 'EDIT_COLOR', payload: event.target.value })}
                            required

                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'pink'}>Pink</MenuItem>
                            <MenuItem value={'deepPurple'}>Purple</MenuItem>
                            <MenuItem value={'indigo'}>Indigo</MenuItem>
                            <MenuItem value={'teal'}>Teal</MenuItem>
                            <MenuItem value={'green'}>Green</MenuItem>
                            <MenuItem value={'orange'}>Orange</MenuItem>
                            <MenuItem value={'lightBlue'}>Blue</MenuItem>
                        </Select>
                        <FormHelperText>Pick a Color for your Avatar</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Button variant='contained' onClick={handleApply}>APPLY</Button>
                    <Button variant='contained' color='secondary' onClick={handleCancel}>CANCEL</Button>
                </Grid>

            </Grid>
        </Grid>

    )
}

export default MobileEdit;